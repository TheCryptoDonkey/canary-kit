// Transport-agnostic sync message protocol

import { bytesToHex, hexToBytes } from './crypto.js'

// ── Message types ─────────────────────────────────────────────

export type SyncMessage =
  | { type: 'member-join'; pubkey: string; timestamp: number }
  | { type: 'member-leave'; pubkey: string; timestamp: number }
  | { type: 'counter-advance'; counter: number; usageOffset: number; timestamp: number }
  | { type: 'reseed'; seed: Uint8Array; counter: number; timestamp: number }
  | { type: 'beacon'; lat: number; lon: number; accuracy: number; timestamp: number }
  | { type: 'duress-alert'; lat: number; lon: number; timestamp: number }

const VALID_TYPES = new Set<string>([
  'member-join', 'member-leave', 'counter-advance',
  'reseed', 'beacon', 'duress-alert',
])

// ── Serialisation ─────────────────────────────────────────────

export function encodeSyncMessage(msg: SyncMessage): string {
  if (msg.type === 'reseed') {
    return JSON.stringify({ ...msg, seed: bytesToHex(msg.seed) })
  }
  return JSON.stringify(msg)
}

export function decodeSyncMessage(payload: string): SyncMessage {
  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(payload)
  } catch {
    throw new Error('Invalid sync message: not valid JSON')
  }

  const type = parsed.type
  if (typeof type !== 'string' || !VALID_TYPES.has(type)) {
    throw new Error(`Invalid sync message type: ${String(type)}`)
  }

  if (type === 'reseed' && typeof parsed.seed === 'string') {
    return { ...parsed, seed: hexToBytes(parsed.seed as string) } as SyncMessage
  }

  return parsed as SyncMessage
}

// ── Transport interface ───────────────────────────────────────

export interface SyncTransport {
  send(groupId: string, message: SyncMessage, recipients: string[]): Promise<void>
  subscribe(groupId: string, onMessage: (msg: SyncMessage, sender: string) => void): () => void
  disconnect(): void
}

// ── Signer interface ──────────────────────────────────────────

export interface EventSigner {
  pubkey: string
  sign(event: unknown): Promise<unknown>
  encrypt(plaintext: string, recipientPubkey: string): Promise<string>
  decrypt(ciphertext: string, senderPubkey: string): Promise<string>
}
