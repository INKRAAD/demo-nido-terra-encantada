import { motion } from 'motion/react'
import { waLink } from '../data/brand'
import { IconWhatsApp } from './Icons'

export default function WhatsAppFloat({ show }: { show: boolean }) {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
      className="group fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-cesped p-3.5 text-tinta shadow-[0_10px_30px_rgba(28,37,89,.25)] sm:bottom-6 sm:right-6"
      initial={{ scale: 0, rotate: -40 }}
      animate={show ? { scale: 1, rotate: 0 } : { scale: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.4 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-cesped/50 motion-reduce:hidden" />
      <IconWhatsApp size={30} />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap font-display font-bold transition-[max-width] duration-500 group-hover:max-w-40 sm:inline">
        ¡Escríbenos!
      </span>
    </motion.a>
  )
}
