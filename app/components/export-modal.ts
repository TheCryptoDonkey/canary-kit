// app/components/export-modal.ts — Export modal: reveal nsec, copy, QR, relay info
import { getPersona } from '../persona.js'
import { personaColour } from './persona-picker.js'
import { escapeHtml } from '../utils/escape.js'
import { getState } from '../state.js'
import { generateQR } from './qr.js'
import { identityNodeLabel, identityNodeType } from '../types.js'
import type { AppPersona } from '../types.js'
// ── Constants ──────────────────────────────────────────────────
const CLIPBOARD_WIPE_MS = 30_000
const MODAL_ID = 'export-modal'
const STYLE_ID = 'export-modal-styles'
const STYLES = `
  .export-modal::backdrop { background: rgba(0, 0, 0, 0.72); }
  .export-modal {
    width: min(42rem, calc(100vw - 2rem));
    max-width: 42rem;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--bg-surface);
    color: var(--text-primary);
    padding: 0;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  }
  .export-modal__content { padding: 1rem; display: grid; gap: 0.875rem; }
  .export-modal__close {
    justify-self: end; background: none; border: none; color: var(--text-muted);
    font-size: 1.5rem; cursor: pointer; line-height: 1; padding: 0;
  }
  .export-modal__title { margin: 0; font-size: 1.1rem; color: var(--text-bright); line-height: 1.4; }
  .export-modal__badge {
    display: inline-flex; width: 1.5rem; height: 1.5rem; border-radius: 999px;
    align-items: center; justify-content: center; color: #fff; font-size: 0.75rem; margin: 0 0.35rem;
  }
  .export-modal__context { display: grid; gap: 0.45rem; }
  .export-modal__context p, .export-modal__relays {
    margin: 0; font-size: 0.78rem; color: var(--text-secondary); line-height: 1.55;
  }
  .export-modal__nsec-wrap {
    position: relative; border: 1px solid var(--border); border-radius: 8px;
    background: var(--bg-deep); padding: 0.9rem; overflow: hidden;
  }
  .export-modal__label {
    display: block; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--text-muted); margin-bottom: 0.5rem;
  }
  .export-modal__nsec {
    display: block; font-family: var(--font-mono); font-size: 0.75rem; line-height: 1.55;
    word-break: break-all; white-space: pre-wrap; padding-right: 0.25rem;
  }
  .export-modal__reveal-overlay {
    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
    background: rgba(10, 13, 18, 0.72); color: var(--text-bright); font-size: 0.82rem; cursor: pointer;
  }
  .export-modal__actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .export-modal__qr { border: 1px solid var(--border); border-radius: 8px; padding: 0.75rem; background: #fff; justify-self: center; }
`
// ── Public API ─────────────────────────────────────────────────
/**
 * Show an export modal for a persona's nsec, with context, reveal,
 * copy (nsec + npub), QR (npub only), and relay info.
 */
export function showExportModal(persona: AppPersona): void {
  document.getElementById(MODAL_ID)?.remove()
  ensureStyles()
  const colour = personaColour(persona.name)
  const displayName = persona.displayName ?? persona.name
  const settings = getState().settings
  const nodeLabel = identityNodeLabel(persona).toLowerCase()
  const isAccount = identityNodeType(persona) === 'account'
  const fullPersona = getPersona(persona.name, persona.index)
  const nsec = fullPersona.identity.nsec
  const npub = fullPersona.identity.npub
  const relays = persona.writeRelays?.length
    ? persona.writeRelays
    : settings.defaultWriteRelays
  const dialog = document.createElement('dialog')
  dialog.id = MODAL_ID
  dialog.className = 'modal export-modal'
  dialog.innerHTML = `
    <div class="export-modal__content">
      <button class="export-modal__close" type="button" aria-label="Close">&times;</button>
      <h2 class="export-modal__title">
        Export nsec for
        <span class="export-modal__badge" style="background-color:${colour}">${escapeHtml(displayName.slice(0, 1).toUpperCase())}</span>
        ${escapeHtml(displayName)}
      </h2>
      <div class="export-modal__context">
        <p>This key gives full control of this ${escapeHtml(nodeLabel)}. Only paste it into Nostr clients you trust.</p>
        <p>${isAccount ? 'Anonymous accounts are unlinkable by default unless you later choose to generate a proof.' : 'If this key is compromised, you can rotate this persona without affecting your other branches.'}</p>
        <p>Clipboard auto-clears after 30 seconds.</p>
      </div>
      <div class="export-modal__nsec-wrap" id="export-nsec-wrap">
        <span class="export-modal__label">${escapeHtml(nodeLabel)} nsec</span>
        <code class="export-modal__nsec" id="export-nsec-code" style="filter:blur(5px);user-select:none;">${escapeHtml(nsec)}</code>
        <div class="export-modal__reveal-overlay" id="export-reveal-overlay">Click to reveal</div>
      </div>
      <div class="export-modal__actions">
        <button class="btn btn--sm" id="export-copy-nsec" type="button">Copy nsec</button>
        <button class="btn btn--sm" id="export-copy-npub" type="button">Copy npub</button>
        <button class="btn btn--sm" id="export-toggle-qr" type="button">Show QR</button>
      </div>
      <div class="export-modal__qr" id="export-qr-area" hidden></div>
      <div class="export-modal__relays">
        This ${escapeHtml(nodeLabel)} publishes to: ${relays.map((r) => `<code>${escapeHtml(r)}</code>`).join(', ') || '<em>default relays</em>'}
      </div>
    </div>
  `
  document.body.appendChild(dialog)
  dialog.querySelector<HTMLButtonElement>('.export-modal__close')?.addEventListener('click', () => closeExportModal(dialog))
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeExportModal(dialog)
  })
  dialog.addEventListener('cancel', () => closeExportModal(dialog))
  const nsecWrap = dialog.querySelector<HTMLElement>('#export-nsec-wrap')
  const nsecCode = dialog.querySelector<HTMLElement>('#export-nsec-code')
  const overlay = dialog.querySelector<HTMLElement>('#export-reveal-overlay')
  nsecWrap?.addEventListener('click', () => {
    if (!nsecCode || !overlay) return
    nsecCode.style.filter = 'none'
    nsecCode.style.userSelect = 'all'
    overlay.hidden = true
  })
  wireClipboardButton(dialog, '#export-copy-nsec', nsec, 'Copy nsec')
  wireClipboardButton(dialog, '#export-copy-npub', npub, 'Copy npub')
  const qrBtn = dialog.querySelector<HTMLButtonElement>('#export-toggle-qr')
  const qrArea = dialog.querySelector<HTMLElement>('#export-qr-area')
  let qrVisible = false
  qrBtn?.addEventListener('click', () => {
    if (!qrArea || !qrBtn) return
    qrVisible = !qrVisible
    if (qrVisible) {
      qrArea.innerHTML = generateQR(npub)
      qrArea.hidden = false
      qrBtn.textContent = 'Hide QR'
    } else {
      qrArea.hidden = true
      qrArea.textContent = ''
      qrBtn.textContent = 'Show QR'
    }
  })
  dialog.showModal()
}
// ── Internal helpers ───────────────────────────────────────────
function wireClipboardButton(
  dialog: HTMLElement,
  selector: string,
  value: string,
  label: string,
): void {
  const btn = dialog.querySelector<HTMLButtonElement>(selector)
  btn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(value)
      btn.textContent = '\u2713 Copied!'
      setTimeout(() => { btn.textContent = label }, 2000)
      setTimeout(() => { navigator.clipboard.writeText('').catch(() => {}) }, CLIPBOARD_WIPE_MS)
    } catch { /* clipboard may be blocked */ }
  })
}
function closeExportModal(dialog: HTMLDialogElement): void {
  dialog.close()
  dialog.remove()
}
function ensureStyles(): void {
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = STYLES
  document.head.appendChild(style)
}
