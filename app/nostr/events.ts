// app/nostr/events.ts — Thin wrappers around SDK event builders; signs via NIP-07

import {
  buildGroupEvent,
  buildSeedDistributionEvent,
  buildWordUsedEvent,
  buildReseedEvent,
  buildMemberUpdateEvent,
  buildBeaconEvent,
} from 'canary-kit/nostr'
import { getPool } from './connect.js'

// Re-export builders so callers can import from one place.
export {
  buildGroupEvent,
  buildSeedDistributionEvent,
  buildWordUsedEvent,
  buildReseedEvent,
  buildMemberUpdateEvent,
  buildBeaconEvent,
}

// ── Signing ────────────────────────────────────────────────────

/**
 * Sign an unsigned event via the NIP-07 browser extension (window.nostr).
 * Throws if no signing method is available.
 */
export async function signEvent(event: any): Promise<any> {
  const nip07 = (window as any).nostr
  if (nip07?.signEvent) {
    return nip07.signEvent(event)
  }
  throw new Error('No signing method available. Install a NIP-07 extension (e.g. Alby, nos2x).')
}

/**
 * Sign and publish an unsigned event to the given relay URLs.
 * Silently returns if the relay pool is not connected.
 */
export async function publishEvent(event: any, relays: string[]): Promise<void> {
  const pool = getPool()
  if (!pool) return

  const signed = await signEvent(event)
  pool.publish(relays, signed)
}

// ── NIP-07 identity helpers ────────────────────────────────────

/** Return the pubkey from the NIP-07 extension, or null if unavailable. */
export async function getNip07Pubkey(): Promise<string | null> {
  try {
    const nip07 = (window as any).nostr
    if (nip07?.getPublicKey) {
      return await nip07.getPublicKey()
    }
  } catch {
    // Extension may be present but locked — treat as unavailable.
  }
  return null
}

/** True if a NIP-07 extension is present in the browser. */
export function hasNip07(): boolean {
  return typeof (window as any).nostr?.signEvent === 'function'
}
