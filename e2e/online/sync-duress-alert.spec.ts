// e2e/online/sync-duress-alert.spec.ts — Duress alert propagation via verification
import { test, expect } from '../fixtures.js'
import { loginWithNsec, createGroup, createInvite, seedRelayUrl } from '../helpers.js'

const ALICE_NSEC = 'nsec1vuhg9nandn0kas2w9uuvztwyla2fp7enfzz0emt6ly4gs6p5q3mqc6c6w5'
const BOB_NSEC = 'nsec1hszs2j8elt78kq6ewresrxfallpc6qvf0p33usgy9ujdkgu0mcesd4qryw'

test.describe('Online sync: duress alert', () => {
  test('duress word verified on User A triggers alert overlay on User B', async ({ browser, mockRelay }) => {
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

    // Get Bob's duress word by pressing the right side of the hero reveal button
    const bobDuressWord = await pageB.evaluate(() => {
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

    expect(bobDuressWord).toBeTruthy()

    // Alice verifies Bob's duress word via the verify input
    await pageA.waitForSelector('#verify-input', { timeout: 3000 })

    // Select Bob in the member dropdown if present
    const memberSelect = pageA.locator('#verify-member')
    if (await memberSelect.count() > 0) {
      const options = memberSelect.locator('option[value]:not([value=""])')
      const firstValue = await options.first().getAttribute('value')
      if (firstValue) await memberSelect.selectOption(firstValue)
    }

    await pageA.fill('#verify-input', bobDuressWord)
    await pageA.click('#verify-btn')

    // Wait for propagation via relay
    await pageB.waitForTimeout(5000)

    // Bob should see the duress alert overlay
    await expect(pageB.locator('.duress-overlay')).toBeVisible({ timeout: 5000 })
    await expect(pageB.locator('.duress-overlay__subtitle')).toHaveText('NEEDS HELP')

    // Dismiss the alert
    await pageB.click('#duress-dismiss')
    await expect(pageB.locator('.duress-overlay')).not.toBeVisible({ timeout: 3000 })

    await ctxA.close()
    await ctxB.close()
  })
})
