// app/mnemonic.ts — BIP-39 mnemonic generation + BIP-32 Nostr keypair derivation
//
// App-only utility. The canary-kit library stays zero-dep.

import { generateMnemonic as generate, mnemonicToSeedSync, validateMnemonic as validate } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english.js'
import { HDKey } from '@scure/bip32'
import { getPublicKey } from 'nostr-tools'

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

/** NIP-06 derivation path for Nostr keys. */
const NOSTR_PATH = "m/44'/1237'/0'/0/0"

/** Generate a 12-word BIP-39 mnemonic (128-bit entropy). */
export function generateMnemonic(): string {
  return generate(wordlist, 128)
}

/** Validate a BIP-39 mnemonic (checksum + wordlist). */
export function validateMnemonic(mnemonic: string): boolean {
  return validate(mnemonic, wordlist)
}

/** Derive a Nostr keypair from a BIP-39 mnemonic via NIP-06 BIP-32 path. */
export function mnemonicToKeypair(mnemonic: string): { pubkey: string; privkey: string } {
  const seed = mnemonicToSeedSync(mnemonic)
  const root = HDKey.fromMasterSeed(seed)
  const child = root.derive(NOSTR_PATH)
  if (!child.privateKey) throw new Error('Failed to derive private key')
  const privkey = bytesToHex(child.privateKey)
  const pubkey = getPublicKey(child.privateKey)
  return { pubkey, privkey }
}
