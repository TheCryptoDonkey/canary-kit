import { describe, it, expect } from 'vitest'
import { generateMnemonic, mnemonicToKeypair, validateMnemonic } from './mnemonic.js'

describe('mnemonic', () => {
  it('generates a 12-word mnemonic', () => {
    const mnemonic = generateMnemonic()
    const words = mnemonic.split(' ')
    expect(words).toHaveLength(12)
  })

  it('derives deterministic keypair from mnemonic', () => {
    const mnemonic = generateMnemonic()
    const kp1 = mnemonicToKeypair(mnemonic)
    const kp2 = mnemonicToKeypair(mnemonic)
    expect(kp1.pubkey).toBe(kp2.pubkey)
    expect(kp1.privkey).toBe(kp2.privkey)
  })

  it('derives different keypairs from different mnemonics', () => {
    const kp1 = mnemonicToKeypair(generateMnemonic())
    const kp2 = mnemonicToKeypair(generateMnemonic())
    expect(kp1.pubkey).not.toBe(kp2.pubkey)
  })

  it('produces valid 32-byte hex keys', () => {
    const kp = mnemonicToKeypair(generateMnemonic())
    expect(kp.privkey).toMatch(/^[0-9a-f]{64}$/)
    expect(kp.pubkey).toMatch(/^[0-9a-f]{64}$/)
  })

  it('validates correct mnemonic', () => {
    const mnemonic = generateMnemonic()
    expect(validateMnemonic(mnemonic)).toBe(true)
  })

  it('rejects invalid mnemonic', () => {
    expect(validateMnemonic('foo bar baz qux one two three four five six seven eight')).toBe(false)
  })

  it('uses NIP-06 derivation path m/44\'/1237\'/0\'/0/0', () => {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const kp = mnemonicToKeypair(mnemonic)
    expect(kp.privkey).toMatch(/^[0-9a-f]{64}$/)
    expect(kp.pubkey).toMatch(/^[0-9a-f]{64}$/)
    const kp2 = mnemonicToKeypair(mnemonic)
    expect(kp2.privkey).toBe(kp.privkey)
    expect(kp2.pubkey).toBe(kp.pubkey)
  })
})
