import { describe, it, expect } from 'vitest'
import { walkTree, findById, generatePersonaId } from './persona-tree.js'
import type { AppPersona } from './types.js'

function makePersona(id: string, name: string, children: Record<string, AppPersona> = {}): AppPersona {
  return { id, name, index: 0, npub: `npub-${id}`, children }
}

describe('walkTree', () => {
  it('yields nothing for empty tree', () => {
    expect([...walkTree({})]).toEqual([])
  })

  it('yields flat personas with empty ancestors', () => {
    const tree = {
      a: makePersona('a', 'personal'),
      b: makePersona('b', 'work'),
    }
    const result = [...walkTree(tree)]
    expect(result).toHaveLength(2)
    expect(result[0]!.persona.id).toBe('a')
    expect(result[0]!.ancestors).toEqual([])
    expect(result[1]!.persona.id).toBe('b')
    expect(result[1]!.ancestors).toEqual([])
  })

  it('yields nested personas depth-first with ancestors', () => {
    const child = makePersona('c', 'client-a')
    const tree = {
      w: makePersona('w', 'work', { c: child }),
    }
    const result = [...walkTree(tree)]
    expect(result).toHaveLength(2)
    expect(result[0]!.persona.id).toBe('w')
    expect(result[0]!.ancestors).toEqual([])
    expect(result[1]!.persona.id).toBe('c')
    expect(result[1]!.ancestors).toHaveLength(1)
    expect(result[1]!.ancestors[0]!.id).toBe('w')
  })

  it('handles 3 levels deep', () => {
    const leaf = makePersona('l', 'project-x')
    const mid = makePersona('m', 'client-a', { l: leaf })
    const tree = { w: makePersona('w', 'work', { m: mid }) }
    const result = [...walkTree(tree)]
    expect(result).toHaveLength(3)
    expect(result[2]!.persona.id).toBe('l')
    expect(result[2]!.ancestors.map(a => a.id)).toEqual(['w', 'm'])
  })
})

describe('findById', () => {
  it('returns null for missing id', () => {
    expect(findById({}, 'nope')).toBeNull()
  })

  it('finds a top-level persona', () => {
    const tree = { a: makePersona('a', 'personal') }
    const result = findById(tree, 'a')
    expect(result).not.toBeNull()
    expect(result!.persona.id).toBe('a')
    expect(result!.ancestors).toEqual([])
  })

  it('finds a deeply nested persona', () => {
    const leaf = makePersona('l', 'project-x')
    const mid = makePersona('m', 'client-a', { l: leaf })
    const tree = { w: makePersona('w', 'work', { m: mid }) }
    const result = findById(tree, 'l')
    expect(result).not.toBeNull()
    expect(result!.persona.id).toBe('l')
    expect(result!.ancestors.map(a => a.id)).toEqual(['w', 'm'])
  })
})

describe('generatePersonaId', () => {
  it('returns 8-char lowercase alphanumeric string', () => {
    const id = generatePersonaId()
    expect(id).toMatch(/^[a-z0-9]{8}$/)
  })

  it('generates unique ids', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generatePersonaId()))
    expect(ids.size).toBe(100)
  })
})
