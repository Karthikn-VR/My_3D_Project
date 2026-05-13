import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ViewKey } from "./CameraAnimation";
import gsap from "gsap";

interface CinematicLightingProps {
activeView: ViewKey;
}

export function CinematicLighting({ activeView }: CinematicLightingProps) {
const mainLightRef = useRef<THREE.DirectionalLight>(null);
const monitorLightRef = useRef<THREE.PointLight>(null);
const rimLightRef = useRef<THREE.SpotLight>(null);
const { scene } = useThree();

// Dynamic Glow Placement: Snap the monitor light to the actual screen mesh
useFrame(() => {
if (!monitorLightRef.current) return;



const screenMesh = scene.getObjectByName('Object_34');
if (screenMesh) {
  const worldPos = new THREE.Vector3();
  screenMesh.getWorldPosition(worldPos);
  
  // Move the light slightly forward from the screen surface
  monitorLightRef.current.position.copy(worldPos);
  monitorLightRef.current.translateZ(0.2); 
}
});

useEffect(() => {
const isComputer = activeView === "computer";


if (mainLightRef.current) {
  gsap.to(mainLightRef.current, {
    intensity: isComputer ? 4.0 : 7.0, // Increased
    duration: 2,
    ease: "power2.inOut"
  });
}

if (monitorLightRef.current) {
  gsap.to(monitorLightRef.current, {
    intensity: isComputer ? 0.3 : 0.45, // Increased
    duration: 2,
    ease: "power2.inOut"
  });
}

if (rimLightRef.current) {
  gsap.to(rimLightRef.current, {
    intensity: isComputer ? 0.6 : 1.8, // Increased
    duration: 2,
    ease: "power2.inOut"
  });
}
}, [activeView]);

return (
<>
<ambientLight intensity={1.0} color="#8892aa" />

  <directionalLight
    ref={mainLightRef}
    position={[10, 20, 10]}
    intensity={10.5} // Increased
    castShadow
    shadow-mapSize={[2048, 2048]}
    shadow-bias={-0.0001}
  >
    <orthographicCamera attach="shadow-camera" args={[-15, 15, 15, -15, 0.1, 50]} />
  </directionalLight>

  {/* Monitor Glow - Automatically snaps to the screen mesh */}
  <pointLight
    ref={monitorLightRef}
    intensity={0.35} // Increased
    distance={5}
    color="#00ffff"
    decay={2}
  />

  <spotLight
    ref={rimLightRef}
    position={[-10, 10, -10]}
    angle={0.3}
    penumbra={1}
    intensity={16.0} // Increased
    castShadow
    color="#445577"
  />

  <pointLight
    position={[2, 1, 2]}
    intensity={1.0} // Increased
    color="#ffaa88"
    distance={10}
    decay={2}
  />

  <directionalLight position={[-10, 0, -5]} intensity={0.5} color="#223344" />
</>
);
}