import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DragonModel = () => {
  const group = useRef();
  const modelPath = '/models/black_dragon_with_idle_animation.glb';
  
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, group);

  // References for different body parts
  const leftWing = useRef();
  const rightWing = useRef();
  const head = useRef();
  const tail = useRef();

  useEffect(() => {
    if (scene) {
      // Find and store references to body parts
      scene.traverse((object) => {
        if (object.name.toLowerCase().includes('wing')) {
          if (object.name.toLowerCase().includes('left')) {
            leftWing.current = object;
          } else if (object.name.toLowerCase().includes('right')) {
            rightWing.current = object;
          }
        }
        if (object.name.toLowerCase().includes('head')) {
          head.current = object;
        }
        if (object.name.toLowerCase().includes('tail')) {
          tail.current = object;
        }
      });
    }

    // Play the idle animation by default
    if (actions && actions.idle) {
      actions.idle.reset().play();
      actions.idle.setEffectiveTimeScale(0.8);
    }
  }, [scene, actions]);

  // Custom animation frame
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Wing animation parameters
    const flapSpeed = 1.5;
    const flapHeight = 0.8;  // Increased for more dramatic movement
    const wingSpread = 0.4;  // Controls how far wings spread out
    
    if (leftWing.current) {
      // More dramatic up-down movement
      leftWing.current.rotation.x = 
        Math.cos(time * flapSpeed) * flapHeight - 0.2; // Base angle offset
      // Spread wings outward
      leftWing.current.rotation.z = 
        Math.PI * 0.15 + Math.sin(time * flapSpeed) * wingSpread;
      // Slight forward tilt during downstroke
      leftWing.current.rotation.y = 
        Math.max(0, Math.sin(time * flapSpeed)) * 0.2;
    }

    if (rightWing.current) {
      // Mirror the left wing movements
      rightWing.current.rotation.x = 
        Math.cos(time * flapSpeed) * flapHeight - 0.2;
      rightWing.current.rotation.z = 
        -Math.PI * 0.15 - Math.sin(time * flapSpeed) * wingSpread;
      rightWing.current.rotation.y = 
        -Math.max(0, Math.sin(time * flapSpeed)) * 0.2;
    }

    // More pronounced head movement
    if (head.current) {
      head.current.rotation.y = Math.sin(time * 0.8) * 0.15;
      head.current.rotation.x = 
        Math.sin(time * 0.5) * 0.1 + Math.sin(time * flapSpeed) * 0.05;
    }

    // More dynamic tail movement
    if (tail.current) {
      tail.current.rotation.x = Math.sin(time * 1.5) * 0.15;
      tail.current.rotation.y = Math.cos(time * 1.2) * 0.2;
    }
  });

  if (!scene) {
    return null;
  }

  return (
    <group 
      ref={group} 
      dispose={null} 
      position={[0, -0.5, 0]} 
      scale={1}
      rotation={[0, Math.PI * 0.25, 0]} // Slight rotation to match reference images
    >
      <primitive 
        object={scene}
        receiveShadow 
        castShadow
      />
    </group>
  );
};

// Clean up the loaded model when component unmounts
DragonModel.displayName = 'DragonModel';
useGLTF.preload('/models/black_dragon_with_idle_animation.glb');

export default DragonModel;
