// app/components/recovery-root-modal.ts — Create or restore a mnemonic-backed root identity

const MODAL_ID = 'recovery-root-modal'
const STYLE_ID = 'recovery-root-modal-styles'

const STYLES = `
  .recovery-root-modal::backdrop { background: rgba(0, 0, 0, 0.72); }
  .recovery-root-modal {
    width: min(42rem, calc(100vw - 2rem));
    max-width: 42rem;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--bg-surface);
    color: var(--text-primary);
    padding: 0;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  }
  .recovery-root-modal__content { padding: 1rem; display: grid; gap: 1rem; }
  .recovery-root-modal__close {
    justify-self: end; background: none; border: none; color: var(--text-muted);
    font-size: 1.5rem; cursor: pointer; line-height: 1; padding: 0;
  }
  .recovery-root-modal__title { margin: 0; font-size: 1.1rem; color: var(--text-bright); }
  .recovery-root-modal__sub { margin: 0; font-size: 0.8rem; line-height: 1.55; color: var(--text-secondary); }
  .recovery-root-modal__grid { display: grid; gap: 1rem; }
  .recovery-root-modal__card {
    border: 1px solid var(--border); border-radius: 8px; padding: 0.9rem;
    background: var(--bg-deep); display: grid; gap: 0.65rem;
  }
  .recovery-root-modal__card h3 { margin: 0; font-size: 0.95rem; }
  .recovery-root-modal__hint { margin: 0; font-size: 0.76rem; line-height: 1.55; color: var(--text-muted); }
  .recovery-root-modal__field { display: grid; gap: 0.35rem; }
  .recovery-root-modal__field label { font-size: 0.74rem; color: var(--text-muted); }
  .recovery-root-modal__field textarea, .recovery-root-modal__field input {
    width: 100%; font: inherit; padding: 0.55rem 0.7rem; border-radius: 6px;
    border: 1px solid var(--border); background: var(--bg-surface); color: var(--text-primary);
  }
  .recovery-root-modal__actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
`

export function showRecoveryRootModal(): void {
  document.getElementById(MODAL_ID)?.remove()
  ensureStyles()

  const dialog = document.createElement('dialog')
  dialog.id = MODAL_ID
  dialog.className = 'modal recovery-root-modal'
  dialog.innerHTML = `
    <div class="recovery-root-modal__content">
      <button class="recovery-root-modal__close" type="button" aria-label="Close">&times;</button>
      <h2 class="recovery-root-modal__title">Create or restore a mnemonic-backed root</h2>
      <p class="recovery-root-modal__sub">
        An imported <code>nsec</code> can already derive an <code>nsec-tree</code> hierarchy. A mnemonic-backed root adds recovery features: a 12-word phrase and Shamir backup for the root itself.
      </p>

      <div class="recovery-root-modal__grid">
        <div class="recovery-root-modal__card">
          <h3>Create new mnemonic root</h3>
          <p class="recovery-root-modal__hint">Generate a fresh 12-word recovery phrase and switch to a brand new root. This does not convert the current imported nsec in place.</p>
          <label class="recovery-root-modal__field">
            <span>Name</span>
            <input class="input" id="recovery-root-name" type="text" placeholder="Your name" autocomplete="off" />
          </label>
          <div class="recovery-root-modal__actions">
            <button class="btn btn--primary" id="recovery-root-create" type="button">Create new mnemonic root</button>
          </div>
        </div>

        <div class="recovery-root-modal__card">
          <h3>Restore existing mnemonic root</h3>
          <p class="recovery-root-modal__hint">Paste the 12-word recovery phrase for an existing <code>nsec-tree</code> root. This restores the same deterministic tree and its recovery features.</p>
          <label class="recovery-root-modal__field">
            <span>Recovery phrase</span>
            <textarea class="input" id="recovery-root-mnemonic" rows="3" placeholder="Enter your 12 recovery words..."></textarea>
          </label>
          <div class="recovery-root-modal__actions">
            <button class="btn btn--primary" id="recovery-root-restore" type="button">Restore mnemonic root</button>
          </div>
        </div>
      </div>
    </div>
  `

  document.body.appendChild(dialog)

  dialog.querySelector<HTMLButtonElement>('.recovery-root-modal__close')?.addEventListener('click', () => closeModal(dialog))
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeModal(dialog)
  })
  dialog.addEventListener('cancel', () => closeModal(dialog))

  dialog.querySelector<HTMLButtonElement>('#recovery-root-create')?.addEventListener('click', () => {
    const name = dialog.querySelector<HTMLInputElement>('#recovery-root-name')?.value.trim() ?? ''
    if (!name) {
      alert('Please enter a name for the new mnemonic-backed root.')
      return
    }
    document.dispatchEvent(new CustomEvent('canary:create-recovery-root', { detail: { name } }))
    closeModal(dialog)
  })

  dialog.querySelector<HTMLButtonElement>('#recovery-root-restore')?.addEventListener('click', () => {
    const mnemonic = dialog.querySelector<HTMLTextAreaElement>('#recovery-root-mnemonic')?.value.trim() ?? ''
    if (!mnemonic) {
      alert('Please paste a recovery phrase first.')
      return
    }
    document.dispatchEvent(new CustomEvent('canary:restore-recovery-root', { detail: { mnemonic } }))
    closeModal(dialog)
  })

  dialog.showModal()
}

function closeModal(dialog: HTMLDialogElement): void {
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
