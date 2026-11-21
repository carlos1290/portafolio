/* eslint-disable no-undef */
import { existsSync, readdirSync, statSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const errors = []

const requireFile = (relativePath) => {
  const full = join(dist, relativePath)
  if (!existsSync(full) || !statSync(full).isFile()) {
    errors.push(`Falta el asset requerido: ${relativePath}`)
  }
}

requireFile('index.html')
requireFile('cv-carlos-gonzalez.pdf')
requireFile('cv-carlos-gonzalez-en.pdf')
requireFile('og-image.png')
requireFile('robots.txt')
requireFile('sitemap.xml')

// Verificar que cada fuente referenciada por el CSS exista en dist/assets.
const assetsDir = join(dist, 'assets')
const cssFiles = existsSync(assetsDir)
  ? readdirSync(assetsDir).filter((f) => f.endsWith('.css'))
  : []
const fontRefs = new Set()
for (const cssFile of cssFiles) {
  const css = readFileSync(join(assetsDir, cssFile), 'utf8')
  for (const match of css.matchAll(/url\(([^)]+\.woff2)\)/g)) {
    fontRefs.add(match[1].replace(/^['"]|['"]$/g, ''))
  }
}
for (const ref of fontRefs) {
  const filename = ref.split('/').pop()
  if (!existsSync(join(assetsDir, filename))) {
    errors.push(`Fuente referenciada pero no emitida: ${filename}`)
  }
}
if (fontRefs.size === 0) {
  errors.push('No se encontraron referencias a fuentes woff2 en el CSS')
}

if (errors.length) {
  console.error('Smoke de assets FALLÓ:')
  errors.forEach((e) => console.error(' - ' + e))
  process.exit(1)
}

console.log(`Smoke de assets OK: ${fontRefs.size} fuentes referenciadas, CVs y OG presentes.`)
