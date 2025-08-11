// src/components/scenes/BasketballScene.tsx
import { Box, Sphere, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../stores/appStore';
import { SceneState } from '../../types/scene';

const BasketballScene: React.FC = () => {
  const courtRef = useRef<THREE.Group>(null);
  const ballRef = useRef<THREE.Mesh>(null);
  const setScene = useAppStore(state => state.setScene);

  useFrame(state => {
    // Bouncing basketball animation
    if (ballRef.current) {
      ballRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 3)) * 2 + 1;
      ballRef.current.rotation.x += 0.05;
    }
  });

  return (
    <group ref={courtRef}>
      {/* Basketball court floor */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Court lines */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 13]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
      </mesh>

      {/* Basketball hoop */}
      <group position={[0, 3, -6]}>
        <Box args={[0.1, 0.1, 2]} position={[0, 0, 1]}>
          <meshStandardMaterial color="#8B4513" />
        </Box>
        <mesh>
          <torusGeometry args={[0.5, 0.05]} />
          <meshStandardMaterial color="#FF4500" />
        </mesh>
      </group>

      {/* Bouncing basketball */}
      <Sphere ref={ballRef} args={[0.3]} position={[0, 1, 0]} castShadow>
        <meshStandardMaterial color="#D2691E" />
      </Sphere>

      {/* Title */}
      <Text position={[0, 5, 0]} fontSize={1} color="#FF4500" anchorX="center" anchorY="middle">
        Basketball Court
      </Text>

      {/* Return portal */}
      <group position={[0, 1, 5]} onClick={() => setScene(SceneState.WORK)}>
        <Sphere args={[1]} castShadow>
          <meshStandardMaterial color="#4169E1" transparent opacity={0.7} emissive="#001122" />
        </Sphere>
        <Text position={[0, 0, 0]} fontSize={0.3} color="#FFFFFF" anchorX="center" anchorY="middle">
          Return to Office
        </Text>
      </group>
    </group>
  );
};

export default BasketballScene;
