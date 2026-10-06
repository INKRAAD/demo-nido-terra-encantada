import { useCallback, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Nav from './components/Nav'
import { Familias, Footer, Galeria, Matricula, Nosotros, Programas, Resenas, Talleres, Ubicacion, Valor } from './components/Sections'
import WhatsAppFloat from './components/WhatsAppFloat'
import WorldSection from './components/WorldSection'
import { hasWebGL, useFinePointer, useIsMobile, useReducedMotion } from './hooks/prefs'
import { setLenis } from './lib/scroll'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const fine = useFinePointer()
  const [webgl] = useState(() => hasWebGL())
  const [sceneReady, setSceneReady] = useState(false)
  const [started, setStarted] = useState(false)
  const lite = mobile || (typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4)
  const onSceneReady = useCallback(() => setSceneReady(true), [])

  // Lenis (smooth scroll) sincronizado con GSAP ScrollTrigger
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  // Bloquear el scroll mientras está el loader
  useEffect(() => {
    document.documentElement.style.overflow = started ? '' : 'hidden'
  }, [started])

  // Animaciones de aparición al hacer scroll
  useEffect(() => {
    if (!started) return
    const ctx = gsap.context(() => {
      if (reduced) return
      gsap.utils.toArray<HTMLElement>('main [data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.5)', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
      gsap.utils.toArray<HTMLElement>('main [data-split]').forEach((el) => {
        if (el.classList.contains('hero-title')) return
        gsap.fromTo(
          el.querySelectorAll('.split-char'),
          { yPercent: 100, opacity: 0, rotate: () => gsap.utils.random(-20, 20) },
          { yPercent: 0, opacity: 1, rotate: 0, duration: 0.7, ease: 'back.out(2.2)', stagger: 0.015, scrollTrigger: { trigger: el, start: 'top 85%', once: true } },
        )
      })
      // parallax suave de la galería
      gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
        const sp = parseFloat(el.dataset.speed || '0')
        gsap.fromTo(el, { y: () => sp * 200 }, { y: () => -sp * 200, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    })
    const id = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => {
      clearTimeout(id)
      ctx.revert()
    }
  }, [started, reduced])

  return (
    <>
      <a href="#contenido" className="sr-only z-[200] rounded-full bg-sol px-5 py-3 font-bold text-tinta focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Saltar al contenido
      </a>
      <Loader ready={sceneReady} reduced={reduced} onDone={() => setStarted(true)} />
      {fine && !reduced && <Cursor />}
      <Nav />
      <main id="contenido">
        <WorldSection lite={lite} reduced={reduced} webgl={webgl} started={started} onSceneReady={onSceneReady} />
        <Valor />
        <Programas />
        <Talleres />
        <Familias />
        <Galeria />
        <Resenas />
        <Nosotros />
        <Matricula />
        <Ubicacion />
      </main>
      <Footer />
      <WhatsAppFloat show={started} />
    </>
  )
}
