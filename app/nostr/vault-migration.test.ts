// app/nostr/vault-migration.test.ts — Tests for vault v1 → v2 migration
import { describe, it, expect } from 'vitest'
import { serialiseVault, deserialiseVault } from './vault.js'
import type { AppGroup } from '../types.js'
import type { AppPersona } from '../types.js'

// ── Helpers ─────────────────────────────────────────────────────

function makeGroup(overrides: Partial<AppGroup> = {}): AppGroup {
  return {
    id: 'test-group-1',
    name: 'Test Group',
    seed: 'a'.repeat(64),
    members: ['1'.repeat(64)],
    admins: ['1'.repeat(64)],
    counter: 10,
    usageOffset: 0,
    epoch: 1,
    nostrEnabled: true,
    relays: [],
    readRelays: ['wss://relay.trotters.cc'],
    writeRelays: ['wss://relay.trotters.cc'],
    encodingFormat: 'words',
    tolerance: 1,
    livenessInterval: 3600,
    livenessCheckins: {},
    beaconPrecision: 5,
    usedInvites: [],
    latestInviteIssuedAt: 0,
    personaName: 'ops',
    ...overrides,
  } as AppGroup
}

const testPersona: AppPersona = {
  name: 'ops',
  index: 1,
  npub: 'npub1' + 'a'.repeat(58),
  displayName: 'Ops Identity',
}

// ── v2 Migration Tests ──────────────────────────────────────────

describe('vault v2 migration', () => {
  it('serialises with version 2 and personas array', () => {
    const groups = { g1: makeGroup() }
    const json = serialiseVault(groups, [testPersona])
    const parsed = JSON.parse(json)

    expect(parsed.version).toBe(2)
    expect(parsed.personas).toHaveLength(1)
    expect(parsed.personas[0].name).toBe('ops')
    expect(parsed.personas[0].index).toBe(1)
    expect(parsed.groups.g1.personaName).toBe('ops')
  })

  it('deserialises v1 vault — defaults personaName to personal', () => {
    // Simulate a v1 vault payload (version: 1, no personas, no personaName on groups)
    const v1Json = JSON.stringify({
      version: 1,
      groups: {
        g1: {
          id: 'g1',
          name: 'Old Group',
          seed: 'b'.repeat(64),
          members: ['1'.repeat(64)],
          admins: ['1'.repeat(64)],
          counter: 5,
          epoch: 1,
          nostrEnabled: true,
          relays: [],
          readRelays: [],
          writeRelays: [],
          encodingFormat: 'words',
          tolerance: 1,
          livenessInterval: 3600,
          livenessCheckins: {},
          beaconPrecision: 5,
          usedInvites: [],
          latestInviteIssuedAt: 0,
          // No personaName — v1 vaults lack this field
        },
      },
    })

    const result = deserialiseVault(v1Json)

    expect(result.groups.g1.personaName).toBe('personal')
    expect(result.personas).toEqual([])
    expect(result.groups.g1.name).toBe('Old Group')
  })

  it('deserialises v2 vault — preserves personaName and personas', () => {
    const groups = { g1: makeGroup({ personaName: 'field-ops' }) }
    const personas: AppPersona[] = [
      { name: 'field-ops', index: 2, npub: 'npub1' + 'b'.repeat(58) },
      { name: 'personal', index: 0, npub: 'npub1' + 'c'.repeat(58) },
    ]
    const json = serialiseVault(groups, personas)
    const result = deserialiseVault(json)

    expect(result.groups.g1.personaName).toBe('field-ops')
    expect(result.personas).toHaveLength(2)
    expect(result.personas[0].name).toBe('field-ops')
    expect(result.personas[1].name).toBe('personal')
  })

  it('handles malformed JSON gracefully', () => {
    const result = deserialiseVault('{broken json!!!')

    expect(result.groups).toEqual({})
    expect(result.personas).toEqual([])
  })

  it('serialises with empty personas when none provided', () => {
    const groups = { g1: makeGroup() }
    const json = serialiseVault(groups)
    const parsed = JSON.parse(json)

    expect(parsed.version).toBe(2)
    expect(parsed.personas).toEqual([])
  })

  it('handles v2 vault with missing personas array', () => {
    // Edge case: version 2 but personas field is missing
    const json = JSON.stringify({
      version: 2,
      groups: { g1: { id: 'g1', name: 'Edge', personaName: 'test' } },
    })
    const result = deserialiseVault(json)

    expect(result.groups.g1.personaName).toBe('test')
    expect(result.personas).toEqual([])
  })

  it('handles unversioned vault as v1', () => {
    // Very old vault with no version field at all
    const json = JSON.stringify({
      groups: {
        g1: { id: 'g1', name: 'Ancient Group' },
      },
    })
    const result = deserialiseVault(json)

    expect(result.groups.g1.personaName).toBe('personal')
    expect(result.personas).toEqual([])
  })
})
