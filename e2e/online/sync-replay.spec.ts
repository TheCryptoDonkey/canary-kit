// e2e/online/sync-replay.spec.ts — Replay protection tests
import { test, expect } from '../fixtures.js'
import { loginWithNsec, createGroup, createInvite, openSettings, seedRelayUrl, getDisplayedWord, getGroupState } from '../helpers.js'

const ALICE_NSEC = 'nsec1vuhg9nandn0kas2w9uuvztwyla2fp7enfzz0emt6ly4gs6p5q3mqc6c6w5'
const BOB_NSEC = 'nsec1hszs2j8elt78kq6ewresrxfallpc6qvf0p33usgy9ujdkgu0mcesd4qryw'

test.describe('Replay protection', () => {
  test('counter-advance is idempotent after reconnect (EOSE replay)', async ({ browser, mockRelay }) => {
    test.setTimeout(60_000)

    const relayUrl = mockRelay.url
    const baseURL = 'http://localhost:5173'

    // Alice creates an online group
    const ctxA = await browser.newContext({ baseURL, bypassCSP: true })
    const pageA = await ctxA.newPage()
    await seedRelayUrl(pageA, relayUrl)
    await pageA.goto('/')
    await loginWithNsec(pageA, ALICE_NSEC)
    await createGroup(pageA, 'Replay Test', { mode: 'online' })
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

    // Alice burns the current word — triggers a counter-advance sync event
    await pageA.click('#burn-btn')
    await pageA.waitForTimeout(500)

    // Wait for Bob to receive the counter-advance via the relay
    await pageB.waitForTimeout(5000)

    const wordAfterBurn = await getDisplayedWord(pageB)
    const stateAfterBurn = await getGroupState(pageB)
    const offsetAfterBurn = stateAfterBurn.usageOffset as number

    // Bob reloads — the relay will re-deliver stored events (EOSE catch-up) on re-subscribe
    await pageB.reload()
    await pageB.waitForSelector('#sidebar', { timeout: 5000 })
    await pageB.click('.group-list__item:has-text("Replay Test")')
    await pageB.waitForSelector('.group-list__item--active:has-text("Replay Test")')
    await expect(pageB.locator('#relay-status')).toBeVisible({ timeout: 5000 })
    // Allow time for EOSE replay to be processed
    await pageB.waitForTimeout(3000)

    // The word and offset should be identical — not double-advanced
    const wordAfterReload = await getDisplayedWord(pageB)
    const stateAfterReload = await getGroupState(pageB)

    expect(wordAfterReload).toBe(wordAfterBurn)
    expect(stateAfterReload.usageOffset).toBe(offsetAfterBurn)

    await ctxA.close()
    await ctxB.close()
  })

  test('reseed epoch is idempotent after reconnect (EOSE replay)', async ({ browser, mockRelay }) => {
    test.setTimeout(60_000)

    const relayUrl = mockRelay.url
    const baseURL = 'http://localhost:5173'

    // Alice creates an online group
    const ctxA = await browser.newContext({ baseURL, bypassCSP: true })
    const pageA = await ctxA.newPage()
    await seedRelayUrl(pageA, relayUrl)
    await pageA.goto('/')
    await loginWithNsec(pageA, ALICE_NSEC)
    await createGroup(pageA, 'Epoch Replay', { mode: 'online' })
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

    // Alice reseeds — triggers a reseed sync event that increments the epoch
    await openSettings(pageA)
    pageA.once('dialog', async (d) => await d.accept())
    await pageA.click('#reseed-btn')
    await pageA.waitForTimeout(1000)

    // Wait for Bob to receive the reseed
    await pageB.waitForTimeout(5000)

    const wordAfterReseed = await getDisplayedWord(pageB)
    const stateAfterReseed = await getGroupState(pageB)
    const epochAfterReseed = stateAfterReseed.epoch as number

    // Bob reloads — the relay delivers stored events again (EOSE)
    await pageB.reload()
    await pageB.waitForSelector('#sidebar', { timeout: 5000 })
    await pageB.click('.group-list__item:has-text("Epoch Replay")')
    await pageB.waitForSelector('.group-list__item--active:has-text("Epoch Replay")')
    await expect(pageB.locator('#relay-status')).toBeVisible({ timeout: 5000 })
    await pageB.waitForTimeout(3000)

    // Epoch must not have incremented a second time due to re-delivered reseed event
    const wordAfterReload = await getDisplayedWord(pageB)
    const stateAfterReload = await getGroupState(pageB)

    expect(wordAfterReload).toBe(wordAfterReseed)
    expect(stateAfterReload.epoch).toBe(epochAfterReseed)

    await ctxA.close()
    await ctxB.close()
  })

  test.fixme('crafted event with duplicate opId is suppressed', async () => {
    // Requires injecting a pre-encrypted Nostr event into the relay that contains
    // a known opId. The sync transport decrypts each incoming event and checks the
    // seenOpIds set; a matching opId must be silently dropped.
    //
    // Cannot be implemented without access to the group encryption key from outside
    // the browser context. The key is derived from the group seed and is never
    // exposed to the test runner.
    //
    // Alternative: extend MockRelay to re-deliver a specific stored event to a new
    // subscription, then verify the recipient's state hasn't changed.
  })

  test.fixme('future-timestamped fire-and-forget message is rejected', async () => {
    // Requires crafting an encrypted sync message (liveness-checkin or duress-alert)
    // whose inner timestamp is more than 60 seconds in the future.
    // The handleFireAndForget freshness gate (FIRE_AND_FORGET_FRESHNESS_SEC) must
    // suppress it before any side-effects occur.
    //
    // Cannot be done at E2E level without either:
    //   (a) A way to inject pre-encrypted Nostr events into the relay, OR
    //   (b) A test seam that exposes the inner timestamp field.
    //
    // This behaviour is covered at unit level in app/sync.test.ts.
  })

  test.fixme('stale fire-and-forget message (>300s old) is rejected', async () => {
    // Same constraint as the future-timestamp test above, but with the stale-message
    // threshold (FIRE_AND_FORGET_FRESHNESS_SEC = 300) exceeded instead.
    //
    // Covered at unit level in app/sync.test.ts.
  })
})
