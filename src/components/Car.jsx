import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";

useGLTF.preload("/mazda_rx-7_car.glb");

export default function Car() {
  const group = useRef(null);
  const { scene } = useGLTF("/mazda_rx-7_car.glb");

  // Enhanced materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.envMapIntensity = 2;
        child.material.needsUpdate = true;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}