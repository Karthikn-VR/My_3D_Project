import { MeshReflectorMaterial, Grid } from "@react-three/drei";
import * as THREE from "three";

export function EnvironmentFloor() {
  return (
    <group position={[0, -0.81, 0]}>
      {/* Base Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={0.8}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a0a"
          metalness={0.5}
          mirror={0.5}
        />
      </mesh>

      {/* White Light Lined Square Pattern (Grid) */}
      <Grid
        infiniteGrid
        cellSize={1}
        cellThickness={1}
        cellColor="#ffffff"
        sectionSize={5}
        sectionThickness={1.5}
        sectionColor="#ffffff"
        fadeDistance={50}
        fadeStrength={5}
        followCamera={false}
        position={[0, 0.01, 0]}
      />
    </group>
  );
}
