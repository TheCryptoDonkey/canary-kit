import { describe, it, expect } from 'vitest'
import { restoreFromMnemonic, recoverFromMnemonic, validateMnemonic } from './mnemonic.js'
import { generateMnemonic } from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english.js'

describe('mnemonic', () => {
  it('generates a 12-word mnemonic', () => {
    const mnemonic = generateMnemonic(wordlist)
    const words = mnemonic.split(' ')
    expect(words).toHaveLength(12)
  })

  it('restores deterministic persona from mnemonic', () => {
    const mnemonic = generateMnemonic(wordlist)
    const r1 = restoreFromMnemonic(mnemonic)
    const r2 = restoreFromMnemonic(mnemonic)
    expect(r1.defaultPersona.identity.npub).toBe(r2.defaultPersona.identity.npub)
    r1.root.destroy()
    r2.root.destroy()
  })

  it('different mnemonics produce different personas', () => {
    const r1 = restoreFromMnemonic(generateMnemonic(wordlist))
    const r2 = restoreFromMnemonic(generateMnemonic(wordlist))
    expect(r1.defaultPersona.identity.npub).not.toBe(r2.defaultPersona.identity.npub)
    r1.root.destroy()
    r2.root.destroy()
  })

  it('produces valid keys', () => {
    const mnemonic = generateMnemonic(wordlist)
    const { root, defaultPersona } = restoreFromMnemonic(mnemonic)
    expect(defaultPersona.identity.npub).toMatch(/^npub1/)
    expect(defaultPersona.identity.nsec).toMatch(/^nsec1/)
    expect(defaultPersona.identity.privateKey).toBeInstanceOf(Uint8Array)
    expect(defaultPersona.identity.privateKey.length).toBe(32)
    root.destroy()
  })

  it('validates correct mnemonic', () => {
    const mnemonic = generateMnemonic(wordlist)
    expect(validateMnemonic(mnemonic, wordlist)).toBe(true)
  })

  it('rejects invalid mnemonic', () => {
    expect(validateMnemonic('foo bar baz qux one two three four five six seven eight', wordlist)).toBe(false)
  })

  it('uses nsec-tree derivation path (deterministic)', () => {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const { root, defaultPersona } = restoreFromMnemonic(mnemonic)
    expect(defaultPersona.identity.npub).toMatch(/^npub1/)
    expect(defaultPersona.name).toBe('personal')
    expect(defaultPersona.index).toBe(0)
    root.destroy()
  })

  it('recovers multiple personas from mnemonic', () => {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const { root, personas } = recoverFromMnemonic(mnemonic)
    expect(personas.size).toBeGreaterThanOrEqual(5)
    expect(personas.has('personal')).toBe(true)
    expect(personas.has('bitcoiner')).toBe(true)
    root.destroy()
  })
})
