import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'

const wave = (t, speed) => Math.sin(t * speed) * 0.5 + 0.5
const Steel = ({ c, m = 0.35, r = 0.3 }) => <meshStandardMaterial color={c} metalness={m} roughness={r} />
const Accent = ({ p }) => <meshStandardMaterial color={p.accent} metalness={0.3} roughness={0.5} />
const Crate = ({ p, position }) => (
  <mesh position={position}>
    <boxGeometry args={[0.9, 0.7, 0.9]} />
    <meshStandardMaterial color={p.crate} roughness={0.9} />
    <Edges color="#2a1d0e" />
  </mesh>
)

// Stainless steel kitchen dumbwaiter: small car in a slim shaft with floor hatches.
export function Dumbwaiter({ p }) {
  const car = useRef()
  const cable = useRef()
  useFrame(({ clock }) => {
    const y = 0.25 + wave(clock.elapsedTime, 0.7) * 1.9
    car.current.position.y = y
    cable.current.scale.y = 3 - (y + 0.85)
    cable.current.position.y = (3 + y + 0.85) / 2
  })
  return (
    <group position={[0, -1.5, 0]}>
      <mesh position={[0, 0.05, 0]}><boxGeometry args={[1.7, 0.1, 1.7]} /><Steel c={p.frame} /></mesh>
      {[[-0.75, -0.75], [0.75, -0.75], [-0.75, 0.75], [0.75, 0.75]].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 1.5, z]}><boxGeometry args={[0.08, 3, 0.08]} /><Steel c={p.steel} /></mesh>
      ))}
      {[-0.75, 0.75].map((z) => (
        <mesh key={z} position={[0, 3, z]}><boxGeometry args={[1.6, 0.08, 0.08]} /><Steel c={p.steel} /></mesh>
      ))}
      {[-0.75, 0.75].map((x) => (
        <mesh key={x} position={[x, 3, 0]}><boxGeometry args={[0.08, 0.08, 1.4]} /><Steel c={p.steel} /></mesh>
      ))}
      <mesh position={[0, 3.25, 0]}><boxGeometry args={[0.9, 0.35, 0.7]} /><Steel c={p.frame} /><Edges color={p.accent} /></mesh>
      {[0.55, 2.45].map((y) => (
        <mesh key={y} position={[0, y, 0.77]}>
          <boxGeometry args={[1.0, 0.9, 0.04]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          <Edges color={p.accent} />
        </mesh>
      ))}
      <mesh ref={cable} position={[0, 2, 0]}><cylinderGeometry args={[0.02, 0.02, 1, 6]} /><Steel c={p.steel} /></mesh>
      <group ref={car}>
        <mesh position={[0, 0.03, 0]}><boxGeometry args={[0.9, 0.06, 0.9]} /><Steel c={p.steel} m={0.7} r={0.2} /></mesh>
        <mesh position={[0, 0.85, 0]}><boxGeometry args={[0.9, 0.06, 0.9]} /><Steel c={p.steel} m={0.7} r={0.2} /></mesh>
        <mesh position={[0, 0.45, -0.43]}><boxGeometry args={[0.9, 0.8, 0.04]} /><Steel c={p.steel} m={0.7} r={0.2} /></mesh>
        {[-0.43, 0.43].map((x) => (
          <mesh key={x} position={[x, 0.45, 0]}><boxGeometry args={[0.04, 0.8, 0.9]} /><Steel c={p.steel} m={0.7} r={0.2} /></mesh>
        ))}
        <mesh position={[0, 0.45, 0]}><boxGeometry args={[0.84, 0.03, 0.84]} /><Steel c={p.steel} m={0.7} r={0.2} /></mesh>
        <mesh position={[-0.15, 0.1, 0.1]}><cylinderGeometry args={[0.16, 0.16, 0.05, 20]} /><meshStandardMaterial color={p.crate} roughness={0.6} /></mesh>
        <mesh position={[0.2, 0.55, 0]}><cylinderGeometry args={[0.13, 0.13, 0.2, 20]} /><meshStandardMaterial color={p.accent} metalness={0.5} roughness={0.35} /></mesh>
      </group>
    </group>
  )
}

// Goods lift bolted to a building wall: carriage rides two wall-mounted rails.
export function WallLift({ p }) {
  const car = useRef()
  const cables = useRef([])
  useFrame(({ clock }) => {
    const y = 0.2 + wave(clock.elapsedTime, 0.8) * 1.7
    car.current.position.y = y
    cables.current.forEach((c) => {
      if (!c) return
      c.scale.y = 3.15 - (y + 0.9)
      c.position.y = (3.15 + y + 0.9) / 2
    })
  })
  return (
    <group position={[0, -1.5, 0.2]}>
      <mesh position={[0, 0.05, 0]}><boxGeometry args={[4, 0.1, 3]} /><Steel c={p.frame} /></mesh>
      <mesh position={[0, 1.75, -1.15]}>
        <boxGeometry args={[4, 3.4, 0.2]} />
        <meshStandardMaterial color={p.frame} transparent opacity={0.35} roughness={0.9} />
        <Edges color={p.frame} />
      </mesh>
      {[-0.9, 0.9].map((x) => (
        <mesh key={x} position={[x, 1.6, -1.0]}><boxGeometry args={[0.1, 3.2, 0.1]} /><Steel c={p.steel} /></mesh>
      ))}
      <mesh position={[0, 3.3, -0.85]}><boxGeometry args={[1.4, 0.3, 0.45]} /><Steel c={p.frame} /><Edges color={p.accent} /></mesh>
      {[-0.9, 0.9].map((x, i) => (
        <mesh key={x} ref={(el) => (cables.current[i] = el)} position={[x, 2, -0.85]}>
          <cylinderGeometry args={[0.02, 0.02, 1, 6]} /><Steel c={p.steel} />
        </mesh>
      ))}
      <group ref={car}>
        <mesh position={[0, 0.06, -0.15]}><boxGeometry args={[2.0, 0.12, 1.4]} /><Accent p={p} /></mesh>
        <mesh position={[0, 0.5, -0.88]}><boxGeometry args={[2.0, 0.9, 0.06]} /><Steel c={p.steel} /></mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.97, 0.45, -0.15]}><boxGeometry args={[0.05, 0.8, 1.4]} /><Steel c={p.steel} /></mesh>
        ))}
        <mesh position={[0, 0.8, 0.53]}><boxGeometry args={[2.0, 0.05, 0.05]} /><Steel c={p.steel} /></mesh>
        <mesh position={[0, 0.35, 0.53]}><boxGeometry args={[2.0, 0.05, 0.05]} /><Steel c={p.steel} /></mesh>
        <Crate p={p} position={[0, 0.47, -0.2]} />
      </group>
    </group>
  )
}

// Single-sided loading lift: platform rises from ground to dock level, loaded from the dock side.
export function LoadingLift({ p }) {
  const plat = useRef()
  useFrame(({ clock }) => {
    plat.current.position.y = 0.1 + wave(clock.elapsedTime, 0.7) * 1.44
  })
  return (
    <group position={[0, -1.5, 0]}>
      <mesh position={[0, 0.8, -1.0]}><boxGeometry args={[3.4, 1.6, 1.4]} /><Steel c={p.frame} m={0.1} r={0.8} /><Edges color={p.frame} /></mesh>
      <mesh position={[0, 1.62, -0.31]}><boxGeometry args={[3.4, 0.04, 0.06]} /><Accent p={p} /></mesh>
      <mesh position={[0, 0.01, 0.5]}><boxGeometry args={[3.4, 0.02, 3]} /><Steel c={p.frame} m={0.1} r={0.9} /></mesh>
      {[-1.25, 1.25].map((x) => (
        <mesh key={x} position={[x, 1.4, -0.2]}><boxGeometry args={[0.1, 2.8, 0.1]} /><Steel c={p.steel} /></mesh>
      ))}
      <mesh position={[0, 2.8, -0.2]}><boxGeometry args={[2.6, 0.1, 0.1]} /><Steel c={p.steel} /></mesh>
      <group ref={plat}>
        <mesh position={[0, 0.06, 0.5]}><boxGeometry args={[2.4, 0.12, 1.6]} /><Accent p={p} /></mesh>
        {[-1.15, 1.15].map((x) => (
          <mesh key={x} position={[x, 0.45, 0.5]}><boxGeometry args={[0.05, 0.8, 1.6]} /><Steel c={p.steel} /></mesh>
        ))}
        {[0.75, 0.4].map((y) => (
          <mesh key={y} position={[0, y, 1.27]}><boxGeometry args={[2.4, 0.05, 0.05]} /><Steel c={p.steel} /></mesh>
        ))}
        <Crate p={p} position={[0, 0.47, 0.55]} />
      </group>
    </group>
  )
}

// Hydraulic goods lift: telescoping ram under the platform, power pack beside the shaft.
export function HydraulicGoodsLift({ p }) {
  const plat = useRef()
  const ram = useRef()
  useFrame(({ clock }) => {
    const y = 0.7 + wave(clock.elapsedTime, 0.8) * 1.8
    plat.current.position.y = y
    ram.current.scale.y = y - 0.06 - 0.5
    ram.current.position.y = (y - 0.06 + 0.5) / 2
  })
  return (
    <group position={[0, -1.5, 0]}>
      <mesh position={[0, 0.06, 0]}><boxGeometry args={[3, 0.12, 2.2]} /><Steel c={p.frame} /></mesh>
      {[[-1.25, -0.95], [1.25, -0.95], [-1.25, 0.95], [1.25, 0.95]].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 1.55, z]}><boxGeometry args={[0.12, 3, 0.12]} /><Steel c={p.steel} /></mesh>
      ))}
      {[-0.95, 0.95].map((z) => (
        <mesh key={z} position={[0, 3.05, z]}><boxGeometry args={[2.5, 0.1, 0.1]} /><Steel c={p.steel} /></mesh>
      ))}
      {[-1.25, 1.25].map((x) => (
        <mesh key={x} position={[x, 1.55, 0]}>
          <boxGeometry args={[0.03, 2.8, 1.8]} />
          <meshStandardMaterial color={p.glass} transparent opacity={0.16} />
        </mesh>
      ))}
      <mesh position={[0, 1.55, -0.95]}>
        <boxGeometry args={[2.4, 2.8, 0.03]} />
        <meshStandardMaterial color={p.glass} transparent opacity={0.16} />
      </mesh>
      <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.2, 0.2, 0.36, 24]} /><Steel c={p.frame} m={0.6} r={0.3} /></mesh>
      <mesh ref={ram} position={[0, 1, 0]}><cylinderGeometry args={[0.12, 0.12, 1, 20]} /><Steel c={p.steel} m={0.8} r={0.15} /></mesh>
      <mesh position={[2.0, 0.4, -0.2]}><boxGeometry args={[0.8, 0.55, 0.6]} /><Accent p={p} /><Edges color="#111" /></mesh>
      <mesh position={[2.0, 0.78, -0.2]}><cylinderGeometry args={[0.14, 0.14, 0.22, 16]} /><Steel c={p.frame} /></mesh>
      <mesh position={[1.0, 0.22, -0.2]}><boxGeometry args={[2.0, 0.05, 0.05]} /><Steel c={p.steel} /></mesh>
      <group ref={plat}>
        <mesh><boxGeometry args={[2.3, 0.12, 1.8]} /><Accent p={p} /></mesh>
        <Crate p={p} position={[0, 0.41, 0]} />
      </group>
    </group>
  )
}

// Elevator control panel: cabinet with display, push buttons and blinking status lamps.
export function ControlPanel({ p }) {
  const lamps = useRef([])
  const colors = ['#3ddc84', p.accent, '#ff5a4f']
  useFrame(({ clock }) => {
    lamps.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = Math.sin(clock.elapsedTime * 2.2 + i * 2.1) > -0.2 ? 1.6 : 0.15
    })
  })
  return (
    <group position={[0, -1.5, 0]}>
      <mesh position={[0, 1.3, 0]}><boxGeometry args={[1.9, 2.5, 0.7]} /><Steel c={p.frame} /><Edges color={p.accent} /></mesh>
      <mesh position={[0, 1.3, 0.37]}><boxGeometry args={[1.7, 2.3, 0.04]} /><Steel c={p.steel} m={0.5} r={0.35} /></mesh>
      <mesh position={[0.72, 1.3, 0.41]}><boxGeometry args={[0.06, 0.6, 0.05]} /><Accent p={p} /></mesh>
      <mesh position={[-0.3, 2.1, 0.4]}><boxGeometry args={[0.9, 0.3, 0.02]} /><meshStandardMaterial color="#10161c" emissive={p.accent} emissiveIntensity={0.5} /></mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0.5, 2.2 - i * 0.12, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
          <meshStandardMaterial ref={(m) => (lamps.current[i] = m)} color={colors[i]} emissive={colors[i]} emissiveIntensity={1} />
        </mesh>
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[-0.5 + (i % 3) * 0.28, 1.55 - Math.floor(i / 3) * 0.28, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.03, 18]} />
          <Accent p={p} />
        </mesh>
      ))}
      <mesh position={[0, 0.35, 0.4]}><boxGeometry args={[1.3, 0.22, 0.02]} /><Steel c={p.frame} /></mesh>
      {[-0.6, 0, 0.6].map((x) => (
        <mesh key={x} position={[x, -0.08, 0]}><cylinderGeometry args={[0.07, 0.07, 0.18, 12]} /><Steel c={p.steel} /></mesh>
      ))}
      <mesh position={[0, 0.02, 0.1]}><boxGeometry args={[2.4, 0.04, 1.6]} /><Steel c={p.frame} m={0.1} r={0.9} /></mesh>
    </group>
  )
}
