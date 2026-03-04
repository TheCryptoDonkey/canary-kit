// app/utils/escape.ts — HTML escaping utility for safe innerHTML interpolation

/**
 * Escape a string for safe insertion into HTML.
 * Prevents XSS by encoding &, <, >, ", and ' characters.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
