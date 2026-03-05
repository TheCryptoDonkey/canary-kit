// e2e/protocol/tolerance-window.spec.ts
import { test, expect } from '../fixtures.js'
import { loginOffline, createGroup, getDisplayedWord, verifyWord } from '../helpers.js'

test.describe('Tolerance window', () => {
  test('current counter word is valid', async ({ cleanPage: page }) => {
    await loginOffline(page, 'Tester')
    await createGroup(page, 'Tolerance')
    const word = await getDisplayedWord(page)
    const result = await verifyWord(page, word)
    expect(result).toBe('valid')
  })

  test.fixme('±1 counter word is valid with tolerance=1', async () => {
    // Need to derive the previous counter's word via SDK and verify it
  })

  test.fixme('±2 counter word is invalid with tolerance=1', async () => {
    // Need to derive counter-2 word and verify it fails
  })
})
