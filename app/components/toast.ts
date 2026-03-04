// app/components/toast.ts — Toast notification system

/** Show a toast notification. Auto-dismisses after durationMs. */
export function showToast(
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' = 'info',
  durationMs = 4000,
): void {
  const container = document.getElementById('toast-container') ?? createToastContainer()
  const toast = document.createElement('div')
  toast.className = `toast toast--${type}`
  toast.textContent = message
  container.appendChild(toast)
  requestAnimationFrame(() => toast.classList.add('toast--visible'))
  setTimeout(() => {
    toast.classList.remove('toast--visible')
    setTimeout(() => toast.remove(), 300)
  }, durationMs)
}

function createToastContainer(): HTMLElement {
  const el = document.createElement('div')
  el.id = 'toast-container'
  el.className = 'toast-container'
  document.body.appendChild(el)
  return el
}
