import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

export const cameraViews = {
  yourViewName: {
    position: [11.93, 9.987, 22.77],
    target: [0.01, 1.15, 1.00],
  },
  computer: {
    position: [0.38, 1.07, 1.12],
    target: [0.01, 1.15, 1.00],
  },
};

export type ViewKey = keyof typeof cameraViews;

interface CameraAnimationProps {
  activeView: ViewKey;
}

export function CameraAnimation({ activeView }: CameraAnimationProps) {
  const { camera, controls, scene } = useThree();

  useEffect(() => {
    let targetPos = new THREE.Vector3().fromArray(cameraViews[activeView].target);

    // If we are looking at the computer, try to find the actual screen mesh
    // and focus the camera target perfectly on it.
    if (activeView === 'computer') {
      const screenMesh = scene.getObjectByName('Object_34');
      if (screenMesh) {
        screenMesh.getWorldPosition(targetPos);
      }
    }

    // Cinematic GSAP Camera Animation
    gsap.to(camera.position, {
      x: cameraViews[activeView].position[0],
      y: cameraViews[activeView].position[1],
      z: cameraViews[activeView].position[2],
      duration: 3,
      ease: "expo.inOut",
    });

    if (controls) {
      gsap.to((controls as any).target, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 3,
        ease: "expo.inOut",
        onUpdate: () => {
          (controls as any).update();
        },
      });
    } else {
      const lookTarget = new THREE.Vector3().copy(camera.position).add(camera.getWorldDirection(new THREE.Vector3()));
      
      gsap.to(lookTarget, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 3,
        ease: "expo.inOut",
        onUpdate: () => {
          camera.lookAt(lookTarget);
        },
      });
    }
  }, [activeView, camera, controls, scene]);

  return null;
}
