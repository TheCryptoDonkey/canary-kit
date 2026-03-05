// e2e/offline/invite-flow.spec.ts — Invite creation and acceptance (two users)
import { test, expect } from '../fixtures.js'
import {
  loginOffline, createGroup, createInvite, acceptInviteViaLink,
  acceptInviteViaModal, getDisplayedWord, getGroupNames,
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

    // Accept with wrong code — should show alert
    pageB.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Confirmation code does not match')
      await dialog.accept()
    })
    await acceptInviteViaModal(pageB, payload, 'XXXX-XXXX-XXXX')
  })

  test('replayed invite nonce is rejected', async ({ twoUsers: { pageA, pageB } }) => {
    await loginOffline(pageA, 'Alice')
    await createGroup(pageA, 'OneShot')

    const { payload, confirmCode } = await createInvite(pageA)

    // First accept works
    await acceptInviteViaLink(pageB, payload, confirmCode, 'Bob')

    // Second accept with same nonce should be rejected
    pageB.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('already been used')
      await dialog.accept()
    })
    await acceptInviteViaModal(pageB, payload, confirmCode)
  })
})
