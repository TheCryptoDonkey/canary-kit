import { describe, it, expect } from 'vitest'
import { deriveBeaconKey, encryptBeacon, decryptBeacon } from './beacon.js'
import { bytesToHex } from './crypto.js'

const SEED_1 = '0000000000000000000000000000000000000000000000000000000000000001'
const SEED_2 = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

describe('deriveBeaconKey', () => {
  it('returns a 32-byte Uint8Array', () => {
    const key = deriveBeaconKey(SEED_1)
    expect(key).toBeInstanceOf(Uint8Array)
    expect(key.length).toBe(32)
  })

  it('is deterministic — same seed produces same key', () => {
    const a = deriveBeaconKey(SEED_1)
    const b = deriveBeaconKey(SEED_1)
    expect(bytesToHex(a)).toBe(bytesToHex(b))
  })

  it('different seeds produce different keys', () => {
    const a = deriveBeaconKey(SEED_1)
    const b = deriveBeaconKey(SEED_2)
    expect(bytesToHex(a)).not.toBe(bytesToHex(b))
  })
})

describe('encryptBeacon / decryptBeacon', () => {
  it('round-trips a beacon payload', async () => {
    const key = deriveBeaconKey(SEED_1)
    const encrypted = await encryptBeacon(key, 'gcpuuz', 6)
    expect(typeof encrypted).toBe('string')
    expect(encrypted.length).toBeGreaterThan(0)

    const payload = await decryptBeacon(key, encrypted)
    expect(payload.geohash).toBe('gcpuuz')
    expect(payload.precision).toBe(6)
    expect(payload.timestamp).toBeGreaterThan(0)
  })

  it('different encryptions of the same data produce different ciphertext (random IV)', async () => {
    const key = deriveBeaconKey(SEED_1)
    const a = await encryptBeacon(key, 'gcpuuz', 6)
    const b = await encryptBeacon(key, 'gcpuuz', 6)
    expect(a).not.toBe(b)
  })

  it('wrong key fails to decrypt', async () => {
    const key1 = deriveBeaconKey(SEED_1)
    const key2 = deriveBeaconKey(SEED_2)
    const encrypted = await encryptBeacon(key1, 'gcpuuz', 6)
    await expect(decryptBeacon(key2, encrypted)).rejects.toThrow()
  })

  it('handles max precision geohash', async () => {
    const key = deriveBeaconKey(SEED_1)
    const encrypted = await encryptBeacon(key, 'gcpuuzwjzpb', 11)
    const payload = await decryptBeacon(key, encrypted)
    expect(payload.geohash).toBe('gcpuuzwjzpb')
    expect(payload.precision).toBe(11)
  })
})
