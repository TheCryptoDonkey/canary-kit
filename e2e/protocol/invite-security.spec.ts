// e2e/protocol/invite-security.spec.ts
import { test } from '../fixtures.js'

test.describe('Invite security', () => {
  test.fixme('tampered payload (modified seed) — signature invalid', async () => {})
  test.fixme('tampered payload (modified members) — signature invalid', async () => {})
  test.fixme('invite from non-admin pubkey rejected', async () => {})
  test.fixme('expired invite rejected', async () => {})
  test.fixme('future invite (>5min clock skew) rejected', async () => {})
  test.fixme('wrong protocol version rejected', async () => {})
  test.fixme('missing inviterPubkey rejected', async () => {})
  test.fixme('missing inviterSig rejected', async () => {})
})
