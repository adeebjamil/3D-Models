import React, { Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import PhoenixModel from './PhoenixModel';

const LoadingFallback = () => (
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="orange" wireframe />
  </mesh>
);

// New component for scene content
const Scene = () => {
  const sceneRef = React.useRef();

  useFrame((state) => {
    if (sceneRef.current) {
      // Rotate the entire scene slowly by default
      sceneRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={sceneRef}>
      <PhoenixModel />
      <Environment preset="sunset" intensity={0.3} />
    </group>
  );
};

const Phoenix = () => {
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []);

  const handleContextLost = (event) => {
    event.preventDefault();
    console.log('WebGL context lost. Trying to restore...');
  };

  const handleContextRestored = () => {
    console.log('WebGL context restored');
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas 
        camera={{ position: [0, 2, 5], fov: 45 }}
        onCreated={({ gl }) => {
          gl.physicallyCorrectLights = true;
          gl.powerPreference = "high-performance";
        }}
      >
        <color attach="background" args={['#1a1a1a']} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.7}
          color="#ff6b00"
          castShadow
        />
        <pointLight
          position={[0, 0, 0]}
          intensity={1.5}
          color="#ff4500"
          distance={5}
          decay={2}
        />
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
};

export default Phoenix;