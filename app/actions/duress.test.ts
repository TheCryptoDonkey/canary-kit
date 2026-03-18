import { describe, it, expect } from 'vitest'
import { getTargetGroups } from './duress.js'
import type { AppGroup, AppPersona } from '../types.js'

function makeGroup(id: string, personaId: string): AppGroup {
  return { id, personaId, name: id, seed: 'a'.repeat(64) } as any
}

function makePersona(id: string, name: string, archived = false): AppPersona {
  return { id, name, index: 0, npub: 'npub1test', children: {}, archived } as any
}

describe('duress fan-out', () => {
  describe('getTargetGroups', () => {
    const groups: Record<string, AppGroup> = {
      'g1': makeGroup('g1', 'p1'),
      'g2': makeGroup('g2', 'p1'),
      'g3': makeGroup('g3', 'p2'),
      'g4': makeGroup('g4', 'p2'),
    }

    it('group scope returns only the origin group', () => {
      const targets = getTargetGroups(groups, 'g1', 'group')
      expect(targets.map(g => g.id)).toEqual(['g1'])
    })

    it('persona scope returns all groups with same personaId', () => {
      const targets = getTargetGroups(groups, 'g1', 'persona')
      expect(targets.map(g => g.id).sort()).toEqual(['g1', 'g2'])
    })

    it('master scope returns all groups', () => {
      const targets = getTargetGroups(groups, 'g1', 'master')
      expect(targets.map(g => g.id).sort()).toEqual(['g1', 'g2', 'g3', 'g4'])
    })

    it('returns empty for unknown origin group', () => {
      const targets = getTargetGroups(groups, 'unknown', 'group')
      expect(targets).toEqual([])
    })

    it('persona scope excludes groups whose persona is archived', () => {
      const groupsWithArchived: Record<string, AppGroup> = {
        'g1': makeGroup('g1', 'p1'),
        'g2': makeGroup('g2', 'p1'),
        'g3': makeGroup('g3', 'p2'),
        'g4': makeGroup('g4', 'p2'),
      }
      const personas: Record<string, AppPersona> = {
        'p1': makePersona('p1', 'personal', false),
        'p2': makePersona('p2', 'work', true),
      }
      // g3 is origin but its persona 'work' is archived — should return empty
      const targets = getTargetGroups(groupsWithArchived, 'g3', 'persona', personas)
      expect(targets).toEqual([])
    })

    it('master scope excludes groups whose persona is archived', () => {
      const groupsWithArchived: Record<string, AppGroup> = {
        'g1': makeGroup('g1', 'p1'),
        'g2': makeGroup('g2', 'p1'),
        'g3': makeGroup('g3', 'p2'),
        'g4': makeGroup('g4', 'p2'),
      }
      const personas: Record<string, AppPersona> = {
        'p1': makePersona('p1', 'personal', false),
        'p2': makePersona('p2', 'work', true),
      }
      const targets = getTargetGroups(groupsWithArchived, 'g1', 'master', personas)
      expect(targets.map(g => g.id).sort()).toEqual(['g1', 'g2'])
    })
  })
})
