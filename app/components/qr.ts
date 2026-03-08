// app/components/qr.ts — QR code generation using qrcode-generator

import qrcode from 'qrcode-generator'

/**
 * Generate an SVG QR code for the given data string.
 *
 * @param data  The string to encode (e.g. a base64 invite payload).
 * @param size  Cell size in pixels (default: 4). Controls physical dimensions.
 * @returns     SVG markup string (scalable, no external dependencies).
 */
export function generateQR(data: string, size = 4): string {
  const qr = qrcode(0, 'L')
  qr.addData(data)
  qr.make()
  // createSvgTag with scalable:true lets CSS control the final size.
  return qr.createSvgTag({ cellSize: size, margin: 2, scalable: true })
}
