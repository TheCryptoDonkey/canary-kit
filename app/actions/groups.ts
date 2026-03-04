// app/actions/groups.ts — Group lifecycle functions combining SDK calls with app state

import {
  createGroup,
  addMember,
  removeMember,
  reseed,
  advanceCounter,
  type PresetName,
} from 'canary-kit'

import { getState, update, updateGroup } from '../state.js'
import { broadcastAction, reRegisterGroup } from '../sync.js'
import type { AppGroup } from '../types.js'

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
  }
  return bytes
}

/**
 * Create a new group, wrap the SDK result as an AppGroup with app-layer
 * defaults, persist it to state, and return the new group's id.
 *
 * @param name         Human-readable group name.
 * @param preset       Named threat-profile preset ('family' | 'field-ops' | 'enterprise').
 * @param memberPubkey Optional 64-char hex pubkey to add as the first member.
 */
export function createNewGroup(name: string, preset: PresetName, memberPubkey?: string, mode: 'offline' | 'online' = 'offline'): string {
  const id = crypto.randomUUID()

  const members: string[] = memberPubkey ? [memberPubkey] : []
  const sdkGroup = createGroup({ name, members, preset, creator: memberPubkey })

  const appGroup: AppGroup = {
    ...sdkGroup,
    id,
    mode,
    nostrEnabled: mode === 'online',
    relays: mode === 'online' ? [...getState().settings.defaultRelays] : [],
    encodingFormat: 'words',
    usedInvites: [],
    latestInviteIssuedAt: 0,
    livenessInterval: sdkGroup.rotationInterval,
    livenessCheckins: {},
    tolerance: 1,
    memberNames: {},
    duressMode: 'immediate',
  }

  const { groups } = getState()
  update({
    groups: { ...groups, [id]: appGroup },
    activeGroupId: id,
  })

  if (memberPubkey) {
    broadcastAction(id, { type: 'member-join', pubkey: memberPubkey, timestamp: Math.floor(Date.now() / 1000), epoch: 0, opId: crypto.randomUUID() })
  }

  return id
}

/**
 * Delete a group from state.
 * Clears `activeGroupId` if the deleted group was the active one.
 */
export function deleteGroup(id: string): void {
  const { groups, activeGroupId } = getState()

  const updated = { ...groups }
  delete updated[id]

  update({
    groups: updated,
    activeGroupId: activeGroupId === id ? null : activeGroupId,
  })
}

/**
 * Routine key rotation (transition-under-old-key).
 * Broadcasts the reseed encrypted under the OLD group key so peers can
 * decrypt it, then rekeys locally.
 */
export function reseedGroup(id: string): void {
  const { groups } = getState()
  const group = groups[id]
  if (!group) {
    console.warn(`[canary:actions] reseedGroup: unknown group id "${id}"`)
    return
  }

  const reseeded = reseed(group)
  const newEpoch = (group.epoch ?? 0) + 1
  const opId = crypto.randomUUID()
  const admins = [...(group.admins ?? [])]

  // Broadcast FIRST under old key (peers can decrypt)
  broadcastAction(id, {
    type: 'reseed',
    seed: hexToBytes(reseeded.seed),
    counter: reseeded.counter,
    timestamp: Math.floor(Date.now() / 1000),
    epoch: newEpoch,
    opId,
    admins,
    members: [...group.members],
  })

  // Then rekey locally
  updateGroup(id, {
    ...reseeded,
    epoch: newEpoch,
    consumedOps: [opId],
    admins,
  })

  // Re-register transport with new seed for future messages
  reRegisterGroup(id)
}

/**
 * Emergency reseed when the old key is compromised.
 * Fail-closed: no broadcast (old key is untrusted).
 * All members must be reinvited.
 */
export function compromiseReseed(id: string): void {
  const { groups } = getState()
  const group = groups[id]
  if (!group) {
    console.warn(`[canary:actions] compromiseReseed: unknown group id "${id}"`)
    return
  }

  const reseeded = reseed(group)
  const newEpoch = (group.epoch ?? 0) + 1

  updateGroup(id, {
    ...reseeded,
    epoch: newEpoch,
    consumedOps: [],
    admins: [...(group.admins ?? [])],
  })

  reRegisterGroup(id)
}

/**
 * Add a member pubkey to the group.
 * Delegates validation to the SDK `addMember()` function.
 */
export function addGroupMember(id: string, pubkey: string): void {
  const { groups } = getState()
  const group = groups[id]
  if (!group) {
    console.warn(`[canary:actions] addGroupMember: unknown group id "${id}"`)
    return
  }

  const opId = crypto.randomUUID()
  const updated = addMember(group, pubkey)
  updateGroup(id, {
    ...updated,
    consumedOps: [...(group.consumedOps ?? []), opId],
  })
  reRegisterGroup(id)
  broadcastAction(id, {
    type: 'member-join',
    pubkey,
    timestamp: Math.floor(Date.now() / 1000),
    epoch: group.epoch ?? 0,
    opId,
  })
}

/**
 * Remove a member pubkey from the group and immediately rotate the shared seed.
 *
 * This is a fail-closed eviction path:
 * - No `member-leave` sync event is broadcast under the old key.
 * - The local group key is rekeyed right away, forcing explicit re-invite/migration
 *   for remaining members.
 */
/**
 * Evict a member (fail-closed: no broadcast).
 * Removes the member, reseeds, bumps epoch. Remaining members
 * must be reinvited since the evicted member held the old key.
 */
export function removeGroupMember(id: string, pubkey: string): void {
  const { groups } = getState()
  const group = groups[id]
  if (!group) {
    console.warn(`[canary:actions] removeGroupMember: unknown group id "${id}"`)
    return
  }

  if (!group.members.includes(pubkey)) return

  const withoutMember = removeMember(group, pubkey)
  const rotated = reseed(withoutMember)
  const newEpoch = (group.epoch ?? 0) + 1

  const memberNames = { ...(group.memberNames ?? {}) }
  delete memberNames[pubkey]

  const livenessCheckins = { ...(group.livenessCheckins ?? {}) }
  delete livenessCheckins[pubkey]

  // Remove from admins too
  const admins = (group.admins ?? []).filter(a => a !== pubkey)

  updateGroup(id, {
    ...rotated,
    memberNames,
    livenessCheckins,
    admins,
    epoch: newEpoch,
    consumedOps: [],
  })

  // Fail-closed: no broadcast. Remaining members must be reinvited.
  reRegisterGroup(id)
}

/**
 * Burn the current word by advancing the usage counter.
 * Use after a word has been spoken/displayed to prevent reuse.
 */
export function burnWord(id: string): void {
  const { groups } = getState()
  const group = groups[id]
  if (!group) {
    console.warn(`[canary:actions] burnWord: unknown group id "${id}"`)
    return
  }

  const updated = advanceCounter(group)
  updateGroup(id, updated)
  broadcastAction(id, { type: 'counter-advance', counter: updated.counter, usageOffset: updated.usageOffset, timestamp: Math.floor(Date.now() / 1000) })
}
