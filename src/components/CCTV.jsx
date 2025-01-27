import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import CCTVModel from './CCTVModel';

const LoadingFallback = () => (
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="gray" wireframe />
  </mesh>
);

const Scene = () => {
  return (
    <group>
      <CCTVModel />
      <Environment preset="warehouse" intensity={0.5} />
    </group>
  );
};

const CCTV = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        onCreated={({ gl }) => {
          gl.physicallyCorrectLights = true;
        }}
      >
        <color attach="background" args={['#1a1a1a']} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.5}
          castShadow
        />
        <pointLight
          position={[0, 2, 0]}
          intensity={0.8}
          color="#ffffff"
        />
        <Suspense fallback={<LoadingFallback />}>
          <Scene />
        </Suspense>
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
};

export default CCTV;
