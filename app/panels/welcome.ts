// app/panels/welcome.ts — Full-screen welcome for first-time users.
// Hides itself once at least one group exists.

import { getState } from '../state.js'

export function renderWelcome(container: HTMLElement): void {
  const { groups } = getState()
  if (Object.keys(groups).length > 0) {
    container.hidden = true
    return
  }

  container.hidden = false
  container.innerHTML = `
    <section class="welcome">
      <h1 class="welcome__title">CANARY</h1>
      <p class="welcome__subtitle">Protect your people with rotating verification words</p>

      <div class="welcome__steps">
        <div class="welcome__step">
          <span class="welcome__step-num">01</span>
          <span class="welcome__step-text">Create a group with your family or team</span>
        </div>
        <div class="welcome__step">
          <span class="welcome__step-num">02</span>
          <span class="welcome__step-text">Share the invite — in person or via paste code</span>
        </div>
        <div class="welcome__step">
          <span class="welcome__step-num">03</span>
          <span class="welcome__step-text">Everyone derives the same word from the shared seed</span>
        </div>
        <div class="welcome__step">
          <span class="welcome__step-num">04</span>
          <span class="welcome__step-text">Words rotate automatically. Duress words signal danger.</span>
        </div>
      </div>

      <div class="welcome__actions">
        <button class="btn btn--primary btn--lg" id="welcome-create">Create Group</button>
        <button class="btn btn--ghost btn--lg" id="welcome-join">Join with Invite</button>
      </div>
    </section>
  `

  document.getElementById('welcome-create')!.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('canary:create-group'))
  })

  document.getElementById('welcome-join')!.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('canary:join-group'))
  })
}
