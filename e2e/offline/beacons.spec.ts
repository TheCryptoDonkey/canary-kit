// e2e/offline/beacons.spec.ts — Beacon panel tests (online mode group, no actual relay)
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup } from '../helpers.js'

test.describe('Beacons panel', () => {
  test('beacon panel hidden for offline groups', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Offline Group', { mode: 'offline' })
    await expect(page.locator('#beacon-container')).toBeHidden()
  })

  test('beacon panel visible for online groups', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Online Group', { mode: 'online' })
    await expect(page.locator('#beacon-container')).not.toBeHidden()
  })
})
