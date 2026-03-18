import { describe, it, expect, beforeAll } from 'vitest'
import {
  deriveGroupKey,
  encryptEnvelope,
  decryptEnvelope,
  deriveGroupIdentity,
  hashGroupTag,
} from './sync-crypto.js'
import { encodeSyncMessage, decodeSyncMessage, type SyncMessage } from './sync.js'
import { randomSeed } from './crypto.js'
import { fromNsec } from 'nsec-tree/core'
import { derivePersona } from 'nsec-tree/persona'
import type { Persona } from 'nsec-tree/persona'

// ── Task 1: Group key derivation ─────────────────────────────────────────────

describe('deriveGroupKey', () => {
  const seedHex = 'a'.repeat(64)
  const otherSeedHex = 'b'.repeat(64)

  it('returns exactly 32 bytes', () => {
    const key = deriveGroupKey(seedHex)
    expect(key).toBeInstanceOf(Uint8Array)
    expect(key.length).toBe(32)
  })

  it('is deterministic — same seed always produces the same key', () => {
    const key1 = deriveGroupKey(seedHex)
    const key2 = deriveGroupKey(seedHex)
    expect(Array.from(key1)).toEqual(Array.from(key2))
  })

  it('different seeds produce different keys', () => {
    const key1 = deriveGroupKey(seedHex)
    const key2 = deriveGroupKey(otherSeedHex)
    expect(Array.from(key1)).not.toEqual(Array.from(key2))
  })
})

// ── Task 1: Envelope encryption ──────────────────────────────────────────────

describe('encryptEnvelope / decryptEnvelope', () => {
  const seedHex = 'a'.repeat(64)

  it('round-trips plaintext correctly', async () => {
    const groupKey = deriveGroupKey(seedHex)
    const plaintext = 'Hello, CANARY!'
    const encoded = await encryptEnvelope(groupKey, plaintext)
    const recovered = await decryptEnvelope(groupKey, encoded)
    expect(recovered).toBe(plaintext)
  })

  it('produces different ciphertexts for the same plaintext (random IV)', async () => {
    const groupKey = deriveGroupKey(seedHex)
    const plaintext = 'same message'
    const encoded1 = await encryptEnvelope(groupKey, plaintext)
    const encoded2 = await encryptEnvelope(groupKey, plaintext)
    expect(encoded1).not.toBe(encoded2)
  })

  it('returns a non-empty base64 string', async () => {
    const groupKey = deriveGroupKey(seedHex)
    const encoded = await encryptEnvelope(groupKey, 'test')
    expect(typeof encoded).toBe('string')
    expect(encoded.length).toBeGreaterThan(0)
    // Must be valid base64 (no throws on decode)
    expect(() => atob(encoded)).not.toThrow()
  })

  it('fails to decrypt with wrong key', async () => {
    const key1 = deriveGroupKey('a'.repeat(64))
    const key2 = deriveGroupKey('b'.repeat(64))
    const encoded = await encryptEnvelope(key1, 'secret message')
    await expect(decryptEnvelope(key2, encoded)).rejects.toThrow()
  })

  it('fails to decrypt tampered ciphertext', async () => {
    const groupKey = deriveGroupKey(seedHex)
    const encoded = await encryptEnvelope(groupKey, 'tamper me')
    // Flip a byte in the decoded buffer and re-encode
    const raw = Uint8Array.from(atob(encoded), c => c.charCodeAt(0))
    raw[raw.length - 1] ^= 0xff
    const tampered = btoa(String.fromCharCode(...raw))
    await expect(decryptEnvelope(groupKey, tampered)).rejects.toThrow()
  })
})

// ── Task 2: Per-group derived signing identity ────────────────────────────────

describe('deriveGroupIdentity', () => {
  const TEST_KEY_BYTES = new Uint8Array(32).fill(1)
  let persona: Persona

  beforeAll(() => {
    const root = fromNsec(TEST_KEY_BYTES)
    persona = derivePersona(root, 'personal')
    root.destroy()
  })

  it('returns an Identity with npub and privateKey', () => {
    const identity = deriveGroupIdentity(persona, 'family-2026', 0)
    expect(identity.npub).toMatch(/^npub1/)
    expect(identity.nsec).toMatch(/^nsec1/)
    expect(identity.privateKey).toBeInstanceOf(Uint8Array)
    expect(identity.privateKey.length).toBe(32)
    expect(identity.publicKey).toBeInstanceOf(Uint8Array)
    expect(identity.publicKey.length).toBe(32)
  })

  it('is deterministic', () => {
    const id1 = deriveGroupIdentity(persona, 'family-2026', 0)
    const id2 = deriveGroupIdentity(persona, 'family-2026', 0)
    expect(id1.npub).toBe(id2.npub)
  })

  it('different group IDs produce different identities', () => {
    const id1 = deriveGroupIdentity(persona, 'family-2026', 0)
    const id2 = deriveGroupIdentity(persona, 'meetup', 0)
    expect(id1.npub).not.toBe(id2.npub)
  })

  it('different epochs produce different identities', () => {
    const epoch0 = deriveGroupIdentity(persona, 'family-2026', 0)
    const epoch1 = deriveGroupIdentity(persona, 'family-2026', 1)
    expect(epoch0.npub).not.toBe(epoch1.npub)
  })

  it('different personas produce different group identities', () => {
    const root = fromNsec(TEST_KEY_BYTES)
    const bitcoiner = derivePersona(root, 'bitcoiner')
    const fromPersonal = deriveGroupIdentity(persona, 'group-a', 0)
    const fromBitcoiner = deriveGroupIdentity(bitcoiner, 'group-a', 0)
    expect(fromPersonal.npub).not.toBe(fromBitcoiner.npub)
    root.destroy()
  })
})

// ── Task 2: Hashed group tag ──────────────────────────────────────────────────

describe('hashGroupTag', () => {
  it('returns a 64-character hex string', () => {
    const hash = hashGroupTag('my-group-id')
    expect(typeof hash).toBe('string')
    expect(hash.length).toBe(64)
    expect(/^[0-9a-f]{64}$/.test(hash)).toBe(true)
  })

  it('is deterministic — same groupId always produces the same hash', () => {
    const hash1 = hashGroupTag('my-group-id')
    const hash2 = hashGroupTag('my-group-id')
    expect(hash1).toBe(hash2)
  })

  it('different group IDs produce different hashes', () => {
    const hash1 = hashGroupTag('group-alpha')
    const hash2 = hashGroupTag('group-beta')
    expect(hash1).not.toBe(hash2)
  })
})

// ── Task 10: Integration — end-to-end sync round-trip with group key ──────────

describe('integration: encrypt sync message → decrypt → apply', () => {
  it('counter-advance round-trips through group key encryption', async () => {
    const seed = randomSeed()
    const key = deriveGroupKey(seed)

    const msg: SyncMessage = {
      type: 'counter-advance',
      counter: 100,
      usageOffset: 5,
      timestamp: Math.floor(Date.now() / 1000),
      protocolVersion: 2,
    }

    const encoded = encodeSyncMessage(msg)
    const encrypted = await encryptEnvelope(key, encoded)
    const decrypted = await decryptEnvelope(key, encrypted)
    const decoded = decodeSyncMessage(decrypted)

    expect(decoded).toEqual(msg)
  })

  it('state-snapshot round-trips through group key encryption', async () => {
    const seed = randomSeed()
    const key = deriveGroupKey(seed)

    const msg: SyncMessage = {
      type: 'state-snapshot',
      seed: 'a'.repeat(64),
      counter: 200,
      usageOffset: 3,
      members: ['a'.repeat(64), 'b'.repeat(64)],
      admins: ['a'.repeat(64)],
      epoch: 5,
      opId: 'snap-crypto-1',
      timestamp: Math.floor(Date.now() / 1000),
      protocolVersion: 2,
    }

    const encoded = encodeSyncMessage(msg)
    const encrypted = await encryptEnvelope(key, encoded)
    const decrypted = await decryptEnvelope(key, encrypted)
    const decoded = decodeSyncMessage(decrypted)

    expect(decoded).toEqual(msg)
  })

  it('two group members with same seed derive same key', () => {
    const seed = randomSeed()
    const key1 = deriveGroupKey(seed)
    const key2 = deriveGroupKey(seed)
    expect(key1).toEqual(key2)
  })

  it('after reseed, old key cannot decrypt new messages', async () => {
    const oldSeed = randomSeed()
    const newSeed = randomSeed()
    const oldKey = deriveGroupKey(oldSeed)
    const newKey = deriveGroupKey(newSeed)

    const encrypted = await encryptEnvelope(newKey, 'new secret')
    await expect(decryptEnvelope(oldKey, encrypted)).rejects.toThrow()
  })

  it('rejects short seed in deriveGroupKey (security audit)', () => {
    expect(() => deriveGroupKey('ab')).toThrow('seedHex must be a 64-character')
  })

  it('rejects uppercase seed in deriveGroupKey (security audit)', () => {
    expect(() => deriveGroupKey('A'.repeat(64))).toThrow('seedHex must be a 64-character')
  })

  it('rejects wrong-length AES key in encryptEnvelope (security audit)', async () => {
    const shortKey = new Uint8Array(16)
    await expect(encryptEnvelope(shortKey, 'test')).rejects.toThrow('AES-256-GCM requires a 32-byte key')
  })

  it('rejects wrong-length AES key in decryptEnvelope (security audit)', async () => {
    const shortKey = new Uint8Array(16)
    // Valid-looking base64 of 28+ bytes
    const fakeEncoded = btoa(String.fromCharCode(...new Uint8Array(32)))
    await expect(decryptEnvelope(shortKey, fakeEncoded)).rejects.toThrow('AES-256-GCM requires a 32-byte key')
  })

  it('member-join round-trips through group key encryption', async () => {
    const seed = randomSeed()
    const key = deriveGroupKey(seed)

    const msg: SyncMessage = {
      type: 'member-join',
      pubkey: 'f'.repeat(64),
      timestamp: Math.floor(Date.now() / 1000),
      epoch: 0,
      opId: 'test-join-crypto-1',
      protocolVersion: 2,
    }

    const encoded = encodeSyncMessage(msg)
    const encrypted = await encryptEnvelope(key, encoded)
    const decrypted = await decryptEnvelope(key, encrypted)
    const decoded = decodeSyncMessage(decrypted)

    expect(decoded).toEqual(msg)
  })

  it('duress-alert round-trips through group key encryption', async () => {
    const seed = randomSeed()
    const key = deriveGroupKey(seed)

    const msg: SyncMessage = {
      type: 'duress-alert',
      lat: 51.5074,
      lon: -0.1278,
      timestamp: Math.floor(Date.now() / 1000),
      opId: 'test-duress-1',
      protocolVersion: 2,
    }

    const encoded = encodeSyncMessage(msg)
    const encrypted = await encryptEnvelope(key, encoded)
    const decrypted = await decryptEnvelope(key, encrypted)
    const decoded = decodeSyncMessage(decrypted)

    expect(decoded).toEqual(msg)
  })
})
