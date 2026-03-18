/** Render the identity hub view. Stub — will be replaced in Task 5. */
export function renderIdentities(container: HTMLElement): void {
  if (container.querySelector('.identities-stub')) return
  container.textContent = ''
  const div = document.createElement('div')
  div.className = 'identities-stub'
  div.style.padding = '20px'
  const h2 = document.createElement('h2')
  h2.textContent = 'Identities'
  const p = document.createElement('p')
  p.textContent = 'Coming soon'
  div.appendChild(h2)
  div.appendChild(p)
  container.appendChild(div)
}
