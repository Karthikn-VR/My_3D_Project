import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { CameraAnimation, ViewKey } from "./components/scene/CameraAnimation";
import { CinematicLighting } from "./components/scene/CinematicLighting";
import { EnvironmentFloor } from "./components/scene/EnvironmentFloor";
import { AtmosphericEffects } from "./components/scene/AtmosphericEffects";
import { FloatingParticles } from "./components/scene/FloatingParticles";
import { SceneText } from "./components/scene/SceneText";
import { PostProcessing } from "./components/scene/PostProcessing";
import { UIOverlay } from "./components/ui/UIOverlay";
import { LoadingScreen } from "./components/ui/LoadingScreen";


import { Model as Isometric } from "./components/scene/Room";

export default function App() {
  const [activeView, setActiveView] = useState<ViewKey>("yourViewName");
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        background: "#050505",
      }}
    >
      <LoadingScreen onStarted={() => setIsStarted(true)} />
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 2]}
        camera={{
          position: [0.38, 1.07, 1.12],
          fov: 35,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.8,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Environment Color & Fog */}
        <AtmosphericEffects />

        {/* Cinematic Lighting System */}
        <CinematicLighting activeView={activeView} />

        {/* Directed Camera System */}
        <CameraAnimation activeView={activeView} />

        {/* Environment Floor & Floating Elements */}
        <EnvironmentFloor />
        <FloatingParticles count={1500} />
        
        <ContactShadows 
          position={[0, -0.8, 0]} 
          opacity={0.8} 
          scale={20} 
          blur={2.5} 
          far={2} 
          resolution={512} 
          color="#000000" 
        />

        {/* Model & Integrated World Text */}
        <Suspense fallback={null}>
          <group position={[0, -0.8, 0]}>
            <Isometric activeView={activeView} onViewChange={setActiveView} isStarted={isStarted} />
            <SceneText />
          </group>
        </Suspense>

        {/* Cinematic Post-Processing */}
        <PostProcessing activeView={activeView} />
        
      </Canvas>

      {/* Cinematic UI Overlay - Rendered after Canvas to be on top */}
      <UIOverlay activeView={activeView} onViewChange={setActiveView} />


      
    </div>
  );
}
