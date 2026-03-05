// e2e/offline/invite-flow.spec.ts — Invite creation and acceptance (two users)
import { test, expect } from '../fixtures.js'
import {
  loginOffline, createGroup, createInvite, acceptInviteViaLink,
  getDisplayedWord, getGroupNames,
} from '../helpers.js'

test.describe('Invite flow (offline)', () => {
  test('create invite shows QR, confirm code, and copy buttons', async ({ twoUsers: { pageA } }) => {
    await loginOffline(pageA, 'Alice')
    await createGroup(pageA, 'Test Group')

    await pageA.click('#hero-invite-btn')
    await expect(pageA.locator('#invite-modal[open]')).toBeVisible()
    await expect(pageA.locator('.qr-container')).toBeVisible()
    await expect(pageA.locator('.confirm-code__value')).toBeVisible()
    await expect(pageA.locator('#invite-copy-link')).toBeVisible()
    await expect(pageA.locator('#invite-copy-text')).toBeVisible()

    await pageA.click('#invite-close-btn')
  })

  test('User B opens invite link, logs in, joins successfully', async ({ twoUsers: { pageA, pageB } }) => {
    await loginOffline(pageA, 'Alice')
    await createGroup(pageA, 'Family')

    const { payload, confirmCode } = await createInvite(pageA)
    await acceptInviteViaLink(pageB, payload, confirmCode, 'Bob')

    // Both should see a group called "Family"
    const groupsB = await getGroupNames(pageB)
    expect(groupsB).toContain('Family')
  })

  test('both users see same verification word after join', async ({ twoUsers: { pageA, pageB } }) => {
    await loginOffline(pageA, 'Alice')
    await createGroup(pageA, 'Shared')

    const { payload, confirmCode } = await createInvite(pageA)
    await acceptInviteViaLink(pageB, payload, confirmCode, 'Bob')

    const wordA = await getDisplayedWord(pageA)
    const wordB = await getDisplayedWord(pageB)
    expect(wordA).toBeTruthy()
    expect(wordA).toBe(wordB)
  })

  test('wrong confirm code shows error', async ({ twoUsers: { pageA, pageB } }) => {
    await loginOffline(pageA, 'Alice')
    await createGroup(pageA, 'Guarded')

    const { payload } = await createInvite(pageA)

    await loginOffline(pageB, 'Bob')

    // Open join modal manually
    await pageB.evaluate(() => {
      document.dispatchEvent(new CustomEvent('canary:join-group', { detail: {} }))
    })
    await pageB.waitForSelector('#app-modal[open]', { timeout: 3000 })

    await pageB.fill('[name="payload"]', payload)
    await pageB.fill('[name="code"]', 'XXXX-XXXX-XXXX')

    // Set up dialog handler BEFORE click (alert() blocks synchronously)
    let alertMessage = ''
    pageB.once('dialog', async (dialog) => {
      alertMessage = dialog.message()
      await dialog.accept()
    })
    await pageB.click('#modal-form button[type="submit"]')
    await pageB.waitForTimeout(500)
    expect(alertMessage).toContain('onfirmation')
  })

  test('replayed invite nonce is rejected', async ({ twoUsers: { pageA, pageB } }) => {
    await loginOffline(pageA, 'Alice')
    await createGroup(pageA, 'OneShot')

    const { payload, confirmCode } = await createInvite(pageA)

    // First accept works
    await acceptInviteViaLink(pageB, payload, confirmCode, 'Bob')

    // Set up dialog handler for the replay rejection
    let alertMessage = ''
    pageB.once('dialog', async (dialog) => {
      alertMessage = dialog.message()
      await dialog.accept()
    })

    // Open join modal for second attempt
    await pageB.evaluate(() => {
      document.dispatchEvent(new CustomEvent('canary:join-group', { detail: {} }))
    })
    await pageB.waitForSelector('#app-modal[open]', { timeout: 3000 })

    await pageB.fill('[name="payload"]', payload)
    await pageB.fill('[name="code"]', confirmCode)

    // Second accept with same nonce should be rejected
    await pageB.click('#modal-form button[type="submit"]')
    await pageB.waitForTimeout(500)
    expect(alertMessage).toContain('already been used')
  })
})
