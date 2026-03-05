// e2e/offline/storage.spec.ts — State persistence and PIN lock
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup, getGroupNames } from '../helpers.js'

test.describe('Storage and persistence', () => {
  test('state persists across page reload', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Persistent Group')

    await page.reload()
    await page.waitForSelector('#sidebar', { timeout: 5000 })

    const groups = await getGroupNames(page)
    expect(groups).toContain('Persistent Group')
  })

  test('identity persists across reload', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Memorised')

    await page.reload()
    await page.waitForSelector('#sidebar', { timeout: 5000 })

    await expect(page.locator('.identity-badge__name')).toHaveText('Memorised')
  })
})
