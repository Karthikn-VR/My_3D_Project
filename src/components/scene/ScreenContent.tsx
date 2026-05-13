/*
  ScreenContent.tsx
  Single-file drop-in. Just pass the geometry node and activeView.

  Usage in your room model:
  ─────────────────────────────────────────────────────────────────
  import { ScreenContent } from './ScreenContent'

  <ScreenContent
    geometry={nodes.Object_34.geometry}
    activeView={activeView}          // 'about' | 'portfolio'
  />
  ─────────────────────────────────────────────────────────────────
*/

import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { RenderTexture, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Shared colours ──────────────────────────────────────────────────────────
const C = {
  bg:      '#0a0e1a',
  panel:   '#111827',
  border:  '#1e2d4a',
  accent:  '#38bdf8',
  accent2: '#818cf8',
  green:   '#34d399',
  muted:   '#64748b',
  white:   '#f1f5f9',
  dim:     '#94a3b8',
}

// ─── Tiny blinking cursor ─────────────────────────────────────────────────────
function Cursor({ x, y }: { x: number; y: number }) {
  const ref = useRef<any>(null)
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.fillOpacity =
        Math.floor(clock.getElapsedTime() * 2) % 2 === 0 ? 1 : 0
  })
  return (
    <Text
      ref={ref}
      position={[x, y, 0.01]}
      fontSize={0.06}
      color={C.accent}
      anchorX="left"
      anchorY="middle"
    >
      █
    </Text>
  )
}

// ─── About Scene ─────────────────────────────────────────────────────────────
function AboutScene() {
  return (
    <>
      <color attach="background" args={[C.bg]} />

      {/* Top bar */}
      <mesh position={[0, 0.82, 0]}>
        <planeGeometry args={[2, 0.08]} />
        <meshBasicMaterial color={C.panel} />
      </mesh>
      <Text position={[-0.75, 0.82, 0.01]} fontSize={0.04} color={C.muted} anchorX="left" anchorY="middle">
        ~/about
      </Text>
      {[0.72, 0.76, 0.80].map((x, i) => (
        <mesh key={i} position={[x, 0.82, 0.01]}>
          <circleGeometry args={[0.012, 16]} />
          <meshBasicMaterial color={(['#ff5f57', '#febc2e', '#28c840'] as const)[i]} />
        </mesh>
      ))}

      {/* Name */}
      <Text position={[-0.75, 0.62, 0.01]} fontSize={0.11} color={C.white} anchorX="left" anchorY="middle" fontWeight="bold">
        Karthikeyan VR
      </Text>
      <Text position={[-0.75, 0.47, 0.01]} fontSize={0.055} color={C.accent} anchorX="left" anchorY="middle">
        Developer &amp; Designer
      </Text>

      {/* Divider */}
      <mesh position={[0, 0.38, 0.01]}>
        <planeGeometry args={[1.6, 0.004]} />
        <meshBasicMaterial color={C.border} />
      </mesh>

      {/* Bio */}
      {[
        'I build this as my first project in Three.js.',
        '',
        'learning new things Every Day.',
      ].map((line, i) => (
        <Text key={i} position={[-0.75, 0.27 - i * 0.1, 0.01]} fontSize={0.048} color={C.dim} anchorX="left" anchorY="middle">
          {line}
        </Text>
      ))}

      {/* Skill chips */}
      {['React', 'Three.js', 'TypeScript', 'Node', 'Figma'].map((skill, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        return (
          <group key={skill} position={[-0.75 + col * 0.54, -0.12 - row * 0.14, 0.01]}>
            <mesh>
              <planeGeometry args={[0.48, 0.1]} />
              <meshBasicMaterial color={C.border} />
            </mesh>
            <Text position={[0, 0, 0.01]} fontSize={0.042} color={C.accent2} anchorX="center" anchorY="middle">
              {skill}
            </Text>
          </group>
        )
      })}

      {/* Status bar */}
      <mesh position={[0, -0.82, 0]}>
        <planeGeometry args={[2, 0.07]} />
        <meshBasicMaterial color={C.accent} />
      </mesh>
      <Text position={[-0.75, -0.82, 0.01]} fontSize={0.035} color={C.bg} anchorX="left" anchorY="middle" fontWeight="bold">
        NORMAL  ·  about.md  ·  ✓ ready
      </Text>
      <Cursor x={0.65} y={-0.37} />
    </>
  )
}

// ─── Portfolio Scene ──────────────────────────────────────────────────────────
const PROJECTS = [
  { name: 'IsometricOS',  tech: 'Three.js · React',  status: 'live',   color: C.green  },
  { name: 'DataFlow UI',  tech: 'D3 · TypeScript',   status: 'WIP',    color: C.accent },
  { name: 'PixelShop',    tech: 'Next.js · Stripe',  status: 'live',   color: C.green  },
  { name: 'NoteVault',    tech: 'Electron · SQLite', status: 'paused', color: C.muted  },
]

function PortfolioScene() {
  return (
    <>
      <color attach="background" args={[C.bg]} />

      {/* Top bar */}
      <mesh position={[0, 0.82, 0]}>
        <planeGeometry args={[2, 0.08]} />
        <meshBasicMaterial color={C.panel} />
      </mesh>
      <Text position={[-0.75, 0.82, 0.01]} fontSize={0.04} color={C.muted} anchorX="left" anchorY="middle">
        ~/projects
      </Text>
      {[0.72, 0.76, 0.80].map((x, i) => (
        <mesh key={i} position={[x, 0.82, 0.01]}>
          <circleGeometry args={[0.012, 16]} />
          <meshBasicMaterial color={(['#ff5f57', '#febc2e', '#28c840'] as const)[i]} />
        </mesh>
      ))}

      {/* Heading */}
      <Text position={[-0.75, 0.62, 0.01]} fontSize={0.09} color={C.white} anchorX="left" anchorY="middle" fontWeight="bold">
        Projects
      </Text>
      <Text position={[-0.75, 0.49, 0.01]} fontSize={0.042} color={C.muted} anchorX="left" anchorY="middle">
        {PROJECTS.length} repos · sorted by activity
      </Text>

      {/* Project cards */}
      {PROJECTS.map((p, i) => (
        <group key={p.name} position={[0, 0.27 - i * 0.27, 0.01]}>
          <mesh>
            <planeGeometry args={[1.6, 0.22]} />
            <meshBasicMaterial color={C.panel} />
          </mesh>
          <mesh position={[-0.79, 0, 0.01]}>
            <planeGeometry args={[0.012, 0.22]} />
            <meshBasicMaterial color={p.color} />
          </mesh>
          <Text position={[-0.72, 0.05, 0.01]} fontSize={0.058} color={C.white} anchorX="left" anchorY="middle" fontWeight="bold">
            {p.name}
          </Text>
          <Text position={[-0.72, -0.05, 0.01]} fontSize={0.038} color={C.muted} anchorX="left" anchorY="middle">
            {p.tech}
          </Text>
          <mesh position={[0.65, 0.05, 0.01]}>
            <planeGeometry args={[0.22, 0.072]} />
            <meshBasicMaterial
              color={
                p.color === C.green  ? '#052e16' :
                p.color === C.accent ? '#0c1a2e' : '#1a1a1a'
              }
            />
          </mesh>
          <Text position={[0.65, 0.05, 0.02]} fontSize={0.036} color={p.color} anchorX="center" anchorY="middle">
            {p.status}
          </Text>
        </group>
      ))}

      {/* Status bar */}
      <mesh position={[0, -0.82, 0]}>
        <planeGeometry args={[2, 0.07]} />
        <meshBasicMaterial color={C.accent2} />
      </mesh>
      <Text position={[-0.75, -0.82, 0.01]} fontSize={0.035} color={C.bg} anchorX="left" anchorY="middle" fontWeight="bold">
        NORMAL  ·  projects.md  ·  4 items
      </Text>
      <Cursor x={0.65} y={-0.62} />
    </>
  )
}

// ─── Main export — drop this into your room JSX ───────────────────────────────
interface ScreenContentProps {
  geometry: THREE.BufferGeometry
  activeView?: 'about' | 'portfolio'
}

export function ScreenContent({ geometry, activeView = 'about' }: ScreenContentProps) {
  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial>
        <RenderTexture attach="map" anisotropy={16}>
          <PerspectiveCamera makeDefault position={[0, 0, 1.5]} />
          {activeView === 'portfolio' ? <PortfolioScene /> : <AboutScene />}
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>
  )
}