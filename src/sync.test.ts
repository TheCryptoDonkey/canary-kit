import { describe, it, expect } from 'vitest'
import {
  encodeSyncMessage,
  decodeSyncMessage,
  type SyncMessage,
} from './sync.js'

describe('sync message serialisation', () => {
  it('round-trips a member-join message', () => {
    const msg: SyncMessage = { type: 'member-join', pubkey: 'abc123', timestamp: 1700000000 }
    const encoded = encodeSyncMessage(msg)
    expect(typeof encoded).toBe('string')
    const decoded = decodeSyncMessage(encoded)
    expect(decoded).toEqual(msg)
  })

  it('round-trips a member-leave message', () => {
    const msg: SyncMessage = { type: 'member-leave', pubkey: 'abc123', timestamp: 1700000000 }
    expect(decodeSyncMessage(encodeSyncMessage(msg))).toEqual(msg)
  })

  it('round-trips a counter-advance message', () => {
    const msg: SyncMessage = { type: 'counter-advance', counter: 42, usageOffset: 3, timestamp: 1700000000 }
    expect(decodeSyncMessage(encodeSyncMessage(msg))).toEqual(msg)
  })

  it('round-trips a reseed message with binary seed', () => {
    const seed = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
    const msg: SyncMessage = { type: 'reseed', seed, counter: 0, timestamp: 1700000000 }
    const decoded = decodeSyncMessage(encodeSyncMessage(msg))
    expect(decoded.type).toBe('reseed')
    if (decoded.type === 'reseed') {
      expect(decoded.seed).toBeInstanceOf(Uint8Array)
      expect(Array.from(decoded.seed)).toEqual(Array.from(seed))
      expect(decoded.counter).toBe(0)
    }
  })

  it('round-trips a beacon message', () => {
    const msg: SyncMessage = { type: 'beacon', lat: 51.5074, lon: -0.1278, accuracy: 10, timestamp: 1700000000 }
    expect(decodeSyncMessage(encodeSyncMessage(msg))).toEqual(msg)
  })

  it('round-trips a duress-alert message', () => {
    const msg: SyncMessage = { type: 'duress-alert', lat: 51.5074, lon: -0.1278, timestamp: 1700000000 }
    expect(decodeSyncMessage(encodeSyncMessage(msg))).toEqual(msg)
  })

  it('throws on invalid JSON', () => {
    expect(() => decodeSyncMessage('not json')).toThrow()
  })

  it('throws on unknown message type', () => {
    expect(() => decodeSyncMessage(JSON.stringify({ type: 'unknown', timestamp: 0 }))).toThrow()
  })
})
