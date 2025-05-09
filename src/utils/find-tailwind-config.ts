import fs from 'fs'
import path from 'path'

/**
 * Recursively walks `dir`, looking for the first .css file
 * that has a line starting with @import "tailwindcss
 * @param {string} dir  absolute path to start searching from
 * @returns {string|null}  absolute path to matching CSS, or null if none found
 *
 * @example
 * const twCssPath = findTailwindImportCss(process.cwd())
 */
export function findTailwindImportCss(dir: string): string | null {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const found = findTailwindImportCss(fullPath)
      if (found) return found
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      // read & scan lines
      const lines = fs.readFileSync(fullPath, 'utf8').split(/\r?\n/)
      for (let line of lines) {
        if (line.trim().startsWith('@import "tailwindcss')) {
          return fullPath
        }
      }
    }
  }

  return null
}
