import { useEffect, useRef } from 'react'

/**
 * Cursor de marca: un pequeño sol que sigue al puntero con una estela de brillitos.
 * Crece sobre enlaces/botones y muestra "¡Tócame!" sobre el planeta 3D.
 * Solo se monta con puntero fino y sin prefers-reduced-motion.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const trail = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    document.documentElement.classList.add('has-cursor')
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { ...pos }
    const tp = Array.from({ length: 7 }, () => ({ ...pos }))
    let hover = false
    let visible = false
    const move = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) {
        visible = true
        document.documentElement.classList.add('cursor-on')
      }
      const t = e.target as HTMLElement | null
      hover = !!t?.closest('a,button,[role="button"],input,textarea,select,label')
    }
    const leave = () => {
      visible = false
      document.documentElement.classList.remove('cursor-on')
    }
    let raf = 0
    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.2
      ringPos.y += (pos.y - ringPos.y) * 0.2
      const play = document.body.dataset.cursor === 'play'
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      if (ring.current) {
        const s = play ? 2.2 : hover ? 1.8 : 1
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${s})`
        ring.current.dataset.state = play ? 'play' : hover ? 'hover' : ''
      }
      if (label.current) label.current.style.opacity = play ? '1' : '0'
      let prev = pos
      tp.forEach((p, i) => {
        p.x += (prev.x - p.x) * 0.35
        p.y += (prev.y - p.y) * 0.35
        prev = p
        const el = trail.current[i]
        if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${1 - i / 9})`
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      document.documentElement.classList.remove('has-cursor', 'cursor-on')
    }
  }, [])

  const colors = ['#F0E31D', '#E59D2A', '#96DB6A', '#7C99E6', '#6A479E', '#F0E31D', '#E59D2A']
  return (
    <div aria-hidden="true" className="cursor-layer pointer-events-none fixed inset-0 z-[90] opacity-0 transition-opacity duration-300 [.cursor-on_&]:opacity-100">
      {colors.map((c, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trail.current[i] = el
          }}
          className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full"
          style={{ background: c, opacity: 0.7 }}
        />
      ))}
      <div
        ref={ring}
        className="absolute left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-terra/70 transition-[background-color,border-color] duration-300 data-[state=hover]:border-sol data-[state=hover]:bg-sol/30 data-[state=play]:border-naranja data-[state=play]:bg-sol/40"
      >
        <span ref={label} className="whitespace-nowrap font-display text-[7px] font-extrabold text-tinta opacity-0 transition-opacity">
          ¡Tócame!
        </span>
      </div>
      <div ref={dot} className="absolute left-0 top-0 -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-naranja shadow-[0_0_0_3px_#F0E31D]" />
    </div>
  )
}
