// e2e/fixtures.ts — Shared Playwright fixtures for CANARY E2E tests
import { test as base, type Page, type BrowserContext } from '@playwright/test'
import { MockRelay } from './mock-relay.js'
import { trackConsoleErrors } from './helpers.js'

type CanaryFixtures = {
  /** A clean page with no prior state — navigated to / and ready for login. */
  cleanPage: Page

  /** Two isolated browser contexts, each navigated to /. For multi-user tests. */
  twoUsers: { pageA: Page; pageB: Page; contextA: BrowserContext; contextB: BrowserContext }

  /** Mock NIP-01 relay instance (started before test, stopped after). */
  mockRelay: MockRelay

  /** Console errors tracked for the default page. */
  consoleErrors: string[]
}

export const test = base.extend<CanaryFixtures>({
  cleanPage: async ({ browser }, use) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('/')
    await use(page)
    await context.close()
  },

  twoUsers: async ({ browser }, use) => {
    const contextA = await browser.newContext()
    const contextB = await browser.newContext()
    const pageA = await contextA.newPage()
    const pageB = await contextB.newPage()
    await pageA.goto('/')
    await pageB.goto('/')
    await use({ pageA, pageB, contextA, contextB })
    await contextA.close()
    await contextB.close()
  },

  mockRelay: async ({}, use) => {
    const relay = new MockRelay()
    await relay.start()
    await use(relay)
    await relay.stop()
  },

  consoleErrors: async ({ page }, use) => {
    const errors = trackConsoleErrors(page)
    await use(errors)
  },
})

export { expect } from '@playwright/test'
