// e2e/offline/call-simulation.spec.ts — Call verification demo tests
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup } from '../helpers.js'

test.describe('Call simulation', () => {
  test('verify call button shown for 2+ member groups', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Alice')
    await createGroup(page, 'Pair')
    // Add a second member
    await page.click('#add-member-btn')
    await expect(page.locator('#hero-call-btn')).toBeVisible()
  })

  test('verify call button NOT shown for single member group', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Alice')
    await createGroup(page, 'Solo')
    await expect(page.locator('#hero-call-btn')).not.toBeVisible()
  })

  test('call demo view: scenario tabs visible', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Alice')
    // Navigate to call demo via header tab or hash
    await page.goto('/#call')
    await page.waitForTimeout(500)
    // The call demo should show scenario buttons
    await expect(page.locator('text=Insurance')).toBeVisible()
    await expect(page.locator('text=Pickup')).toBeVisible()
    await expect(page.locator('text=Rideshare')).toBeVisible()
  })

  test('call demo shows directional words (caller ≠ receiver)', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Alice')
    await page.goto('/#call')
    await page.waitForTimeout(500)

    // Both caller and agent sections should be visible
    const callerWord = page.locator('.call-card').first().locator('.call-word')
    const agentWord = page.locator('.call-card').last().locator('.call-word')

    await expect(callerWord).toBeVisible()
    await expect(agentWord).toBeVisible()

    const callerText = await callerWord.textContent()
    const agentText = await agentWord.textContent()
    expect(callerText).toBeTruthy()
    expect(agentText).toBeTruthy()
    // Directional: caller and receiver should see DIFFERENT words
    expect(callerText).not.toBe(agentText)
  })
})
