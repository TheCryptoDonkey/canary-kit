/**
 * qr.js — Minimal QR code encoder + canvas renderer.
 * Zero dependencies. Byte-mode only, error correction level M.
 * Supports versions 1–40 (up to ~2,331 bytes of data).
 *
 * Usage:
 *   import { renderQR } from './qr.js'
 *   const canvas = renderQR(text, { size: 200, fg: '#fff', bg: '#000' })
 *   container.appendChild(canvas)
 */

// ---------------------------------------------------------------------------
// GF(256) arithmetic for Reed-Solomon
// ---------------------------------------------------------------------------

const EXP = new Uint8Array(512)
const LOG = new Uint8Array(256)
{
  let x = 1
  for (let i = 0; i < 255; i++) {
    EXP[i] = x
    LOG[x] = i
    x = (x << 1) ^ (x & 0x80 ? 0x11d : 0)
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255]
}

function gfMul(a, b) {
  return a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]]
}

function rsGenPoly(n) {
  let g = [1]
  for (let i = 0; i < n; i++) {
    const next = new Array(g.length + 1).fill(0)
    for (let j = 0; j < g.length; j++) {
      next[j] ^= g[j]
      next[j + 1] ^= gfMul(g[j], EXP[i])
    }
    g = next
  }
  return g
}

function rsEncode(data, ecLen) {
  const gen = rsGenPoly(ecLen)
  const msg = new Array(data.length + ecLen).fill(0)
  for (let i = 0; i < data.length; i++) msg[i] = data[i]
  for (let i = 0; i < data.length; i++) {
    const coef = msg[i]
    if (coef === 0) continue
    for (let j = 0; j < gen.length; j++) {
      msg[i + j] ^= gfMul(gen[j], coef)
    }
  }
  return msg.slice(data.length)
}

// ---------------------------------------------------------------------------
// QR capacity tables (byte mode, EC level M)
// ---------------------------------------------------------------------------

// [totalCodewords, ecCodewordsPerBlock, numBlocks] for versions 1-40, EC=M
const EC_TABLE = [
  ,
  [26,10,1],[44,16,1],[70,26,1],[100,18,2],[134,24,2],
  [172,16,4],[196,18,4],[242,24,4],[292,22,5],[346,28,5],
  [404,22,8],[466,24,8],[532,26,9],[581,28,9],[655,24,12],
  [733,28,12],[815,28,13],[901,26,14],[991,28,14],[1085,28,16],
  [1156,28,17],[1258,28,17],[1364,28,18],[1474,28,20],[1588,28,21],
  [1706,28,23],[1828,28,25],[1921,28,26],[2051,28,28],[2185,28,29],
  [2323,28,31],[2465,28,33],[2611,28,35],[2761,28,37],[2876,28,38],
  [3034,28,40],[3196,28,43],[3362,28,45],[3532,28,47],[3706,28,49],
]

// Data capacity in bytes for each version (byte mode, EC=M)
function dataCapacity(ver) {
  const [total, ecPer, blocks] = EC_TABLE[ver]
  return total - ecPer * blocks
}

function chooseVersion(len) {
  // byte mode overhead: 4 (mode) + 8 or 16 (count) bits, plus terminator
  for (let v = 1; v <= 40; v++) {
    const countBits = v <= 9 ? 8 : 16
    const overhead = Math.ceil((4 + countBits) / 8)
    if (len + overhead <= dataCapacity(v)) return v
  }
  throw new Error('Data too long for QR')
}

// ---------------------------------------------------------------------------
// Alignment pattern positions
// ---------------------------------------------------------------------------

function alignmentPositions(ver) {
  if (ver === 1) return []
  const intervals = Math.floor(ver / 7) + 1
  const last = ver * 4 + 10
  const step = Math.ceil((last - 6) / intervals / 2) * 2
  const pos = [6]
  for (let p = last; pos.length <= intervals; p -= step) pos.splice(1, 0, p)
  return pos
}

// ---------------------------------------------------------------------------
// Bit stream
// ---------------------------------------------------------------------------

class BitStream {
  constructor() { this.bits = []; this.length = 0 }
  push(val, len) {
    for (let i = len - 1; i >= 0; i--) {
      this.bits.push((val >> i) & 1)
      this.length++
    }
  }
}

// ---------------------------------------------------------------------------
// Encode data into codewords
// ---------------------------------------------------------------------------

function encodeData(text, ver) {
  const bytes = new TextEncoder().encode(text)
  const bs = new BitStream()

  // Mode indicator: byte = 0100
  bs.push(0b0100, 4)
  // Character count
  bs.push(bytes.length, ver <= 9 ? 8 : 16)
  // Data
  for (const b of bytes) bs.push(b, 8)
  // Terminator (up to 4 bits)
  const cap = dataCapacity(ver) * 8
  const termLen = Math.min(4, cap - bs.length)
  bs.push(0, termLen)
  // Pad to byte boundary
  while (bs.length % 8 !== 0) bs.push(0, 1)
  // Pad bytes
  const padBytes = [0xec, 0x11]
  let pi = 0
  while (bs.length < cap) {
    bs.push(padBytes[pi], 8)
    pi ^= 1
  }

  // Convert to byte array
  const codewords = []
  for (let i = 0; i < bs.bits.length; i += 8) {
    let byte = 0
    for (let j = 0; j < 8; j++) byte = (byte << 1) | bs.bits[i + j]
    codewords.push(byte)
  }
  return codewords
}

// ---------------------------------------------------------------------------
// Interleave blocks + EC
// ---------------------------------------------------------------------------

function interleave(data, ver) {
  const [total, ecPer, blocks] = EC_TABLE[ver]
  const dataCap = total - ecPer * blocks
  const shortBlockData = Math.floor(dataCap / blocks)
  const longBlocks = dataCap % blocks

  const dataBlocks = []
  const ecBlocks = []
  let offset = 0

  for (let i = 0; i < blocks; i++) {
    const len = shortBlockData + (i >= blocks - longBlocks ? 1 : 0)
    const block = data.slice(offset, offset + len)
    offset += len
    dataBlocks.push(block)
    ecBlocks.push(rsEncode(block, ecPer))
  }

  const result = []
  const maxDataLen = shortBlockData + (longBlocks > 0 ? 1 : 0)
  for (let j = 0; j < maxDataLen; j++) {
    for (let i = 0; i < blocks; i++) {
      if (j < dataBlocks[i].length) result.push(dataBlocks[i][j])
    }
  }
  for (let j = 0; j < ecPer; j++) {
    for (let i = 0; i < blocks; i++) {
      result.push(ecBlocks[i][j])
    }
  }
  return result
}

// ---------------------------------------------------------------------------
// Matrix construction
// ---------------------------------------------------------------------------

function createMatrix(ver) {
  const size = ver * 4 + 17
  // 0 = white, 1 = black, null = unset
  const matrix = Array.from({ length: size }, () => new Array(size).fill(null))
  const reserved = Array.from({ length: size }, () => new Array(size).fill(false))

  function setModule(r, c, val, res = true) {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      matrix[r][c] = val ? 1 : 0
      if (res) reserved[r][c] = true
    }
  }

  // Finder patterns
  function finderPattern(row, col) {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const r = row + dr, c = col + dc
        if (r < 0 || r >= size || c < 0 || c >= size) continue
        const inOuter = dr === -1 || dr === 7 || dc === -1 || dc === 7
        const inRing = dr === 0 || dr === 6 || dc === 0 || dc === 6
        const inCore = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4
        setModule(r, c, !inOuter && (inRing || inCore))
      }
    }
  }

  finderPattern(0, 0)
  finderPattern(0, size - 7)
  finderPattern(size - 7, 0)

  // Alignment patterns
  const alignPos = alignmentPositions(ver)
  for (const r of alignPos) {
    for (const c of alignPos) {
      if (reserved[r][c]) continue
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const dark = Math.abs(dr) === 2 || Math.abs(dc) === 2 || (dr === 0 && dc === 0)
          setModule(r + dr, c + dc, dark)
        }
      }
    }
  }

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    if (!reserved[6][i]) setModule(6, i, i % 2 === 0)
    if (!reserved[i][6]) setModule(i, 6, i % 2 === 0)
  }

  // Dark module
  setModule(size - 8, 8, 1)

  // Reserve format info areas
  for (let i = 0; i < 8; i++) {
    if (!reserved[8][i]) { reserved[8][i] = true; matrix[8][i] = 0 }
    if (!reserved[8][size - 1 - i]) { reserved[8][size - 1 - i] = true; matrix[8][size - 1 - i] = 0 }
    if (!reserved[i][8]) { reserved[i][8] = true; matrix[i][8] = 0 }
    if (!reserved[size - 1 - i][8]) { reserved[size - 1 - i][8] = true; matrix[size - 1 - i][8] = 0 }
  }
  if (!reserved[8][8]) { reserved[8][8] = true; matrix[8][8] = 0 }

  // Reserve version info areas (ver >= 7)
  if (ver >= 7) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        reserved[i][size - 11 + j] = true
        reserved[size - 11 + j][i] = true
      }
    }
  }

  return { matrix, reserved, size }
}

// ---------------------------------------------------------------------------
// Place data bits
// ---------------------------------------------------------------------------

function placeData(matrix, reserved, size, bits) {
  let idx = 0
  let upward = true
  for (let col = size - 1; col >= 0; col -= 2) {
    if (col === 6) col = 5 // skip timing column
    const rows = upward
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i)
    for (const row of rows) {
      for (const dc of [0, -1]) {
        const c = col + dc
        if (c < 0 || reserved[row][c]) continue
        matrix[row][c] = idx < bits.length ? bits[idx++] : 0
      }
    }
    upward = !upward
  }
}

// ---------------------------------------------------------------------------
// Masking
// ---------------------------------------------------------------------------

const MASK_FNS = [
  (r, c) => (r + c) % 2 === 0,
  (r, c) => r % 2 === 0,
  (r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => (r * c) % 2 + (r * c) % 3 === 0,
  (r, c) => ((r * c) % 2 + (r * c) % 3) % 2 === 0,
  (r, c) => ((r + c) % 2 + (r * c) % 3) % 2 === 0,
]

function applyMask(matrix, reserved, size, maskIdx) {
  const fn = MASK_FNS[maskIdx]
  const result = matrix.map(row => [...row])
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c] && fn(r, c)) {
        result[r][c] ^= 1
      }
    }
  }
  return result
}

// ---------------------------------------------------------------------------
// Format info
// ---------------------------------------------------------------------------

const FORMAT_BITS = [
  0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0,
  0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976,
  0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b,
  0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed,
]

function writeFormatInfo(matrix, size, maskIdx) {
  // EC level M = 00, mask pattern 0-7
  const info = FORMAT_BITS[0b00 << 3 | maskIdx]
  const bits = []
  for (let i = 14; i >= 0; i--) bits.push((info >> i) & 1)

  // Horizontal (row 8)
  const hPositions = [0,1,2,3,4,5,7,8,size-8,size-7,size-6,size-5,size-4,size-3,size-2]
  for (let i = 0; i < 15; i++) matrix[8][hPositions[i]] = bits[i]

  // Vertical (col 8)
  const vPositions = [size-1,size-2,size-3,size-4,size-5,size-6,size-7,8,7,5,4,3,2,1,0]
  for (let i = 0; i < 15; i++) matrix[vPositions[i]][8] = bits[i]
}

// ---------------------------------------------------------------------------
// Version info (ver >= 7)
// ---------------------------------------------------------------------------

const VERSION_INFO = [
  ,,,,,,,
  0x07c94,0x085bc,0x09a99,0x0a4d3,0x0bbf6,0x0c762,0x0d847,0x0e60d,
  0x0f928,0x10b78,0x1145d,0x12a17,0x13532,0x149a6,0x15683,0x168c9,
  0x177ec,0x18ec4,0x191e1,0x1afab,0x1b08e,0x1cc1a,0x1d33f,0x1ed75,
  0x1f250,0x209d5,0x216f0,0x228ba,0x2379f,0x24b0b,0x2542e,0x26a64,
  0x27541,0x28c69,
]

function writeVersionInfo(matrix, size, ver) {
  if (ver < 7) return
  const info = VERSION_INFO[ver]
  for (let i = 0; i < 18; i++) {
    const bit = (info >> i) & 1
    const r = Math.floor(i / 3)
    const c = size - 11 + (i % 3)
    matrix[r][c] = bit
    matrix[c][r] = bit
  }
}

// ---------------------------------------------------------------------------
// Penalty scoring
// ---------------------------------------------------------------------------

function penalty(matrix, size) {
  let score = 0

  // Rule 1: runs of 5+ same colour
  for (let r = 0; r < size; r++) {
    let run = 1
    for (let c = 1; c < size; c++) {
      if (matrix[r][c] === matrix[r][c - 1]) {
        run++
      } else {
        if (run >= 5) score += run - 2
        run = 1
      }
    }
    if (run >= 5) score += run - 2
  }
  for (let c = 0; c < size; c++) {
    let run = 1
    for (let r = 1; r < size; r++) {
      if (matrix[r][c] === matrix[r - 1][c]) {
        run++
      } else {
        if (run >= 5) score += run - 2
        run = 1
      }
    }
    if (run >= 5) score += run - 2
  }

  // Rule 2: 2x2 blocks
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const v = matrix[r][c]
      if (v === matrix[r][c+1] && v === matrix[r+1][c] && v === matrix[r+1][c+1]) {
        score += 3
      }
    }
  }

  // Rule 3: finder-like patterns (simplified)
  const pat1 = [1,0,1,1,1,0,1,0,0,0,0]
  const pat2 = [0,0,0,0,1,0,1,1,1,0,1]
  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - 11; c++) {
      let match1 = true, match2 = true
      for (let k = 0; k < 11; k++) {
        if (matrix[r][c+k] !== pat1[k]) match1 = false
        if (matrix[r][c+k] !== pat2[k]) match2 = false
      }
      if (match1 || match2) score += 40
    }
  }
  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - 11; r++) {
      let match1 = true, match2 = true
      for (let k = 0; k < 11; k++) {
        if (matrix[r+k][c] !== pat1[k]) match1 = false
        if (matrix[r+k][c] !== pat2[k]) match2 = false
      }
      if (match1 || match2) score += 40
    }
  }

  // Rule 4: proportion of dark modules
  let dark = 0
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (matrix[r][c]) dark++
  const pct = (dark * 100) / (size * size)
  const prev5 = Math.floor(pct / 5) * 5
  const next5 = prev5 + 5
  score += Math.min(Math.abs(prev5 - 50) / 5, Math.abs(next5 - 50) / 5) * 10

  return score
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generate a QR code and render it to a canvas element.
 * @param {string} text - The text/URL to encode
 * @param {object} [opts] - Options
 * @param {number} [opts.size=200] - Canvas size in pixels
 * @param {string} [opts.fg='#000000'] - Foreground (dark module) colour
 * @param {string} [opts.bg='#ffffff'] - Background (light module) colour
 * @param {number} [opts.margin=2] - Quiet zone in modules
 * @returns {HTMLCanvasElement}
 */
export function renderQR(text, opts = {}) {
  const { size = 200, fg = '#000000', bg = '#ffffff', margin = 2 } = opts

  const ver = chooseVersion(new TextEncoder().encode(text).length)
  const data = encodeData(text, ver)
  const final = interleave(data, ver)

  // Convert to bit array
  const bits = []
  for (const byte of final) {
    for (let i = 7; i >= 0; i--) bits.push((byte >> i) & 1)
  }

  // Build matrix
  const { matrix, reserved, size: qrSize } = createMatrix(ver)
  placeData(matrix, reserved, qrSize, bits)

  // Try all 8 masks, pick lowest penalty
  let bestMask = 0
  let bestScore = Infinity
  for (let m = 0; m < 8; m++) {
    const masked = applyMask(matrix, reserved, qrSize, m)
    writeFormatInfo(masked, qrSize, m)
    writeVersionInfo(masked, qrSize, ver)
    const s = penalty(masked, qrSize)
    if (s < bestScore) {
      bestScore = s
      bestMask = m
    }
  }

  const finalMatrix = applyMask(matrix, reserved, qrSize, bestMask)
  writeFormatInfo(finalMatrix, qrSize, bestMask)
  writeVersionInfo(finalMatrix, qrSize, ver)

  // Render to canvas
  const totalModules = qrSize + margin * 2
  const scale = size / totalModules
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = bg
  ctx.fillRect(0, 0, size, size)

  ctx.fillStyle = fg
  for (let r = 0; r < qrSize; r++) {
    for (let c = 0; c < qrSize; c++) {
      if (finalMatrix[r][c]) {
        const x = Math.floor((c + margin) * scale)
        const y = Math.floor((r + margin) * scale)
        const w = Math.floor((c + margin + 1) * scale) - x
        const h = Math.floor((r + margin + 1) * scale) - y
        ctx.fillRect(x, y, w, h)
      }
    }
  }

  return canvas
}
