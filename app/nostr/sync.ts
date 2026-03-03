// app/nostr/sync.ts — Subscribe to group events for counter and seed sync

import { getPool } from './connect.js'
import { getState } from '../state.js'
import { KINDS } from 'canary-kit/nostr'

// ── Subscription handles ───────────────────────────────────────

/** Active subscription handles keyed by groupId. */
const _subs: Record<string, any[]> = {}

// ── Group event subscriptions ──────────────────────────────────

/**
 * Subscribe to word-used (kind 28802) and seed-distribution (kind 28800)
 * events for the given group.
 *
 * Counter sync and NIP-44 decryption are stubs — full implementation
 * requires the nostr-tools NIP-44 helpers loaded from CDN.
 */
export function subscribeToGroupEvents(groupId: string, relays: string[]): void {
  const pool = getPool()
  if (!pool) return

  const { groups, identity } = getState()
  const group = groups[groupId]
  if (!group || !identity) return

  // Clean up any existing subscriptions for this group first.
  unsubscribeFromGroup(groupId)

  const subs: any[] = []

  // ── Word-used counter sync ─────────────────────────────────
  // Subscribe to ephemeral counter events from group members.
  const counterSub = pool.subscribeMany(
    relays,
    [{ kinds: [KINDS.wordUsed], '#e': [groupId] }],
    {
      onevent(_event: any) {
        // TODO: decrypt NIP-44 content using group seed
        // TODO: validate sender is an authorised member
        // TODO: validate counter is monotonic and within the allowed jump window
        // TODO: call updateGroup(groupId, { counter: newCounter })
        console.debug('[canary:sync] word-used event received (processing not yet implemented)')
      },
    },
  )
  subs.push(counterSub)

  // ── Seed distribution / invite delivery ───────────────────
  // Subscribe to incoming seed distribution events addressed to this identity.
  const seedSub = pool.subscribeMany(
    relays,
    [{ kinds: [KINDS.seedDistribution], '#p': [identity.pubkey] }],
    {
      onevent(_event: any) {
        // TODO: decrypt NIP-44 payload using identity privkey
        // TODO: extract seed + group config from decrypted content
        // TODO: show accept/reject modal to the user
        console.debug('[canary:sync] seed-distribution event received (processing not yet implemented)')
      },
    },
  )
  subs.push(seedSub)

  _subs[groupId] = subs
}

/** Cancel all subscriptions for the given group. */
export function unsubscribeFromGroup(groupId: string): void {
  const subs = _subs[groupId]
  if (!subs) return
  for (const sub of subs) {
    try {
      sub?.close?.()
    } catch {
      // Ignore errors during teardown.
    }
  }
  delete _subs[groupId]
}

/** Cancel all active subscriptions across all groups. */
export function unsubscribeAll(): void {
  for (const groupId of Object.keys(_subs)) {
    unsubscribeFromGroup(groupId)
  }
}
