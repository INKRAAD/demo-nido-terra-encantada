import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { waLink } from '../data/brand'
import { scrollToId } from '../lib/scroll'
import { IconWhatsApp } from './Icons'

const LINKS = [
  { id: 'programas', label: 'Programas' },
  { id: 'talleres', label: 'Talleres' },
  { id: 'familias', label: 'Familias' },
  { id: 'galeria', label: 'Galería' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'visitanos', label: 'Visítanos' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Principal"
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full py-1.5 pl-3 pr-2 transition-all duration-500 ${
          scrolled ? 'bg-white/90 shadow-[0_10px_30px_rgba(28,37,89,.12)] backdrop-blur-md' : 'bg-white/0'
        }`}
      >
        <a href="#inicio" onClick={go('inicio')} className="shrink-0 rounded-2xl" aria-label="Terra Encantada, ir al inicio">
          <img src="/logo-terra-encantada.svg" alt="Terra Encantada · Centro de Apoyo en el Desarrollo del Niño" className="h-12 w-auto sm:h-14 lg:h-16" width={84} height={62} />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                className="group relative rounded-full px-3.5 py-2 font-display text-[17px] font-bold text-tinta transition-colors hover:text-terra"
              >
                {l.label}
                <span className="absolute inset-x-3 bottom-1 h-1 origin-left scale-x-0 rounded-full bg-sol transition-transform duration-300 ease-rebote group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary hidden !px-5 !py-3 !text-base sm:inline-flex">
            <IconWhatsApp size={20} /> Matrícula 2026
          </a>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-terra text-white lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 h-[3px] w-5 rounded bg-current transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-[3px] w-5 rounded bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-[3px] w-5 rounded bg-current transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 -z-10 flex flex-col justify-center bg-terra px-8 lg:hidden"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <motion.li key={l.id} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <a href={`#${l.id}`} onClick={go(l.id)} className="font-display text-5xl font-extrabold text-white">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-10 self-start">
              <IconWhatsApp size={22} /> Escríbenos por WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
