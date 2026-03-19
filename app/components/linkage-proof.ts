// app/components/linkage-proof.ts — Linkage proof generation and verification modals
//
// All user-controlled values are escaped via escapeHtml() before interpolation
// into innerHTML. This matches the established codebase pattern.

import { resolveIdentity } from '../persona.js'
import { getState } from '../state.js'
import { findById } from '../persona-tree.js'
import { escapeHtml } from '../utils/escape.js'
import { personaColour } from './persona-picker.js'
import { fromNsec } from 'nsec-tree/core'
import { createBlindProof, createFullProof, verifyProof } from 'nsec-tree/proof'
import type { LinkageProof } from 'nsec-tree/core'
import { npubEncode } from 'nostr-tools/nip19'

// ── Helpers ────────────────────────────────────────────────────

const DIALOG_ID_PROVE = 'linkage-prove-dialog'
const DIALOG_ID_VERIFY = 'linkage-verify-dialog'

/** Get or create a dialog element with the given id. */
function getOrCreateDialog(id: string): HTMLDialogElement {
  let dialog = document.getElementById(id) as HTMLDialogElement | null
  if (!dialog) {
    dialog = document.createElement('dialog')
    dialog.id = id
    dialog.className = 'modal'
    document.body.appendChild(dialog)
  }
  return dialog
}

/** Wire standard dismiss behaviour: backdrop click, X button, Escape. */
function wireDismiss(dialog: HTMLDialogElement): void {
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close()
  })
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close())
}

/** Trigger a file download via a temporary anchor element. */
function downloadJson(filename: string, data: string): void {
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}

/** Build a coloured badge dot for a persona name. */
function badge(name: string): string {
  return `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${personaColour(name)};margin-right:4px;vertical-align:middle;"></span>`
}

/** Convert hex pubkey to npub. */
function hexToNpub(hex: string): string {
  try {
    return npubEncode(hex)
  } catch {
    return hex
  }
}

// ── Prove Ownership Modal ─────────────────────────────────────

/**
 * Show the "Prove ownership" flow for a persona.
 * Proves this persona derives from the master key.
 */
export function showProveOwnershipModal(personaId: string): void {
  const { personas, identity } = getState()
  const found = findById(personas, personaId)
  if (!found) {
    alert('Persona not found.')
    return
  }

  if (!identity?.privkey) {
    alert('No master key available.')
    return
  }

  const { persona, ancestors } = found
  const personaName = persona.name
  // All values below are escaped before interpolation
  const pathStr = escapeHtml([...ancestors.map(a => a.name), personaName].join(' / '))
  const badgeHtml = badge(personaName)
  const nameHtml = escapeHtml(personaName)

  const dialog = getOrCreateDialog(DIALOG_ID_PROVE)

  // Static template — all dynamic values escaped via escapeHtml()
  dialog.innerHTML = `
    <div class="modal__form" style="max-width:32rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
        <h2 style="margin:0;font-size:1.125rem;">Prove Ownership</h2>
        <button data-close style="background:none;border:none;cursor:pointer;font-size:1.25rem;color:var(--text,#e0e0e0);">&times;</button>
      </div>

      <p style="margin:0 0 1rem;color:var(--text-secondary,#aaa);font-size:0.875rem;">
        Prove ${badgeHtml}<strong>${nameHtml}</strong> derives from your master key.
      </p>

      <div style="margin-bottom:1rem;font-family:var(--font-mono,monospace);font-size:0.75rem;color:var(--text-muted,#999);">
        Path: ${pathStr}
      </div>

      <fieldset style="border:1px solid var(--border,#444);border-radius:6px;padding:0.75rem;margin-bottom:1rem;">
        <legend style="font-size:0.8125rem;color:var(--text-secondary,#aaa);padding:0 0.25rem;">Proof type</legend>
        <label style="display:block;margin-bottom:0.5rem;cursor:pointer;">
          <input type="radio" name="lp-type" value="blind" checked />
          <strong>Blind</strong>
          <span style="display:block;margin-left:1.25rem;font-size:0.75rem;color:var(--text-secondary,#aaa);">Proves ownership without revealing your master identity.</span>
        </label>
        <label style="display:block;cursor:pointer;">
          <input type="radio" name="lp-type" value="full" />
          <strong>Full</strong>
          <span style="display:block;margin-left:1.25rem;font-size:0.75rem;color:var(--text-secondary,#aaa);">Reveals your master identity and derivation path. For legal/compliance only.</span>
        </label>
      </fieldset>

      <button id="lp-generate" class="btn btn--primary" style="width:100%;margin-bottom:1rem;">Generate proof</button>

      <div id="lp-result" style="display:none;">
        <pre id="lp-json" style="background:var(--surface,#1e1e2e);border:1px solid var(--border,#444);border-radius:6px;padding:0.75rem;overflow-x:auto;font-size:0.75rem;max-height:16rem;overflow-y:auto;white-space:pre-wrap;word-break:break-all;"></pre>
        <div style="display:flex;gap:0.5rem;margin-top:0.5rem;">
          <button id="lp-copy" class="btn" style="flex:1;">Copy</button>
          <button id="lp-download" class="btn" style="flex:1;">Download .json</button>
        </div>
      </div>
    </div>
  `

  wireDismiss(dialog)

  let currentProofJson = ''
  let currentFilename = ''

  dialog.querySelector('#lp-generate')?.addEventListener('click', () => {
    const proofTypeInput = dialog.querySelector<HTMLInputElement>('input[name="lp-type"]:checked')
    const proofType = proofTypeInput?.value === 'full' ? 'full' : 'blind'

    // Resolve the persona's identity through the derivation chain
    const personaIdentity = resolveIdentity(persona, ancestors)

    // Create proof from master root to this persona
    const privkeyBytes = new Uint8Array(
      (identity!.privkey!.match(/.{2}/g) ?? []).map(h => parseInt(h, 16))
    )
    const masterRoot = fromNsec(privkeyBytes)
    try {
      const proof: LinkageProof = proofType === 'blind'
        ? createBlindProof(masterRoot, personaIdentity)
        : createFullProof(masterRoot, personaIdentity)

      currentProofJson = JSON.stringify(proof, null, 2)
      const timestamp = Math.floor(Date.now() / 1000)
      currentFilename = `proof-${escapeHtml(personaName)}-${timestamp}.json`

      const pre = dialog.querySelector('#lp-json') as HTMLPreElement | null
      if (pre) pre.textContent = currentProofJson

      const resultDiv = dialog.querySelector('#lp-result') as HTMLElement | null
      if (resultDiv) resultDiv.style.display = 'block'
    } finally {
      masterRoot.destroy()
    }
  })

  dialog.querySelector('#lp-copy')?.addEventListener('click', () => {
    if (currentProofJson) {
      navigator.clipboard.writeText(currentProofJson).catch(() => {})
    }
  })

  dialog.querySelector('#lp-download')?.addEventListener('click', () => {
    if (currentProofJson && currentFilename) {
      downloadJson(currentFilename, currentProofJson)
    }
  })

  dialog.showModal()
}

// ── Verify Proof Modal ────────────────────────────────────────

/** Show the "Verify proof" modal. */
export function showVerifyProofModal(): void {
  const dialog = getOrCreateDialog(DIALOG_ID_VERIFY)

  // Static template — no dynamic user data in initial render
  dialog.innerHTML = `
    <div class="modal__form" style="max-width:32rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
        <h2 style="margin:0;font-size:1.125rem;">Verify Linkage Proof</h2>
        <button data-close style="background:none;border:none;cursor:pointer;font-size:1.25rem;color:var(--text,#e0e0e0);">&times;</button>
      </div>

      <label style="display:block;margin-bottom:0.75rem;">
        <span style="font-size:0.8125rem;color:var(--text-secondary,#aaa);">Paste a linkage proof JSON</span>
        <textarea id="vp-input" rows="8" style="display:block;width:100%;margin-top:0.25rem;padding:0.5rem;border-radius:6px;border:1px solid var(--border,#444);background:var(--surface,#1e1e2e);color:var(--text,#e0e0e0);font-family:monospace;font-size:0.75rem;resize:vertical;" placeholder='{"masterPubkey":"...","childPubkey":"...","attestation":"...","signature":"..."}'></textarea>
      </label>

      <button id="vp-verify" class="btn btn--primary" style="width:100%;margin-bottom:1rem;">Verify</button>

      <div id="vp-result" style="display:none;padding:0.75rem;border-radius:6px;border:1px solid var(--border,#444);font-size:0.875rem;"></div>
    </div>
  `

  wireDismiss(dialog)

  dialog.querySelector('#vp-verify')?.addEventListener('click', () => {
    const textarea = dialog.querySelector('#vp-input') as HTMLTextAreaElement | null
    const resultDiv = dialog.querySelector('#vp-result') as HTMLElement | null
    if (!textarea || !resultDiv) return

    const raw = textarea.value.trim()
    if (!raw) {
      showVerifyResult(resultDiv, 'error', 'Please paste a proof JSON.')
      return
    }

    let proof: LinkageProof
    try {
      proof = JSON.parse(raw) as LinkageProof
    } catch {
      showVerifyResult(resultDiv, 'error', 'Invalid JSON.')
      return
    }

    try {
      const valid = verifyProof(proof)

      if (valid) {
        showVerifyResult(resultDiv, 'success', '', proof)
      } else {
        showVerifyResult(resultDiv, 'error', 'Invalid proof \u2014 signature verification failed.')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      showVerifyResult(resultDiv, 'error', msg)
    }
  })

  dialog.showModal()
}

/** Render a verification result into the result container using safe DOM methods. */
function showVerifyResult(container: HTMLElement, type: 'success' | 'error', message: string, proof?: LinkageProof): void {
  container.style.display = 'block'
  container.textContent = ''

  if (type === 'error') {
    container.style.borderColor = 'var(--clr-danger, #e74c3c)'
    const span = document.createElement('span')
    span.style.color = 'var(--clr-danger, #e74c3c)'
    span.textContent = `\u2717 ${message}`
    container.appendChild(span)
    return
  }

  // Success
  container.style.borderColor = 'var(--clr-success, #27ae60)'

  const heading = document.createElement('div')
  heading.style.cssText = 'color:var(--clr-success, #27ae60);font-weight:600;margin-bottom:0.5rem;'
  heading.textContent = '\u2713 Valid proof'
  container.appendChild(heading)

  if (proof) {
    const details = document.createElement('div')
    details.style.cssText = 'font-size:0.75rem;color:var(--text-secondary,#aaa);'

    const masterNpub = hexToNpub(proof.masterPubkey)
    const childNpub = hexToNpub(proof.childPubkey)

    const masterRow = document.createElement('div')
    masterRow.style.marginBottom = '0.25rem'
    const masterLabel = document.createElement('strong')
    masterLabel.textContent = 'Master: '
    const masterCode = document.createElement('code')
    masterCode.style.wordBreak = 'break-all'
    masterCode.textContent = masterNpub
    masterRow.appendChild(masterLabel)
    masterRow.appendChild(masterCode)

    const childRow = document.createElement('div')
    const childLabel = document.createElement('strong')
    childLabel.textContent = 'Persona: '
    const childCode = document.createElement('code')
    childCode.style.wordBreak = 'break-all'
    childCode.textContent = childNpub
    childRow.appendChild(childLabel)
    childRow.appendChild(childCode)

    details.appendChild(masterRow)
    details.appendChild(childRow)
    container.appendChild(details)
  }
}
