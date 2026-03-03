// app/components/modal.ts — Reusable <dialog> modal wrapper

const MODAL_ID = 'app-modal'

/**
 * Show a modal dialog with the given HTML content.
 *
 * The content is wrapped in a `<form method="dialog">` so that the native
 * submit event fires when a `<button type="submit">` is clicked.
 *
 * @param content  HTML string for the form body (inputs, labels, action buttons).
 * @param onSubmit Optional callback receiving the form data on submission.
 */
export function showModal(content: string, onSubmit?: (form: FormData) => void): void {
  // Reuse an existing dialog or create a new one.
  let dialog = document.getElementById(MODAL_ID) as HTMLDialogElement | null
  if (!dialog) {
    dialog = document.createElement('dialog')
    dialog.id = MODAL_ID
    dialog.className = 'modal'
    document.body.appendChild(dialog)
  }

  dialog.innerHTML = `
    <form class="modal__form" method="dialog" id="modal-form">
      ${content}
    </form>
  `

  // Wire submit handler before showing so it's ready for the first render.
  if (onSubmit) {
    const form = dialog.querySelector<HTMLFormElement>('#modal-form')
    form?.addEventListener('submit', (e) => {
      e.preventDefault()
      const data = new FormData(form)
      onSubmit(data)
      closeModal()
    })
  }

  // Close on backdrop click (clicking outside the dialog element itself).
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      closeModal()
    }
  })

  dialog.showModal()
}

/** Close the active modal dialog. */
export function closeModal(): void {
  const dialog = document.getElementById(MODAL_ID) as HTMLDialogElement | null
  dialog?.close()
}
