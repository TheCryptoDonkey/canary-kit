// e2e/protocol/duress-collision.spec.ts
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup, getDisplayedWord, addSimulatedMember } from '../helpers.js'

/**
 * Trigger the right-side (duress) press of the hero reveal button and return
 * the word displayed while held.  The right quarter of the button maps to the
 * duress derivation path per the CANARY-DURESS spec.
 */
async function getDuressWord(page: import('@playwright/test').Page): Promise<string> {
  return page.evaluate(() => {
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
}

test.describe('Duress collision avoidance', () => {
  test('duress word never equals verification word', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Collision Test')
    await addSimulatedMember(page)

    const normalWord = await getDisplayedWord(page)
    const duressWord = await getDuressWord(page)

    expect(normalWord).toBeTruthy()
    expect(duressWord).toBeTruthy()
    expect(duressWord).not.toBe(normalWord)
  })

  test('duress word never equals tolerance-window words', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Collision Test')
    await addSimulatedMember(page)

    const duressWord = await getDuressWord(page)
    expect(duressWord).toBeTruthy()

    // Collect the current word and the next word (after one burn) — the duress
    // word must differ from every word within the tolerance window.
    const word0 = await getDisplayedWord(page)
    await page.click('#burn-btn')
    await page.waitForTimeout(300)
    const word1 = await getDisplayedWord(page)

    expect(duressWord).not.toBe(word0)
    expect(duressWord).not.toBe(word1)
  })

  test('collision avoidance holds across different presets', async ({ cleanPage: page }) => {
    // Verify that the duress word never collides with the verification word for
    // groups initialised with different threat-profile presets and therefore
    // different seeds, rotation intervals, and wordCount settings.
    await loginOffline(page, 'Tester')

    const results: { preset: string; normal: string; duress: string }[] = []

    for (const preset of ['family', 'field-ops', 'enterprise'] as const) {
      await createGroup(page, `Test ${preset}`, { preset })
      await addSimulatedMember(page)

      const normal = await getDisplayedWord(page)
      const duress = await getDuressWord(page)
      results.push({ preset, normal, duress })
    }

    for (const { preset, normal, duress } of results) {
      expect(duress, `duress word collides with normal word for preset "${preset}"`).not.toBe(normal)
      expect(duress, `duress word is empty for preset "${preset}"`).toBeTruthy()
    }
  })
})
