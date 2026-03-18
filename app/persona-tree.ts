// app/persona-tree.ts — Tree utilities for hierarchical personas

/** Minimal persona shape needed for tree operations. Matches future AppPersona. */
export interface TreePersona {
  id: string
  name: string
  index: number
  npub: string
  children: Record<string, TreePersona>
  [key: string]: unknown
}

/**
 * Yield every persona in depth-first order with its ancestor chain.
 */
export function* walkTree(
  personas: Record<string, TreePersona>,
  ancestors: TreePersona[] = [],
): Generator<{ persona: TreePersona; ancestors: TreePersona[] }> {
  for (const persona of Object.values(personas)) {
    yield { persona, ancestors }
    if (persona.children && Object.keys(persona.children).length > 0) {
      yield* walkTree(persona.children, [...ancestors, persona])
    }
  }
}

/**
 * Find a persona by id anywhere in the tree.
 * Returns the persona and its ancestor chain, or null if not found.
 */
export function findById(
  personas: Record<string, TreePersona>,
  id: string,
  ancestors: TreePersona[] = [],
): { persona: TreePersona; ancestors: TreePersona[] } | null {
  for (const persona of Object.values(personas)) {
    if (persona.id === id) return { persona, ancestors }
    if (persona.children && Object.keys(persona.children).length > 0) {
      const found = findById(persona.children, id, [...ancestors, persona])
      if (found) return found
    }
  }
  return null
}

/**
 * Generate a stable random persona id (8 chars, [a-z0-9]).
 */
export function generatePersonaId(): string {
  const bytes = new Uint8Array(5)
  crypto.getRandomValues(bytes)
  let id = ''
  for (const b of bytes) {
    id += b.toString(36).padStart(2, '0').slice(-2)
  }
  return id.slice(0, 8)
}
