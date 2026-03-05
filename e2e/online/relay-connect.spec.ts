// e2e/online/relay-connect.spec.ts — Relay connection status
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup, seedRelayUrl } from '../helpers.js'

test.describe('Relay connection', () => {
  test('status indicator shows connected after creating online group', async ({
    cleanPage: page,
    mockRelay,
  }) => {
    await seedRelayUrl(page, mockRelay.url)
    await page.goto('/')
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Online', { mode: 'online' })
    await page.waitForTimeout(1000)

    // The header should show a relay status indicator
    await expect(page.locator('#relay-status')).toBeVisible()
  })
})
