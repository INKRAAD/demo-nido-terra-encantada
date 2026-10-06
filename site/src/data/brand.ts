/**
 * Contenido de la marca Nido Terra Encantada.
 * Fuente: /brand/brand.md (investigación del 06-oct-2026: ficha Google vía Exa Places,
 * fanpage oficial de Facebook, afiches Matrícula 2026 y registro MINEDU).
 *
 * Convención: todo lo marcado con `⚠️ DATO A CONFIRMAR` debe validarse con el nido
 * antes de publicar. Lo marcado con `CONTENIDO DE EJEMPLO` es redacción de INKRAAD.
 */

export const BRAND = {
  nombre: 'Terra Encantada',
  nombreCompleto: 'Nido Terra Encantada',
  tagline: 'Centro de desarrollo integral del niño en la edad temprana',
  slogan: 'Un espacio para aprender, crecer y divertirse',
  frase: 'Respetan, retan y acompañan con mucho amor a los niños',
  distrito: 'La Molina, Lima',
  direccion: 'Av. Javier Prado Este 5977, La Molina, Lima',
  coords: { lat: -12.070647, lng: -76.955672 },
  horario: 'Lunes a viernes · 8:00 a 17:00',
  email: 'terraencantada1@gmail.com',
  facebook: 'https://www.facebook.com/nido.terra.encantada/',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Nido+Terra+Encantada%2C+Av.+Javier+Prado+Este+5977%2C+La+Molina%2C+Lima',
  mapsEmbed:
    'https://www.google.com/maps?q=Av.+Javier+Prado+Este+5977,+La+Molina,+Lima&z=16&output=embed',
  /** Según la fanpage oficial ("21 años de…"). Año de fundación exacto no confirmado. */
  anios: 21,
  codigoModular: '1358944',
} as const

/**
 * ⚠️ DATO A CONFIRMAR — Teléfono / WhatsApp vigente.
 * brand.md registra 4 números: 993 726 482 (afiche Matrícula 2026 + botón WhatsApp de FB),
 * 965 140 046 (ficha Google y web actual), 987 817 612 (MINEDU) y 949 728 605 (tel: de la web).
 * Usamos 993 726 482 para WhatsApp (el más reciente, afiche 2026) y 965 140 046 como teléfono.
 * Confirmar con el nido cuál es el número vigente antes de publicar.
 */
export const CONTACTO = {
  whatsappNumero: '51993726482', // ⚠️ DATO A CONFIRMAR
  whatsappVisible: '993 726 482', // ⚠️ DATO A CONFIRMAR
  telefonoNumero: '+51965140046', // ⚠️ DATO A CONFIRMAR
  telefonoVisible: '965 140 046', // ⚠️ DATO A CONFIRMAR
}

export const waLink = (msg = 'Hola Terra Encantada 🌈 Quisiera información sobre la Matrícula 2026.') =>
  `https://wa.me/${CONTACTO.whatsappNumero}?text=${encodeURIComponent(msg)}`

/**
 * ⚠️ DATO A CONFIRMAR — Calificación de Google.
 * 4.9★ con 31 reseñas según Exa Places (espejo de Google Maps); NO verificado en vivo.
 * Las reseñas visibles en la fuente son de nov–dic 2018. Confirmar en Google Maps.
 */
export const RATING = { valor: 4.9, total: 31, fuente: 'Google Maps' } // ⚠️ DATO A CONFIRMAR

/**
 * Reseñas REALES (citas cortas) tomadas de Google vía Exa Places, nov 2018.
 * La fuente no muestra los nombres de los autores, por eso se firman de forma genérica.
 */
export const RESENAS = [
  {
    texto: 'Terra es una familia. Misses con mucha paciencia, creativas y se preocupan por la necesidad de cada niño.',
    fuente: 'Reseña en Google · nov. 2018',
  },
  {
    texto: 'La educación es muy personalizada y orientada en el desarrollo emocional y de habilidades del niño.',
    fuente: 'Reseña en Google · nov. 2018',
  },
  {
    texto: 'Me encanta el orden del nido y la amabilidad de las misses.',
    fuente: 'Reseña en Google · nov. 2018',
  },
]

export type Programa = {
  id: string
  titulo: string
  edad: string
  /** CONTENIDO DE EJEMPLO: descripción redactada por INKRAAD a partir de los programas reales. */
  texto: string
  color: string
  ink: string
  icono: 'semilla' | 'brote' | 'arbol' | 'casa' | 'globo'
}

/** Programas reales (afiche Matrícula 2026). Descripciones = CONTENIDO DE EJEMPLO. */
export const PROGRAMAS: Programa[] = [
  {
    id: 'estimulacion',
    titulo: 'Estimulación temprana',
    edad: 'Bebés y primeros pasos',
    texto: 'Juego sensorial, música y movimiento para despertar la curiosidad desde los primeros meses, con mamá y papá muy cerca.',
    color: '#F0E31D',
    ink: '#1C2559',
    icono: 'semilla',
  },
  {
    id: 'preescolar',
    titulo: 'Pre-escolar 2 años',
    edad: '2 años',
    texto: 'Primeras rutinas, lenguaje y autonomía en aulas iluminadas, donde cada niño avanza a su propio ritmo.',
    color: '#96DB6A',
    ink: '#1C2559',
    icono: 'brote',
  },
  {
    id: 'inicial',
    titulo: 'Inicial 3, 4 y 5 años',
    edad: '3 a 5 años',
    texto: 'Metodología lúdica, vivencial y experimental que prepara para el colegio sin perder la alegría de aprender.',
    color: '#2D5EC4',
    ink: '#FFFFFF',
    icono: 'arbol',
  },
  {
    id: 'guarderia',
    titulo: 'Guardería',
    edad: 'Horario extendido',
    texto: 'Un segundo hogar seguro y cariñoso para los días en que la familia necesita más tiempo.',
    color: '#E59D2A',
    ink: '#1C2559',
    icono: 'casa',
  },
  {
    id: 'ingles',
    titulo: 'Inglés intensivo',
    edad: 'Todas las edades',
    texto: 'Canciones, cuentos y juegos para que el inglés se vuelva parte natural del día.',
    color: '#6A479E',
    ink: '#FFFFFF',
    icono: 'globo',
  },
]

/** Talleres reales (afiches 2026 y web actual). Textos = CONTENIDO DE EJEMPLO. */
export const TALLERES = [
  { titulo: 'Karate', texto: 'Disciplina, respeto y confianza, con cinturones y mucha energía.', foto: '/fotos/taller-karate.webp', alt: 'Niños y niñas en uniforme formados en clase de karate con su profesor en Terra Encantada' },
  { titulo: 'Psicomotricidad', texto: 'Rampas, colchonetas y circuitos para conocer su cuerpo y ganar equilibrio.', foto: '/fotos/taller-psicomotricidad.webp', alt: 'Una miss ayuda a una niña a bajar por una rampa de colchonetas de colores en la sala de psicomotricidad' },
  { titulo: 'Yoga para niños', texto: 'Respirar, estirarse y calmarse: herramientas para las emociones.', foto: null, alt: '' },
]

export const GALERIA = [
  { src: '/fotos/aula-misses.webp', alt: 'Aula de Terra Encantada con niños sentados en mesitas de madera y dos misses saludando', caption: 'Nuestras aulas', circle: true },
  { src: '/fotos/inicial-lonchera.webp', alt: 'Una miss sonriente comparte una actividad de alimentación con niños de inicial con polo verde', caption: 'Aprender jugando', circle: true },
  { src: '/fotos/jardin-exploracion.webp', alt: 'Dos niños exploran el césped del jardín buscando insectos', caption: 'Áreas verdes', circle: false },
  { src: '/fotos/inicial-aula.webp', alt: 'Niños alrededor de una mesa con témperas mientras la miss explica la actividad', caption: 'Experimentar', circle: true },
  { src: '/fotos/patio-ronda.webp', alt: 'Grupo de niños sentados en el patio escuchando a su miss junto a juegos infantiles', caption: 'El patio', circle: false },
]
