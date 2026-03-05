// e2e/protocol/multi-word.spec.ts — Multi-word phrase verification
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup, openSettings, getDisplayedWord, verifyWord } from '../helpers.js'

test.describe('Multi-word phrases', () => {
  test.beforeEach(async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Multi Word', { preset: 'family' })
  })

  test('1-word: single word displayed', async ({ cleanPage: page }) => {
    const word = await getDisplayedWord(page)
    expect(word.split(/\s+/).length).toBe(1)
  })

  test('2-word phrase displayed correctly', async ({ cleanPage: page }) => {
    await openSettings(page)
    await page.click('[data-words="2"]')
    await page.waitForTimeout(200)

    const phrase = await getDisplayedWord(page)
    expect(phrase.split(/\s+/).length).toBe(2)
  })

  test('3-word phrase displayed correctly', async ({ cleanPage: page }) => {
    await openSettings(page)
    await page.click('[data-words="3"]')
    await page.waitForTimeout(200)

    const phrase = await getDisplayedWord(page)
    expect(phrase.split(/\s+/).length).toBe(3)
  })

  test('multi-word verification: full phrase must match', async ({ cleanPage: page }) => {
    await openSettings(page)
    await page.click('[data-words="2"]')
    await page.waitForTimeout(200)

    const phrase = await getDisplayedWord(page)
    const result = await verifyWord(page, phrase)
    expect(result).toBe('valid')
  })

  test('multi-word: partial phrase fails', async ({ cleanPage: page }) => {
    await openSettings(page)
    await page.click('[data-words="2"]')
    await page.waitForTimeout(200)

    const phrase = await getDisplayedWord(page)
    const firstWord = phrase.split(/\s+/)[0]
    const result = await verifyWord(page, firstWord)
    expect(result).toBe('invalid')
  })
})
