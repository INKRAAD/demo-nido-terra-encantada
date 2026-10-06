import * as THREE from 'three'

export const R = 2
export const WATER = -0.2
const AMP = 0.3

/** Estaciones del mundo (azimut en radianes). Cada una se gira hacia la cámara con el scroll. */
export const STATIONS = {
  nido: 0,
  aprender: 1.9,
  crecer: 3.6,
  divertirse: 5.2,
}
export const LAT = 0.28

export function dirFrom(az: number, lat: number) {
  return new THREE.Vector3(Math.sin(az) * Math.cos(lat), Math.sin(lat), Math.cos(az) * Math.cos(lat))
}

const featureDirs = [
  dirFrom(STATIONS.nido, LAT),
  dirFrom(STATIONS.aprender, LAT),
  dirFrom(STATIONS.crecer, LAT),
  dirFrom(STATIONS.divertirse, LAT),
]

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}

/** Altura procedural determinística (sin dependencias) en función de la dirección unitaria. */
export function height(x: number, y: number, z: number) {
  let h =
    0.55 * Math.sin(2.1 * x + 0.7) * Math.sin(2.4 * y + 1.9) * Math.sin(2.2 * z + 0.3) +
    0.3 * Math.sin(4.3 * x + 2.0 * y + 1.1) * Math.cos(3.7 * z - 1.2 * x) +
    0.15 * Math.sin(8.1 * y + 5.3 * z) * Math.sin(7.7 * x)
  // mesetas suaves bajo cada estación para que siempre estén sobre césped
  for (const f of featureDirs) {
    const d = x * f.x + y * f.y + z * f.z
    const k = smooth(0.86, 0.97, d)
    h = h + k * (0.02 - h)
  }
  return h
}

export function radiusAt(dir: THREE.Vector3) {
  const h = height(dir.x, dir.y, dir.z)
  return R + Math.max(h - WATER, 0) * AMP
}

export function buildPlanetGeometry(detail: number) {
  const base = new THREE.IcosahedronGeometry(1, detail)
  const pos = base.attributes.position as THREE.BufferAttribute
  const colors = new Float32Array(pos.count * 3)
  const v = new THREE.Vector3()
  const cTerra = new THREE.Color('#2D5EC4')
  const cAnillo = new THREE.Color('#7C99E6')
  const cBrote = new THREE.Color('#D0E9B1')
  const cCesped = new THREE.Color('#96DB6A')
  const cCesped2 = new THREE.Color('#7FCB55')
  const cSol = new THREE.Color('#F0E31D')
  const hs: number[] = []
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize()
    const h = height(v.x, v.y, v.z)
    hs.push(h)
    const r = R + Math.max(h - WATER, 0) * AMP
    pos.setXYZ(i, v.x * r, v.y * r, v.z * r)
  }
  const c = new THREE.Color()
  for (let f = 0; f < pos.count; f += 3) {
    const h = (hs[f] + hs[f + 1] + hs[f + 2]) / 3
    const jitter = Math.sin(f * 12.9898) * 0.5 + 0.5
    if (h < WATER - 0.12) c.copy(cTerra)
    else if (h < WATER) c.copy(cTerra).lerp(cAnillo, 0.55)
    else if (h < WATER + 0.06) c.copy(cBrote)
    else if (h > 0.42) c.copy(cBrote).lerp(cSol, 0.25)
    else c.copy(jitter > 0.5 ? cCesped : cCesped2)
    for (let k = 0; k < 3; k++) {
      colors[(f + k) * 3] = c.r
      colors[(f + k) * 3 + 1] = c.g
      colors[(f + k) * 3 + 2] = c.b
    }
  }
  base.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  base.computeVertexNormals()
  return base
}

/** Posición + orientación sobre la superficie (y = normal, z = hacia la cámara cuando la estación está al frente). */
export function placeOnSurface(dir: THREE.Vector3, sink = 0.02) {
  const up = dir.clone().normalize()
  const r = radiusAt(up) - sink
  const pos = up.clone().multiplyScalar(r)
  const a = new THREE.Vector3(up.x, 0, up.z)
  if (a.lengthSq() < 1e-4) a.set(0, 0, 1)
  a.normalize()
  const fwd = a.sub(up.clone().multiplyScalar(a.dot(up)))
  if (fwd.lengthSq() < 1e-6) fwd.set(0, 0, 1)
  fwd.normalize()
  const right = new THREE.Vector3().crossVectors(up, fwd).normalize()
  const m = new THREE.Matrix4().makeBasis(right, up, fwd)
  const quat = new THREE.Quaternion().setFromRotationMatrix(m)
  return { pos, quat }
}

/** Puntos de Fibonacci sobre tierra firme, lejos de las estaciones. */
export function landSpots(n: number, take: number, seed = 1) {
  const out: THREE.Vector3[] = []
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n
    const rr = Math.sqrt(1 - y * y)
    const t = i * 2.399963 + seed
    const d = new THREE.Vector3(Math.cos(t) * rr, y, Math.sin(t) * rr)
    const h = height(d.x, d.y, d.z)
    if (h < WATER + 0.09) continue
    if (Math.abs(d.y) > 0.92) continue
    if (featureDirs.some((f) => f.dot(d) > 0.955)) continue
    out.push(d)
  }
  // selección pseudoaleatoria determinística
  const picked: THREE.Vector3[] = []
  const step = Math.max(1, Math.floor(out.length / take))
  for (let i = 0; i < out.length && picked.length < take; i += step) picked.push(out[(i * 7) % out.length])
  return picked
}
