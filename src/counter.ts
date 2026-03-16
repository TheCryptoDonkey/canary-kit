import { sha256 } from './crypto.js'

/** Default rotation interval: 7 days in seconds. */
export const DEFAULT_ROTATION_INTERVAL = 604_800

/**
 * Maximum allowed usage offset above the current time-based counter.
 * Implementations MUST reject counter updates where effective counter > time-based counter + MAX_COUNTER_OFFSET.
 * See CANARY spec §Counter Acceptance.
 */
export const MAX_COUNTER_OFFSET = 100

/**
 * Derive the current counter from a unix timestamp and rotation interval.
 * Counter = floor(timestamp / interval).
 *
 * @param timestampSec - Unix timestamp in seconds (non-negative finite number).
 * @param rotationIntervalSec - Rotation interval in seconds (positive finite number, default: 604800 = 7 days).
 * @returns Integer counter value within uint32 range.
 * @throws {RangeError} If timestampSec is negative/non-finite, rotationIntervalSec is non-positive/non-finite, or counter exceeds uint32.
 */
export function getCounter(
  timestampSec: number,
  rotationIntervalSec: number = DEFAULT_ROTATION_INTERVAL,
): number {
  if (!Number.isFinite(timestampSec) || timestampSec < 0) {
    throw new RangeError(`timestampSec must be a non-negative finite number, got ${timestampSec}`)
  }
  if (!Number.isFinite(rotationIntervalSec) || rotationIntervalSec <= 0) {
    throw new RangeError(`rotationIntervalSec must be a positive finite number, got ${rotationIntervalSec}`)
  }
  const result = Math.floor(timestampSec / rotationIntervalSec)
  if (result > 0xFFFFFFFF) {
    throw new RangeError(`Counter exceeds uint32 range (${result}). Use a larger rotation interval.`)
  }
  return result
}

/**
 * Derive a counter from an event identifier (e.g. a task ID or Nostr event ID).
 * Uses SHA-256 truncated to 32 bits for a deterministic, uniformly distributed counter.
 * Per CANARY spec §Counter Schemes: event-based counters are deterministic from event ID.
 *
 * @param eventId - String identifier to derive the counter from (e.g. a Nostr event ID).
 * @returns Unsigned 32-bit integer derived from SHA-256 of the event ID.
 */
export function counterFromEventId(eventId: string): number {
  const hash = sha256(new TextEncoder().encode(eventId))
  // Read first 4 bytes as unsigned 32-bit big-endian integer
  return (hash[0] << 24 | hash[1] << 16 | hash[2] << 8 | hash[3]) >>> 0
}

/**
 * Serialise a counter to an 8-byte big-endian Uint8Array.
 * Same encoding as TOTP (RFC 6238).
 *
 * @param counter - Non-negative safe integer to serialise.
 * @returns 8-byte big-endian Uint8Array representation of the counter.
 * @throws {RangeError} If counter is negative, not an integer, or exceeds Number.MAX_SAFE_INTEGER.
 */
export function counterToBytes(counter: number): Uint8Array {
  if (!Number.isInteger(counter) || counter < 0 || counter > Number.MAX_SAFE_INTEGER) {
    throw new RangeError(`Counter must be a non-negative safe integer, got ${counter}`)
  }
  const buf = new Uint8Array(8)
  const view = new DataView(buf.buffer)
  view.setBigUint64(0, BigInt(counter), false) // false = big-endian
  return buf
}
