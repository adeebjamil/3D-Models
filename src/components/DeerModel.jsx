import React, { useRef, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const LoadingFallback = () => (
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="orange" wireframe />
  </mesh>
);

const DeerModel = () => {
  const deerRef = useRef();
  const { scene } = useGLTF('/models/deer_non-commercial.glb');

  return (
    <Suspense fallback={<LoadingFallback />}>
      <primitive 
        ref={deerRef}
        object={scene}
        scale={[0.008, 0.008, 0.008]}
        position={[0, -0.5, 2]}
        rotation={[0, Math.PI / 4, 0]}
      />
    </Suspense>
  );
};

useGLTF.preload('/models/deer_non-commercial.glb');

export default DeerModel;