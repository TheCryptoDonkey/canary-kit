// e2e/protocol/encoding-formats.spec.ts — All encoding formats work E2E
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup, setEncodingFormat, getDisplayedWord, verifyWord } from '../helpers.js'

test.describe('Encoding formats', () => {
  test.beforeEach(async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Encoding Test', { preset: 'family' })
  })

  test('words encoding shows readable word', async ({ cleanPage: page }) => {
    const word = await getDisplayedWord(page)
    expect(word).toBeTruthy()
    expect(word).toMatch(/^[a-z]+$/i) // alphabetic
  })

  test('PIN encoding shows digits', async ({ cleanPage: page }) => {
    await setEncodingFormat(page, 'pin')
    const word = await getDisplayedWord(page)
    expect(word).toMatch(/^[\d-]+$/) // digits with optional dash separator
  })

  test('hex encoding shows hex string', async ({ cleanPage: page }) => {
    await setEncodingFormat(page, 'hex')
    const word = await getDisplayedWord(page)
    expect(word).toMatch(/^[0-9a-f-]+$/i) // hex with optional dash separator
  })

  test('switching encoding updates display immediately', async ({ cleanPage: page }) => {
    const wordAsWords = await getDisplayedWord(page)
    await setEncodingFormat(page, 'pin')
    const wordAsPin = await getDisplayedWord(page)
    expect(wordAsPin).not.toBe(wordAsWords)
  })

  test('verification works with current encoding', async ({ cleanPage: page }) => {
    await setEncodingFormat(page, 'pin')
    const pin = await getDisplayedWord(page)
    const result = await verifyWord(page, pin)
    expect(result).toBe('valid')
  })
})
