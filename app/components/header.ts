// app/components/header.ts — Header component: brand, theme toggle, relay status

import { getState, update } from '../state.js'

// ── Types ──────────────────────────────────────────────────────

type Theme = 'dark' | 'light'

// ── Internal helpers ───────────────────────────────────────────

function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

function applyTheme(theme: Theme): void {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

function updateToggleLabel(btn: HTMLButtonElement): void {
  const theme = currentTheme()
  btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')
  btn.textContent = '◐'
}

function handleThemeToggle(btn: HTMLButtonElement): void {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  update({ settings: { ...getState().settings, theme: next } })
  updateToggleLabel(btn)
}

// ── Public API ─────────────────────────────────────────────────

/**
 * Render the header chrome into the given container element.
 * Produces: brand div, nav tabs, relay status indicator, and theme toggle button.
 */
export function renderHeader(container: HTMLElement): void {
  const view = getState().view

  container.innerHTML = `
    <button class="header__hamburger" id="hamburger" aria-label="Toggle menu">&#9776;</button>
    <div class="header__brand">CANARY</div>
    <nav class="header__nav" id="header-nav">
      <button class="header__nav-tab${view === 'groups' ? ' header__nav-tab--active' : ''}" data-view="groups">Groups</button>
      <button class="header__nav-tab${view === 'call-demo' ? ' header__nav-tab--active' : ''}" data-view="call-demo">Call Demo</button>
    </nav>
    <div class="header__actions">
      <span id="relay-status" hidden>
        <span class="relay-dot"></span>
        <span class="relay-label"></span>
      </span>
      <button class="theme-toggle" id="theme-toggle" aria-label="Switch to light mode">&#9680;</button>
      <button class="theme-toggle" id="reset-btn" aria-label="Reset demo" title="Clear all data and reset">&#8634;</button>
    </div>
  `

  const btn = container.querySelector<HTMLButtonElement>('#theme-toggle')
  if (btn) {
    updateToggleLabel(btn)
    btn.addEventListener('click', () => handleThemeToggle(btn))
  }

  const resetBtn = container.querySelector<HTMLButtonElement>('#reset-btn')
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Clear all data and reset the demo?')) {
        localStorage.clear()
        window.location.reload()
      }
    })
  }

  const nav = container.querySelector<HTMLElement>('#header-nav')
  nav?.addEventListener('click', (e) => {
    const tab = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-view]')
    if (!tab) return
    const targetView = tab.dataset.view as 'groups' | 'call-demo'
    if (targetView && targetView !== getState().view) {
      update({ view: targetView })
    }
  })
}

export type SyncStatus = 'synced' | 'syncing' | 'offline'

/**
 * Update the sync status indicator in the header.
 * Shows: green dot + "Synced" / amber dot + "Syncing..." / red dot + "Offline"
 */
export function updateRelayStatus(connected: boolean, count: number): void {
  const indicator = document.getElementById('relay-status')
  if (!indicator) return

  const dot = indicator.querySelector<HTMLElement>('.relay-dot')
  const label = indicator.querySelector<HTMLElement>('.relay-label')

  if (!connected || count === 0) {
    indicator.removeAttribute('hidden')
    dot?.setAttribute('class', 'relay-dot relay-dot--offline')
    if (label) label.textContent = 'Offline'
    indicator.title = 'Not connected to any relay'
  } else {
    indicator.removeAttribute('hidden')
    dot?.setAttribute('class', 'relay-dot relay-dot--synced')
    if (label) label.textContent = `Synced · ${count} relay${count === 1 ? '' : 's'}`
    indicator.title = `Connected to ${count} relay${count === 1 ? '' : 's'}`
  }
}

/** Show a brief "syncing" state that auto-resolves to synced. */
export function flashSyncing(): void {
  const indicator = document.getElementById('relay-status')
  if (!indicator) return
  const dot = indicator.querySelector<HTMLElement>('.relay-dot')
  const label = indicator.querySelector<HTMLElement>('.relay-label')

  indicator.removeAttribute('hidden')
  dot?.setAttribute('class', 'relay-dot relay-dot--syncing')
  if (label) label.textContent = 'Syncing...'
}
