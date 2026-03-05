// e2e/protocol/epoch-tracking.spec.ts
import { test } from '../fixtures.js'

test.describe('Epoch tracking', () => {
  test.fixme('new group starts at epoch 0', async () => {
    // Need to inspect state — could use page.evaluate
  })

  test.fixme('reseed increments epoch', async () => {})
  test.fixme('invite with old epoch rejected', async () => {})
  test.fixme('seed change requires strictly newer epoch', async () => {})
})
