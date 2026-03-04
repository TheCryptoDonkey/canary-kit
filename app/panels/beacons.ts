// app/panels/beacons.ts — Beacons panel: MapLibre map with member location markers

import { getState } from '../state.js'
import { broadcastAction } from '../sync.js'
import { deriveBeaconKey, encryptBeacon } from 'canary-kit'
import { encode, decode } from 'geohash-kit'

let map: any = null
let maplibreLoaded = false
let markers: Record<string, any> = {}
let positions: Record<string, { lat: number; lon: number; geohash: string; precision: number; timestamp: number }> = {}
let encryptedPayloads: Record<string, string> = {}
let geoWatchId: number | null = null

const MAPLIBRE_JS = 'https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.js'
const MAPLIBRE_CSS = 'https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.css'

async function loadMapLibre(): Promise<void> {
  if (maplibreLoaded) return

  // Load CSS
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = MAPLIBRE_CSS
  document.head.appendChild(link)

  // Load JS
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = MAPLIBRE_JS
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })

  maplibreLoaded = true
}

export async function renderBeacons(container: HTMLElement): Promise<void> {
  const { groups, activeGroupId } = getState()
  if (!activeGroupId || !groups[activeGroupId]) {
    if (map) { map.remove(); map = null }
    container.innerHTML = ''
    return
  }

  // If map is already initialised, skip re-rendering to preserve the live
  // MapLibre instance (replacing innerHTML would orphan the GL context).
  if (map && document.getElementById('beacon-map')) return

  container.innerHTML = `
    <section class="panel beacon-panel">
      <h3 class="panel__title">Location</h3>
      <div class="beacon-map" id="beacon-map" style="height: 500px; border-radius: 8px;"></div>
      ${geoWatchId === null ? '<button class="btn btn--primary" id="beacon-share-btn" type="button">Share Location</button>' : ''}
      <div class="beacon-list" id="beacon-list"></div>
    </section>
  `

  container.querySelector<HTMLButtonElement>('#beacon-share-btn')?.addEventListener('click', () => {
    startBeaconWatch()
    const btn = container.querySelector<HTMLButtonElement>('#beacon-share-btn')
    if (btn) btn.remove()
  })

  try {
    await loadMapLibre()
    initMap()
    startBeaconWatch()
  } catch {
    container.querySelector('.beacon-map')!.innerHTML =
      '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Map unavailable offline</p>'
  }
}

function initMap(): void {
  const mapEl = document.getElementById('beacon-map')
  if (!mapEl || map) return

  const isDark = document.documentElement.dataset.theme !== 'light'
  const style = isDark
    ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
    : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

  map = new (window as any).maplibregl.Map({
    container: mapEl,
    style,
    center: [-0.1278, 51.5074], // London default
    zoom: 12,
  })
}

function startBeaconWatch(): void {
  if (geoWatchId !== null) return
  if (!('geolocation' in navigator)) return

  const { groups, activeGroupId, identity } = getState()
  if (!activeGroupId || !groups[activeGroupId] || !identity?.pubkey) return

  const group = groups[activeGroupId]
  const beaconKey = deriveBeaconKey(group.seed)

  // Town-level precision (5 ≈ 2.4 km cell radius) — never share exact GPS
  const geohashPrecision = group.beaconPrecision || 5

  geoWatchId = navigator.geolocation.watchPosition(
    async (pos) => {
      // Encode to geohash at town level, then decode center — this snaps
      // the coordinate to the geohash cell center, discarding fine detail.
      const geohash = encode(pos.coords.latitude, pos.coords.longitude, geohashPrecision)
      const center = decode(geohash)
      const lat = center.lat
      const lon = center.lon

      const encrypted = await encryptBeacon(beaconKey, geohash, geohashPrecision)
      if (identity?.pubkey) {
        encryptedPayloads[identity.pubkey] = encrypted
        positions[identity.pubkey] = { lat, lon, geohash, precision: geohashPrecision, timestamp: Math.floor(Date.now() / 1000) }
        updateMapMarker(identity.pubkey, lat, lon)
        fitMapToMarkers()
        updateBeaconList()

        // Broadcast geohash center (not raw GPS) to group members
        if (activeGroupId) {
          broadcastAction(activeGroupId, {
            type: 'beacon',
            lat,
            lon,
            geohash,
            timestamp: Math.floor(Date.now() / 1000),
          })
        }
      }
    },
    () => { /* geolocation error — silent */ },
    { enableHighAccuracy: false, maximumAge: 60000 },
  )
}

function updateMapMarker(pubkey: string, lat: number, lon: number): void {
  if (!map) return
  const maplibregl = (window as any).maplibregl

  if (markers[pubkey]) {
    markers[pubkey].setLngLat([lon, lat])
  } else {
    const el = document.createElement('div')
    el.style.width = '12px'
    el.style.height = '12px'
    el.style.borderRadius = '50%'
    el.style.background = '#f59e0b'
    el.style.border = '2px solid #0a0e17'
    markers[pubkey] = new maplibregl.Marker({ element: el }).setLngLat([lon, lat]).addTo(map)
  }
}

/** Zoom map to fit all member markers with padding. */
function fitMapToMarkers(): void {
  if (!map) return
  const allPositions = Object.values(positions)
  if (allPositions.length === 0) return
  if (allPositions.length === 1) {
    map.flyTo({ center: [allPositions[0].lon, allPositions[0].lat], zoom: 13 })
    return
  }
  const lngs = allPositions.map(p => p.lon)
  const lats = allPositions.map(p => p.lat)
  map.fitBounds(
    [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
    { padding: 60, maxZoom: 14 },
  )
}

function updateBeaconList(): void {
  const listEl = document.getElementById('beacon-list')
  if (!listEl) return

  const entries = Object.entries(positions).map(([pk, pos]) => {
    const encrypted = encryptedPayloads[pk]
    const truncated = encrypted ? encrypted.slice(0, 24) + '…' : 'n/a'
    return `
      <div class="beacon-entry">
        <span class="beacon-member">${pk.slice(0, 8)}…</span>
        <span class="beacon-geohash">${pos.geohash}</span>
        <span class="beacon-encrypted" title="${encrypted ?? ''}">${truncated}</span>
      </div>
    `
  }).join('')

  listEl.innerHTML = entries || '<p class="settings-hint">No beacons yet — enable location to start</p>'
}

// ── Duress event listener ───────────────────────────────────────

document.addEventListener('canary:duress', ((e: CustomEvent) => {
  const { members } = e.detail
  if (!members?.length) return
  for (const pk of members) {
    setMarkerDuress(pk)
  }
  // Fit map to duress members' positions
  const duressPositions = members.map((pk: string) => positions[pk]).filter(Boolean)
  if (map && duressPositions.length === 1) {
    map.flyTo({ center: [duressPositions[0].lon, duressPositions[0].lat], zoom: 16 })
  } else if (map && duressPositions.length > 1) {
    const lngs = duressPositions.map((p: any) => p.lon)
    const lats = duressPositions.map((p: any) => p.lat)
    map.fitBounds(
      [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
      { padding: 60 },
    )
  }
}) as EventListener)

function setMarkerDuress(pubkey: string): void {
  const m = markers[pubkey]
  if (!m) return
  const el = m.getElement()
  el.style.background = '#f87171'
  el.style.width = '18px'
  el.style.height = '18px'
  el.style.boxShadow = '0 0 12px rgba(248, 113, 113, 0.6)'
}

export function cleanupBeacons(): void {
  if (geoWatchId !== null) navigator.geolocation.clearWatch(geoWatchId)
  geoWatchId = null
  if (map) { map.remove(); map = null }
  markers = {}
  positions = {}
  encryptedPayloads = {}
}
