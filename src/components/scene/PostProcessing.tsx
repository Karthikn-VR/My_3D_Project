import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

import { BlendFunction } from "postprocessing";
import { ViewKey } from "./CameraAnimation";

interface PostProcessingProps {
  activeView: ViewKey;
}

export function PostProcessing({}: PostProcessingProps) {
  return (
    <EffectComposer multisampling={0}>
      
      {/* Cinematic Bloom */}

      <Bloom
        intensity={0.005} // Reduced from 0.1
        luminanceThreshold={0.25}
        luminanceSmoothing={0.9}
        mipmapBlur
      />

      {/* Film Grain */}

      <Noise
        opacity={0.02}
        blendFunction={BlendFunction.SOFT_LIGHT}
      />

      {/* Cinematic Vignette */}

      <Vignette
        offset={0.15}
        darkness={0.1}
      />
    </EffectComposer>
  );
}