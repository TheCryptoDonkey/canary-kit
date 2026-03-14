// e2e/protocol/tolerance-window.spec.ts
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup, addSimulatedMember, getDisplayedWord, verifyWord } from '../helpers.js'

test.describe('Tolerance window', () => {
  test('current counter word is valid', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Tolerance')
    await addSimulatedMember(page)
    const word = await getDisplayedWord(page)
    const result = await verifyWord(page, word)
    expect(result).toBe('valid')
  })

  test('±1 counter word is valid with tolerance=1', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Tolerance')
    await addSimulatedMember(page)

    // Capture the current word before advancing the counter
    const word = await getDisplayedWord(page)

    // Burn once to advance usageOffset by 1
    await page.click('#burn-btn')
    await page.waitForTimeout(300)

    // Confirm the displayed word has changed
    const newWord = await getDisplayedWord(page)
    expect(newWord).not.toBe(word)

    // The original word is now 1 counter behind — within ±1 tolerance, so still valid
    const result = await verifyWord(page, word)
    expect(result).toBe('valid')
  })

  test('±2 counter word is invalid with tolerance=1', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Tolerance')
    await addSimulatedMember(page)

    // Capture the current word before advancing the counter
    const word = await getDisplayedWord(page)

    // Burn twice to advance usageOffset by 2
    await page.click('#burn-btn')
    await page.waitForTimeout(300)
    await page.click('#burn-btn')
    await page.waitForTimeout(300)

    // The original word is now 2 counters behind — outside ±1 tolerance, so invalid
    const result = await verifyWord(page, word)
    expect(result).toBe('invalid')
  })
})
