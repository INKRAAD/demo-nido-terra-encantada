import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BRAND, RATING, waLink } from '../data/brand'
import { scrollToId } from '../lib/scroll'
import { IconArrow, IconStar, IconWhatsApp } from './Icons'
import Magnetic from './Magnetic'

const TerraWorld = lazy(() => import('../three/TerraWorld'))

type Props = { lite: boolean; reduced: boolean; webgl: boolean; started: boolean; onSceneReady: () => void }

const STEPS = [
  {
    n: '01',
    verbo: 'Aprender',
    color: 'text-naranja',
    titulo: 'Aprender jugando, experimentando, viviendo.',
    texto:
      'Nuestra metodología es lúdica, vivencial y experimental: aulas iluminadas, inglés intensivo y programas pensados para cada edad, desde la estimulación temprana hasta inicial 5 años.',
    chips: ['Metodología lúdica', 'Inglés intensivo', 'Aulas iluminadas'],
    side: 'right' as const,
  },
  {
    n: '02',
    verbo: 'Crecer',
    color: 'text-cesped',
    titulo: 'Respetan, retan y acompañan con mucho amor.',
    texto:
      'Cada niño crece a su ritmo. Contamos con departamento psicológico permanente, terapias psicopedagógicas y escuela para padres, porque nuestro trabajo empieza contigo.',
    chips: ['Departamento psicológico', 'Terapias', 'Escuela para padres'],
    side: 'left' as const,
  },
  {
    n: '03',
    verbo: 'Divertirse',
    color: 'text-sol',
    titulo: 'Amplias áreas verdes para correr, saltar y soñar.',
    texto:
      'Talleres todo el año de karate, psicomotricidad y yoga para niños, patio y jardín al aire libre. ¡Y hasta puedes celebrar su cumpleaños con nosotros!',
    chips: ['Karate', 'Psicomotricidad', 'Yoga para niños'],
    side: 'right' as const,
  },
]

function StaticWorld() {
  // Fallback sin WebGL: ilustración del propio logo.
  return (
    <div className="absolute inset-0 flex items-end justify-center pb-10 md:items-center md:justify-end md:pb-0 md:pr-[8vw]">
      <div className="floaty rounded-full bg-white/80 p-8 shadow-xl">
        <img src="/logo-terra-encantada.svg" alt="" className="w-[min(70vw,420px)]" />
      </div>
    </div>
  )
}

export default function WorldSection({ lite, reduced, webgl, started, onSceneReady }: Props) {
  const wrap = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const [active, setActive] = useState(true)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!webgl) onSceneReady()
  }, [webgl, onSceneReady])

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (s) => {
        progress.current = s.progress
        setStep(Math.min(3, Math.round(s.progress * 3)))
      },
    })
    return () => {
      io.disconnect()
      st.kill()
    }
  }, [])

  // Entrada del hero tras el loader
  useEffect(() => {
    if (!started) return
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-hero]', { opacity: 1, y: 0 })
        gsap.set('.hero-title .split-char', { opacity: 1, y: 0 })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'back.out(2)' } })
      tl.fromTo('.hero-title .split-char', { yPercent: 110, rotate: () => gsap.utils.random(-25, 25), opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.8, stagger: 0.018 })
        .fromTo('[data-hero]', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, '-=0.5')
      // Al hacer scroll, el texto del hero se despide
      gsap.to('.hero-copy', {
        yPercent: -30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: wrap.current, start: 'top top', end: '+=70%', scrub: true },
      })
      gsap.utils.toArray<HTMLElement>('.story-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 120, opacity: 0, rotate: card.dataset.side === 'left' ? -3 : 3 },
          { y: 0, opacity: 1, rotate: 0, ease: 'back.out(1.4)', duration: 1, scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' } },
        )
      })
    }, wrap)
    return () => ctx.revert()
  }, [started, reduced])

  return (
    <section id="inicio" ref={wrap} aria-label="Bienvenida al mundo Terra Encantada" className="relative" style={{ height: reduced ? 'auto' : '400vh' }}>
      {/* Cielo + planeta (sticky) */}
      <div className={`${reduced ? 'absolute inset-0 h-screen' : 'sticky top-0 h-[100svh]'} overflow-hidden`}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#C9DBFF_0%,#E3EEFF_38%,#EEF7E1_72%,#FFFBEA_100%)]" />
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-sol/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-cesped/40 blur-3xl" />
        {webgl ? (
          <Suspense fallback={null}>
            <SceneReady onReady={onSceneReady} />
            <div className="absolute inset-0">
              <TerraWorld progress={progress} lite={lite} still={reduced} active={active} />
            </div>
          </Suspense>
        ) : (
          <StaticWorld />
        )}
        {/* indicador de pasos */}
        {!reduced && (
          <ol className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-3 rounded-full bg-white/70 px-2 py-3 backdrop-blur md:flex" aria-hidden="true">
            {['Inicio', ...STEPS.map((s) => s.verbo)].map((s, i) => (
              <li key={s} className="relative flex items-center justify-center">
                <span className={`absolute right-9 rounded-full bg-white px-3 py-1 font-display text-sm font-bold text-terra shadow transition-all duration-300 ${step === i ? 'opacity-100' : 'opacity-0'}`}>{s}</span>
                <span className={`block rounded-full transition-all duration-300 ${step === i ? 'h-3.5 w-3.5 bg-naranja' : 'h-2.5 w-2.5 bg-terra/30'}`} />
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Capa de contenido */}
      <div className={`relative ${reduced ? '' : '-mt-[100svh]'}`}>
        {/* HERO */}
        <div className="hero-copy relative flex min-h-[100svh] items-start px-5 pt-28 sm:px-8 md:items-center md:pt-20 lg:px-16">
          <div className="max-w-[40rem] md:max-w-[46%]">
            <p data-hero className="chip mb-5 bg-white/80 text-morado shadow-sm backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cesped opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cesped" />
              </span>
              Matrícula abierta 2026 · {BRAND.distrito.split(',')[0]}
            </p>
            <h1 className="hero-title font-display text-[clamp(2.5rem,6.4vw,5.6rem)] font-extrabold leading-[0.92] text-terra" aria-label={BRAND.slogan}>
              <HeroWords />
            </h1>
            <p data-hero className="mt-5 max-w-xl text-lg font-semibold text-tinta/85 sm:text-xl">
              Nido en La Molina con {BRAND.anios} años acompañando la primera infancia: estimulación temprana, cuna, inicial de 2 a 5 años y terapias.
            </p>
            <div data-hero className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={waLink('Hola Terra Encantada 🌈 Quisiera agendar una visita al nido.')} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <IconWhatsApp size={22} /> Agenda una visita
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#programas"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId('programas')
                  }}
                  className="btn btn-ghost"
                >
                  Ver programas <IconArrow size={20} />
                </a>
              </Magnetic>
            </div>
            {/* ⚠️ DATO A CONFIRMAR: 4.9★ / 31 reseñas (Exa Places, no verificado en vivo) */}
            <a
              data-hero
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/75 px-4 py-2.5 shadow-sm backdrop-blur transition hover:bg-white"
            >
              <span className="font-display text-2xl font-extrabold text-terra">{RATING.valor.toFixed(1)}</span>
              <span className="flex text-naranja" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} size={18} />
                ))}
              </span>
              <span className="text-sm font-bold text-tinta/80">{RATING.total} reseñas en Google</span>
            </a>
          </div>
          {webgl && !reduced && (
            <p data-hero className="pointer-events-none absolute bottom-24 right-[18%] hidden rotate-[-6deg] rounded-full bg-white/85 px-4 py-2 font-display font-bold text-morado shadow-md lg:block">
              ¡Toca el planeta! ✨
            </p>
          )}
          <div data-hero className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-terra md:flex" aria-hidden="true">
            <span className="font-display text-sm font-bold">Descubre nuestro mundo</span>
            <span className="flex h-10 w-6 justify-center rounded-full border-2 border-terra pt-1.5">
              <span className="h-2 w-1.5 animate-bounce rounded-full bg-terra" />
            </span>
          </div>
        </div>

        {/* PASOS DEL STORYTELLING */}
        {STEPS.map((s) => (
          <div key={s.n} className={`flex min-h-[100svh] items-start px-5 pt-24 sm:px-8 md:items-center md:pt-0 lg:px-16 ${s.side === 'right' ? 'md:justify-end' : 'md:justify-start'}`}>
            <article data-side={s.side} className="story-card w-full max-w-[30rem] rounded-[2rem] bg-white/88 p-6 shadow-[0_20px_60px_rgba(28,37,89,.14)] backdrop-blur-md sm:p-8 md:max-w-[38%]">
              <p className="flex items-baseline gap-3">
                <span className="font-display text-base font-bold text-morado">{s.n}</span>
                <span className={`font-display text-[clamp(2.8rem,5vw,4.4rem)] font-extrabold leading-none ${s.color} [-webkit-text-stroke:2px_#6A479E] [paint-order:stroke_fill] [text-shadow:4px_4px_0_#6A479E]`}>{s.verbo}</span>
              </p>
              <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-terra sm:text-3xl">{s.titulo}</h2>
              <p className="mt-3 text-base font-semibold leading-relaxed text-tinta/85 sm:text-lg">{s.texto}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.chips.map((c) => (
                  <li key={c} className="chip bg-brote text-tinta normal-case tracking-normal">
                    {c}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady()
  }, [onReady])
  return null
}

function HeroWords() {
  const parts: { w: string; cls?: string }[] = [
    { w: 'Un' },
    { w: 'espacio' },
    { w: 'para' },
    { w: 'aprender,', cls: 'hl hl-naranja' },
    { w: 'crecer', cls: 'hl hl-cesped' },
    { w: 'y' },
    { w: 'divertirse', cls: 'hl hl-sol' },
  ]
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} className={`split-word relative ${p.cls ?? ''}`} aria-hidden="true">
          {Array.from(p.w).map((c, j) => (
            <span key={j} className="split-char">
              {c}
            </span>
          ))}
          {i < parts.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </>
  )
}
