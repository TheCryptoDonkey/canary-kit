// app/persona-tree.ts — Tree utilities for hierarchical personas

import type { AppPersona } from './types.js'

/**
 * Yield every persona in depth-first order with its ancestor chain.
 */
export function* walkTree(
  personas: Record<string, AppPersona>,
  ancestors: AppPersona[] = [],
): Generator<{ persona: AppPersona; ancestors: AppPersona[] }> {
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
  personas: Record<string, AppPersona>,
  id: string,
  ancestors: AppPersona[] = [],
): { persona: AppPersona; ancestors: AppPersona[] } | null {
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
 * Find a persona by name at the root level only (backwards compat).
 * Returns the persona or null if not found.
 */
export function findByName(
  personas: Record<string, AppPersona>,
  name: string,
): AppPersona | null {
  for (const persona of Object.values(personas)) {
    if (persona.name === name) return persona
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
