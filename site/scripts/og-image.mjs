// Genera public/og-image.jpg (1200×630) con el logo, fotos reales y el slogan.
// Requiere `npx vite preview --port 4173` corriendo.
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'

const font = readFileSync(new URL('../node_modules/@fontsource-variable/baloo-2/files/baloo-2-latin-wght-normal.woff2', import.meta.url)).toString('base64')
const B = 'http://localhost:4173'
const html = `<!doctype html><html><head><style>
@font-face{font-family:Baloo;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:400 800}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#2D5EC4;font-family:Baloo;overflow:hidden;position:relative}
.sun{position:absolute;left:-90px;top:-90px;width:240px;height:240px;border-radius:50%;background:#F0E31D}
.hill{position:absolute;left:-50px;right:-50px;bottom:-200px;height:260px;background:#96DB6A;border-radius:50% 50% 0 0}
.logo{position:absolute;left:70px;top:70px;background:#fff;border-radius:42% 58% 50% 50%/50% 45% 55% 50%;padding:30px 36px}
.logo img{width:330px;display:block}
h1{position:absolute;left:70px;top:375px;color:#fff;font-size:58px;line-height:.95;font-weight:800;width:560px}
h1 span{color:#F0E31D}
.c{position:absolute;border-radius:50%;border:10px solid #fff;object-fit:cover;box-shadow:0 20px 50px rgba(0,0,0,.25)}
.chip{position:absolute;right:60px;top:40px;background:#fff;color:#6A479E;font-weight:800;font-size:26px;padding:8px 22px;border-radius:999px}
</style></head><body>
<div class="sun"></div><div class="hill"></div>
<div class="logo"><img src="${B}/logo-terra-encantada.svg"></div>
<h1>Un espacio para <span>aprender, crecer y divertirse</span></h1>
<div class="chip">Matrícula 2026 · La Molina</div>
<img class="c" src="${B}/fotos/aula-misses.webp" style="width:330px;height:330px;left:640px;top:120px">
<img class="c" src="${B}/fotos/taller-karate.webp" style="width:220px;height:220px;left:930px;top:330px">
<img class="c" src="${B}/fotos/inicial-lonchera.webp" style="width:190px;height:190px;left:960px;top:110px">
</body></html>`

const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome' })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await page.screenshot({ path: new URL('../public/og-image.jpg', import.meta.url).pathname, type: 'jpeg', quality: 88 })
await browser.close()
console.log('og-image.jpg listo')
