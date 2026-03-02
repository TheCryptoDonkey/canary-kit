import { describe, it, expect } from 'vitest'
import { getCounter, counterToBytes, DEFAULT_ROTATION_INTERVAL } from './counter.js'

describe('getCounter', () => {
  it('returns floor(timestamp / interval)', () => {
    expect(getCounter(1_209_600, 604800)).toBe(2)
  })

  it('returns 0 for timestamp 0', () => {
    expect(getCounter(0, 604800)).toBe(0)
  })

  it('same counter for timestamps within same window', () => {
    const interval = 86400
    const t1 = 86400 * 5 + 100
    const t2 = 86400 * 5 + 50000
    expect(getCounter(t1, interval)).toBe(getCounter(t2, interval))
  })

  it('different counter for timestamps in different windows', () => {
    const interval = 86400
    const t1 = 86400 * 5 + 100
    const t2 = 86400 * 6 + 100
    expect(getCounter(t1, interval)).not.toBe(getCounter(t2, interval))
  })

  it('uses default interval when not specified', () => {
    expect(getCounter(604800)).toBe(1)
    expect(DEFAULT_ROTATION_INTERVAL).toBe(604800)
  })
})

describe('counterToBytes', () => {
  it('returns 8-byte big-endian buffer', () => {
    const bytes = counterToBytes(0)
    expect(bytes).toBeInstanceOf(Uint8Array)
    expect(bytes.length).toBe(8)
    expect(Array.from(bytes)).toEqual([0, 0, 0, 0, 0, 0, 0, 0])
  })

  it('encodes counter 1 correctly', () => {
    const bytes = counterToBytes(1)
    expect(Array.from(bytes)).toEqual([0, 0, 0, 0, 0, 0, 0, 1])
  })

  it('encodes large counter correctly', () => {
    const bytes = counterToBytes(256)
    expect(Array.from(bytes)).toEqual([0, 0, 0, 0, 0, 0, 1, 0])
  })
})
