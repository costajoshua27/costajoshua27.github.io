// src/components/scenes/ClimbingScene.tsx
import { Sphere, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../stores/appStore';
import { SceneState } from '../../types/scene';

export const ClimbingScene: React.FC = () => {
  const wallRef = useRef<THREE.Group>(null);
  const setScene = useAppStore(state => state.setScene);

  useFrame(state => {
    // Gentle swaying effect for climbing holds
    if (wallRef.current) {
      wallRef.current.children.forEach((child, index) => {
        if (child.userData.isHold) {
          child.rotation.z = Math.sin(state.clock.elapsedTime + index) * 0.05;
        }
      });
    }
  });

  return (
    <group>
      {/* Climbing gym floor */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2F4F4F" />
      </mesh>

      {/* Climbing wall */}
      <group ref={wallRef} position={[0, 0, -8]}>
        <mesh>
          <boxGeometry args={[16, 12, 1]} />
          <meshStandardMaterial color="#8B7D6B" />
        </mesh>

        {/* Climbing holds */}
        {Array.from({ length: 30 }, (_, i) => {
          const x = (Math.random() - 0.5) * 14;
          const y = Math.random() * 10 + 1;
          const color = ['#FF4500', '#4ECDC4', '#FFD700', '#FF69B4'][Math.floor(Math.random() * 4)];

          return (
            <Sphere
              key={i}
              args={[0.15]}
              position={[x, y, 0.6]}
              userData={{ isHold: true }}
              castShadow
            >
              <meshStandardMaterial color={color} />
            </Sphere>
          );
        })}
      </group>

      {/* Climbing rope */}
      <mesh position={[3, 6, -7]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.05, 0.05, 12]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Title */}
      <Text position={[0, 8, -5]} fontSize={1} color="#4ECDC4" anchorX="center" anchorY="middle">
        Climbing Gym
      </Text>

      {/* Return portal */}
      <group position={[0, 1, 5]} onClick={() => setScene(SceneState.WORK)}>
        <Sphere args={[1]} castShadow>
          <meshStandardMaterial color="#4ECDC4" transparent opacity={0.7} emissive="#002222" />
        </Sphere>
        <Text position={[0, 0, 0]} fontSize={0.3} color="#FFFFFF" anchorX="center" anchorY="middle">
          Return to Office
        </Text>
      </group>
    </group>
  );
};

export default ClimbingScene;
