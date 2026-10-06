import { useMemo, useRef, type MutableRefObject, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { placeOnSurface } from './terrain'

export const PAL = {
  terra: '#2D5EC4',
  cesped: '#96DB6A',
  sol: '#F0E31D',
  naranja: '#E59D2A',
  morado: '#6A479E',
  brote: '#D0E9B1',
  anillo: '#7C99E6',
  casa: '#C0502E',
  crema: '#FFFBEA',
  rosa: '#E8336B',
  tronco: '#9A6436',
}

export function Mat({ color, emissive, ei = 0, flat = true, rough = 0.85 }: { color: string; emissive?: string; ei?: number; flat?: boolean; rough?: number }) {
  return <meshStandardMaterial color={color} flatShading={flat} roughness={rough} metalness={0} emissive={emissive ?? '#000000'} emissiveIntensity={ei} />
}

/** Grupo anclado a la superficie del planeta. */
export function OnSurface({ dir, sink, scale = 1, yaw = 0, children }: { dir: THREE.Vector3; sink?: number; scale?: number; yaw?: number; children: ReactNode }) {
  const { pos, quat } = useMemo(() => placeOnSurface(dir, sink), [dir, sink])
  return (
    <group position={pos} quaternion={quat} scale={scale}>
      <group rotation={[0, yaw, 0]}>{children}</group>
    </group>
  )
}

export function PineTree({ color = PAL.cesped }: { color?: string }) {
  return (
    <group>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.035, 0.05, 0.24, 6]} />
        <Mat color={PAL.tronco} />
      </mesh>
      <mesh position={[0, 0.34, 0]}>
        <coneGeometry args={[0.2, 0.34, 7]} />
        <Mat color={color} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <coneGeometry args={[0.14, 0.26, 7]} />
        <Mat color={color} />
      </mesh>
    </group>
  )
}

export function PuffTree({ color = PAL.sol, size = 1 }: { color?: string; size?: number }) {
  return (
    <group scale={size}>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.035, 0.055, 0.28, 6]} />
        <Mat color={PAL.tronco} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <icosahedronGeometry args={[0.2, 0]} />
        <Mat color={color} />
      </mesh>
      <mesh position={[0.1, 0.33, 0.06]}>
        <icosahedronGeometry args={[0.12, 0]} />
        <Mat color={color} />
      </mesh>
    </group>
  )
}

/** La casita del logo, convertida en el nido. */
export function House() {
  return (
    <group>
      <mesh position={[0, 0.17, 0]}>
        <boxGeometry args={[0.42, 0.34, 0.36]} />
        <Mat color={PAL.crema} />
      </mesh>
      <mesh position={[0, 0.45, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.37, 0.26, 4]} />
        <Mat color={PAL.casa} />
      </mesh>
      <mesh position={[0.12, 0.52, -0.05]}>
        <boxGeometry args={[0.06, 0.14, 0.06]} />
        <Mat color={PAL.casa} />
      </mesh>
      <mesh position={[0, 0.1, 0.181]}>
        <boxGeometry args={[0.11, 0.19, 0.01]} />
        <Mat color={PAL.morado} />
      </mesh>
      <mesh position={[-0.13, 0.22, 0.181]}>
        <boxGeometry args={[0.08, 0.08, 0.01]} />
        <Mat color={PAL.sol} emissive={PAL.sol} ei={0.5} />
      </mesh>
      <mesh position={[0.13, 0.22, 0.181]}>
        <boxGeometry args={[0.08, 0.08, 0.01]} />
        <Mat color={PAL.sol} emissive={PAL.sol} ei={0.5} />
      </mesh>
    </group>
  )
}

/** La flor de colores del logo. */
export function Flower({ scale = 1 }: { scale?: number }) {
  const petals = [PAL.rosa, PAL.terra, PAL.cesped, PAL.naranja, '#E0209A']
  return (
    <group scale={scale}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.012, 0.016, 0.24, 5]} />
        <Mat color="#5FAF3E" />
      </mesh>
      <group position={[0, 0.26, 0]} rotation={[0.5, 0, 0]}>
        {petals.map((c, i) => {
          const a = (i / petals.length) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 0.055, Math.sin(a) * 0.055, 0]} scale={[1, 1, 0.5]}>
              <icosahedronGeometry args={[0.045, 1]} />
              <Mat color={c} />
            </mesh>
          )
        })}
        <mesh position={[0, 0, 0.015]}>
          <icosahedronGeometry args={[0.035, 1]} />
          <Mat color={PAL.sol} emissive={PAL.sol} ei={0.25} />
        </mesh>
      </group>
    </group>
  )
}

/** Bloques ABC para la estación "Aprender". */
export function Blocks() {
  const b = [
    { p: [-0.12, 0.08, 0], c: PAL.terra, r: 0.1 },
    { p: [0.08, 0.08, 0.04], c: PAL.naranja, r: -0.2 },
    { p: [-0.02, 0.24, 0.02], c: PAL.sol, r: 0.35 },
    { p: [0.26, 0.08, -0.12], c: PAL.morado, r: 0.6 },
  ] as const
  return (
    <group>
      {b.map((x, i) => (
        <mesh key={i} position={x.p as unknown as [number, number, number]} rotation={[0, x.r, 0]}>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <Mat color={x.c} />
        </mesh>
      ))}
      {/* lápiz */}
      <group position={[-0.3, 0, 0.05]} rotation={[0, 0, 0.25]}>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.42, 6]} />
          <Mat color={PAL.sol} />
        </mesh>
        <mesh position={[0, 0.04, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.04, 0.08, 6]} />
          <Mat color="#F3D6A4" />
        </mesh>
        <mesh position={[0, 0.51, 0]}>
          <cylinderGeometry args={[0.042, 0.042, 0.06, 6]} />
          <Mat color={PAL.rosa} />
        </mesh>
      </group>
    </group>
  )
}

/** Personaje "territo": cuerpo redondo con brote en la cabeza. Rebota y salta al tocar el planeta. */
export function Critter({ color, phase = 0, jumpAt, still }: { color: string; phase?: number; jumpAt: MutableRefObject<number>; still: boolean }) {
  const g = useRef<THREE.Group>(null)
  const body = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (still || !g.current || !body.current) return
    const t = clock.elapsedTime
    const b = Math.abs(Math.sin(t * 2.6 + phase))
    const since = t - jumpAt.current
    const jump = since >= 0 && since < 0.9 ? Math.sin((since / 0.9) * Math.PI) * 0.45 : 0
    g.current.position.y = b * 0.09 + jump
    const sq = 1 - b
    body.current.scale.set(1 + sq * 0.12, 1 - sq * 0.14, 1 + sq * 0.12)
    g.current.rotation.y = Math.sin(t * 0.8 + phase) * 0.35 + (jump > 0 ? since * 7 : 0)
  })
  return (
    <group ref={g}>
      <group ref={body} rotation={[0.35, 0, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.15, 20, 16]} />
          <Mat color={color} flat={false} rough={0.6} />
        </mesh>
        {[-1, 1].map((s) => (
          <group key={s}>
            <mesh position={[s * 0.052, 0.19, 0.128]}>
              <sphereGeometry args={[0.032, 12, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            <mesh position={[s * 0.052, 0.19, 0.155]}>
              <sphereGeometry args={[0.017, 10, 8]} />
              <meshStandardMaterial color="#1C2559" roughness={0.3} />
            </mesh>
            <mesh position={[s * 0.095, 0.135, 0.11]}>
              <sphereGeometry args={[0.022, 10, 8]} />
              <meshStandardMaterial color="#F59AB5" roughness={0.8} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0.4]}>
          <coneGeometry args={[0.03, 0.09, 5]} />
          <Mat color="#5FAF3E" />
        </mesh>
        <mesh position={[0.04, 0.33, 0]} rotation={[0, 0, -0.9]} scale={[1, 0.5, 0.6]}>
          <icosahedronGeometry args={[0.04, 0]} />
          <Mat color={PAL.cesped} />
        </mesh>
      </group>
    </group>
  )
}

export function Cloud({ scale = 1 }: { scale?: number }) {
  const parts = useMemo(
    () => [
      [0, 0, 0, 0.22],
      [0.22, -0.04, 0.02, 0.16],
      [-0.22, -0.05, 0, 0.15],
      [0.08, 0.1, -0.04, 0.15],
    ],
    [],
  )
  return (
    <group scale={scale}>
      {parts.map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <icosahedronGeometry args={[r, 1]} />
          <meshStandardMaterial color="#ffffff" flatShading roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

/** Mariposa del logo: dos alas que aletean. */
export function Butterfly({ color = PAL.naranja, still }: { color?: string; still: boolean }) {
  const l = useRef<THREE.Group>(null)
  const r = useRef<THREE.Group>(null)
  const wing = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(0, 0)
    s.bezierCurveTo(0.05, 0.12, 0.2, 0.14, 0.18, 0.03)
    s.bezierCurveTo(0.22, -0.04, 0.12, -0.14, 0, -0.02)
    return new THREE.ShapeGeometry(s)
  }, [])
  useFrame(({ clock }) => {
    if (still) return
    const a = Math.sin(clock.elapsedTime * 14) * 0.9
    if (l.current) l.current.rotation.y = a
    if (r.current) r.current.rotation.y = -a
  })
  return (
    <group rotation={[-1.1, 0, 0]}>
      <group ref={l}>
        <mesh geometry={wing}>
          <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.7} />
        </mesh>
      </group>
      <group ref={r} scale={[-1, 1, 1]}>
        <mesh geometry={wing}>
          <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.7} />
        </mesh>
      </group>
      <mesh rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.015, 0.12, 4, 6]} />
        <meshStandardMaterial color={PAL.morado} />
      </mesh>
    </group>
  )
}

/** Sol del logo: núcleo + rayos que giran. */
export function Sun({ still }: { still: boolean }) {
  const rays = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (still) return
    const t = clock.elapsedTime
    if (rays.current) rays.current.rotation.z = t * 0.25
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 2) * 0.04)
  })
  return (
    <group>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.42, 2]} />
        <meshStandardMaterial color={PAL.sol} emissive={PAL.sol} emissiveIntensity={0.55} flatShading roughness={0.6} />
      </mesh>
      <group ref={rays}>
        {Array.from({ length: 9 }).map((_, i) => {
          const a = (i / 9) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 0.68, Math.sin(a) * 0.68, 0]} rotation={[0, 0, a - Math.PI / 2]}>
              <capsuleGeometry args={[0.055, 0.26, 4, 8]} />
              <meshStandardMaterial color={PAL.sol} emissive={PAL.sol} emissiveIntensity={0.45} roughness={0.6} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
