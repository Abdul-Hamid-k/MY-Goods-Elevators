import { Edges } from '@react-three/drei'

// Passenger cabin, 2 wide x 1.9 high x 1.8 deep, origin at floor centre.
// Parent drives doorL / doorR refs (x position) to open and close.
export default function Cabin({ p, doorL, doorR }) {
  return (
    <group>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2, 0.1, 1.8]} />
        <meshStandardMaterial color={p.frame} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.9, 0]}>
        <boxGeometry args={[2.04, 0.1, 1.84]} />
        <meshStandardMaterial color={p.steel} metalness={0.3} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.95, -0.87]}>
        <boxGeometry args={[2, 1.8, 0.06]} />
        <meshStandardMaterial color={p.steel} metalness={0.3} roughness={0.3} />
      </mesh>
      {[-0.98, 0.98].map((x) => (
        <mesh key={x} position={[x, 0.95, 0]}>
          <boxGeometry args={[0.04, 1.8, 1.8]} />
          <meshStandardMaterial color={p.glass} transparent opacity={0.22} metalness={0.2} roughness={0.1} />
        </mesh>
      ))}
      {[-0.75, 0.75].map((x) => (
        <mesh key={x} position={[x, 0.95, 0.9]}>
          <boxGeometry args={[0.5, 1.8, 0.05]} />
          <meshStandardMaterial color={p.frame} metalness={0.3} roughness={0.35} />
        </mesh>
      ))}
      <mesh position={[0, 1.75, 0.9]}>
        <boxGeometry args={[1, 0.2, 0.05]} />
        <meshStandardMaterial color={p.frame} metalness={0.3} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.75, 0.93]}>
        <boxGeometry args={[0.5, 0.08, 0.02]} />
        <meshStandardMaterial color={p.accent} emissive={p.accent} emissiveIntensity={1.6} />
      </mesh>
      <mesh ref={doorL} position={[-0.25, 0.85, 0.93]}>
        <boxGeometry args={[0.5, 1.7, 0.04]} />
        <meshStandardMaterial color={p.steel} metalness={0.3} roughness={0.25} />
      </mesh>
      <mesh ref={doorR} position={[0.25, 0.85, 0.93]}>
        <boxGeometry args={[0.5, 1.7, 0.04]} />
        <meshStandardMaterial color={p.steel} metalness={0.3} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.97, 0]}>
        <boxGeometry args={[2.06, 1.94, 1.86]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        <Edges color={p.accent} />
      </mesh>
      <pointLight position={[0, 1.6, 0]} color="#ffd9a0" intensity={8} distance={5} />
    </group>
  )
}

export const DOOR_CLOSED = 0.25
export const DOOR_OPEN = 0.75
