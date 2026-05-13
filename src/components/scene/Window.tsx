import * as THREE from "three";
import * as React from "react";
import { useFrame } from "@react-three/fiber";

interface WorldClassWindowProps {
  glassX: number;
  glassY: number;
  glassZ: number;
  paneWidth: number;
  paneHeight: number;
  paneGap: number;
}

export function WorldClassWindow({
  glassX,
  glassY,
  glassZ,
  paneWidth,
  paneHeight,
  paneGap,
}: WorldClassWindowProps) {
  const glassLeftRef = React.useRef<THREE.Mesh>(null);
  const glassRightRef = React.useRef<THREE.Mesh>(null);
  
  // Subtle animation for light refraction effect
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (glassLeftRef.current && glassRightRef.current) {
      const material = glassLeftRef.current.material as THREE.MeshPhysicalMaterial;
      const material2 = glassRightRef.current.material as THREE.MeshPhysicalMaterial;
      
      // Subtle shimmer effect
      const shimmer = Math.sin(time * 0.5) * 0.3 + 3.2;
      material.emissiveIntensity = shimmer;
      material2.emissiveIntensity = shimmer;
    }
  });

  const frameDepth = 0.15;
  const frameThickness = 0.08;
  const mullionWidth = 0.06;
  
  // Frame colors - rich dark wood or painted finish
  const frameColor = "#2a2420";

  return (
    <group>
      {/* ===== OUTER WINDOW FRAME ===== */}
      
      {/* Top frame */}
      <mesh position={[glassX, glassY + paneHeight / 2 + frameThickness / 2, glassZ]}>
        <boxGeometry args={[paneWidth * 2 + paneGap + frameThickness * 2, frameThickness, frameDepth]} />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.4}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>
      
      {/* Bottom frame */}
      <mesh position={[glassX, glassY - paneHeight / 2 - frameThickness / 2, glassZ]}>
        <boxGeometry args={[paneWidth * 2 + paneGap + frameThickness * 2, frameThickness, frameDepth]} />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.4}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>
      
      {/* Left frame */}
      <mesh position={[glassX - paneWidth - paneGap / 2 - frameThickness / 2, glassY, glassZ]}>
        <boxGeometry args={[frameThickness, paneHeight + frameThickness * 2, frameDepth]} />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.4}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>
      
      {/* Right frame */}
      <mesh position={[glassX + paneWidth + paneGap / 2 + frameThickness / 2, glassY, glassZ]}>
        <boxGeometry args={[frameThickness, paneHeight + frameThickness * 2, frameDepth]} />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.4}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* ===== CENTER MULLION (vertical divider) ===== */}
      <mesh position={[glassX, glassY, glassZ]}>
        <boxGeometry args={[mullionWidth, paneHeight, frameDepth]} />
        <meshStandardMaterial
          color={frameColor}
          roughness={0.4}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* ===== HORIZONTAL MUNTINS (decorative grid bars) ===== */}
      {/* Left pane - top muntin */}
      <mesh position={[glassX - paneGap / 2, glassY + paneHeight / 4, glassZ + 0.04]}>
        <boxGeometry args={[paneWidth, 0.03, 0.02]} />
        <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Left pane - bottom muntin */}
      <mesh position={[glassX - paneGap / 2, glassY - paneHeight / 4, glassZ + 0.04]}>
        <boxGeometry args={[paneWidth, 0.03, 0.02]} />
        <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Right pane - top muntin */}
      <mesh position={[glassX + paneGap / 2, glassY + paneHeight / 4, glassZ + 0.04]}>
        <boxGeometry args={[paneWidth, 0.03, 0.02]} />
        <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Right pane - bottom muntin */}
      <mesh position={[glassX + paneGap / 2, glassY - paneHeight / 4, glassZ + 0.04]}>
        <boxGeometry args={[paneWidth, 0.03, 0.02]} />
        <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* ===== VERTICAL MUNTINS ===== */}
      {/* Left pane - vertical muntin */}
      <mesh position={[glassX - paneGap / 2, glassY, glassZ + 0.04]}>
        <boxGeometry args={[0.03, paneHeight, 0.02]} />
        <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Right pane - vertical muntin */}
      <mesh position={[glassX + paneGap / 2, glassY, glassZ + 0.04]}>
        <boxGeometry args={[0.03, paneHeight, 0.02]} />
        <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* ===== GLASS PANES WITH ADVANCED MATERIALS ===== */}
      
      {/* LEFT PANE - Main Glass */}
      <mesh ref={glassLeftRef} position={[glassX - paneGap / 2, glassY, glassZ + 0.02]}>
        <planeGeometry args={[paneWidth, paneHeight]} />
        <meshPhysicalMaterial
          color="#d5e5f5"
          
          
          transmission={0.92}
          opacity={1}
          transparent={true}
          roughness={0.05}
          metalness={0.1}
          ior={1.52}
          thickness={0.5}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        
          side={THREE.DoubleSide}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* LEFT PANE - Back reflection layer */}
      <mesh position={[glassX - paneGap / 2, glassY, glassZ - 0.02]}>
        <planeGeometry args={[paneWidth, paneHeight]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          opacity={0.3}
          transparent={true}
          roughness={0.1}
          metalness={0.0}
          ior={1.52}
          thickness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* RIGHT PANE - Main Glass */}
      <mesh ref={glassRightRef} position={[glassX + paneGap / 2, glassY, glassZ + 0.02]}>
        <planeGeometry args={[paneWidth, paneHeight]} />
        <meshPhysicalMaterial
          color="#d5e5f5"
          
          transmission={0.92}
          opacity={1}
          transparent={true}
          roughness={0.05}
          metalness={0.1}
          ior={1.52}
          thickness={0.5}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        
          side={THREE.DoubleSide}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* RIGHT PANE - Back reflection layer */}
      <mesh position={[glassX + paneGap / 2, glassY, glassZ - 0.02]}>
        <planeGeometry args={[paneWidth, paneHeight]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          opacity={0.3}
          transparent={true}
          roughness={0.1}
          metalness={0.0}
          ior={1.52}
          thickness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ===== WINDOW SILL (bottom ledge) ===== */}
      <mesh position={[glassX, glassY - paneHeight / 2 - frameThickness - 0.05, glassZ - 0.02]}>
        <boxGeometry args={[paneWidth * 2 + paneGap + frameThickness * 3, 0.1, 0.25]} />
        <meshStandardMaterial
          color="#342f2a"
          roughness={0.5}
          metalness={0.0}
        />
      </mesh>

      {/* ===== SUBTLE WINDOW HANDLES ===== */}
      {/* Left handle */}
      <mesh position={[glassX - paneGap / 2 + paneWidth / 3, glassY - paneHeight / 3, glassZ + 0.06]}>
        <boxGeometry args={[0.15, 0.04, 0.03]} />
        <meshStandardMaterial
          color="#8b7355"
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* Right handle */}
      <mesh position={[glassX + paneGap / 2 + paneWidth / 3, glassY - paneHeight / 3, glassZ + 0.06]}>
        <boxGeometry args={[0.15, 0.04, 0.03]} />
        <meshStandardMaterial
          color="#8b7355"
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* ===== DECORATIVE CORNER DETAILS ===== */}
      {[
        [-paneWidth - paneGap / 2 - frameThickness / 2, paneHeight / 2 + frameThickness / 2],
        [paneWidth + paneGap / 2 + frameThickness / 2, paneHeight / 2 + frameThickness / 2],
        [-paneWidth - paneGap / 2 - frameThickness / 2, -paneHeight / 2 - frameThickness / 2],
        [paneWidth + paneGap / 2 + frameThickness / 2, -paneHeight / 2 - frameThickness / 2],
      ].map(([x, y], i) => (
        <mesh key={i} position={[glassX + x, glassY + y, glassZ]}>
          <boxGeometry args={[0.04, 0.04, frameDepth + 0.02]} />
          <meshStandardMaterial
            color="#1a1614"
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
