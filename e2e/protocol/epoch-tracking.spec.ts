// e2e/protocol/epoch-tracking.spec.ts
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup, openSettings, getGroupState } from '../helpers.js'

test.describe('Epoch tracking', () => {
  test('new group starts at epoch 0', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Epoch Test')
    const state = await getGroupState(page)
    // SDK may omit epoch when 0; treat undefined as 0
    expect(state.epoch ?? 0).toBe(0)
  })

  test('reseed increments epoch', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Epoch Test')

    const before = await getGroupState(page)
    expect(before.epoch ?? 0).toBe(0)

    await openSettings(page)
    page.once('dialog', async (d) => await d.accept())
    await page.click('#reseed-btn')
    await page.waitForTimeout(500)

    const after = await getGroupState(page)
    expect(after.epoch).toBe(1)
  })

  test('second reseed increments epoch to 2', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Epoch Test')

    await openSettings(page)
    page.once('dialog', async (d) => await d.accept())
    await page.click('#reseed-btn')
    await page.waitForTimeout(500)

    page.once('dialog', async (d) => await d.accept())
    await page.click('#reseed-btn')
    await page.waitForTimeout(500)

    const state = await getGroupState(page)
    expect(state.epoch).toBe(2)
  })

  test('reseed changes seed but preserves members', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Epoch Test')

    // Wait for state to fully persist before reading
    await page.waitForTimeout(300)
    const before = await getGroupState(page)
    const oldSeed = before.seed as string
    const oldMembers = before.members as string[]
    expect(oldSeed).toBeTruthy()
    expect(oldMembers?.length).toBeGreaterThan(0)

    await openSettings(page)
    page.once('dialog', async (d) => await d.accept())
    await page.click('#reseed-btn')
    await page.waitForTimeout(500)

    const after = await getGroupState(page)
    expect(after.seed).not.toBe(oldSeed)
    expect(after.members).toEqual(oldMembers)
  })

  test.fixme('invite with old epoch rejected', async () => {
    // Cannot be verified at the E2E level with the current binary invite flow.
    // Accepting an invite creates a new local group from the invite payload, so the
    // epoch in the payload is adopted directly rather than validated against an
    // existing group. Epoch enforcement happens at the sync-state layer (CANARY-SYNC),
    // not the invite-acceptance layer. Cover this with a unit test against the SDK's
    // group merge / sync-accept logic instead.
  })

  test.fixme('seed change requires strictly newer epoch', async () => {
    // Epoch monotonicity for sync-state updates is enforced in the SDK's acceptSyncState()
    // function, which rejects payloads with epoch ≤ current. This cannot be exercised at
    // the E2E level without a second user sending a crafted sync payload. Cover with unit
    // tests against src/group.ts or src/sync.ts instead.
  })
})
