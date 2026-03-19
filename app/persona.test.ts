// app/persona.test.ts — Persona module tests (TDD)

import { describe, it, expect, afterEach } from 'vitest'
import { generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import { bytesToHex } from 'nostr-tools/utils'
import type { AppIdentity } from './types.js'
import {
  initPersonas,
  isPersonasInitialised,
  getPersona,
  getGroupIdentity,
  derivePathIdentity,
  createChildPersona,
  createPersona,
  rotatePersona,
  destroyPersonas,
} from './persona.js'
import { getState, update } from './state.js'

/** Create a local identity from a fresh keypair. */
function localIdentity(): AppIdentity {
  const sk = generateSecretKey()
  return {
    pubkey: getPublicKey(sk),
    privkey: bytesToHex(sk),
    signerType: 'local',
  }
}

/** Create a local identity from a fixed seed for determinism tests. */
function fixedIdentity(): AppIdentity {
  // A well-known 32-byte hex key (all 0x01 bytes)
  const privkey = '0101010101010101010101010101010101010101010101010101010101010101'
  const sk = new Uint8Array(32).fill(1)
  return {
    pubkey: getPublicKey(sk),
    privkey,
    signerType: 'local',
  }
}

describe('persona module', () => {
  afterEach(() => {
    // Clean up after each test
    if (isPersonasInitialised()) destroyPersonas()
    // Reset state personas
    update({ personas: {} })
  })

  describe('initPersonas', () => {
    it('returns empty when no custom names provided (user creates their own)', () => {
      const identity = localIdentity()
      const personas = initPersonas(identity)
      expect(Object.keys(personas)).toHaveLength(0)
      expect(isPersonasInitialised()).toBe(true)
    })

    it('derives personas for provided custom names, keyed by id', () => {
      const identity = localIdentity()
      const personas = initPersonas(identity, ['personal', 'bitcoiner'])

      const entries = Object.values(personas)
      expect(entries).toHaveLength(2)

      const names = entries.map(p => p.name).sort()
      expect(names).toEqual(['bitcoiner', 'personal'])

      for (const p of entries) {
        expect(p.id).toMatch(/^[a-z0-9]{8}$/)
        expect(p.index).toBe(0)
        expect(p.npub).toMatch(/^npub1[a-z0-9]+$/)
        expect(p.children).toEqual({})
      }
    })

    it('is deterministic — same privkey produces same npubs', () => {
      const identity = fixedIdentity()
      const names = ['personal', 'bitcoiner']

      const first = initPersonas(identity, names)
      destroyPersonas()
      const second = initPersonas(identity, names)

      const firstNpubs = Object.values(first).map(p => p.npub).sort()
      const secondNpubs = Object.values(second).map(p => p.npub).sort()
      expect(firstNpubs).toEqual(secondNpubs)
    })

    it('returns empty for NIP-07 identity (no privkey)', () => {
      const identity: AppIdentity = {
        pubkey: 'aabbccdd'.repeat(8),
        signerType: 'nip07',
      }
      const personas = initPersonas(identity)
      expect(Object.keys(personas)).toHaveLength(0)
    })

    it('includes custom personas when customNames provided', () => {
      const identity = localIdentity()
      const personas = initPersonas(identity, ['burner', 'alias'])
      const entries = Object.values(personas)

      const burner = entries.find(p => p.name === 'burner')
      expect(burner).toBeDefined()
      expect(burner!.npub).toMatch(/^npub1/)

      const alias = entries.find(p => p.name === 'alias')
      expect(alias).toBeDefined()
      expect(alias!.npub).toMatch(/^npub1/)
    })
  })

  describe('getGroupIdentity', () => {
    it('returns Identity with npub and privateKey', () => {
      const identity = localIdentity()
      const personas = initPersonas(identity, ['personal', 'bitcoiner', 'work'])
      update({ personas })

      const personalId = Object.values(personas).find(p => p.name === 'personal')!.id
      const groupIdentity = getGroupIdentity(personalId, 'group-abc', 0)
      expect(groupIdentity.npub).toMatch(/^npub1/)
      expect(groupIdentity.privateKey).toBeInstanceOf(Uint8Array)
      expect(groupIdentity.privateKey.length).toBe(32)
    })

    it('different groups produce different identities', () => {
      const identity = localIdentity()
      const personas = initPersonas(identity, ['personal', 'bitcoiner', 'work'])
      update({ personas })

      const personalId = Object.values(personas).find(p => p.name === 'personal')!.id
      const id1 = getGroupIdentity(personalId, 'group-a', 0)
      const id2 = getGroupIdentity(personalId, 'group-b', 0)
      expect(id1.npub).not.toBe(id2.npub)
    })

    it('different personas produce different identities for the same group', () => {
      const identity = localIdentity()
      const personas = initPersonas(identity, ['personal', 'bitcoiner', 'work'])
      update({ personas })

      const personalId = Object.values(personas).find(p => p.name === 'personal')!.id
      const workId = Object.values(personas).find(p => p.name === 'work')!.id
      const id1 = getGroupIdentity(personalId, 'group-x', 0)
      const id2 = getGroupIdentity(workId, 'group-x', 0)
      expect(id1.npub).not.toBe(id2.npub)
    })
  })

  describe('derivePathIdentity', () => {
    it('recreates the same identity for the same path', () => {
      const identity = fixedIdentity()
      initPersonas(identity, ['personal'])

      const first = derivePathIdentity(['personal', 'workshop', 'demo'])
      const second = derivePathIdentity(['personal', 'workshop', 'demo'])

      expect(first.npub).toBe(second.npub)
      expect(first.nsec).toBe(second.nsec)
    })

    it('produces different identities for different paths', () => {
      const identity = fixedIdentity()
      initPersonas(identity, ['personal'])

      const first = derivePathIdentity(['personal', 'workshop', 'demo'])
      const second = derivePathIdentity(['personal', 'workshop', 'ops'])

      expect(first.npub).not.toBe(second.npub)
    })

    it('rejects invalid segments', () => {
      const identity = fixedIdentity()
      initPersonas(identity, ['personal'])

      expect(() => derivePathIdentity(['Personal'])).toThrow('Derivation segments must be lowercase')
      expect(() => derivePathIdentity(['two words'])).toThrow('Derivation segments must not contain spaces')
      expect(() => derivePathIdentity([])).toThrow('At least one derivation segment is required')
    })

    it('supports explicit indices per level', () => {
      const identity = fixedIdentity()
      initPersonas(identity, ['personal'])

      const first = derivePathIdentity([
        { name: 'personal', index: 1 },
        { name: 'workshop', index: 2 },
        { name: 'demo', index: 3 },
      ])
      const second = derivePathIdentity([
        { name: 'personal', index: 1 },
        { name: 'workshop', index: 2 },
        { name: 'demo', index: 3 },
      ])
      const different = derivePathIdentity([
        { name: 'personal', index: 1 },
        { name: 'workshop', index: 2 },
        { name: 'demo', index: 4 },
      ])

      expect(first.npub).toBe(second.npub)
      expect(first.npub).not.toBe(different.npub)
    })

    it('rejects invalid indices', () => {
      const identity = fixedIdentity()
      initPersonas(identity, ['personal'])

      expect(() => derivePathIdentity([{ name: 'personal', index: -1 }])).toThrow('Derivation indices must be non-negative integers')
      expect(() => derivePathIdentity([{ name: 'personal', index: 1.5 }])).toThrow('Derivation indices must be non-negative integers')
    })
  })

  describe('createPersona', () => {
    it('creates a custom persona at index 0 with id and children', () => {
      const identity = localIdentity()
      const personas = initPersonas(identity, ['personal'])
      update({ personas })

      const persona = createPersona('stealth')
      expect(persona.name).toBe('stealth')
      expect(persona.index).toBe(0)
      expect(persona.npub).toMatch(/^npub1/)
      expect(persona.id).toMatch(/^[a-z0-9]{8}$/)
      expect(persona.children).toEqual({})
    })

    it('creates an anonymous account node when requested', () => {
      const identity = localIdentity()
      const personas = initPersonas(identity, ['personal'])
      update({ personas })

      const account = createPersona('burner', 'account')
      expect(account.nodeType).toBe('account')
      expect(account.npub).toMatch(/^npub1/)
    })
  })

  describe('createChildPersona', () => {
    it('creates child account nodes beneath a persona', () => {
      const identity = localIdentity()
      const personas = initPersonas(identity, ['personal'])
      update({ personas })

      const parent = Object.values(personas).find(p => p.name === 'personal')!
      const account = createChildPersona(parent.id, 'forum-burner', 'account')
      expect(account.nodeType).toBe('account')
      expect(account.npub).toMatch(/^npub1/)
    })
  })

  describe('rotatePersona', () => {
    it('increments index and produces a new npub', () => {
      const identity = localIdentity()
      const personas = initPersonas(identity, ['personal'])
      update({ personas })

      const original = Object.values(personas).find(p => p.name === 'personal')!
      const rotated = rotatePersona(original.id, original.index)

      expect(rotated.index).toBe(original.index + 1)
      expect(rotated.npub).toMatch(/^npub1/)
      expect(rotated.npub).not.toBe(original.npub)
    })
  })

  describe('destroyPersonas', () => {
    it('cleans up TreeRoot', () => {
      const identity = localIdentity()
      initPersonas(identity, ['personal', 'bitcoiner', 'work'])
      expect(isPersonasInitialised()).toBe(true)

      destroyPersonas()
      expect(isPersonasInitialised()).toBe(false)
    })
  })

  describe('isPersonasInitialised', () => {
    it('true after init, false after destroy', () => {
      expect(isPersonasInitialised()).toBe(false)

      const identity = localIdentity()
      initPersonas(identity, ['personal', 'bitcoiner', 'work'])
      expect(isPersonasInitialised()).toBe(true)

      destroyPersonas()
      expect(isPersonasInitialised()).toBe(false)
    })
  })
})
