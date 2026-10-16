import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges, Sparkles } from '@react-three/drei'
import { palettes } from './palette.js'

// A three-storey works building with a goods lift moving crates from a loading truck to each floor.
const FH = 3 // floor height
const FLOORS = 3 // floors above ground
const SX = 2.5 // shaft centre x
const MACHINE_Y = 12 // machine-room floor
const SHEAVE_R = 0.55
const SY = MACHINE_Y + 0.06 + SHEAVE_R // rope tangent height
const DROP_ORDER = [3, 1, 2]
const SLOTS = [-3.7, -2.5, -1.3]
const smooth = (k) => k * k * k * (k * (k * 6 - 15) + 10)

const Mat = ({ c, m = 0.3, r = 0.4 }) => <meshStandardMaterial color={c} metalness={m} roughness={r} />
const Bx = ({ at, size, c, m, r, edges, children }) => (
  <mesh position={at}>
    <boxGeometry args={size} />
    <Mat c={c} m={m} r={r} />
    {edges && <Edges color={edges} />}
    {children}
  </mesh>
)

function Crate({ p, at }) {
  return (
    <group position={at}>
      <Bx at={[0, 0.05, 0]} size={[1.05, 0.1, 1.05]} c={p.frame} r={0.8} />
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.9, 0.7, 0.9]} />
        <meshStandardMaterial color={p.crate} roughness={0.9} />
        <Edges color="#2a1d0e" />
      </mesh>
    </group>
  )
}

function Gate({ p, y, left, right }) {
  const bars = [0.05, 0.3, 0.55, 0.8, 1.05]
  const half = (dir, refFn) => (
    <group ref={refFn} position={[dir > 0 ? SX - 1.1 : SX + 1.1, y, 1.2]}>
      {bars.map((b) => (
        <Bx key={b} at={[dir * b, 0.95, 0]} size={[0.04, 1.8, 0.04]} c={p.steel} />
      ))}
      <Bx at={[dir * 0.55, 1.85, 0]} size={[1.1, 0.06, 0.06]} c={p.accent} />
      <Bx at={[dir * 0.55, 0.1, 0]} size={[1.1, 0.06, 0.06]} c={p.accent} />
    </group>
  )
  return (
    <>
      {half(1, left)}
      {half(-1, right)}
    </>
  )
}

function Building({ p }) {
  const cols = [[-4.5, -3], [-4.5, 3], [-1.5, -3], [-1.5, 3], [4.5, -3], [4.5, 3]]
  const colH = FLOORS * FH + 1.4
  return (
    <group>
      <Bx at={[-3, -0.05, 0]} size={[20, 0.1, 9]} c={p.grid} m={0.1} r={0.9} edges={p.frame} />
      {cols.map(([x, z]) => <Bx key={`${x}${z}`} at={[x, colH / 2, z]} size={[0.22, colH, 0.22]} c={p.frame} />)}
      {Array.from({ length: FLOORS }, (_, n) => {
        const top = (n + 1) * FH
        const y = top - 0.1
        return (
          <group key={top}>
            {/* slab with a hole where the lift shaft passes through */}
            <Bx at={[-1.6, y, 0]} size={[5.8, 0.2, 6]} c={p.steel} m={0.1} r={0.7} edges={p.frame} />
            <Bx at={[4.1, y, 0]} size={[0.8, 0.2, 6]} c={p.steel} m={0.1} r={0.7} />
            <Bx at={[SX, y, 2.1]} size={[2.4, 0.2, 1.8]} c={p.steel} m={0.1} r={0.7} />
            <Bx at={[SX, y, -2.1]} size={[2.4, 0.2, 1.8]} c={p.steel} m={0.1} r={0.7} />
            <Bx at={[-1.6, top + 0.5, 3]} size={[5.8, 0.04, 0.04]} c={p.accent} />
            <Bx at={[-1.6, top + 0.9, 3]} size={[5.8, 0.04, 0.04]} c={p.accent} />
          </group>
        )
      })}
      {/* shaft frame */}
      {[[1.3, -1.2], [3.7, -1.2], [1.3, 1.2], [3.7, 1.2]].map(([x, z]) => (
        <Bx key={`${x}${z}`} at={[x, (MACHINE_Y + 0.4) / 2, z]} size={[0.14, MACHINE_Y + 0.4, 0.14]} c={p.frame} />
      ))}
      {[1.4, 3.6].map((x) => <Bx key={x} at={[x, MACHINE_Y / 2, 0]} size={[0.06, MACHINE_Y, 0.06]} c={p.steel} m={0.6} r={0.25} />)}
      {[1.95, 3.05].map((x) => <Bx key={x} at={[x, MACHINE_Y / 2, -1.1]} size={[0.05, MACHINE_Y, 0.05]} c={p.steel} m={0.6} r={0.25} />)}
      {Array.from({ length: FLOORS }, (_, n) => (
        <group key={n}>
          {[-1.2, 1.2].map((z) => <Bx key={z} at={[SX, (n + 1) * FH + 2.3, z]} size={[2.4, 0.08, 0.08]} c={p.frame} />)}
          <Bx at={[SX, (n + 1) * FH + 2.3, 0]} size={[0.08, 0.08, 2.4]} c={p.frame} />
        </group>
      ))}
      {/* machine room: floor, motor, safety stripe */}
      <Bx at={[3.0, MACHINE_Y, 0]} size={[4, 0.12, 2.6]} c={p.frame} edges={p.accent} />
      <Bx at={[4.3, MACHINE_Y + 0.45, -0.55]} size={[1.0, 0.7, 0.9]} c={p.accent} edges="#1a1305" />
      <Bx at={[SX, MACHINE_Y + 0.12, 1.2]} size={[2.6, 0.04, 0.04]} c={p.accent} />
      {/* truck */}
      <group position={[0, 0, 0]}>
        <mesh position={[-7.3, 1.35, 0]}>
          <boxGeometry args={[4.6, 1.9, 2.3]} />
          <meshStandardMaterial color={p.glass} transparent opacity={0.1} />
          <Edges color={p.steel} />
        </mesh>
        <Bx at={[-7.3, 0.4, 0]} size={[4.6, 0.12, 2.3]} c={p.frame} />
        <Bx at={[-10.5, 1.0, 0]} size={[1.5, 1.3, 2.3]} c={p.accent} edges="#1a1305" />
        <Bx at={[-11.05, 1.3, 0]} size={[0.06, 0.55, 2.0]} c={p.glass} m={0.1} r={0.1} />
        {[-6.4, -5.6, -10.8, -10.1].map((x) =>
          [-1.18, 1.18].map((z) => (
            <mesh key={`${x}${z}`} position={[x, 0.4, z]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.4, 0.4, 0.3, 20]} />
              <meshStandardMaterial color="#1d2128" roughness={0.8} />
            </mesh>
          )),
        )}
        <Crate p={p} at={[-5.9, 0.46, 0.45]} />
        <Crate p={p} at={[-6.95, 0.46, -0.4]} />
      </group>
    </group>
  )
}

function Lift({ p }) {
  const plat = useRef()
  const sheave = useRef()
  const cw = useRef()
  const beacon = useRef()
  const carry = useRef()
  const ropes = useRef([])
  const cwRopes = useRef([])
  const gl = useRef([])
  const gr = useRef([])
  const gv = useRef([0, 0, 0, 0])
  const slots = useRef(Array.from({ length: FLOORS + 1 }, () => []))
  const s = useRef({ y: 0, floor: 0, phase: 'open', t: 0, from: 0, to: 0, tm: 0, dur: 1, n: 0, carried: true, target: 0, counts: [0, 0, 0, 0] })

  useFrame(({ clock }, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05)
    const st = s.current

    if (st.phase === 'open') {
      if (gv.current[st.floor] > 0.95) st.t += dt
      if (st.t > 1.6) st.phase = 'closing'
    } else if (st.phase === 'closing') {
      if (gv.current[st.floor] < 0.02) {
        st.n += 1
        st.target = st.n % 2 === 0 ? 0 : DROP_ORDER[((st.n - 1) / 2) % DROP_ORDER.length]
        st.from = st.y
        st.to = st.target * FH
        st.tm = 0
        st.dur = Math.max(1.8, Math.abs(st.to - st.from) * 0.42)
        st.phase = 'moving'
      }
    } else {
      st.tm += dt
      const k = Math.min(st.tm / st.dur, 1)
      st.y = st.from + (st.to - st.from) * smooth(k)
      if (k === 1) {
        st.floor = st.target
        st.phase = 'open'
        st.t = 0
        if (st.floor === 0) {
          st.carried = true
        } else {
          st.carried = false
          const c = st.counts[st.floor]++ % SLOTS.length
          if (c === 0) slots.current[st.floor].forEach((g) => g && (g.visible = false))
          if (slots.current[st.floor][c]) slots.current[st.floor][c].visible = true
        }
      }
    }

    for (let i = 0; i <= FLOORS; i++) {
      const target = st.phase === 'open' && st.floor === i ? 1 : 0
      gv.current[i] += Math.max(-dt * 1.3, Math.min(dt * 1.3, target - gv.current[i]))
      const sc = 1 - 0.88 * smooth(gv.current[i])
      if (gl.current[i]) gl.current[i].scale.x = sc
      if (gr.current[i]) gr.current[i].scale.x = sc
    }

    plat.current.position.y = st.y
    carry.current.visible = st.carried
    sheave.current.rotation.x = st.y / SHEAVE_R

    const top = st.y + 2.45
    ropes.current.forEach((r) => {
      if (!r) return
      r.scale.y = SY - top
      r.position.y = (SY + top) / 2
    })
    const cwY = 10.6 - st.y
    cw.current.position.y = cwY
    cwRopes.current.forEach((r) => {
      if (!r) return
      r.scale.y = SY - (cwY + 0.7)
      r.position.y = (SY + cwY + 0.7) / 2
    })

    const m = beacon.current
    m.emissiveIntensity = st.phase === 'moving' ? (Math.sin(clock.elapsedTime * 10) > 0 ? 2.4 : 0.3) : 0.2
  })

  return (
    <group>
      {Array.from({ length: FLOORS + 1 }, (_, i) => (
        <Gate key={i} p={p} y={i * FH} left={(el) => (gl.current[i] = el)} right={(el) => (gr.current[i] = el)} />
      ))}

      {/* crates waiting at the ground landing, and delivered crates on each floor */}
      <Crate p={p} at={[-2.5, 0, 1.2]} />
      <Crate p={p} at={[-3.7, 0, 1.2]} />
      {Array.from({ length: FLOORS }, (_, n) =>
        SLOTS.map((x, k) => (
          <group key={`${n}${k}`} visible={false} ref={(el) => (slots.current[n + 1][k] = el)}>
            <Crate p={p} at={[x, (n + 1) * FH, 0.9]} />
          </group>
        )),
      )}

      <group ref={plat}>
        <Bx at={[SX, -0.07, 0]} size={[2.0, 0.14, 2.0]} c={p.accent} m={0.3} r={0.5} />
        {[-1.1, 1.1].map((z) => <Bx key={z} at={[SX, 0.15, z * 0.9]} size={[2.0, 0.04, 0.04]} c={p.steel} />)}
        {[-0.9, 0.9].map((x) => <Bx key={x} at={[SX + x, 1.2, 0]} size={[0.08, 2.4, 0.08]} c={p.steel} m={0.5} r={0.3} />)}
        <Bx at={[SX, 2.4, 0]} size={[1.9, 0.1, 0.1]} c={p.accent} />
        <group ref={carry}>
          <Crate p={p} at={[SX, 0, 0]} />
        </group>
      </group>

      {[-0.3, 0.3].map((x, i) => (
        <mesh key={x} ref={(el) => (ropes.current[i] = el)} position={[SX + x, 8, 0]}>
          <cylinderGeometry args={[0.016, 0.016, 1, 6]} />
          <Mat c={p.steel} />
        </mesh>
      ))}
      <group position={[SX, SY - SHEAVE_R, -SHEAVE_R]}>
        <group ref={sheave}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[SHEAVE_R, SHEAVE_R, 1.1, 32]} />
            <Mat c={p.accent} r={0.35} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 1.4, 12]} />
            <Mat c={p.steel} r={0.2} />
          </mesh>
          <Bx at={[0, 0.3, 0]} size={[1.0, 0.05, 0.05]} c={p.frame} />
        </group>
      </group>
      <Bx at={[SX - 0.8, MACHINE_Y + 0.3, -0.55]} size={[0.1, 0.5, 0.1]} c={p.frame} />
      <Bx at={[SX + 0.8, MACHINE_Y + 0.3, -0.55]} size={[0.1, 0.5, 0.1]} c={p.frame} />

      <group ref={cw}>
        <Bx at={[SX, 0, -1.1]} size={[0.9, 1.4, 0.25]} c={p.frame} edges={p.accent} />
      </group>
      {[-0.3, 0.3].map((x, i) => (
        <mesh key={x} ref={(el) => (cwRopes.current[i] = el)} position={[SX + x, 8, -1.1]}>
          <cylinderGeometry args={[0.016, 0.016, 1, 6]} />
          <Mat c={p.steel} />
        </mesh>
      ))}

      <mesh position={[1.3, MACHINE_Y + 0.5, 1.2]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial ref={beacon} color={p.accent} emissive={p.accent} emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

function Rig() {
  const { camera, size } = useThree()
  const scroll = useRef(0)

  useEffect(() => {
    const onScroll = () => { scroll.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On wide screens push the scene to the right so the headline has room.
  useEffect(() => {
    if (size.width > 900) camera.setViewOffset(size.width, size.height, -size.width * 0.12, 0, size.width, size.height)
    else camera.clearViewOffset()
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height])

  const reduce = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useFrame(({ clock, pointer }) => {
    const t = reduce.current ? 0 : clock.elapsedTime
    const ang = 0.55 + Math.sin(t * 0.12) * 0.35 + scroll.current * 0.0008 + pointer.x * 0.25
    const R = size.width > 900 ? 46 : 52
    camera.position.set(-3 + Math.sin(ang) * R, 9 + pointer.y * 1.5 - scroll.current * 0.004, Math.cos(ang) * R)
    camera.lookAt(-3, 6.2, 0)
  })
  return null
}

export default function HeroScene({ theme, active }) {
  const p = palettes[theme]
  const dark = theme === 'dark'
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ fov: 30, near: 0.5, far: 220, position: [12, 8, 25] }}
      gl={{ antialias: true, alpha: true }}
    >
      <fog attach="fog" args={[p.bg, 60, 130]} />
      <ambientLight intensity={p.ambient} />
      <directionalLight position={[10, 18, 12]} intensity={p.key} />
      <directionalLight position={[-12, 6, -10]} intensity={0.8} color={dark ? '#6fa8ff' : '#ffe2b0'} />
      <Rig />
      <Building p={p} />
      <Lift p={p} />
      <gridHelper args={[110, 110, p.grid, p.grid]} position={[0, -0.12, 0]} />
      <Sparkles count={60} scale={[22, 14, 14]} position={[-2, 7, 0]} size={3} speed={0.25} color={p.accent} opacity={dark ? 0.8 : 0.5} />
    </Canvas>
  )
}
