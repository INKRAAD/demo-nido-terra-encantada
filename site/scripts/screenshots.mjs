// Capturas con Playwright + Chrome headless (WebGL por SwiftShader) y registro de errores de consola.
// Uso: npm run build && npx vite preview --port 4173 & node scripts/screenshots.mjs
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const SITE = process.env.SITE_URL || 'http://localhost:4173/'
const OUT = new URL('../screenshots/', import.meta.url).pathname
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({
  executablePath: process.env.CHROME || '/usr/bin/google-chrome',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
})

const errors = []
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function run(name, opts, sections) {
  const ctx = await browser.newContext(opts)
  const page = await ctx.newPage()
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${name}] ${m.type()}: ${m.text()}`)
  })
  page.on('pageerror', (e) => errors.push(`[${name}] pageerror: ${e.message}`))
  await page.goto(SITE, { waitUntil: 'networkidle' })
  await sleep(8000)
  const shot = async (label) => page.screenshot({ path: `${OUT}${name}-${label}.png` })
  await shot('01-hero')
  const vh = opts.viewport.height
  // pasos del storytelling
  for (let i = 1; i <= 3; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), vh * i)
    await sleep(2200)
    await shot(`0${i + 1}-historia-${i}`)
  }
  let n = 5
  for (const id of sections) {
    await page.evaluate((id) => {
      const el = document.getElementById(id)
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 40)
    }, id)
    await sleep(1800)
    await shot(`${String(n).padStart(2, '0')}-${id}`)
    n++
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await sleep(1500)
  await shot(`${String(n).padStart(2, '0')}-footer`)
  await ctx.close()
}

const sections = ['valor', 'programas', 'talleres', 'familias', 'galeria', 'resenas', 'nosotros', 'matricula', 'visitanos']
await run('desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }, sections)
await run('movil', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, sections)
await browser.close()

console.log(errors.length ? errors.join('\n') : 'SIN ERRORES DE CONSOLA')
