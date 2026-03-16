/**
 * Group-level word derivation — thin wrappers around the universal token API.
 *
 * All derivation uses token.ts (CANARY-DERIVE) with context 'canary:group'.
 * This module provides convenience functions for group word/phrase operations.
 */

import { deriveToken, deriveDuressToken } from './token.js'
import type { TokenEncoding } from './encoding.js'

/** Context string used for group-level word derivation. */
export const GROUP_CONTEXT = 'canary:group'

/** Default tolerance for group verification (matches ±1 counter window). */
const DEFAULT_GROUP_TOLERANCE = 1

function wordEncoding(wordCount: 1 | 2 | 3): TokenEncoding {
  return { format: 'words', count: wordCount }
}

/**
 * Derive the verification word for a given seed and counter.
 * All group members derive the same word.
 *
 * @param seedHex - Group seed as a hex string (minimum 32 hex characters / 16 bytes).
 * @param counter - Current time-based or usage counter.
 * @returns A single lowercase word from the en-v1 wordlist.
 */
export function deriveVerificationWord(seedHex: string, counter: number): string {
  return deriveToken(seedHex, GROUP_CONTEXT, counter)
}

/**
 * Derive a multi-word verification phrase.
 * Each word is derived from a consecutive 2-byte slice of the HMAC-SHA256 digest.
 *
 * @param seedHex - Group seed as a hex string (minimum 32 hex characters / 16 bytes).
 * @param counter - Current time-based or usage counter.
 * @param wordCount - Number of words to produce (1, 2, or 3).
 * @returns Array of lowercase words from the en-v1 wordlist.
 */
export function deriveVerificationPhrase(
  seedHex: string,
  counter: number,
  wordCount: 1 | 2 | 3,
): string[] {
  if (wordCount === 1) return [deriveVerificationWord(seedHex, counter)]
  return deriveToken(seedHex, GROUP_CONTEXT, counter, wordEncoding(wordCount)).split(' ')
}

/**
 * Derive a member's duress word for a given seed, pubkey, and counter.
 * Unique per member, derivable by all group members who know the seed.
 * Collision avoidance ensures the duress word never matches any verification
 * word within the ±(2 × maxTolerance) window.
 *
 * @param seedHex - Group seed as a hex string (minimum 32 hex characters / 16 bytes).
 * @param memberPubkeyHex - 64-character hex pubkey of the member.
 * @param counter - Current time-based or usage counter.
 * @param maxTolerance - Counter tolerance used by verifiers (default: 1).
 * @param identities - All group member pubkeys for cross-member collision avoidance.
 * @returns A single lowercase duress word distinct from all verification words in the window.
 * @throws {Error} If collision avoidance fails after 255 retries.
 */
export function deriveDuressWord(
  seedHex: string,
  memberPubkeyHex: string,
  counter: number,
  maxTolerance: number = DEFAULT_GROUP_TOLERANCE,
  identities?: string[],
): string {
  return deriveDuressToken(seedHex, GROUP_CONTEXT, memberPubkeyHex, counter, undefined, maxTolerance, identities)
}

/**
 * Derive a multi-word duress phrase for a given member.
 * Collision avoidance ensures the phrase never matches any verification
 * phrase within the ±(2 × maxTolerance) window.
 *
 * @param seedHex - Group seed as a hex string (minimum 32 hex characters / 16 bytes).
 * @param memberPubkeyHex - 64-character hex pubkey of the member.
 * @param counter - Current time-based or usage counter.
 * @param wordCount - Number of words to produce (1, 2, or 3).
 * @param maxTolerance - Counter tolerance used by verifiers (default: 1).
 * @param identities - All group member pubkeys for cross-member collision avoidance.
 * @returns Array of lowercase duress words distinct from all verification phrases in the window.
 * @throws {Error} If collision avoidance fails after 255 retries.
 */
export function deriveDuressPhrase(
  seedHex: string,
  memberPubkeyHex: string,
  counter: number,
  wordCount: 1 | 2 | 3,
  maxTolerance: number = DEFAULT_GROUP_TOLERANCE,
  identities?: string[],
): string[] {
  if (wordCount === 1) return [deriveDuressWord(seedHex, memberPubkeyHex, counter, maxTolerance, identities)]
  return deriveDuressToken(seedHex, GROUP_CONTEXT, memberPubkeyHex, counter, wordEncoding(wordCount), maxTolerance, identities).split(' ')
}

/**
 * Derive the current verification word for a group.
 *
 * @param group - Object with `seed` (hex string) and `counter` (current counter value).
 * @returns A single lowercase verification word from the en-v1 wordlist.
 */
export function deriveCurrentWord(group: { seed: string; counter: number }): string {
  return deriveVerificationWord(group.seed, group.counter)
}
