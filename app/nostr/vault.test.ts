// app/nostr/vault.test.ts — Tests for vault sync module
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import {
  serialiseVault,
  deserialiseVault,
  encryptVault,
  decryptVault,
  buildVaultEvent,
  mergeVaultGroups,
  VAULT_KIND,
  VAULT_D_TAG,
} from './vault.js'
import type { AppGroup } from '../types.js'

// ── Helpers ─────────────────────────────────────────────────────

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

function makeGroup(overrides: Partial<AppGroup> = {}): AppGroup {
  return {
    id: 'test-group-1',
    name: 'Test Group',
    seed: 'a'.repeat(64),
    members: ['1'.repeat(64), '2'.repeat(64)],
    admins: ['1'.repeat(64)],
    counter: 42,
    usageOffset: 0,
    epoch: 3,
    nostrEnabled: true,
    relays: [],
    readRelays: ['wss://relay.trotters.cc'],
    writeRelays: ['wss://relay.trotters.cc'],
    encodingFormat: 'words',
    tolerance: 1,
    livenessInterval: 3600,
    livenessCheckins: { ['1'.repeat(64)]: 1700000000 },
    beaconPrecision: 5,
    usedInvites: [],
    latestInviteIssuedAt: 0,
    lastPositions: {
      ['1'.repeat(64)]: { lat: 51.5, lon: -0.1, geohash: 'gcpuuz', precision: 5, timestamp: 1700000000 },
    },
    ...overrides,
  } as AppGroup
}

// ── Serialisation ───────────────────────────────────────────────

describe('serialiseVault', () => {
  it('includes version field', () => {
    const groups = { g1: makeGroup() }
    const json = serialiseVault(groups)
    const parsed = JSON.parse(json)
    expect(parsed.version).toBe(1)
  })

  it('strips lastPositions from groups', () => {
    const groups = { g1: makeGroup() }
    const json = serialiseVault(groups)
    const parsed = JSON.parse(json)
    expect(parsed.groups.g1.lastPositions).toBeUndefined()
  })

  it('resets livenessCheckins to empty object', () => {
    const groups = { g1: makeGroup() }
    const json = serialiseVault(groups)
    const parsed = JSON.parse(json)
    expect(parsed.groups.g1.livenessCheckins).toEqual({})
  })

  it('preserves all other fields', () => {
    const groups = { g1: makeGroup() }
    const json = serialiseVault(groups)
    const parsed = JSON.parse(json)
    expect(parsed.groups.g1.name).toBe('Test Group')
    expect(parsed.groups.g1.counter).toBe(42)
    expect(parsed.groups.g1.epoch).toBe(3)
    expect(parsed.groups.g1.seed).toBe('a'.repeat(64))
  })

  it('handles multiple groups', () => {
    const groups = {
      g1: makeGroup({ id: 'g1', name: 'Alpha' }),
      g2: makeGroup({ id: 'g2', name: 'Beta' }),
    }
    const json = serialiseVault(groups)
    const parsed = JSON.parse(json)
    expect(Object.keys(parsed.groups)).toHaveLength(2)
  })

  it('handles empty groups object', () => {
    const json = serialiseVault({})
    const parsed = JSON.parse(json)
    expect(parsed.version).toBe(1)
    expect(parsed.groups).toEqual({})
  })
})

describe('deserialiseVault', () => {
  it('round-trips through serialise', () => {
    const groups = { g1: makeGroup() }
    const json = serialiseVault(groups)
    const result = deserialiseVault(json)
    expect(result.g1.name).toBe('Test Group')
    expect(result.g1.counter).toBe(42)
  })

  it('returns empty object for invalid JSON', () => {
    expect(deserialiseVault('not json')).toEqual({})
  })

  it('returns empty object for null payload', () => {
    expect(deserialiseVault('null')).toEqual({})
  })

  it('returns empty object for missing groups key', () => {
    expect(deserialiseVault('{"version":1}')).toEqual({})
  })

  it('returns empty object for non-object groups', () => {
    expect(deserialiseVault('{"version":1,"groups":"nope"}')).toEqual({})
  })
})

// ── Encryption ──────────────────────────────────────────────────

describe('encryptVault / decryptVault', () => {
  const sk = generateSecretKey()
  const privkey = bytesToHex(sk)
  const pubkey = getPublicKey(sk)

  it('round-trips plaintext through encrypt/decrypt', () => {
    const plaintext = 'hello canary vault'
    const ciphertext = encryptVault(plaintext, privkey, pubkey)
    expect(ciphertext).not.toBe(plaintext)
    const decrypted = decryptVault(ciphertext, privkey, pubkey)
    expect(decrypted).toBe(plaintext)
  })

  it('encrypts full vault payload', () => {
    const groups = { g1: makeGroup() }
    const json = serialiseVault(groups)
    const ciphertext = encryptVault(json, privkey, pubkey)
    const decrypted = decryptVault(ciphertext, privkey, pubkey)
    expect(decrypted).toBe(json)
  })

  it('returns null when decrypting with wrong key', () => {
    const sk2 = generateSecretKey()
    const privkey2 = bytesToHex(sk2)
    const pubkey2 = getPublicKey(sk2)

    const ciphertext = encryptVault('secret', privkey, pubkey)
    const result = decryptVault(ciphertext, privkey2, pubkey2)
    expect(result).toBeNull()
  })

  it('returns null for garbage ciphertext', () => {
    const result = decryptVault('not-real-ciphertext', privkey, pubkey)
    expect(result).toBeNull()
  })
})

// ── Event Building ──────────────────────────────────────────────

describe('buildVaultEvent', () => {
  const sk = generateSecretKey()
  const privkey = bytesToHex(sk)
  const pubkey = getPublicKey(sk)

  it('sets kind to VAULT_KIND (30078)', () => {
    const event = buildVaultEvent('encrypted-content', privkey)
    expect(event.kind).toBe(VAULT_KIND)
    expect(VAULT_KIND).toBe(30078)
  })

  it('includes d tag with VAULT_D_TAG', () => {
    const event = buildVaultEvent('encrypted-content', privkey)
    const dTag = event.tags.find((t: string[]) => t[0] === 'd')
    expect(dTag).toBeDefined()
    expect(dTag![1]).toBe(VAULT_D_TAG)
    expect(VAULT_D_TAG).toBe('canary:vault')
  })

  it('includes expiration tag ~90 days in future', () => {
    const event = buildVaultEvent('encrypted-content', privkey)
    const expTag = event.tags.find((t: string[]) => t[0] === 'expiration')
    expect(expTag).toBeDefined()
    const expTime = parseInt(expTag![1], 10)
    const now = Math.floor(Date.now() / 1000)
    // Should be ~90 days (7776000 seconds) in the future, allow 60s tolerance
    expect(expTime).toBeGreaterThan(now + 7776000 - 60)
    expect(expTime).toBeLessThan(now + 7776000 + 60)
  })

  it('sets content to encrypted payload', () => {
    const event = buildVaultEvent('encrypted-content', privkey)
    expect(event.content).toBe('encrypted-content')
  })

  it('produces a signed event with id and sig', () => {
    const event = buildVaultEvent('encrypted-content', privkey)
    expect(event.id).toBeDefined()
    expect(event.sig).toBeDefined()
    expect(event.pubkey).toBe(pubkey)
  })
})

// ── Merge Logic ─────────────────────────────────────────────────

describe('mergeVaultGroups', () => {
  it('adds vault-only groups to local', () => {
    const local: Record<string, AppGroup> = {}
    const vault = { g1: makeGroup({ id: 'g1', name: 'From Vault' }) }
    const merged = mergeVaultGroups(local, vault)
    expect(merged.g1.name).toBe('From Vault')
  })

  it('keeps local-only groups', () => {
    const local = { g1: makeGroup({ id: 'g1', name: 'Local Only' }) }
    const vault: Record<string, AppGroup> = {}
    const merged = mergeVaultGroups(local, vault)
    expect(merged.g1.name).toBe('Local Only')
  })

  it('keeps local when same epoch and same counter', () => {
    const local = { g1: makeGroup({ epoch: 5, counter: 10, name: 'Local' }) }
    const vault = { g1: makeGroup({ epoch: 5, counter: 10, name: 'Vault' }) }
    const merged = mergeVaultGroups(local, vault)
    expect(merged.g1.name).toBe('Local')
  })

  it('takes vault group when vault has higher epoch', () => {
    const local = { g1: makeGroup({ epoch: 2, counter: 100, name: 'Local' }) }
    const vault = { g1: makeGroup({ epoch: 3, counter: 1, name: 'Vault' }) }
    const merged = mergeVaultGroups(local, vault)
    expect(merged.g1.name).toBe('Vault')
  })

  it('takes local group when local has higher epoch', () => {
    const local = { g1: makeGroup({ epoch: 5, counter: 1, name: 'Local' }) }
    const vault = { g1: makeGroup({ epoch: 3, counter: 100, name: 'Vault' }) }
    const merged = mergeVaultGroups(local, vault)
    expect(merged.g1.name).toBe('Local')
  })

  it('takes vault group when same epoch but vault has higher counter', () => {
    const local = { g1: makeGroup({ epoch: 5, counter: 10, name: 'Local' }) }
    const vault = { g1: makeGroup({ epoch: 5, counter: 20, name: 'Vault' }) }
    const merged = mergeVaultGroups(local, vault)
    expect(merged.g1.name).toBe('Vault')
  })

  it('takes local group when same epoch but local has higher counter', () => {
    const local = { g1: makeGroup({ epoch: 5, counter: 20, name: 'Local' }) }
    const vault = { g1: makeGroup({ epoch: 5, counter: 10, name: 'Vault' }) }
    const merged = mergeVaultGroups(local, vault)
    expect(merged.g1.name).toBe('Local')
  })

  it('merges disjoint groups from both sides', () => {
    const local = { g1: makeGroup({ id: 'g1', name: 'Local' }) }
    const vault = { g2: makeGroup({ id: 'g2', name: 'Vault' }) }
    const merged = mergeVaultGroups(local, vault)
    expect(Object.keys(merged)).toHaveLength(2)
    expect(merged.g1.name).toBe('Local')
    expect(merged.g2.name).toBe('Vault')
  })

  it('handles both empty', () => {
    const merged = mergeVaultGroups({}, {})
    expect(merged).toEqual({})
  })
})
