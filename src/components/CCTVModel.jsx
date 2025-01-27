import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CCTVModel() {
  const { scene } = useGLTF('/surveillance_camera.glb');
  const mountRef = React.useRef();
  const cameraPartRef = React.useRef();

  useEffect(() => {
    if (scene) {
      // Separate the mount and camera parts
      scene.traverse((child) => {
        if (child.isMesh) {
          // If it's the mount/bracket part
          if (child.name.toLowerCase().includes('mount') || 
              child.name.toLowerCase().includes('bracket') ||
              child.name.toLowerCase().includes('base')) {
            child.rotation.set(0, 0, 0); // Ensure mount is fixed
          }
          // Log the names to help identify parts
          console.log('Mesh name:', child.name);
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (cameraPartRef.current) {
      // Only rotate the camera part, not the mount
      const rotationAngle = Math.PI * Math.sin(state.clock.elapsedTime * 0.5);
      cameraPartRef.current.rotation.y = rotationAngle;
    }
  });

  return (
    <group dispose={null}>
      {/* Mount part - completely static */}
      <primitive 
        ref={mountRef}
        object={scene} 
        scale={0.5}
        rotation={[0, 0, 0]} // Fixed rotation
      />
    </group>
  );
}

useGLTF.preload('/surveillance_camera.glb');
