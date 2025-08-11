// src/components/scenes/OfficeScene/ThoughtBubbles.tsx
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import { useAppStore, hobbyBubbles } from '../../../stores/appStore';
import * as THREE from 'three';

const ThoughtBubbles: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const setHoveredBubble = useAppStore(state => state.setHoveredBubble);
  const setScene = useAppStore(state => state.setScene);
  const hoveredBubble = useAppStore(state => state.hoveredBubble);

  useFrame(state => {
    // Gentle floating animation for all bubbles
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const time = state.clock.elapsedTime;
        child.position.y = 4 + Math.sin(time + index * 1.2) * 0.3;
        child.rotation.y = Math.sin(time * 0.5 + index) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {hobbyBubbles.map((hobby, index) => (
        <ThoughtBubble
          key={hobby.id}
          hobby={hobby}
          index={index}
          isHovered={hoveredBubble === hobby.id}
          onHover={() => setHoveredBubble(hobby.id)}
          onUnhover={() => setHoveredBubble(null)}
          onClick={() => setScene(hobby.targetScene)}
        />
      ))}

      {/* Small trailing bubbles for effect */}
      <BubbleTrail />
    </group>
  );
};

interface ThoughtBubbleProps {
  hobby: (typeof hobbyBubbles)[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
  onClick: () => void;
}

const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({
  hobby,
  index,
  isHovered,
  onHover,
  onUnhover,
  onClick,
}) => {
  const bubbleRef = useRef<THREE.Mesh>(null);
  const contentRef = useRef<THREE.Group>(null);

  useFrame(state => {
    if (bubbleRef.current) {
      // Gentle pulsing effect
      const scale = isHovered ? 1.2 : 1;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      bubbleRef.current.scale.setScalar(scale * pulse);
    }

    if (contentRef.current && isHovered) {
      // Rotate content when hovered
      contentRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  // Position bubbles in an arc above the character
  const angle = (index - 1) * 0.8; // Spread bubbles in arc
  const radius = 2;
  const basePosition: [number, number, number] = [
    Math.sin(angle) * radius,
    4,
    Math.cos(angle) * radius + 1,
  ];

  return (
    <group position={basePosition}>
      {/* Main bubble */}
      <Sphere
        ref={bubbleRef}
        args={[0.8]}
        onPointerEnter={onHover}
        onPointerLeave={onUnhover}
        onClick={onClick}
        castShadow
      >
        <meshStandardMaterial
          color={hobby.color}
          transparent
          opacity={isHovered ? 0.9 : 0.7}
          emissive={hobby.color}
          emissiveIntensity={isHovered ? 0.2 : 0.05}
        />
      </Sphere>

      {/* Bubble content */}
      <group ref={contentRef}>
        {/* Hobby icon/representation */}
        <HobbyContent hobby={hobby} isHovered={isHovered} />
      </group>

      {/* Hover effect particles */}
      {isHovered && <HoverParticles color={hobby.color} />}

      {/* Label */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.3}
        color={isHovered ? hobby.color : '#666666'}
        anchorX="center"
        anchorY="middle"
      >
        {hobby.name}
      </Text>
    </group>
  );
};

interface HobbyContentProps {
  hobby: (typeof hobbyBubbles)[0];
  isHovered: boolean;
}

const HobbyContent: React.FC<HobbyContentProps> = ({ hobby, isHovered }) => {
  switch (hobby.id) {
    case 'basketball':
      return (
        <group>
          {/* Basketball */}
          <Sphere args={[0.3]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#D2691E" />
          </Sphere>
          {/* Basketball lines */}
          <mesh>
            <torusGeometry args={[0.3, 0.02]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.3, 0.02]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        </group>
      );

    case 'climbing':
      return (
        <group>
          {/* Rock wall representation */}
          <mesh>
            <boxGeometry args={[0.6, 0.8, 0.2]} />
            <meshStandardMaterial color="#8B7D6B" />
          </mesh>
          {/* Climbing holds */}
          {Array.from({ length: 6 }, (_, i) => (
            <Sphere
              key={i}
              args={[0.05]}
              position={[(Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.6, 0.12]}
            >
              <meshStandardMaterial color="#FF4500" />
            </Sphere>
          ))}
        </group>
      );

    case 'gaming':
      return (
        <group>
          {/* Game controller */}
          <mesh>
            <boxGeometry args={[0.5, 0.3, 0.1]} />
            <meshStandardMaterial color="#2F2F2F" />
          </mesh>
          {/* Controller buttons */}
          <Sphere args={[0.04]} position={[0.15, 0.05, 0.06]}>
            <meshStandardMaterial color="#FF0000" />
          </Sphere>
          <Sphere args={[0.04]} position={[0.05, 0.15, 0.06]}>
            <meshStandardMaterial color="#00FF00" />
          </Sphere>
          <Sphere args={[0.04]} position={[-0.05, 0.05, 0.06]}>
            <meshStandardMaterial color="#0000FF" />
          </Sphere>
          <Sphere args={[0.04]} position={[-0.15, -0.05, 0.06]}>
            <meshStandardMaterial color="#FFFF00" />
          </Sphere>

          {/* Pixel effect when hovered */}
          {isHovered && (
            <group>
              {Array.from({ length: 20 }, (_, i) => (
                <mesh
                  key={i}
                  position={[
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                  ]}
                >
                  <boxGeometry args={[0.05, 0.05, 0.05]} />
                  <meshStandardMaterial
                    color={`hsl(${Math.random() * 360}, 70%, 60%)`}
                    emissive={`hsl(${Math.random() * 360}, 70%, 30%)`}
                  />
                </mesh>
              ))}
            </group>
          )}
        </group>
      );

    default:
      return (
        <Text fontSize={1} color="#FFFFFF" anchorX="center" anchorY="middle">
          {hobby.icon}
        </Text>
      );
  }
};

const HoverParticles: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group>
      {Array.from({ length: 8 }, (_, i) => (
        <Sphere
          key={i}
          args={[0.02]}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 1.2,
            Math.sin((i / 8) * Math.PI * 2) * 0.3,
            Math.sin((i / 8) * Math.PI * 2) * 1.2,
          ]}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </Sphere>
      ))}
    </group>
  );
};

const BubbleTrail: React.FC = () => {
  const trailRef = useRef<THREE.Group>(null);

  useFrame(state => {
    if (trailRef.current) {
      trailRef.current.children.forEach((child, index) => {
        const time = state.clock.elapsedTime;
        child.position.y = 2 + Math.sin(time * 2 + index * 0.5) * 0.2;
        child.position.x = Math.sin(time + index) * 0.5;
      });
    }
  });

  return (
    <group ref={trailRef}>
      {Array.from({ length: 5 }, (_, i) => (
        <Sphere key={i} args={[0.1 - i * 0.015]} position={[-1 + i * 0.2, 2, 0.5]}>
          <meshStandardMaterial color="#E6E6FA" transparent opacity={0.6 - i * 0.1} />
        </Sphere>
      ))}
    </group>
  );
};

export default ThoughtBubbles;
