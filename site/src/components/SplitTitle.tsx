import { createElement, type ReactNode } from 'react'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  /** palabras (en minúscula, sin signos) a resaltar con una clase */
  highlight?: Record<string, string>
  id?: string
}

/**
 * Divide un título en palabras y letras para animarlas con GSAP (atributo data-split).
 * El texto completo queda en aria-label para lectores de pantalla.
 */
export default function SplitTitle({ text, as = 'h2', className = '', highlight = {}, id }: Props) {
  const words = text.split(' ')
  const children: ReactNode[] = words.map((w, wi) => {
    const key = w.toLowerCase().replace(/[.,;:!¡¿?]/g, '')
    const hl = highlight[key]
    return (
      <span key={wi} className={`split-word ${hl ?? ''}`} aria-hidden="true">
        {Array.from(w).map((ch, ci) => (
          <span key={ci} className="split-char">
            {ch}
          </span>
        ))}
        {wi < words.length - 1 ? '\u00A0' : ''}
      </span>
    )
  })
  return createElement(as, { className, 'aria-label': text, 'data-split': '', id }, children)
}
