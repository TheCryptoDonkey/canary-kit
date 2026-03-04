import { describe, it, expect } from 'vitest'
import {
  deriveGroupKey,
  encryptEnvelope,
  decryptEnvelope,
  deriveGroupSigningKey,
  hashGroupTag,
} from './sync-crypto.js'

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

describe('deriveGroupSigningKey', () => {
  const seedHex = 'a'.repeat(64)
  const otherSeedHex = 'b'.repeat(64)
  const privkeyHex = 'c'.repeat(64)
  const otherPrivkeyHex = 'd'.repeat(64)

  it('returns exactly 32 bytes', () => {
    const key = deriveGroupSigningKey(seedHex, privkeyHex)
    expect(key).toBeInstanceOf(Uint8Array)
    expect(key.length).toBe(32)
  })

  it('is deterministic — same inputs always produce the same key', () => {
    const key1 = deriveGroupSigningKey(seedHex, privkeyHex)
    const key2 = deriveGroupSigningKey(seedHex, privkeyHex)
    expect(Array.from(key1)).toEqual(Array.from(key2))
  })

  it('different seeds produce different keys', () => {
    const key1 = deriveGroupSigningKey(seedHex, privkeyHex)
    const key2 = deriveGroupSigningKey(otherSeedHex, privkeyHex)
    expect(Array.from(key1)).not.toEqual(Array.from(key2))
  })

  it('different private keys produce different keys', () => {
    const key1 = deriveGroupSigningKey(seedHex, privkeyHex)
    const key2 = deriveGroupSigningKey(seedHex, otherPrivkeyHex)
    expect(Array.from(key1)).not.toEqual(Array.from(key2))
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
