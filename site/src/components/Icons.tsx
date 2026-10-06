import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }
const base = (size = 24) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true as const })

export const IconWhatsApp = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path fill="currentColor" d="M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.3-.3-.3-.5-.4Z" />
  </svg>
)
export const IconStar = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path fill="currentColor" d="M12 2.8l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.6l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" />
  </svg>
)
export const IconPin = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)
export const IconClock = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p} stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
export const IconMail = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p} stroke="currentColor" strokeWidth={2} strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)
export const IconPhone = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p} stroke="currentColor" strokeWidth={2} strokeLinejoin="round">
    <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  </svg>
)
export const IconFacebook = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path fill="currentColor" d="M14 8.5V6.8c0-.8.5-1 1-1h2.2V2.1L14.3 2C11 2 10.3 4.4 10.3 6v2.5H8v3.7h2.3V22H14v-9.8h2.9l.4-3.7H14Z" />
  </svg>
)
export const IconArrow = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p} stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/** Íconos de programa dibujados en el estilo del logo (trazo tipo plumón). */
export const ProgramIcon = ({ name, color = 'currentColor', size = 64 }: { name: string; color?: string; size?: number }) => {
  const s = { stroke: color, strokeWidth: 3.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {name === 'semilla' && (
        <g {...s}>
          <path d="M12 50c10-4 30-4 40 0" />
          <ellipse cx="32" cy="40" rx="9" ry="7" />
          <path d="M32 33c0-8 4-12 10-14-1 7-4 11-10 14Z" />
        </g>
      )}
      {name === 'brote' && (
        <g {...s}>
          <path d="M10 52c12-5 32-5 44 0" />
          <path d="M32 50V26" />
          <path d="M32 34c-10 0-14-6-15-13 8 0 14 4 15 13Z" />
          <path d="M32 28c2-9 8-13 16-13-1 9-7 13-16 13Z" />
        </g>
      )}
      {name === 'arbol' && (
        <g {...s}>
          <path d="M32 56V34M24 56h16" />
          <path d="M20 34a12 12 0 0 1 2-20 12 12 0 0 1 20 0 12 12 0 0 1 2 20Z" />
          <circle cx="27" cy="24" r="1.6" fill={color} />
          <circle cx="37" cy="27" r="1.6" fill={color} />
        </g>
      )}
      {name === 'casa' && (
        <g {...s}>
          <path d="M12 30 32 12l20 18" />
          <path d="M17 26v26h30V26" />
          <path d="M28 52V40h8v12" />
          <path d="M42 18v-6h5v10" />
        </g>
      )}
      {name === 'globo' && (
        <g {...s}>
          <circle cx="32" cy="32" r="19" />
          <path d="M13 32h38M32 13c-7 6-7 32 0 38M32 13c7 6 7 32 0 38" />
        </g>
      )}
      {name === 'yoga' && (
        <g {...s}>
          <circle cx="32" cy="15" r="5" />
          <path d="M32 21v14M32 26l-12-6M32 26l12-6M18 48c4-8 9-12 14-13 5 1 10 5 14 13M14 48h36" />
        </g>
      )}
      {name === 'corazon' && (
        <g {...s}>
          <path d="M32 52S12 40 12 25a10 10 0 0 1 20-3 10 10 0 0 1 20 3c0 15-20 27-20 27Z" />
        </g>
      )}
      {name === 'familia' && (
        <g {...s}>
          <circle cx="20" cy="18" r="6" />
          <circle cx="44" cy="18" r="6" />
          <circle cx="32" cy="34" r="4.5" />
          <path d="M10 50c0-10 4-18 10-18s8 4 9 7M54 50c0-10-4-18-10-18s-8 4-9 7M25 52c0-6 3-10 7-10s7 4 7 10" />
        </g>
      )}
      {name === 'cerebro' && (
        <g {...s}>
          <path d="M24 50c-6 0-10-4-10-9 0-3 1-5 3-6-2-2-3-4-2-7 1-4 5-6 8-5 1-4 4-7 9-7s8 3 9 7c3-1 7 1 8 5 1 3 0 5-2 7 2 1 3 3 3 6 0 5-4 9-10 9" />
          <path d="M32 16v36M24 30c3 0 6 2 8 5M40 30c-3 0-6 2-8 5" />
        </g>
      )}
      {name === 'globo-fiesta' && (
        <g {...s}>
          <ellipse cx="26" cy="22" rx="10" ry="12" />
          <ellipse cx="42" cy="26" rx="9" ry="11" />
          <path d="M26 34c0 6-2 10 2 18M42 37c0 5 2 9-2 15" />
        </g>
      )}
    </svg>
  )
}
