import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, SpotLight } from '@react-three/drei';
import DragonModel from './DragonModel';
import * as THREE from 'three';

const LoadingFallback = () => (
  <mesh>
    <sphereGeometry args={[1, 16, 16]} />
    <meshStandardMaterial color="#ff4400" wireframe />
  </mesh>
);

const Scene = () => {
  const [mixer] = React.useState(() => new THREE.AnimationMixer());
  
  React.useEffect(() => {
    // Create a simple wing flapping animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const delta = clock.getDelta();
      mixer.update(delta);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      mixer.stopAllAction();
    };
  }, [mixer]);

  return (
    <group>
      <Suspense fallback={<LoadingFallback />}>
        <DragonModel mixer={mixer} />
        <Environment preset="sunset" intensity={1} />
      </Suspense>
      {/* Dramatic lighting setup */}
      <SpotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#ff7700"
        castShadow
      />
      <SpotLight
        position={[-10, 5, -10]}
        angle={0.5}
        penumbra={1}
        intensity={1.5}
        color="#0077ff"
        castShadow
      />
    </group>
  );
};

const Dragon = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [5, 2, 8], fov: 45 }}
        shadows
        onCreated={({ gl }) => {
          gl.physicallyCorrectLights = true;
          gl.shadowMap.enabled = true;
          // Enable animation mixer
          gl.setAnimationLoop(() => {});
        }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 5, 30]} />
        <ambientLight intensity={0.2} />
        
        <Scene />
        
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Dragon;
