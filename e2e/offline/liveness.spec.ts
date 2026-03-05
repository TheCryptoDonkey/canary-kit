// e2e/offline/liveness.spec.ts — Liveness panel tests
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup } from '../helpers.js'

test.describe('Liveness panel', () => {
  test('liveness panel hidden for offline groups', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Offline Group', { mode: 'offline' })
    await expect(page.locator('#liveness-container')).toBeHidden()
  })

  test('liveness panel visible for online groups', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Online Group', { mode: 'online' })
    await expect(page.locator('#liveness-container')).not.toBeHidden()
  })
})
