// src/components/scenes/OfficeScene/FirstPersonHands.tsx
import { Box, Cylinder, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../../stores/appStore';
import { SceneState } from '../../../types/scene';

const FirstPersonHands: React.FC = () => {
  const leftHandRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);
  const currentScene = useAppStore(state => state.currentScene);
  const workMode = useAppStore(state => state.workSceneMode);

  // Only show hands in work mode first person view
  const shouldShowHands = workMode && currentScene === SceneState.WORK;

  useFrame(state => {
    if (!shouldShowHands) return;

    const time = state.clock.elapsedTime;

    // Typing animation for hands
    if (leftHandRef.current && rightHandRef.current) {
      // Left hand typing animation
      leftHandRef.current.rotation.x = -0.3 + Math.sin(time * 8) * 0.05;
      leftHandRef.current.position.y = 0.6 + Math.sin(time * 8) * 0.02;

      // Right hand typing animation (slightly offset)
      rightHandRef.current.rotation.x = -0.3 + Math.cos(time * 8 + 0.5) * 0.05;
      rightHandRef.current.position.y = 0.6 + Math.cos(time * 8 + 0.5) * 0.02;

      // Slight side-to-side movement to simulate reaching for different keys
      leftHandRef.current.position.x = -0.3 + Math.sin(time * 6) * 0.03;
      rightHandRef.current.position.x = 0.3 + Math.cos(time * 6) * 0.03;
    }
  });

  if (!shouldShowHands) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* Left Hand */}
      <group ref={leftHandRef} position={[-0.4, 0.4, 0.6]}>
        {' '}
        {/* Adjusted position to be more visible */}
        <Hand side="left" />
      </group>

      {/* Right Hand */}
      <group ref={rightHandRef} position={[0.4, 0.4, 0.6]}>
        {' '}
        {/* Adjusted position to be more visible */}
        <Hand side="right" />
      </group>

      {/* Sleeves */}
      <Sleeves />
    </group>
  );
};

interface HandProps {
  side: 'left' | 'right';
}

const Hand: React.FC<HandProps> = ({ side }) => {
  const isLeft = side === 'left';

  return (
    <group>
      {/* Palm */}
      <Box args={[0.08, 0.03, 0.12]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#FFDBAC" />
      </Box>

      {/* Thumb */}
      <group position={[isLeft ? 0.05 : -0.05, 0, 0.02]}>
        <Cylinder args={[0.015, 0.015, 0.04]} rotation={[0, 0, isLeft ? -0.3 : 0.3]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Cylinder>
        <Sphere args={[0.018]} position={[0, isLeft ? -0.025 : 0.025, 0]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Sphere>
      </group>

      {/* Index Finger */}
      <group position={[isLeft ? -0.02 : 0.02, 0, 0.08]}>
        <Cylinder args={[0.012, 0.012, 0.05]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Cylinder>
        <Sphere args={[0.015]} position={[0, 0, 0.03]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Sphere>
      </group>

      {/* Middle Finger */}
      <group position={[0, 0, 0.09]}>
        <Cylinder args={[0.012, 0.012, 0.06]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Cylinder>
        <Sphere args={[0.015]} position={[0, 0, 0.035]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Sphere>
      </group>

      {/* Ring Finger */}
      <group position={[isLeft ? 0.02 : -0.02, 0, 0.08]}>
        <Cylinder args={[0.011, 0.011, 0.055]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Cylinder>
        <Sphere args={[0.014]} position={[0, 0, 0.032]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Sphere>
      </group>

      {/* Pinky */}
      <group position={[isLeft ? 0.035 : -0.035, 0, 0.06]}>
        <Cylinder args={[0.01, 0.01, 0.04]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Cylinder>
        <Sphere args={[0.012]} position={[0, 0, 0.025]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Sphere>
      </group>
    </group>
  );
};

const Sleeves: React.FC = () => {
  return (
    <group>
      {/* Left Sleeve */}
      <Cylinder
        args={[0.12, 0.1, 0.4]}
        position={[-0.4, 0.2, 0.4]}
        rotation={[0, 0, 0.1]}
        castShadow
      >
        <meshStandardMaterial color="#4169E1" />
      </Cylinder>

      {/* Right Sleeve */}
      <Cylinder
        args={[0.12, 0.1, 0.4]}
        position={[0.4, 0.2, 0.4]}
        rotation={[0, 0, -0.1]}
        castShadow
      >
        <meshStandardMaterial color="#4169E1" />
      </Cylinder>

      {/* Wrists */}
      <Cylinder args={[0.05, 0.05, 0.08]} position={[-0.4, 0.35, 0.5]} castShadow>
        <meshStandardMaterial color="#FFDBAC" />
      </Cylinder>

      <Cylinder args={[0.05, 0.05, 0.08]} position={[0.4, 0.35, 0.5]} castShadow>
        <meshStandardMaterial color="#FFDBAC" />
      </Cylinder>
    </group>
  );
};

export default FirstPersonHands;
