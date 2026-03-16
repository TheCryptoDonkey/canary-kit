// e2e/offline/verify-input.spec.ts — Verify panel: word input and result
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup, getDisplayedWord, verifyWord, addSimulatedMember } from '../helpers.js'

test.describe('Verify input panel', () => {
  test.beforeEach(async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Test', { preset: 'family' })
    // Verify panel requires 2+ members to render the input
    await addSimulatedMember(page)
  })

  test('correct current word shows Verified', async ({ cleanPage: page }) => {
    const word = await getDisplayedWord(page)
    const result = await verifyWord(page, word)
    expect(result).toBe('valid')
  })

  test('incorrect word shows Failed', async ({ cleanPage: page }) => {
    const result = await verifyWord(page, 'definitelynotaword')
    expect(result).toBe('invalid')
  })

  test('case-insensitive matching', async ({ cleanPage: page }) => {
    const word = await getDisplayedWord(page)
    const result = await verifyWord(page, word.toUpperCase())
    expect(result).toBe('valid')
  })

  test('Enter key triggers verification', async ({ cleanPage: page }) => {
    // Open the "Type manually" details to reveal the text input
    await page.click('.verify-fallback summary')
    await page.waitForSelector('#verify-input', { state: 'visible', timeout: 3000 })

    const word = await getDisplayedWord(page)
    await page.fill('#verify-input', word)
    await page.press('#verify-input', 'Enter')

    const resultEl = page.locator('#verify-result')
    await expect(resultEl).not.toBeHidden({ timeout: 3000 })
    await expect(resultEl).toHaveClass(/verify-result--valid/)
  })
})
