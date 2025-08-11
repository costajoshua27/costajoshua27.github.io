// src/components/scenes/OfficeScene/Character.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, Box } from '@react-three/drei';
import { useAppStore, CharacterAnimations } from '../../../stores/appStore';
import * as THREE from 'three';

const Character: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Mesh>(null);

  const characterAnimation = useAppStore(state => state.characterAnimation);
  const workMode = useAppStore(state => state.workMode);

  useFrame(state => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    switch (characterAnimation) {
      case CharacterAnimations.TYPING:
        // Typing animation - subtle movement
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -0.5 + Math.sin(time * 8) * 0.1;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -0.5 + Math.cos(time * 8) * 0.1;
        }
        if (headRef.current) {
          headRef.current.rotation.y = Math.sin(time * 0.5) * 0.05;
        }
        break;

      case CharacterAnimations.DAYDREAMING:
        // Relaxed pose - leaning back, looking up
        if (torsoRef.current) {
          torsoRef.current.rotation.x = -0.2;
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = -1.2;
          leftArmRef.current.rotation.z = 0.3;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = -1.2;
          rightArmRef.current.rotation.z = -0.3;
        }
        if (headRef.current) {
          headRef.current.rotation.x = 0.3;
          headRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
        }
        break;

      default:
        // Default pose
        if (torsoRef.current) {
          torsoRef.current.rotation.x = 0;
        }
        if (leftArmRef.current) {
          leftArmRef.current.rotation.x = 0;
          leftArmRef.current.rotation.z = 0;
        }
        if (rightArmRef.current) {
          rightArmRef.current.rotation.x = 0;
          rightArmRef.current.rotation.z = 0;
        }
        if (headRef.current) {
          headRef.current.rotation.x = 0;
          headRef.current.rotation.y = 0;
        }
    }
  });

  return (
    <group ref={groupRef} position={[-0.5, 0.8, 0]}>
      {/* Head */}
      <Sphere ref={headRef} args={[0.4]} position={[0, 2, 0]} castShadow>
        <meshStandardMaterial color="#FFDBAC" />
      </Sphere>

      {/* Eyes */}
      <Sphere args={[0.05]} position={[-0.15, 2.1, 0.35]} castShadow>
        <meshStandardMaterial color="#000" />
      </Sphere>
      <Sphere args={[0.05]} position={[0.15, 2.1, 0.35]} castShadow>
        <meshStandardMaterial color="#000" />
      </Sphere>

      {/* Torso */}
      <Cylinder ref={torsoRef} args={[0.5, 0.4, 1.2]} position={[0, 1, 0]} castShadow>
        <meshStandardMaterial color="#4169E1" />
      </Cylinder>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.8, 1.4, 0]}>
        <Cylinder args={[0.15, 0.15, 0.8]} position={[0, -0.4, 0]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Cylinder>
        <Cylinder args={[0.12, 0.12, 0.6]} position={[0, -1, 0]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Cylinder>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.8, 1.4, 0]}>
        <Cylinder args={[0.15, 0.15, 0.8]} position={[0, -0.4, 0]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Cylinder>
        <Cylinder args={[0.12, 0.12, 0.6]} position={[0, -1, 0]} castShadow>
          <meshStandardMaterial color="#FFDBAC" />
        </Cylinder>
      </group>

      {/* Legs */}
      <group position={[0, 0.4, 0]}>
        <Cylinder args={[0.18, 0.18, 0.8]} position={[-0.3, -0.4, 0]} castShadow>
          <meshStandardMaterial color="#2F4F4F" />
        </Cylinder>
        <Cylinder args={[0.18, 0.18, 0.8]} position={[0.3, -0.4, 0]} castShadow>
          <meshStandardMaterial color="#2F4F4F" />
        </Cylinder>
      </group>

      {/* Chair */}
      <group position={[0, 0, -0.3]}>
        {/* Seat */}
        <Box args={[1.2, 0.1, 1]} position={[0, 0.8, 0]} castShadow>
          <meshStandardMaterial color="#8B4513" />
        </Box>

        {/* Backrest */}
        <Box args={[1.2, 1.5, 0.1]} position={[0, 1.5, -0.45]} castShadow>
          <meshStandardMaterial color="#8B4513" />
        </Box>

        {/* Chair legs */}
        {[-0.5, 0.5].map((x, i) =>
          [-0.4, 0.4].map((z, j) => (
            <Cylinder key={`${i}-${j}`} args={[0.05, 0.05, 0.8]} position={[x, 0.4, z]} castShadow>
              <meshStandardMaterial color="#696969" />
            </Cylinder>
          ))
        )}
      </group>
    </group>
  );
};

export default Character;
