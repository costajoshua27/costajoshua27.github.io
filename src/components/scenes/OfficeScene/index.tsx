// src/components/scenes/OfficeScene/index.tsx
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../../stores/appStore';
import { WorkSceneMode } from '../../../types/scene';
import Character from './Character';
import Desk from './Desk';
import FirstPersonHands from './FirstPersonHands';
import InteractiveMonitor from './InteractiveMonitor';
import ThoughtBubbles from './ThoughtBubbles';
import WorkElements from './WorkElements';

const OfficeScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const workMode = useAppStore(state => state.workSceneMode);

  useFrame(state => {
    // Subtle office ambient animation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Walls */}
      <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#e8e8e8" />
      </mesh>

      <mesh position={[0, 5, -10]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#e8e8e8" />
      </mesh>

      {/* Main scene components */}
      <Character />
      <Desk />

      {/* First person elements */}
      <FirstPersonHands />
      <InteractiveMonitor />

      {/* Conditional elements based on mode */}
      {workMode === WorkSceneMode.WORKING ? <WorkElements /> : <ThoughtBubbles />}
    </group>
  );
};

export default OfficeScene;
