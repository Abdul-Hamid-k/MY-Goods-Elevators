import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges, OrbitControls } from '@react-three/drei'
import Cabin, { DOOR_CLOSED, DOOR_OPEN } from './Cabin.jsx'
import { ControlPanel, Dumbwaiter, HydraulicGoodsLift, LoadingLift, WallLift } from './MoreModels.jsx'
import { palettes } from './palette.js'

const smooth = (k) => k * k * k * (k * (k * 6 - 15) + 10)
const Steel = ({ c, m = 0.3, r = 0.4 }) => <meshStandardMaterial color={c} metalness={m} roughness={r} />

function GoodsLift({ p }) {
  const plat = useRef()
  const cables = useRef([])
  useFrame(({ clock }) => {
    const y = 0.25 + (Math.sin(clock.elapsedTime * 0.8) * 0.5 + 0.5) * 2.0
    plat.current.position.y = y
    cables.current.forEach((c) => {
      if (!c) return
      c.scale.y = 3 - y
      c.position.y = (3 + y) / 2
    })
  })
  const posts = [[-1.3, -1], [1.3, -1], [-1.3, 1], [1.3, 1]]
  const bars = Array.from({ length: 13 }, (_, i) => -1.2 + i * 0.2)
  return (
    <group position={[0, -1.5, 0]}>
      <mesh position={[0, 0.06, 0]}><boxGeometry args={[3.1, 0.12, 2.5]} /><Steel c={p.frame} /></mesh>
      {posts.map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 1.5, z]}><boxGeometry args={[0.12, 3, 0.12]} /><Steel c={p.steel} m={0.35} r={0.3} /></mesh>
      ))}
      {[-1, 1].map((z) => (
        <mesh key={z} position={[0, 3, z]}><boxGeometry args={[2.7, 0.1, 0.1]} /><Steel c={p.steel} /></mesh>
      ))}
      {[-1.3, 1.3].map((x) => (
        <mesh key={x} position={[x, 3, 0]}><boxGeometry args={[0.1, 0.1, 2.1]} /><Steel c={p.steel} /></mesh>
      ))}
      {[-1.3, 1.3].map((x) => (
        <mesh key={x} position={[x, 1.5, -1]}><boxGeometry args={[0.05, 3, 0.05]} /><meshStandardMaterial color={p.accent} metalness={0.3} roughness={0.4} /></mesh>
      ))}
      {bars.map((x) => (
        <mesh key={x} position={[x, 1.55, 1]}><boxGeometry args={[0.03, 1.8, 0.03]} /><Steel c={p.steel} m={0.35} r={0.3} /></mesh>
      ))}
      <mesh position={[0, 0.65, 1]}><boxGeometry args={[2.6, 0.05, 0.05]} /><Steel c={p.steel} /></mesh>
      <mesh position={[0, 2.45, 1]}><boxGeometry args={[2.6, 0.05, 0.05]} /><Steel c={p.steel} /></mesh>
      <mesh position={[0, 3.25, 0]}>
        <boxGeometry args={[1.1, 0.4, 0.8]} />
        <Steel c={p.frame} />
        <Edges color={p.accent} />
      </mesh>
      {[-0.7, 0.7].map((x, i) => (
        <mesh key={x} ref={(el) => (cables.current[i] = el)} position={[x, 2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1, 6]} />
          <Steel c={p.steel} m={0.35} r={0.3} />
        </mesh>
      ))}
      <group ref={plat}>
        <mesh><boxGeometry args={[2.4, 0.12, 1.9]} /><meshStandardMaterial color={p.accent} metalness={0.3} roughness={0.5} /></mesh>
        <mesh position={[0, 0.45, 0]}><boxGeometry args={[0.95, 0.75, 0.95]} /><meshStandardMaterial color={p.crate} roughness={0.9} /><Edges color="#2a1d0e" /></mesh>
      </group>
    </group>
  )
}

function PassengerLift({ p }) {
  const doorL = useRef()
  const doorR = useRef()
  useFrame(({ clock }) => {
    const k = smooth(Math.min(1, Math.max(0, Math.sin(clock.elapsedTime * 0.9) * 1.4 + 0.5)))
    const d = DOOR_CLOSED + (DOOR_OPEN - DOOR_CLOSED) * k
    doorL.current.position.x = -d
    doorR.current.position.x = d
  })
  return (
    <group position={[0, -1.2, 0]} scale={1.15}>
      {[[-1.15, -1.05], [1.15, -1.05], [-1.15, 1.05], [1.15, 1.05]].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 1.2, z]}><boxGeometry args={[0.1, 2.4, 0.1]} /><Steel c={p.frame} /></mesh>
      ))}
      {[0, 2.4].map((y) => (
        <mesh key={y} position={[0, y, 0]}><boxGeometry args={[2.4, 0.08, 2.2]} /><Steel c={p.frame} /></mesh>
      ))}
      <group position={[0, 0.1, 0]}>
        <Cabin p={p} doorL={doorL} doorR={doorR} />
      </group>
    </group>
  )
}

function ScissorLift({ p }) {
  const arms = useRef([])
  const top = useRef()
  const LEVELS = 3
  const L = 1.5
  useFrame(({ clock }) => {
    const th = 0.28 + (Math.sin(clock.elapsedTime * 0.8) * 0.5 + 0.5) * 0.6
    const lvl = L * Math.sin(th)
    arms.current.forEach((g, i) => {
      if (!g) return
      const j = i % (LEVELS * 2) // index within one side
      g.position.y = 0.2 + Math.floor(j / 2) * lvl + lvl / 2
      g.rotation.z = j % 2 === 0 ? th : -th
    })
    top.current.position.y = 0.2 + LEVELS * lvl + 0.06
  })
  return (
    <group position={[0, -1.4, 0]}>
      <mesh position={[0, 0.07, 0]}><boxGeometry args={[3, 0.14, 2.2]} /><Steel c={p.frame} /><Edges color={p.accent} /></mesh>
      {[-0.8, 0.8].map((z) =>
        Array.from({ length: LEVELS * 2 }, (_, i) => (
          <group key={`${z}${i}`} position={[0, 0, z]}>
            <group ref={(el) => (arms.current[(z > 0 ? LEVELS * 2 : 0) + i] = el)}>
              <mesh><boxGeometry args={[L, 0.1, 0.16]} /><Steel c={p.steel} m={0.35} r={0.3} /></mesh>
            </group>
          </group>
        )),
      )}
      <mesh ref={top}>
        <boxGeometry args={[2.6, 0.12, 2.0]} />
        <meshStandardMaterial color={p.accent} metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  )
}

// Keep every model fully in view: on narrow (portrait) screens the horizontal field of view is small,
// so pull the camera back until the widest model (radius ~3.8 while rotating) fits.
const VIEW_DIR = [5.5, 2.6, 7]
const BASE_DIST = Math.hypot(...VIEW_DIR)
function Fit() {
  const { camera, size } = useThree()
  useEffect(() => {
    const half = Math.tan((camera.fov * Math.PI) / 360)
    const dist = Math.max(BASE_DIST, 3.8 / (Math.min(size.width / size.height, 1.6) * half))
    camera.position.set(...VIEW_DIR).setLength(dist)
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height])
  return null
}

const MODEL = {
  goods: GoodsLift, passenger: PassengerLift, hydraulic: ScissorLift,
  hydraulicGoods: HydraulicGoodsLift, dumbwaiter: Dumbwaiter, wall: WallLift, loading: LoadingLift, panel: ControlPanel,
}

export default function ModelViewer({ model, theme, active }) {
  const p = palettes[theme]
  const Model = MODEL[model]
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ fov: 34, position: VIEW_DIR }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={p.ambient} />
      <directionalLight position={[6, 9, 6]} intensity={p.key} />
      <directionalLight position={[-6, 3, -5]} intensity={0.8} color={theme === 'dark' ? '#6fa8ff' : '#ffe2b0'} />
      <Fit />
      <Model key={model} p={p} />
      <gridHelper args={[14, 28, p.grid, p.grid]} position={[0, -1.52, 0]} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.4} minPolarAngle={0.9} maxPolarAngle={1.65} />
    </Canvas>
  )
}
