import React, { useRef, useState, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const PhoenixModel = () => {
  const phoenixRef = useRef();
  const mixer = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const gltf = useLoader(GLTFLoader, './models/phoenix_bird.glb');

  useEffect(() => {
    if (gltf) {
      setLoading(false);
      if (gltf.animations.length) {
        mixer.current = new THREE.AnimationMixer(gltf.scene);
        const action = mixer.current.clipAction(gltf.animations[0]);
        action.play();
      }
    }
  }, [gltf]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
    if (phoenixRef.current) {
      phoenixRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.0003;
      
      // Adjusted pulsing range for more contrast
      const crownIntensity = 2.5 + Math.sin(state.clock.elapsedTime * 2) * 1.0;
      const bodyIntensity = 1.0 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
      
      phoenixRef.current.children.forEach(child => {
        if (child.type === 'PointLight') {
          // Determine if it's a crown or body light based on position
          const isBodyLight = child.position.y < -1.0;
          child.intensity = isBodyLight ? bodyIntensity : crownIntensity;
        }
      });
    }
  });

  if (error) return null;
  if (loading) return null;

  return (
    <group>
      <primitive 
        ref={phoenixRef} 
        object={gltf.scene} 
        scale={[0.004, 0.004, 0.004]}
        position={[0, -1, 0]}
        rotation={[0, Math.PI / 4, 0]}
      />
      {/* Crown lights - kept bright */}
      <pointLight position={[0, -0.5, 0]} distance={1.5} intensity={4} color="#ff7700" />
      <pointLight position={[0.2, -0.5, 0]} distance={1.5} intensity={3} color="#ffaa00" />
      <pointLight position={[-0.2, -0.5, 0]} distance={1.5} intensity={3} color="#ffaa00" />
      
      {/* Additional crown accent lights - kept bright */}
      <pointLight position={[0.1, -0.4, 0.1]} distance={1} intensity={2.5} color="#ff9900" />
      <pointLight position={[-0.1, -0.4, 0.1]} distance={1} intensity={2.5} color="#ff9900" />
      
      {/* Body lights - reduced intensity for more contrast */}
      <pointLight position={[0, -1.2, 0]} distance={1.2} intensity={1.5} color="#ff00ff" />
      <pointLight position={[0.1, -1.2, 0.1]} distance={1.2} intensity={1} color="#ff40ff" />
      <pointLight position={[-0.1, -1.2, 0.1]} distance={1.2} intensity={1} color="#ff40ff" />
      <pointLight position={[0, -1.5, 0]} distance={1.2} intensity={1.5} color="#00ff00" />
      <pointLight position={[0.1, -1.5, 0.1]} distance={1.2} intensity={1} color="#40ff40" />
      <pointLight position={[-0.1, -1.5, 0.1]} distance={1.2} intensity={1} color="#40ff40" />
      
      {/* Reduced ambient light for darker overall appearance */}
      <ambientLight intensity={0.2} />
    </group>
  );
};

export default PhoenixModel;