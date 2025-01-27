import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const TigerModel = () => {
  const tigerRef = useRef();
  const timeRef = useRef(0);
  const runRadius = 2.5;
  const speed = 0.5;
  
  const { scene } = useGLTF('/models/running_tiger.glb');

  useFrame((state, delta) => {
    if (tigerRef.current) {
      timeRef.current += delta * speed;
      
      const x = Math.cos(timeRef.current - 0.5) * runRadius;
      const z = Math.sin(timeRef.current - 0.5) * runRadius;
      
      tigerRef.current.position.x = x;
      tigerRef.current.position.z = z;
      
      const angle = Math.atan2(
        Math.cos(timeRef.current - 0.4) * runRadius - x,
        Math.sin(timeRef.current - 0.4) * runRadius - z
      );
      tigerRef.current.rotation.y = angle;
    }
  });

  return (
    <primitive 
      ref={tigerRef}
      object={scene}
      scale={[0.015, 0.015, 0.015]}
      position={[runRadius, -0.5, 0]}
    />
  );
};

useGLTF.preload('/models/running_tiger.glb');

export default TigerModel;