// app/components/persona-picker.ts — Persona picker dropdown component

import { getState, update } from '../state.js'
import { isPersonasInitialised } from '../persona.js'
import type { AppPersona } from '../types.js'
import { escapeHtml } from '../utils/escape.js'

// ── Helpers ────────────────────────────────────────────────────

/**
 * Deterministic hue (0–360) derived from a persona name string.
 * Uses a simple djb2-style hash for even distribution.
 */
export function personaHue(name: string): number {
  let hash = 5381
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 33) ^ name.charCodeAt(i)
    hash = hash >>> 0 // keep as unsigned 32-bit
  }
  return hash % 360
}

/**
 * CSS colour for a persona badge.
 * Returns an `hsl()` string with fixed saturation and lightness.
 */
export function personaColour(name: string): string {
  return `hsl(${personaHue(name)}, 60%, 45%)`
}

/**
 * Small badge HTML: a coloured `<span>` showing the first letter of the name.
 */
export function personaBadgeHtml(name: string): string {
  const colour = personaColour(name)
  const letter = escapeHtml(name.slice(0, 1).toUpperCase())
  return `<span class="persona-badge" style="background-color:${colour}" title="${escapeHtml(name)}">${letter}</span>`
}

// ── Internal helpers ───────────────────────────────────────────

/** Truncate an npub to a short readable form: first 8 + "…" + last 4 chars. */
function truncateNpub(npub: string): string {
  if (npub.length <= 16) return npub
  return `${npub.slice(0, 8)}\u2026${npub.slice(-4)}`
}

/** Render a single `<option>` for a persona. */
function renderPersonaOption(persona: AppPersona, activePersonaId: string | null): string {
  const label = persona.displayName
    ? `${escapeHtml(persona.displayName)} (${escapeHtml(truncateNpub(persona.npub))})`
    : `${escapeHtml(persona.name)} · ${escapeHtml(truncateNpub(persona.npub))}`
  const selected = persona.id === activePersonaId ? ' selected' : ''
  return `<option value="${escapeHtml(persona.id)}"${selected}>${label}</option>`
}

// ── Public API ─────────────────────────────────────────────────

/**
 * Render persona picker dropdown HTML.
 *
 * Returns an empty string if personas are not initialised (i.e. NIP-07 signer
 * with no local key material — persona derivation is unavailable).
 *
 * The dropdown includes:
 * - An "All groups" option (value="") selected when activePersonaId is null.
 * - One option per persona in state.
 */
export function renderPersonaPicker(): string {
  if (!isPersonasInitialised()) return ''

  const { personas, activePersonaId } = getState()
  const personaList = Object.values(personas).filter(p => !p.archived)
  if (personaList.length === 0) return ''

  const allSelected = activePersonaId === null ? ' selected' : ''
  const options = [
    `<option value=""${allSelected}>All groups</option>`,
    ...personaList.map((p) => renderPersonaOption(p, activePersonaId)),
  ].join('')

  return `<select class="persona-picker" aria-label="Filter by persona">${options}</select>`
}

/**
 * Wire the persona picker `<select>` change event inside a container.
 *
 * On change, updates `state.activePersonaId`:
 * - Empty string value → null (show all groups)
 * - Non-empty value → that persona id
 */
export function wirePersonaPicker(container: HTMLElement): void {
  const select = container.querySelector<HTMLSelectElement>('.persona-picker')
  if (!select) return

  select.addEventListener('change', () => {
    const value = select.value
    update({ activePersonaId: value === '' ? null : value })
  })
}
