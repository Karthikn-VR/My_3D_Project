import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingParticles({ count = 1000 }) {
  const points = useRef<THREE.Points>(null!);
  const group = useRef<THREE.Group>(null!);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Much larger spread to cover the whole screen
      temp[i * 3] = (Math.random() - 0.5) * 50;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 30;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate the entire particle cloud
    if (group.current) {
      group.current.rotation.y = time * 0.05;
      group.current.rotation.x = time * 0.02;
    }

    for (let i = 0; i < count; i++) {
      const y = i * 3 + 1;
      // Individual floating motion
      points.current.geometry.attributes.position.array[y] += Math.sin(time * 0.5 + i) * 0.005;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3} args={[particles, 3]}          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#ffffff"
          transparent
          opacity={1}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
