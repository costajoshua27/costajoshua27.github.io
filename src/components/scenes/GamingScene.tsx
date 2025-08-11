import { Box, Sphere, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { useAppStore } from '../../stores/appStore';
import { SceneState } from '../../types/scene';

import * as THREE from 'three';
export const GamingScene: React.FC = () => {
  const setupRef = useRef<THREE.Group>(null);
  const pixelsRef = useRef<THREE.Group>(null);
  const setScene = useAppStore(state => state.setScene);

  useFrame(state => {
    // Animated RGB lighting effect
    if (setupRef.current) {
      const time = state.clock.elapsedTime;
      setupRef.current.children.forEach((child, index) => {
        if (child.userData.isRGBLight && child instanceof THREE.Mesh) {
          const hue = (time * 50 + index * 60) % 360;
          (child.material as THREE.MeshStandardMaterial).color.setHSL(hue / 360, 1, 0.5);
          (child.material as THREE.MeshStandardMaterial).emissive.setHSL(hue / 360, 1, 0.2);
        }
      });
    }

    // Floating pixel animation
    if (pixelsRef.current) {
      pixelsRef.current.children.forEach((child, index) => {
        child.position.y = 3 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.5;
        child.rotation.y += 0.02;
      });
    }
  });

  return (
    <group>
      {/* Gaming room floor */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Gaming setup */}
      <group ref={setupRef} position={[0, 0, 2]}>
        {/* Gaming desk */}
        <Box args={[4, 0.1, 2]} position={[0, 0.75, 0]}>
          <meshStandardMaterial color="#2F2F2F" />
        </Box>

        {/* Gaming monitor */}
        <Box args={[2.5, 1.5, 0.1]} position={[0, 1.8, 0.8]}>
          <meshStandardMaterial color="#000000" emissive="#003300" />
        </Box>

        {/* RGB LED strips */}
        {Array.from({ length: 10 }, (_, i) => (
          <Box
            key={`led-${i}`}
            args={[0.2, 0.05, 0.05]}
            position={[-2 + i * 0.4, 0.8, 0.9]}
            userData={{ isRGBLight: true }}
          >
            <meshStandardMaterial color="#FF0000" emissive="#FF0000" />
          </Box>
        ))}

        {/* Gaming chair */}
        <group position={[0, 0.5, -1]}>
          <Box args={[1, 1.5, 0.2]} position={[0, 0.75, 0]}>
            <meshStandardMaterial color="#FF0000" />
          </Box>
          <Box args={[1, 0.2, 1]} position={[0, 0.4, 0.4]}>
            <meshStandardMaterial color="#FF0000" />
          </Box>
        </group>

        {/* Gaming peripherals */}
        <Box args={[1, 0.05, 0.4]} position={[0, 0.82, 0.3]}>
          <meshStandardMaterial color="#2F2F2F" />
        </Box>
        <Box args={[0.3, 0.08, 0.4]} position={[0.8, 0.82, 0.3]}>
          <meshStandardMaterial color="#2F2F2F" />
        </Box>
      </group>

      {/* Floating pixel effects */}
      <group ref={pixelsRef}>
        {Array.from({ length: 20 }, (_, i) => (
          <Box
            key={`pixel-${i}`}
            args={[0.1, 0.1, 0.1]}
            position={[(Math.random() - 0.5) * 10, 3, (Math.random() - 0.5) * 10]}
          >
            <meshStandardMaterial
              color={`hsl(${Math.random() * 360}, 70%, 60%)`}
              emissive={`hsl(${Math.random() * 360}, 70%, 30%)`}
            />
          </Box>
        ))}
      </group>

      {/* Game posters on walls */}
      <group position={[-8, 3, 0]}>
        {['🎮', '👾', '🕹️', '🎯'].map((icon, i) => (
          <Text
            key={i}
            position={[0, i * 1.5 - 2, 0]}
            fontSize={1}
            color="#00FF00"
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>
        ))}
      </group>

      {/* Title */}
      <Text position={[0, 6, 0]} fontSize={1} color="#00FF00" anchorX="center" anchorY="middle">
        Gaming Setup
      </Text>

      {/* Return portal */}
      <group position={[0, 1, 4]} onClick={() => setScene(SceneState.WORK)}>
        <Sphere args={[1]} castShadow>
          <meshStandardMaterial color="#00FF00" transparent opacity={0.7} emissive="#002200" />
        </Sphere>
        <Text position={[0, 0, 0]} fontSize={0.3} color="#FFFFFF" anchorX="center" anchorY="middle">
          Return to Office
        </Text>
      </group>
    </group>
  );
};

export default GamingScene;
