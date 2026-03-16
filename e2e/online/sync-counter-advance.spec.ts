// e2e/online/sync-counter-advance.spec.ts — Counter advance ripple
import { test, expect } from '../fixtures.js'
import { loginWithNsec, createGroup, createInvite, seedRelayUrl, getDisplayedWord, getGroupState } from '../helpers.js'

const ALICE_NSEC = 'nsec1vuhg9nandn0kas2w9uuvztwyla2fp7enfzz0emt6ly4gs6p5q3mqc6c6w5'
const BOB_NSEC = 'nsec1hszs2j8elt78kq6ewresrxfallpc6qvf0p33usgy9ujdkgu0mcesd4qryw'

test.describe('Online sync: counter advance', () => {
  test('burn word on User A ripples new word to User B', async ({ browser, mockRelay }) => {
    const relayUrl = mockRelay.url
    const baseURL = 'http://localhost:5173'

    // Alice creates online group
    const ctxA = await browser.newContext({ baseURL, bypassCSP: true })
    const pageA = await ctxA.newPage()
    await seedRelayUrl(pageA, relayUrl)
    await pageA.goto('/')
    await loginWithNsec(pageA, ALICE_NSEC)
    await createGroup(pageA, 'Ripple Test', { mode: 'online' })
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
    // Extra time for WebSocket subscription to be fully active
    await pageB.waitForTimeout(1000)

    // Both should have the same group state (seed, counter, usageOffset)
    // Note: displayed words differ because they are per-member (derived with identity pubkey)
    const stateA = await getGroupState(pageA)
    const stateB = await getGroupState(pageB)
    expect(stateA.seed).toBe(stateB.seed)
    expect(stateA.counter).toBe(stateB.counter)
    expect(stateA.usageOffset).toBe(stateB.usageOffset)

    // Alice's word before burn (per-member, unique to Alice)
    const wordBeforeA = await getDisplayedWord(pageA)

    // Alice burns the word ("I used this word")
    await pageA.click('#burn-btn')
    await pageA.waitForTimeout(500)

    // Alice's word should have changed
    const wordAfterA = await getDisplayedWord(pageA)
    expect(wordAfterA).not.toBe(wordBeforeA)

    // Alice's group state should have advanced
    const stateAfterA = await getGroupState(pageA)
    const effectiveA = (stateAfterA.counter as number) + (stateAfterA.usageOffset as number)
    const effectiveBefore = (stateA.counter as number) + (stateA.usageOffset as number)
    expect(effectiveA).toBeGreaterThan(effectiveBefore)

    // Wait for propagation via relay
    await pageB.waitForTimeout(5000)

    // Bob's group state should now match Alice's (counter advance rippled)
    const stateAfterB = await getGroupState(pageB)
    expect(stateAfterB.counter).toBe(stateAfterA.counter)
    expect(stateAfterB.usageOffset).toBe(stateAfterA.usageOffset)

    await ctxA.close()
    await ctxB.close()
  })
})
