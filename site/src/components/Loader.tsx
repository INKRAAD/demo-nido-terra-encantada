import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

/** Loader de marca: el logo aparece mientras el césped "crece" como barra de progreso. */
export default function Loader({ ready, onDone, reduced }: { ready: boolean; onDone: () => void; reduced: boolean }) {
  const [pct, setPct] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const min = reduced ? 300 : 1700
    const tick = (now: number) => {
      const t = Math.min((now - start) / min, 1)
      setPct((p) => {
        const target = ready ? Math.max(t * 100, p + 2) : Math.min(t * 88, 88)
        return Math.min(100, Math.max(p, target))
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ready, reduced])

  useEffect(() => {
    if (pct >= 100 && show) {
      const id = setTimeout(() => setShow(false), reduced ? 50 : 250)
      return () => clearTimeout(id)
    }
  }, [pct, show, reduced])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label="Cargando Terra Encantada"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-terra text-white"
          initial={{ y: 0 }}
          exit={reduced ? { opacity: 0 } : { y: '-110%', borderBottomLeftRadius: '50% 18%', borderBottomRightRadius: '50% 18%' }}
          transition={{ duration: reduced ? 0.2 : 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.svg
            viewBox="0 0 200 200"
            className="absolute h-[70vmin] w-[70vmin] text-sol opacity-25"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x="96" y="6" width="8" height="34" rx="4" fill="currentColor" transform={`rotate(${i * 30} 100 100)`} />
            ))}
          </motion.svg>
          <motion.div
            className="relative rounded-[42%_58%_50%_50%/50%_45%_55%_50%] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,.25)] sm:p-8"
            initial={reduced ? { opacity: 0 } : { scale: 0.4, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={reduced ? { duration: 0.2 } : { type: 'spring', stiffness: 160, damping: 11 }}
          >
            <img src="/logo-terra-encantada.svg" alt="" className="h-auto w-[min(62vw,300px)]" width={300} height={219} />
          </motion.div>
          <div className="relative mt-10 w-[min(70vw,320px)]">
            <div className="h-4 overflow-hidden rounded-full bg-white/20">
              <div className="h-full rounded-full bg-cesped transition-[width] duration-200" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 text-center font-display text-lg font-semibold">
              Sembrando la tierra encantada… <span className="tabular-nums">{Math.round(pct)}%</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
