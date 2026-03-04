// app/utils/encoding.ts — Shared encoding helpers for group panels

import type { TokenEncoding } from 'canary-kit/encoding'
import type { AppGroup } from '../types.js'

/** Context string for group-mode token derivation. Used by hero, verify, and duress panels. */
export const GROUP_CONTEXT = 'canary:group'

/** Map the app's simple encoding name to a TokenEncoding object. */
export function toTokenEncoding(group: AppGroup): TokenEncoding {
  switch (group.encodingFormat) {
    case 'pin': return { format: 'pin', digits: 6 }
    case 'hex': return { format: 'hex', length: 8 }
    case 'words':
    default: return { format: 'words', count: group.wordCount }
  }
}

/**
 * Format a token for display with dashes for readability.
 * PIN: "123456" → "123-456"
 * Hex: "a618123f" → "a618-123f"
 * Words: returned unchanged.
 */
export function formatForDisplay(token: string, format: AppGroup['encodingFormat']): string {
  if (format === 'pin' && token.length === 6) {
    return `${token.slice(0, 3)}-${token.slice(3)}`
  }
  if (format === 'hex' && token.length === 8) {
    return `${token.slice(0, 4)}-${token.slice(4)}`
  }
  return token
}
