import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, useGLTF } from '@react-three/drei';
import TigerModel from './TigerModel';
import DeerModel from './DeerModel';

// Preload models
useGLTF.preload('/models/running_tiger.glb');
useGLTF.preload('/models/deer_non-commercial.glb');

const LoadingFallback = () => (
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="orange" wireframe />
  </mesh>
);

const ModelError = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="red" />
  </mesh>
);

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <ModelError />;
  }

  return children;
};

const Tiger = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 4, 8], fov: 60 }}>
        <color attach="background" args={['#2c5530']} />
        <fog attach="fog" args={['#2c5530', 5, 20]} />
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary>
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 8, 5]} angle={0.3} penumbra={1} intensity={0.8} />
            <TigerModel />
            <DeerModel />
            <Stars />
            <Environment preset="forest" />
            <OrbitControls 
              enableDamping={true}
              dampingFactor={0.05}
              minDistance={3}
              maxDistance={10}
            />
          </ErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Tiger;