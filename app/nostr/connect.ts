// app/nostr/connect.ts — Lazy-loads nostr-tools from CDN and manages relay pool

const NOSTR_TOOLS_URL = 'https://esm.sh/nostr-tools@latest'

let _pool: any = null
let _connected = false
let _relayCount = 0

// ── CDN loader ─────────────────────────────────────────────────

/** Lazily import nostr-tools from CDN. Cached after first call. */
export async function loadNostrTools(): Promise<any> {
  return import(/* @vite-ignore */ NOSTR_TOOLS_URL)
}

// ── Pool management ────────────────────────────────────────────

/**
 * Connect to the given relay URLs using a SimplePool.
 * Idempotent: if already connected, closes the old pool first.
 */
export async function connectRelays(relayUrls: string[]): Promise<void> {
  if (_pool) {
    _pool.close?.()
    _pool = null
    _connected = false
    _relayCount = 0
  }

  if (relayUrls.length === 0) return

  const nostrTools = await loadNostrTools()
  _pool = new nostrTools.SimplePool()
  _connected = true
  _relayCount = relayUrls.length
}

/** Disconnect and destroy the relay pool. */
export async function disconnectRelays(): Promise<void> {
  _pool?.close?.()
  _pool = null
  _connected = false
  _relayCount = 0
}

// ── Accessors ──────────────────────────────────────────────────

export function getPool(): any { return _pool }
export function isConnected(): boolean { return _connected }
export function getRelayCount(): number { return _relayCount }
