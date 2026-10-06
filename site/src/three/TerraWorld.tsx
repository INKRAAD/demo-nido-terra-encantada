import { useMemo, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { buildPlanetGeometry, dirFrom, landSpots, LAT, R, STATIONS } from './terrain'
import { Blocks, Butterfly, Cloud, Critter, Flower, House, OnSurface, PAL, PineTree, PuffTree, Sun } from './props'

type Props = {
  progress: MutableRefObject<number>
  lite: boolean
  still: boolean
  active: boolean
}

type Key = { x: number; y: number; s: number; ry: number }

const DESKTOP: Key[] = [
  { x: 2.5, y: -1.55, s: 1.25, ry: -STATIONS.nido },
  { x: -2.45, y: -1.45, s: 1.25, ry: -STATIONS.aprender },
  { x: 2.7, y: -1.45, s: 1.25, ry: -STATIONS.crecer },
  { x: -2.45, y: -1.45, s: 1.25, ry: -STATIONS.divertirse },
]
const MOBILE: Key[] = [
  { x: 0, y: -2.8, s: 0.62, ry: -STATIONS.nido },
  { x: 0, y: -2.75, s: 0.62, ry: -STATIONS.aprender },
  { x: 0, y: -2.75, s: 0.62, ry: -STATIONS.crecer },
  { x: 0, y: -2.75, s: 0.62, ry: -STATIONS.divertirse },
]
/** Inclinación: las estaciones quedan sobre el "horizonte" del planeta, como la casita sobre el círculo del logo. */
const TILT = -0.78

const ease = (t: number) => t * t * (3 - 2 * t)

function sample(keys: Key[], p: number): Key {
  const seg = Math.min(Math.max(p, 0), 0.9999) * (keys.length - 1)
  const i = Math.floor(seg)
  const f = ease(seg - i)
  const a = keys[i]
  const b = keys[i + 1] ?? a
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, s: a.s + (b.s - a.s) * f, ry: a.ry + (b.ry - a.ry) * f }
}

function World({ progress, lite, still }: Omit<Props, 'active'>) {
  const anchor = useRef<THREE.Group>(null)
  const spin = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Group>(null)
  const sun = useRef<THREE.Group>(null)
  const clouds = useRef<THREE.Group>(null)
  const flyers = useRef<THREE.Group>(null)
  const jumpAt = useRef(-10)
  const { size, clock } = useThree()
  const mobile = size.width < 768

  const geo = useMemo(() => buildPlanetGeometry(lite ? 3 : 4), [lite])
  const trees = useMemo(() => landSpots(900, lite ? 16 : 30, 0.7), [lite])

  const at = (az: number, lat: number) => dirFrom(az, lat)
  const S = STATIONS

  useFrame((state, dt) => {
    const k = sample(mobile ? MOBILE : DESKTOP, still ? 0 : progress.current)
    const a = anchor.current
    const sp = spin.current
    if (!a || !sp) return
    const t = state.clock.elapsedTime
    const px = still ? 0 : state.pointer.x
    const py = still ? 0 : state.pointer.y
    const d = Math.min(dt, 0.05)
    const damp = (c: number, t: number, l: number, dd: number) => (still ? t : THREE.MathUtils.damp(c, t, l, dd))
    a.position.x = damp(a.position.x, k.x, 4, d)
    a.position.y = damp(a.position.y, k.y + (still ? 0 : Math.sin(t * 0.8) * 0.05), 4, d)
    const sc = damp(a.scale.x, k.s, 4, d)
    a.scale.setScalar(sc)
    const idle = still ? 0 : Math.sin(t * 0.25) * 0.12
    sp.rotation.y = damp(sp.rotation.y, k.ry + idle + px * 0.25, 3.2, d)
    sp.rotation.x = damp(sp.rotation.x, TILT - py * 0.1, 3.2, d)
    if (halo.current && !still) halo.current.rotation.y = t * 0.12
    // el sol se ubica siempre del lado libre de texto
    if (sun.current) sun.current.position.x = damp(sun.current.position.x, mobile ? -1.5 : k.x < 0 ? 1.8 : -1.7, 2.5, d)
    if (clouds.current && !still) clouds.current.rotation.y = t * 0.06
    if (flyers.current && !still) flyers.current.rotation.y = -t * 0.18
  })

  return (
    <group ref={anchor}>
      <group ref={sun} position={[-1.7, 2.45, -0.6]}>
        <Sun still={still} />
      </group>

      {/* órbita de puntitos (como el arco punteado de sus afiches 2026) */}
      <group position={[0, 1.0, 0]} rotation={[0.32, 0, -0.12]}>
        <group ref={halo}>
          {Array.from({ length: lite ? 28 : 44 }).map((_, i, arr) => {
            const a = (i / arr.length) * Math.PI * 2
            return (
              <mesh key={i} position={[Math.cos(a) * R * 1.38, 0, Math.sin(a) * R * 1.38]}>
                <icosahedronGeometry args={[i % 2 ? 0.045 : 0.07, 0]} />
                <meshStandardMaterial color={i % 2 ? '#ffffff' : PAL.sol} emissive={i % 2 ? '#ffffff' : PAL.sol} emissiveIntensity={0.35} flatShading />
              </mesh>
            )
          })}
        </group>
      </group>

      <group ref={spin}>
        <mesh
          geometry={geo}
          onClick={(e) => {
            e.stopPropagation()
            jumpAt.current = clock.elapsedTime
          }}
          onPointerOver={() => (document.body.dataset.cursor = 'play')}
          onPointerOut={() => delete document.body.dataset.cursor}
        >
          <meshStandardMaterial vertexColors flatShading roughness={0.92} metalness={0} />
        </mesh>

        {trees.map((d, i) => (
          <OnSurface key={i} dir={d} scale={0.75 + ((i * 37) % 10) / 22} yaw={i}>
            {i % 3 === 0 ? (
              <PuffTree color={[PAL.sol, PAL.naranja, PAL.cesped, PAL.brote][i % 4]} />
            ) : (
              <PineTree color={i % 2 ? PAL.cesped : '#6CC24A'} />
            )}
          </OnSurface>
        ))}

        {/* Estación 0 · El nido (la casita del logo) */}
        <OnSurface dir={at(S.nido, LAT + 0.02)} scale={1.25}>
          <House />
        </OnSurface>
        <OnSurface dir={at(S.nido + 0.17, LAT - 0.06)} scale={1.4}>
          <Flower />
        </OnSurface>
        <OnSurface dir={at(S.nido - 0.2, LAT - 0.08)} scale={1.1}>
          <Critter color={PAL.naranja} phase={0.4} jumpAt={jumpAt} still={still} />
        </OnSurface>
        <OnSurface dir={at(S.nido + 0.3, LAT + 0.1)} scale={1.2}>
          <PuffTree color={PAL.cesped} />
        </OnSurface>

        {/* Estación 1 · Aprender */}
        <OnSurface dir={at(S.aprender, LAT)} scale={1.3}>
          <Blocks />
        </OnSurface>
        <OnSurface dir={at(S.aprender + 0.22, LAT - 0.08)} scale={1.05}>
          <Critter color={PAL.morado} phase={1.1} jumpAt={jumpAt} still={still} />
        </OnSurface>
        <OnSurface dir={at(S.aprender - 0.2, LAT + 0.08)} scale={1.2}>
          <Flower />
        </OnSurface>

        {/* Estación 2 · Crecer */}
        <OnSurface dir={at(S.crecer, LAT + 0.04)} scale={2.1}>
          <PuffTree color={PAL.cesped} />
        </OnSurface>
        <OnSurface dir={at(S.crecer + 0.18, LAT - 0.06)} scale={1.1}>
          <PuffTree color={PAL.sol} size={0.7} />
        </OnSurface>
        <OnSurface dir={at(S.crecer - 0.16, LAT - 0.08)} scale={0.9}>
          <PuffTree color={PAL.naranja} size={0.5} />
        </OnSurface>
        <OnSurface dir={at(S.crecer - 0.08, LAT - 0.16)} scale={1}>
          <Critter color={PAL.sol} phase={2.2} jumpAt={jumpAt} still={still} />
        </OnSurface>

        {/* Estación 3 · Divertirse */}
        {[PAL.naranja, PAL.anillo, PAL.sol, PAL.morado].map((c, i) => (
          <OnSurface key={c} dir={at(S.divertirse + (i - 1.5) * 0.16, LAT - 0.04 + (i % 2) * 0.1)} scale={1.15}>
            <Critter color={c} phase={i * 0.9} jumpAt={jumpAt} still={still} />
          </OnSurface>
        ))}
        <OnSurface dir={at(S.divertirse, LAT - 0.14)} scale={1}>
          <mesh position={[0, 0.09, 0]}>
            <icosahedronGeometry args={[0.09, 1]} />
            <Mat3 />
          </mesh>
        </OnSurface>

        {!lite && (
          <group ref={flyers}>
            <group position={[R * 1.2, 0.7, 0.6]}>
              <Butterfly still={still} />
            </group>
            <group position={[-R * 1.15, 0.2, -0.9]}>
              <Butterfly color={PAL.sol} still={still} />
            </group>
          </group>
        )}
      </group>

      {lite && (
        <group ref={flyers}>
          <group position={[R * 1.15, 0.5, 0.8]}>
            <Butterfly still={still} />
          </group>
        </group>
      )}

      <group ref={clouds}>
        {[
          [2.9, 1.2, 0.4, 1.2],
          [-2.7, 0.8, 1.2, 1],
          [0.6, 1.9, -2.6, 1.1],
          [-1.2, -0.6, 2.9, 0.8],
          [2.2, -1.1, -2.2, 0.9],
        ]
          .slice(0, lite ? 3 : 5)
          .map(([x, y, z, s], i) => (
            <group key={i} position={[x, y, z]}>
              <Cloud scale={s} />
            </group>
          ))}
      </group>

      {!lite && <Sparkles count={46} scale={[7, 5, 4]} size={3.2} speed={still ? 0 : 0.35} color={PAL.sol} opacity={0.9} />}
    </group>
  )
}

function Mat3() {
  return <meshStandardMaterial color={PAL.rosa} flatShading roughness={0.5} />
}

export default function TerraWorld({ progress, lite, still, active }: Props) {
  return (
    <Canvas
      dpr={lite ? [1, 1.5] : [1, 2]}
      frameloop={still ? 'demand' : active ? 'always' : 'never'}
      gl={{ antialias: !lite, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.35, 8.6], fov: 40 }}
      aria-hidden="true"
    >
      <hemisphereLight args={['#EAF2FF', '#96DB6A', 1.15]} />
      <directionalLight position={[-4, 5, 6]} intensity={2.1} color="#FFF4D6" />
      <directionalLight position={[5, -2, -3]} intensity={0.5} color="#7C99E6" />
      <World progress={progress} lite={lite} still={still} />
    </Canvas>
  )
}
