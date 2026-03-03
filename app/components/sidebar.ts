// app/components/sidebar.ts — Sidebar component: identity badge, group list, create button

import { getState, update } from '../state.js'
import type { AppGroup } from '../types.js'

// ── Helpers ────────────────────────────────────────────────────

/**
 * Convert a duration in seconds to a human-readable string.
 * Examples: 604800 → "7d", 86400 → "24h", 300 → "5m"
 */
export function formatInterval(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  if (days >= 1) return `${days}d`

  const hours = Math.floor(seconds / 3600)
  if (hours >= 1) return `${hours}h`

  const minutes = Math.floor(seconds / 60)
  return `${minutes}m`
}

function renderIdentityBadge(identity: { pubkey: string; displayName?: string } | null): string {
  if (!identity) return ''
  const label = identity.displayName ?? `${identity.pubkey.slice(0, 8)}…`
  return `
    <div class="identity-badge">
      <span class="identity-badge__name">${escapeHtml(label)}</span>
    </div>
  `
}

function renderGroupItems(
  groups: Record<string, AppGroup>,
  activeGroupId: string | null,
): string {
  const entries = Object.values(groups)
  if (entries.length === 0) {
    return `<div class="group-list__empty">No groups yet</div>`
  }

  return entries
    .map((group) => {
      const isActive = group.id === activeGroupId
      const modifier = isActive ? ' group-list__item--active' : ''
      const preset = formatInterval(group.livenessInterval)
      const windowLabel = formatInterval(group.livenessInterval)
      return `
        <button
          class="group-list__item${modifier}"
          data-group-id="${escapeHtml(group.id)}"
          aria-current="${isActive ? 'true' : 'false'}"
        >
          <span class="group-list__name">${escapeHtml(group.name)}</span>
          <span class="group-list__preset">${escapeHtml(preset)} · ${escapeHtml(windowLabel)}</span>
        </button>
      `
    })
    .join('')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ── Public API ─────────────────────────────────────────────────

/**
 * Render the sidebar into the given container element.
 * Includes: tagline, identity badge (if set), group list, create group button.
 */
export function renderSidebar(container: HTMLElement): void {
  const { identity, groups, activeGroupId } = getState()

  container.innerHTML = `
    <div class="sidebar__tagline">spoken-word verification</div>
    ${renderIdentityBadge(identity)}
    <nav class="group-list" aria-label="Groups">
      ${renderGroupItems(groups, activeGroupId)}
    </nav>
    <button class="btn btn--primary" id="create-group-btn">+ New Group</button>
  `

  // Wire up group selection
  const groupList = container.querySelector<HTMLElement>('.group-list')
  groupList?.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-group-id]')
    if (!target) return
    const id = target.dataset.groupId
    if (id) {
      update({ activeGroupId: id })
    }
  })

  // Wire up create group button
  const createBtn = container.querySelector<HTMLButtonElement>('#create-group-btn')
  createBtn?.addEventListener('click', () => {
    container.dispatchEvent(new CustomEvent('canary:create-group', { bubbles: true }))
  })
}
