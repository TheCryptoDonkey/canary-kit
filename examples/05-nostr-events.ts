/**
 * NIP-XX Nostr event building.
 *
 * Scenario: Publish CANARY group state and signals over Nostr relays.
 * The library builds unsigned events — you sign them with your own Nostr library.
 *
 * Run: npx tsx examples/05-nostr-events.ts
 */

import { createGroup } from 'canary-kit'
import {
  KINDS,
  buildGroupStateEvent,
  buildSignalEvent,
  buildRumourEvent,
} from 'canary-kit/nostr'
import { deriveBeaconKey, encryptBeacon } from 'canary-kit/beacon'

const alice = 'a'.repeat(64)
const bob = 'b'.repeat(64)

const group = createGroup({
  name: 'Reporters',
  members: [alice, bob],
  preset: 'field-ops',
})

// Build a kind 30078 group state event (NIP-XX §Kind 30078)
const groupEvent = buildGroupStateEvent({
  groupId: 'reporters-2026',
  members: group.members,
  encryptedContent: '<NIP-44 encrypted config would go here>',
  rotationInterval: group.rotationInterval,
})

console.log('Group state event (kind', KINDS.groupState + '):')
console.log(JSON.stringify(groupEvent, null, 2))

// Build a kind 20078 encrypted beacon signal (NIP-XX §Kind 20078)
const beaconKey = deriveBeaconKey(group.seed)
const encrypted = await encryptBeacon(beaconKey, 'u4pruyd', 7)

const beaconEvent = buildSignalEvent({
  groupId: 'reporters-2026',
  signalType: 'beacon',
  encryptedContent: encrypted,
})

console.log('\nBeacon signal event (kind', KINDS.signal + '):')
console.log(JSON.stringify(beaconEvent, null, 2))

// Build a kind 14 rumour for seed distribution (NIP-17 wrapping)
const rumour = buildRumourEvent({
  recipientPubkey: bob,
  subject: 'ssg:seed-distribution',
  encryptedContent: '<NIP-44 encrypted seed would go here>',
})

console.log('\nSeed distribution rumour (kind 14, consumer wraps in NIP-17):')
console.log(JSON.stringify(rumour, null, 2))

// Sign with your Nostr library:
// import { finalizeEvent, generateSecretKey } from 'nostr-tools'
// const signed = finalizeEvent(groupEvent, secretKey)
