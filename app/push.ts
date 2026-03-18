// app/push.ts — Web Push subscription management

const VAPID_PUBLIC_KEY = 'BK0z9Q_9v9e2AbxYa5wjEuCnjCoBdrcS84O8ZBAl9745GpAnhUUyPKUZ4AULVR7hxJGgTWbazij8P5ztxgd0boo'
const PUSH_SERVER_URL = 'https://canary.trotters.cc/push'

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

/**
 * Request notification permission and subscribe to Web Push.
 * Returns the PushSubscription JSON, or null if unavailable/denied.
 */
export async function subscribeToPush(): Promise<PushSubscriptionJSON | null> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return null

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return null

  const registration = await navigator.serviceWorker.ready
  const existing = await registration.pushManager.getSubscription()
  if (existing) return existing.toJSON()

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as any,
  })
  return subscription.toJSON()
}

/**
 * Get existing push subscription without prompting.
 */
export async function getExistingSubscription(): Promise<PushSubscriptionJSON | null> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return null
  const registration = await navigator.serviceWorker.ready
  const sub = await registration.pushManager.getSubscription()
  return sub ? sub.toJSON() : null
}

/**
 * Unsubscribe from push notifications.
 */
export async function unsubscribeFromPush(): Promise<void> {
  if (!('serviceWorker' in navigator)) return
  const registration = await navigator.serviceWorker.ready
  const sub = await registration.pushManager.getSubscription()
  if (sub) await sub.unsubscribe()
}

/**
 * Register the push subscription with the push server.
 */
export async function registerWithPushServer(
  subscription: PushSubscriptionJSON,
  groups: { tagHash: string; livenessInterval: number }[],
): Promise<void> {
  await fetch(`${PUSH_SERVER_URL}/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription, groups }),
  })
}

/**
 * Notify push server of a liveness check-in so it resets the reminder timer.
 */
export async function notifyCheckin(tagHash: string): Promise<void> {
  const sub = await getExistingSubscription()
  if (!sub?.endpoint) return
  await fetch(`${PUSH_SERVER_URL}/checkin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ endpoint: sub.endpoint, tagHash }),
  }).catch(() => {})
}

/**
 * Frictionless notification prompt — call after first group join/create.
 * Only prompts if permission hasn't been asked yet.
 */
export function shouldPromptForNotifications(): boolean {
  if (!('Notification' in window)) return false
  return Notification.permission === 'default'
}

/** True when push is fundamentally unavailable (e.g. iOS Safari not in PWA mode). */
export function isPushUnavailable(): boolean {
  return !('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)
}

/** True when running as an installed PWA (standalone / fullscreen). */
export function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches
    || (navigator as any).standalone === true
}

/** True on iOS (iPhone/iPad). */
export function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

/** True on macOS Safari (not Chrome/Firefox/etc). */
export function isMacSafari(): boolean {
  const ua = navigator.userAgent
  return /Macintosh/.test(ua) && /Safari/.test(ua) && !/Chrome|Chromium|Firefox|Edg/.test(ua) && navigator.maxTouchPoints === 0
}

/**
 * Should we show an "Add to Home Screen" prompt for push support?
 * Only on iOS Safari when not already running as a PWA.
 */
export function shouldPromptAddToHomeScreen(): boolean {
  return isIOS() && !isStandalone() && isPushUnavailable()
}
