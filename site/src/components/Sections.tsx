import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { BRAND, CONTACTO, GALERIA, PROGRAMAS, RATING, RESENAS, TALLERES, waLink } from '../data/brand'
import { IconArrow, IconClock, IconFacebook, IconMail, IconPhone, IconPin, IconStar, IconWhatsApp, ProgramIcon } from './Icons'
import Magnetic from './Magnetic'
import SplitTitle from './SplitTitle'

/* ---------- separadores ondulados (colinas del logo) ---------- */
export function Hill({ color, flip = false, className = '' }: { color: string; flip?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={`block h-[50px] w-full sm:h-[80px] ${flip ? 'rotate-180' : ''} ${className}`} aria-hidden="true">
      <path d="M0 60 C 240 10 420 10 720 46 S 1200 90 1440 30 V90 H0Z" fill={color} />
    </svg>
  )
}

/* ---------- Propuesta de valor ---------- */
const VALORES = [
  { icon: '', big: `${BRAND.anios}`, small: 'años', titulo: 'de trayectoria en La Molina', texto: 'Acompañando a familias molinenses en la etapa más importante: la primera infancia.', color: 'bg-sol' },
  { icon: 'brote', big: '', small: 'jugando', titulo: 'Lúdica, vivencial y experimental', texto: 'Se aprende tocando, probando, cantando y descubriendo, nunca con prisa.', color: 'bg-cesped' },
  { icon: 'arbol', big: '', small: 'aire libre', titulo: 'Amplias áreas verdes', texto: 'Jardín, patio y aulas iluminadas para que cada día sea una aventura segura.', color: 'bg-naranja' },
  { icon: 'corazon', big: '', small: 'contigo', titulo: 'Departamento psicológico', texto: 'Acompañamiento permanente, terapias psicopedagógicas y escuela para padres.', color: 'bg-brote' },
]

export function Valor() {
  return (
    <section id="valor" aria-labelledby="valor-t" className="relative bg-crema py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow" data-reveal>
          ¿Por qué Terra Encantada?
        </p>
        <SplitTitle id="valor-t" text="Un segundo hogar donde respetan, retan y acompañan" className="section-title mt-2 max-w-4xl" highlight={{ respetan: 'hl hl-sol relative', retan: 'hl hl-cesped relative', acompañan: 'hl hl-naranja relative' }} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALORES.map((v, i) => (
            <motion.article
              key={v.titulo}
              data-reveal
              whileHover={{ y: -8, rotate: i % 2 ? 1.5 : -1.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_14px_40px_rgba(28,37,89,.08)]"
            >
              <div className={`blob-1 mb-5 flex h-20 w-20 flex-col items-center justify-center ${v.color} text-tinta`}>
                {v.icon ? <ProgramIcon name={v.icon} color="#1C2559" size={40} /> : <span className="font-display text-3xl font-extrabold leading-none">{v.big}</span>}
                <span className="text-[11px] font-extrabold uppercase tracking-wider">{v.small}</span>
              </div>
              <h3 className="text-2xl font-extrabold leading-tight text-terra">{v.titulo}</h3>
              <p className="mt-2 font-semibold text-tinta/80">{v.texto}</p>
            </motion.article>
          ))}
        </div>
      </div>
      <Marquee />
    </section>
  )
}

function Marquee() {
  const words = ['aprender', 'crecer', 'divertirse', 'respetar', 'retar', 'acompañar', 'jugar', 'soñar']
  const colors = ['text-terra', 'text-morado', 'text-naranja', 'text-terra', 'text-morado', 'text-naranja', 'text-terra', 'text-morado']
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {words.map((w, i) => (
        <span key={w} className="flex items-center gap-8">
          <span className={`font-display text-5xl font-extrabold sm:text-7xl ${colors[i]}`}>{w}</span>
          <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
            <g fill={['#F0E31D', '#96DB6A', '#E59D2A', '#7C99E6'][i % 4]}>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx="20" cy="9" rx="6" ry="8" transform={`rotate(${a} 20 20)`} />
              ))}
            </g>
            <circle cx="20" cy="20" r="5" fill="#6A479E" />
          </svg>
        </span>
      ))}
    </div>
  )
  return (
    <div className="mt-20 overflow-hidden border-y-4 border-dashed border-terra/15 py-5" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  )
}

/* ---------- Programas ---------- */
export function Programas() {
  return (
    <section id="programas" aria-labelledby="prog-t" className="relative bg-brote pb-24 pt-6">
      <Hill color="#D0E9B1" className="absolute -top-[49px] left-0 sm:-top-[79px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow" data-reveal>
              Programas por edad
            </p>
            <SplitTitle id="prog-t" text="Cada etapa tiene su propia magia" className="section-title mt-2 max-w-3xl" />
          </div>
          <p className="max-w-sm font-semibold text-tinta/80" data-reveal>
            De los primeros meses a los 5 años, con grupos por edad y un mismo hilo: aprender jugando.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {PROGRAMAS.map((p, i) => (
            <ProgramCard key={p.id} p={p} i={i} />
          ))}
        </div>
        <p className="mt-6 text-sm font-semibold text-tinta/70">* Descripciones referenciales de la propuesta; los programas son los publicados por el nido en su afiche Matrícula 2026.</p>
      </div>
    </section>
  )
}

function ProgramCard({ p, i }: { p: (typeof PROGRAMAS)[number]; i: number }) {
  const ref = useRef<HTMLElement>(null)
  const [t, setT] = useState({ x: 0, y: 0 })
  const span = i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
  return (
    <motion.article
      ref={ref}
      data-reveal
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = ref.current!.getBoundingClientRect()
        setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 12 })
      }}
      onPointerLeave={() => setT({ x: 0, y: 0 })}
      style={{ background: p.color, color: p.ink, transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
      className={`group relative flex min-h-[290px] flex-col overflow-hidden rounded-[2.2rem] p-7 shadow-[0_18px_40px_rgba(28,37,89,.12)] transition-transform duration-200 ${span}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 transition-transform duration-700 ease-rebote group-hover:scale-150" />
      <div className="relative flex items-start justify-between gap-4">
        <span className="chip bg-white/90 text-tinta">{p.edad}</span>
        <span className="transition-transform duration-500 ease-rebote group-hover:-rotate-12 group-hover:scale-110">
          <ProgramIcon name={p.icono} color={p.ink} size={68} />
        </span>
      </div>
      <h3 className="relative mt-auto pt-10 text-3xl font-extrabold leading-tight sm:text-4xl">{p.titulo}</h3>
      <p className="relative mt-2 max-w-md text-base font-semibold opacity-90">{p.texto}</p>
    </motion.article>
  )
}

/* ---------- Talleres ---------- */
export function Talleres() {
  return (
    <section id="talleres" aria-labelledby="tall-t" className="relative overflow-hidden bg-crema py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow" data-reveal>
          Talleres todo el año
        </p>
        <SplitTitle id="tall-t" text="Cuerpo en movimiento, mente feliz" className="section-title mt-2 max-w-3xl" />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {TALLERES.map((t, i) => (
            <article key={t.titulo} data-reveal className={`flex flex-col items-center text-center ${i === 1 ? 'md:mt-16' : ''}`}>
              <div className="relative">
                <svg viewBox="0 0 200 200" className="spin-slow absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]" aria-hidden="true">
                  <circle cx="100" cy="100" r="96" fill="none" stroke={['#E59D2A', '#2D5EC4', '#96DB6A'][i]} strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
                </svg>
                {t.foto ? (
                  <img src={t.foto} alt={t.alt} loading="lazy" width={640} height={640} className="h-60 w-60 rounded-full object-cover shadow-[0_20px_50px_rgba(28,37,89,.2)] transition-transform duration-500 ease-rebote hover:scale-105 sm:h-72 sm:w-72" />
                ) : (
                  <div className="flex h-60 w-60 flex-col items-center justify-center rounded-full bg-morado text-white shadow-[0_20px_50px_rgba(28,37,89,.2)] sm:h-72 sm:w-72">
                    <ProgramIcon name="yoga" color="#F0E31D" size={110} />
                    <span className="mt-1 font-display text-lg font-bold">Respira · estira · sonríe</span>
                  </div>
                )}
              </div>
              <h3 className="mt-8 text-3xl font-extrabold text-terra">{t.titulo}</h3>
              <p className="mt-2 max-w-xs font-semibold text-tinta/80">{t.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Familias / terapias ---------- */
export function Familias() {
  const items = [
    { icon: 'cerebro', t: 'Terapias psicopedagógicas', d: 'Apoyo especializado para el lenguaje, la atención y el aprendizaje, en coordinación con las misses.' },
    { icon: 'corazon', t: 'Departamento psicológico permanente', d: 'Seguimiento del desarrollo emocional de cada niño, con orientación cercana a la familia.' },
    { icon: 'familia', t: 'Escuela para padres', d: 'Encuentros para criar juntos: límites con amor, autonomía, emociones y más.' },
  ]
  return (
    <section id="familias" aria-labelledby="fam-t" className="relative bg-terra text-white">
      <Hill color="#2D5EC4" className="absolute -top-[49px] left-0 sm:-top-[79px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <p className="font-display text-lg font-bold text-sol" data-reveal>
            Terapias y acompañamiento
          </p>
          <SplitTitle id="fam-t" text="Nuestro trabajo empieza contigo" className="mt-2 font-display text-[clamp(2.4rem,5.5vw,4.6rem)] font-extrabold leading-[0.95] text-white" />
          <p className="mt-5 max-w-xl text-lg font-semibold text-white/90" data-reveal>
            Terra Encantada nació como <strong>Centro de Apoyo en el Desarrollo del Niño</strong>: más que un nido, un equipo que mira a cada niño completo, con sus tiempos, sus emociones y su familia.
          </p>
          <ul className="mt-10 space-y-4">
            {items.map((it) => (
              <li key={it.t} data-reveal className="flex gap-4 rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15">
                <span className="shrink-0 rounded-2xl bg-sol p-2">
                  <ProgramIcon name={it.icon} color="#1C2559" size={44} />
                </span>
                <span>
                  <span className="block font-display text-xl font-extrabold">{it.t}</span>
                  <span className="mt-1 block font-semibold text-white/85">{it.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-md" data-reveal>
          <div className="blob-2 overflow-hidden bg-white p-3 shadow-[0_30px_80px_rgba(0,0,0,.3)]">
            <img src="/fotos/aula-misses.webp" alt="Misses de Terra Encantada saludando junto a los niños en el aula" loading="lazy" width={560} height={560} className="blob-2 aspect-square w-full object-cover" />
          </div>
          <div className="floaty absolute -bottom-6 -left-4 rounded-3xl bg-cesped px-5 py-4 text-tinta shadow-xl sm:-left-10">
            <p className="font-display text-3xl font-extrabold leading-none">Misses</p>
            <p className="text-sm font-bold">con paciencia y creatividad</p>
          </div>
          <svg className="spin-slow absolute -right-6 -top-8 h-28 w-28 text-sol" viewBox="0 0 100 100" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <rect key={i} x="46" y="2" width="8" height="24" rx="4" fill="currentColor" transform={`rotate(${i * 40} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="17" fill="currentColor" />
          </svg>
        </div>
      </div>
      <Hill color="#FFFBEA" className="-mb-px" />
    </section>
  )
}

/* ---------- Galería ---------- */
export function Galeria() {
  const [open, setOpen] = useState<number | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (open === null) return
    closeBtn.current?.focus()
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((o) => (o === null ? o : (o + 1) % GALERIA.length))
      if (e.key === 'ArrowLeft') setOpen((o) => (o === null ? o : (o - 1 + GALERIA.length) % GALERIA.length))
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  const layout = [
    'md:col-span-5 md:row-span-2',
    'md:col-span-4 md:mt-24',
    'md:col-span-3 md:row-span-2 md:mt-8',
    'md:col-span-4 md:-mt-6',
    'md:col-span-5 md:col-start-6 md:-mt-10',
  ]
  return (
    <section id="galeria" aria-labelledby="gal-t" className="relative overflow-hidden bg-crema py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow" data-reveal>
              Galería
            </p>
            <SplitTitle id="gal-t" text="Así se vive un día en Terra" className="section-title mt-2" />
          </div>
          <p className="max-w-sm font-semibold text-tinta/75" data-reveal>
            Fotos reales del nido. Toca una burbuja para verla en grande.
          </p>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-12 md:gap-8">
          {GALERIA.map((g, i) => (
            <li key={g.src} className={`${layout[i]} ${i === 0 ? 'col-span-2' : ''}`} data-speed={[0.12, -0.08, 0.18, -0.1, 0.06][i]}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full text-left"
                aria-label={`Ampliar foto: ${g.caption}`}
              >
                <span className={`relative block overflow-hidden bg-white p-2 shadow-[0_20px_50px_rgba(28,37,89,.14)] transition-transform duration-500 ease-rebote group-hover:-rotate-2 group-hover:scale-[1.04] ${g.circle ? 'aspect-square rounded-full' : i % 2 ? 'blob-1 aspect-[4/3]' : 'blob-2 aspect-[3/4]'}`}>
                  <img src={g.src} alt={g.alt} loading="lazy" className={`h-full w-full object-cover ${g.circle ? 'rounded-full' : i % 2 ? 'blob-1' : 'blob-2'}`} />
                </span>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-1.5 font-display text-sm font-bold text-terra shadow-md sm:text-base">{g.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={GALERIA[open].caption}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-tinta/80 p-5 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              key={open}
              initial={{ scale: 0.7, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="relative max-h-[85vh] max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={GALERIA[open].src} alt={GALERIA[open].alt} className={`max-h-[75vh] w-auto bg-white p-2 ${GALERIA[open].circle ? 'rounded-full' : 'rounded-[2rem]'}`} />
              <figcaption className="mt-4 text-center font-display text-2xl font-bold text-white">{GALERIA[open].caption}</figcaption>
              <button ref={closeBtn} type="button" onClick={() => setOpen(null)} className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-sol font-display text-2xl font-extrabold text-tinta" aria-label="Cerrar">
                ×
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ---------- Reseñas ---------- */
export function Resenas() {
  return (
    <section id="resenas" aria-labelledby="res-t" className="relative bg-sol/90 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
          <div data-reveal>
            <p className="font-display text-lg font-bold text-morado">Lo que dicen las familias</p>
            <h2 id="res-t" className="mt-2 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[0.95] text-tinta">
              Familias felices en Google
            </h2>
            {/* ⚠️ DATO A CONFIRMAR: rating 4.9 y 31 reseñas según Exa Places (espejo de Google Maps), no verificado en vivo. */}
            <div className="mt-8 inline-flex items-center gap-5 rounded-[2rem] bg-white px-7 py-5 shadow-[0_16px_40px_rgba(28,37,89,.12)]">
              <span className="font-display text-7xl font-extrabold leading-none text-terra">{RATING.valor.toFixed(1)}</span>
              <span>
                <span className="flex text-naranja" aria-label={`${RATING.valor} de 5 estrellas`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} size={26} />
                  ))}
                </span>
                <span className="mt-1 block font-bold text-tinta">{RATING.total} reseñas en {RATING.fuente}</span>
              </span>
            </div>
            <div className="mt-6">
              <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-terra">
                Ver reseñas en Google <IconArrow size={20} />
              </a>
            </div>
          </div>
          <ul className="grid gap-6 md:grid-cols-3 lg:grid-cols-1">
            {RESENAS.map((r, i) => (
              <motion.li
                key={i}
                data-reveal
                whileHover={{ rotate: i % 2 ? -2 : 2, y: -6 }}
                className={`relative rounded-[2rem] bg-white p-7 shadow-[0_16px_40px_rgba(28,37,89,.12)] lg:max-w-[34rem] ${['lg:ml-0', 'lg:ml-auto', 'lg:ml-16'][i]}`}
              >
                <span className="absolute -top-6 left-6 font-display text-8xl leading-none text-cesped" aria-hidden="true">
                  “
                </span>
                <blockquote className="relative mt-4 text-lg font-bold leading-snug text-tinta">{r.texto}</blockquote>
                <p className="mt-4 flex items-center gap-2 text-sm font-bold text-morado">
                  <span className="flex text-naranja" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <IconStar key={j} size={14} />
                    ))}
                  </span>
                  {r.fuente}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ---------- Nosotros ---------- */
export function Nosotros() {
  return (
    <section id="nosotros" aria-labelledby="nos-t" className="relative overflow-hidden bg-crema py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div className="relative order-2 lg:order-1" data-reveal>
          <div className="wobbly relative mx-auto aspect-square max-w-md bg-white p-10 shadow-[0_30px_80px_rgba(28,37,89,.12)]">
            <img src="/logo-terra-encantada.svg" alt="Logo de Terra Encantada: sol, casita, flor, mariposa y la tierra azul" className="h-full w-full object-contain" loading="lazy" />
          </div>
          <div className="floaty absolute right-2 top-4 rounded-full bg-terra px-5 py-3 font-display text-lg font-bold text-white shadow-lg sm:right-8">Desde hace {BRAND.anios} años</div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="eyebrow" data-reveal>
            Nuestra historia
          </p>
          <SplitTitle id="nos-t" text="Una tierra encantada en plena Javier Prado" className="section-title mt-2" />
          <p className="mt-6 text-lg font-semibold leading-relaxed text-tinta/85" data-reveal>
            {/* ⚠️ "21 años" según la fanpage; año de fundación exacto por confirmar */}
            Hace {BRAND.anios} años abrimos nuestras puertas en La Molina como un Centro de Apoyo en el Desarrollo del Niño. Hoy somos un nido con estimulación temprana, inicial y terapias, pero seguimos creyendo lo mismo: <strong className="text-terra">la infancia se vive una sola vez y merece un lugar mágico.</strong>
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3" data-reveal>
            {[
              { v: 'Respetan', c: 'bg-sol', d: 'sus tiempos' },
              { v: 'Retan', c: 'bg-cesped', d: 'su curiosidad' },
              { v: 'Acompañan', c: 'bg-naranja', d: 'con amor' },
            ].map((x, i) => (
              <motion.div key={x.v} whileHover={{ y: -10, rotate: i === 1 ? 0 : i ? 3 : -3 }} className={`rounded-[1.6rem] ${x.c} px-2 py-4 text-center text-tinta sm:p-5`}>
                <p className="font-display text-[clamp(1rem,4.6vw,1.9rem)] font-extrabold leading-none">{x.v}</p>
                <p className="mt-1 text-xs font-bold sm:text-sm">{x.d}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4 rounded-3xl border-2 border-dashed border-morado/40 p-5" data-reveal>
            <ProgramIcon name="globo-fiesta" color="#6A479E" size={52} />
            <p className="font-semibold text-tinta/85">
              <strong className="font-display text-lg text-morado">¿Cumpleaños a la vista?</strong> También alquilamos nuestro local para fiestas infantiles.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- CTA Matrícula ---------- */
export function Matricula() {
  const pasos = [
    { n: 1, t: 'Escríbenos', d: 'Cuéntanos la edad de tu peque por WhatsApp.' },
    { n: 2, t: 'Visítanos', d: 'Agenda un recorrido por aulas y áreas verdes.' },
    { n: 3, t: '¡Bienvenidos!', d: 'Conoce a las misses y separa su vacante.' },
  ]
  return (
    <section id="matricula" aria-labelledby="mat-t" className="relative overflow-hidden bg-naranja py-24 text-tinta sm:py-32">
      <svg className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 text-sol/60" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="50" fill="currentColor" />
      </svg>
      <svg className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 text-cesped/50" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="50" fill="currentColor" />
      </svg>
      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <p className="chip bg-white text-morado" data-reveal>
          🌈 Matrícula 2026
        </p>
        <SplitTitle id="mat-t" text="Ven a conocer nuestro mundo encantado" className="mx-auto mt-5 max-w-4xl font-display text-[clamp(2.6rem,6.5vw,5.4rem)] font-extrabold leading-[0.92] text-tinta" />
        <p className="mx-auto mt-6 max-w-2xl text-lg font-bold sm:text-xl" data-reveal>
          Estimulación temprana · Pre-escolar 2 años · Inicial 3, 4 y 5 años · Guardería
        </p>
        <div className="mt-10" data-reveal>
          <Magnetic strength={0.45}>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn !bg-tinta !px-7 !py-4 !text-xl text-white sm:!px-9 sm:!py-5 sm:!text-2xl">
              <IconWhatsApp size={30} /> Escríbenos al {CONTACTO.whatsappVisible}
            </a>
          </Magnetic>
        </div>
        <ol className="mt-16 grid gap-5 text-left sm:grid-cols-3">
          {pasos.map((p) => (
            <li key={p.n} data-reveal className="rounded-[2rem] bg-white/90 p-6 shadow-[0_14px_40px_rgba(28,37,89,.12)]">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terra font-display text-2xl font-extrabold text-white">{p.n}</span>
              <p className="mt-4 font-display text-2xl font-extrabold text-terra">{p.t}</p>
              <p className="mt-1 font-semibold text-tinta/80">{p.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Ubicación ---------- */
export function Ubicacion() {
  const [mapOn, setMapOn] = useState(false)
  const datos = [
    { icon: <IconPin />, t: 'Dirección', d: BRAND.direccion, href: BRAND.mapsUrl },
    { icon: <IconClock />, t: 'Horario', d: BRAND.horario },
    // ⚠️ DATO A CONFIRMAR: número vigente de WhatsApp / teléfono (ver src/data/brand.ts)
    { icon: <IconWhatsApp />, t: 'WhatsApp', d: CONTACTO.whatsappVisible, href: waLink() },
    { icon: <IconPhone />, t: 'Teléfono', d: CONTACTO.telefonoVisible, href: `tel:${CONTACTO.telefonoNumero}` },
    { icon: <IconMail />, t: 'Correo', d: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: <IconFacebook />, t: 'Facebook', d: 'Terra Encantada | La Molina', href: BRAND.facebook },
  ]
  return (
    <section id="visitanos" aria-labelledby="ubi-t" className="relative bg-crema py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow" data-reveal>
            Visítanos
          </p>
          <SplitTitle id="ubi-t" text="Te esperamos en La Molina" className="section-title mt-2" />
          <ul className="mt-10 space-y-3">
            {datos.map((x) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brote text-terra">{x.icon}</span>
                  <span>
                    <span className="block text-sm font-extrabold uppercase tracking-wider text-morado">{x.t}</span>
                    <span className="block text-lg font-bold text-tinta">{x.d}</span>
                  </span>
                </>
              )
              return (
                <li key={x.t} data-reveal>
                  {x.href ? (
                    <a href={x.href} target={x.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-center gap-4 rounded-3xl bg-white p-3 pr-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-3xl bg-white p-3 pr-5 shadow-sm">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] bg-brote shadow-[0_30px_80px_rgba(28,37,89,.14)]" data-reveal>
          {mapOn ? (
            <iframe title="Mapa: Nido Terra Encantada, Av. Javier Prado Este 5977, La Molina" src={BRAND.mapsEmbed} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <MapIllustration onLoad={() => setMapOn(true)} />
          )}
        </div>
      </div>
    </section>
  )
}

function MapIllustration({ onLoad }: { onLoad: () => void }) {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect width="600" height="460" fill="#D0E9B1" />
        <g fill="#96DB6A" opacity=".7">
          <circle cx="90" cy="90" r="60" />
          <circle cx="520" cy="380" r="80" />
          <circle cx="480" cy="70" r="40" />
        </g>
        <path d="M-20 250 C 150 230 300 270 620 215" stroke="#fff" strokeWidth="44" fill="none" />
        <path d="M-20 250 C 150 230 300 270 620 215" stroke="#F0E31D" strokeWidth="3" strokeDasharray="14 12" fill="none" />
        <path d="M200 -20 C 210 120 180 300 230 480" stroke="#fff" strokeWidth="22" fill="none" />
        <path d="M430 -20 C 410 150 450 330 420 480" stroke="#fff" strokeWidth="18" fill="none" />
        <text x="300" y="222" textAnchor="middle" fontFamily="Baloo 2 Variable, sans-serif" fontWeight="800" fontSize="20" fill="#2D5EC4" transform="rotate(-3 300 222)">
          Av. Javier Prado Este
        </text>
      </svg>
      <div className="absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-full">
        <div className="floaty flex flex-col items-center">
          <div className="rounded-[1.5rem] bg-white p-2 shadow-xl">
            <img src="/logo-terra-encantada.svg" alt="" className="h-16 w-auto" />
          </div>
          <div className="h-0 w-0 border-x-[14px] border-t-[18px] border-x-transparent border-t-white" />
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3 rounded-[2rem] bg-white/95 p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <p className="font-bold text-tinta">
          <span className="block font-display text-xl text-terra">Av. Javier Prado Este 5977</span>
          La Molina, Lima
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onLoad} className="btn btn-ghost !bg-brote !py-3 !text-base">
            Ver mapa interactivo
          </button>
          <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-terra !py-3 !text-base">
            Cómo llegar <IconArrow size={18} />
          </a>
        </div>
      </div>
    </div>
  )
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="relative bg-tinta text-white">
      <Hill color="#1C2559" className="absolute -top-[49px] left-0 sm:-top-[79px]" />
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="inline-block rounded-[2rem] bg-white p-4">
              <img src="/logo-terra-encantada.svg" alt="Terra Encantada" className="h-24 w-auto" loading="lazy" />
            </div>
            <p className="mt-5 max-w-sm font-display text-2xl font-bold text-sol">{BRAND.slogan}.</p>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-cesped">Contacto</p>
            <ul className="mt-3 space-y-2 font-semibold text-white/85">
              <li>{BRAND.direccion}</li>
              <li>{BRAND.horario}</li>
              <li>
                <a className="underline-offset-4 hover:underline" href={waLink()} target="_blank" rel="noopener noreferrer">
                  WhatsApp {CONTACTO.whatsappVisible}
                </a>
              </li>
              <li>
                <a className="underline-offset-4 hover:underline" href={`mailto:${BRAND.email}`}>
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-cesped">Síguenos</p>
            <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 font-bold transition hover:bg-white/20">
              <IconFacebook /> Terra Encantada | La Molina
            </a>
            <p className="mt-6 text-sm font-semibold text-white/70">Código modular MINEDU {BRAND.codigoModular}</p>
          </div>
        </div>
        <div className="mt-12 border-t border-white/15 pt-6 text-sm font-semibold text-white/70">
          <p>© {new Date().getFullYear()} Nido Terra Encantada · La Molina, Lima.</p>
          <p className="mt-2">
            Demo conceptual de rediseño elaborada por <strong className="text-white">INKRAAD</strong>; no es el sitio oficial del nido. Calificación de Google, teléfonos y textos descriptivos de programas están pendientes de confirmación con el nido.
          </p>
        </div>
      </div>
    </footer>
  )
}
