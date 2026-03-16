// e2e/online/sync-duress-alert.spec.ts — Duress alert propagation via verification
import { test, expect } from '../fixtures.js'
import { loginWithNsec, createGroup, createInvite, seedRelayUrl } from '../helpers.js'

const ALICE_NSEC = 'nsec1vuhg9nandn0kas2w9uuvztwyla2fp7enfzz0emt6ly4gs6p5q3mqc6c6w5'
const BOB_NSEC = 'nsec1hszs2j8elt78kq6ewresrxfallpc6qvf0p33usgy9ujdkgu0mcesd4qryw'

test.describe('Online sync: duress alert', () => {
  test('duress word detected by verifier and broadcast to relay', async ({ browser, mockRelay }) => {
    const relayUrl = mockRelay.url
    const baseURL = 'http://localhost:5173'

    // Alice creates online group
    const ctxA = await browser.newContext({ baseURL, bypassCSP: true })
    const pageA = await ctxA.newPage()
    await seedRelayUrl(pageA, relayUrl)
    await pageA.goto('/')
    await loginWithNsec(pageA, ALICE_NSEC)
    await createGroup(pageA, 'Duress Alert Test', { mode: 'online' })
    await expect(pageA.locator('#relay-status')).toBeVisible({ timeout: 5000 })

    // Bob joins via invite
    const { inviteUrl, confirmCode } = await createInvite(pageA)

    const ctxB = await browser.newContext({ baseURL, bypassCSP: true })
    const pageB = await ctxB.newPage()
    await seedRelayUrl(pageB, relayUrl)
    await pageB.goto('/')
    await loginWithNsec(pageB, BOB_NSEC)

    const hash = new URL(inviteUrl).hash
    await pageB.goto(`${baseURL}/${hash}`)
    await pageB.waitForSelector('#binary-join-modal[open]', { timeout: 5000 })
    await pageB.fill('#binary-join-confirm', confirmCode)
    await pageB.click('#binary-join-accept')
    await pageB.waitForSelector('#binary-join-modal:not([open])', { state: 'attached', timeout: 5000 })
    await expect(pageB.locator('#relay-status')).toBeVisible({ timeout: 5000 })
    await pageB.waitForTimeout(1000)

    const eventsBefore = mockRelay.storedEvents.length

    // Get Bob's duress word by pressing the right side of the hero reveal button
    const bobDuressWord = await pageB.evaluate(() => {
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

    expect(bobDuressWord).toBeTruthy()

    // Alice verifies Bob's duress word via the "Type manually" text fallback
    await pageA.click('.verify-fallback summary')
    await pageA.waitForSelector('#verify-input', { state: 'visible', timeout: 3000 })
    await pageA.fill('#verify-input', bobDuressWord)
    await pageA.click('#verify-btn')

    // Alice should see the duress alert overlay on her own page (local detection)
    await expect(pageA.locator('.duress-overlay')).toBeVisible({ timeout: 5000 })
    await expect(pageA.locator('.duress-overlay__subtitle')).toHaveText('NEEDS HELP')

    // Wait for relay broadcast
    await pageA.waitForTimeout(2000)

    // The relay should have received the duress-alert event
    expect(mockRelay.storedEvents.length).toBeGreaterThan(eventsBefore)

    // Bob's page should NOT show the overlay — the subject's own device never
    // reveals that duress was detected (attacker might be watching)
    await expect(pageB.locator('.duress-overlay')).not.toBeVisible()

    // Alice dismisses the alert
    await pageA.locator('.duress-overlay__dismiss').click()
    await expect(pageA.locator('.duress-overlay')).not.toBeVisible({ timeout: 3000 })

    await ctxA.close()
    await ctxB.close()
  })
})
