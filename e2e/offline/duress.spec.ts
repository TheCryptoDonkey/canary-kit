// e2e/offline/duress.spec.ts — Duress word tests (via hero panel right-side press)
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup, getDisplayedWord, addSimulatedMember } from '../helpers.js'

test.describe('Duress word', () => {
  test.beforeEach(async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    // Need at least 2 members for duress to be meaningful
    await createGroup(page, 'Test', { preset: 'family' })
    // Add a simulated member so duress words can be derived
    await addSimulatedMember(page)
  })

  test('hero panel shows masked word by default', async ({ cleanPage: page }) => {
    const heroWord = page.locator('#hero-word')
    await expect(heroWord).toBeVisible()
    const text = await heroWord.textContent()
    // Masked word contains bullet dots
    expect(text).toMatch(/•/)
  })

  test('right-side press reveals duress word (different from masked)', async ({ cleanPage: page }) => {
    const duressWord = await page.evaluate(() => {
      const btn = document.getElementById('hero-reveal-btn')
      if (!btn) return ''
      const rect = btn.getBoundingClientRect()
      // Press right side = duress word
      btn.dispatchEvent(new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: rect.left + rect.width * 0.75,
        clientY: rect.top + rect.height / 2,
        isPrimary: true,
      }))
      const wordEl = document.getElementById('hero-word')
      const text = wordEl?.textContent?.trim() ?? ''
      btn.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }))
      return text
    })
    expect(duressWord).toBeTruthy()
    expect(duressWord).not.toMatch(/^[•]+$/)
  })

  test('duress word differs from verification word', async ({ cleanPage: page }) => {
    const verificationWord = await getDisplayedWord(page)

    // Reveal duress word via right-side press
    const duressWord = await page.evaluate(() => {
      const btn = document.getElementById('hero-reveal-btn')
      if (!btn) return ''
      const rect = btn.getBoundingClientRect()
      btn.dispatchEvent(new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: rect.left + rect.width * 0.75,
        clientY: rect.top + rect.height / 2,
        isPrimary: true,
      }))
      const wordEl = document.getElementById('hero-word')
      const text = wordEl?.textContent?.trim() ?? ''
      btn.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }))
      return text
    })

    expect(duressWord).toBeTruthy()
    expect(duressWord).not.toBe(verificationWord)
  })
})
