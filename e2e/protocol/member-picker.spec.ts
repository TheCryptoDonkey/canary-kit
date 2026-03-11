// e2e/protocol/member-picker.spec.ts
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup, addSimulatedMember, addSimulatedMembers } from '../helpers.js'

test.describe('Member picker', () => {
  test('2 members: verify call starts directly', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Alice')
    await createGroup(page, 'Pair')
    await addSimulatedMember(page)
    // With exactly 2 members (self + 1 other), the call should start directly with
    // no picker — there is no ambiguity about who to call.
    await page.click('#hero-call-btn')
    await expect(page.locator('.call-verify')).toBeVisible({ timeout: 3000 })
  })

  test('3+ members: picker modal shown', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Alice')
    await createGroup(page, 'Trio')
    await addSimulatedMembers(page, 2)
    // With 3 members (self + 2 others), the app cannot infer who to call —
    // the picker modal should appear so the user can select a member.
    await page.click('#hero-call-btn')
    await expect(page.locator('#member-picker')).toBeVisible({ timeout: 3000 })
  })

  test('picker: selecting member starts call with that member', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Alice')
    await createGroup(page, 'Trio')
    await addSimulatedMembers(page, 2)
    await page.click('#hero-call-btn')
    await expect(page.locator('#member-picker')).toBeVisible({ timeout: 3000 })
    // Select the first listed member
    await page.click('.member-pick-btn >> nth=0')
    // Picker should close and the call verification view should become visible
    await expect(page.locator('#member-picker')).not.toBeVisible({ timeout: 3000 })
    await expect(page.locator('.call-verify')).toBeVisible({ timeout: 3000 })
  })
})
