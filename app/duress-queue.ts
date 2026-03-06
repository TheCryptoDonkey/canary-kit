// app/duress-queue.ts — Persist queued duress alerts in localStorage for offline→online relay

import type { SyncMessage } from 'canary-kit/sync'

const STORAGE_KEY = 'canary:duress-queue'

interface QueueEntry {
  groupId: string
  message: SyncMessage
}

function readQueue(): QueueEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeQueue(entries: QueueEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch { /* quota exceeded */ }
}

export function queueDuressAlert(groupId: string, message: SyncMessage): void {
  const entries = readQueue()
  entries.push({ groupId, message })
  writeQueue(entries)
}

export function drainDuressQueue(groupId: string): SyncMessage[] {
  const entries = readQueue()
  const matching = entries.filter(e => e.groupId === groupId)
  const remaining = entries.filter(e => e.groupId !== groupId)
  writeQueue(remaining)
  return matching.map(e => e.message)
}

export function clearDuressQueue(): void {
  localStorage.removeItem(STORAGE_KEY)
}
