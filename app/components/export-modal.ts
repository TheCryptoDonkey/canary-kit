// app/components/export-modal.ts — Export modal: reveal nsec, copy, QR, relay info

import { getPersona } from '../persona.js'
import { personaColour } from './persona-picker.js'
import { escapeHtml } from '../utils/escape.js'
import { getState } from '../state.js'
import { generateQR } from './qr.js'
import type { AppPersona } from '../types.js'

// ── Constants ──────────────────────────────────────────────────

const CLIPBOARD_WIPE_MS = 30_000
const MODAL_ID = 'export-modal'

// ── Public API ─────────────────────────────────────────────────

/**
 * Show an export modal for a persona's nsec, with context, reveal,
 * copy (nsec + npub), QR (npub only), and relay info.
 */
export function showExportModal(persona: AppPersona): void {
  // Remove any existing export modal
  document.getElementById(MODAL_ID)?.remove()

  const colour = personaColour(persona.name)
  const displayName = persona.displayName ?? persona.name
  const settings = getState().settings

  // Derive the full persona (with private key material)
  const fullPersona = getPersona(persona.name, persona.index)
  const nsec = fullPersona.identity.nsec
  const npub = fullPersona.identity.npub

  // Relay info
  const relays = persona.writeRelays?.length
    ? persona.writeRelays
    : settings.defaultWriteRelays

  // ── Build dialog ───────────────────────────────────────────

  const dialog = document.createElement('dialog')
  dialog.id = MODAL_ID
  dialog.className = 'modal export-modal'

  // All interpolated values are escaped via escapeHtml() — safe innerHTML usage
  // consistent with the rest of the codebase (header.ts, persona-picker.ts, modal.ts)
  dialog.innerHTML = `
    <div class="export-modal__content">
      <button class="export-modal__close" type="button" aria-label="Close">&times;</button>

      <h2 class="export-modal__title">
        Export nsec for
        <span class="export-modal__badge" style="background-color:${colour}">${escapeHtml(displayName.slice(0, 1).toUpperCase())}</span>
        ${escapeHtml(displayName)}
      </h2>

      <div class="export-modal__context">
        <p>This key gives full control of this persona. Only paste it into Nostr clients you trust.</p>
        <p>If this key is compromised, you can rotate the persona from here &mdash; your other personas are unaffected.</p>
        <p>Clipboard auto-clears after 30 seconds.</p>
      </div>

      <div class="export-modal__nsec-wrap" id="export-nsec-wrap">
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
        This persona publishes to: ${relays.map((r) => `<code>${escapeHtml(r)}</code>`).join(', ') || '<em>default relays</em>'}
      </div>
    </div>
  `

  document.body.appendChild(dialog)

  // ── Wire: close ────────────────────────────────────────────

  const closeBtn = dialog.querySelector<HTMLButtonElement>('.export-modal__close')
  closeBtn?.addEventListener('click', () => closeExportModal(dialog))

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeExportModal(dialog)
  })

  dialog.addEventListener('cancel', () => closeExportModal(dialog))

  // ── Wire: reveal ───────────────────────────────────────────

  const nsecWrap = dialog.querySelector<HTMLElement>('#export-nsec-wrap')
  const nsecCode = dialog.querySelector<HTMLElement>('#export-nsec-code')
  const overlay = dialog.querySelector<HTMLElement>('#export-reveal-overlay')

  nsecWrap?.addEventListener('click', () => {
    if (!nsecCode || !overlay) return
    nsecCode.style.filter = 'none'
    nsecCode.style.userSelect = 'all'
    overlay.hidden = true
  })

  // ── Wire: copy nsec ────────────────────────────────────────

  wireClipboardButton(dialog, '#export-copy-nsec', nsec, 'Copy nsec')

  // ── Wire: copy npub ────────────────────────────────────────

  wireClipboardButton(dialog, '#export-copy-npub', npub, 'Copy npub')

  // ── Wire: QR toggle ────────────────────────────────────────

  const qrBtn = dialog.querySelector<HTMLButtonElement>('#export-toggle-qr')
  const qrArea = dialog.querySelector<HTMLElement>('#export-qr-area')
  let qrVisible = false

  qrBtn?.addEventListener('click', () => {
    if (!qrArea || !qrBtn) return
    qrVisible = !qrVisible
    if (qrVisible) {
      // generateQR returns sanitised SVG from qrcode-generator — safe innerHTML
      qrArea.innerHTML = generateQR(npub)
      qrArea.hidden = false
      qrBtn.textContent = 'Hide QR'
    } else {
      qrArea.hidden = true
      qrArea.textContent = ''
      qrBtn.textContent = 'Show QR'
    }
  })

  // ── Show ───────────────────────────────────────────────────

  dialog.showModal()
}

// ── Internal helpers ───────────────────────────────────────────

/** Wire a clipboard-copy button with 30 s auto-wipe. */
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

/** Close and remove the dialog from the DOM. */
function closeExportModal(dialog: HTMLDialogElement): void {
  dialog.close()
  dialog.remove()
}
