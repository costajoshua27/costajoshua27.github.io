// src/components/scenes/OfficeScene/Desk.tsx
import React from 'react';
import { Box, Cylinder } from '@react-three/drei';

const Desk: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Desktop */}
      <Box args={[4, 0.1, 2]} position={[0, 0.75, 1]} castShadow receiveShadow>
        <meshStandardMaterial color="#8B4513" />
      </Box>

      {/* Desk legs */}
      {[-1.8, 1.8].map((x, i) =>
        [0.2, 1.8].map((z, j) => (
          <Cylinder key={`${i}-${j}`} args={[0.08, 0.08, 0.75]} position={[x, 0.375, z]} castShadow>
            <meshStandardMaterial color="#654321" />
          </Cylinder>
        ))
      )}

      {/* Keyboard */}
      <Box args={[1, 0.05, 0.4]} position={[-0.3, 0.825, 0.8]} castShadow>
        {' '}
        {/* Moved to left side */}
        <meshStandardMaterial color="#2F2F2F" />
      </Box>

      {/* Mouse */}
      <Box args={[0.25, 0.08, 0.4]} position={[0.5, 0.825, 0.8]} castShadow>
        {' '}
        {/* Moved to right side */}
        <meshStandardMaterial color="#2F2F2F" />
      </Box>

      {/* Mouse pad */}
      <Box args={[1, 0.02, 0.8]} position={[0.7, 0.79, 0.8]} receiveShadow>
        {' '}
        {/* Moved to right side */}
        <meshStandardMaterial color="#4169E1" />
      </Box>

      {/* Desk lamp */}
      <group position={[-1.5, 0.8, 1.5]}>
        {/* Base */}
        <Cylinder args={[0.2, 0.2, 0.05]} position={[0, 0.025, 0]}>
          <meshStandardMaterial color="#2F2F2F" />
        </Cylinder>

        {/* Arm */}
        <Cylinder args={[0.03, 0.03, 1]} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#2F2F2F" />
        </Cylinder>

        {/* Light shade */}
        <Cylinder args={[0.3, 0.2, 0.4]} position={[0, 1.2, 0]}>
          <meshStandardMaterial color="#FFD700" />
        </Cylinder>

        {/* Light source */}
        <pointLight position={[0, 1, 0]} intensity={0.5} color="#FFE5B4" distance={5} />
      </group>

      {/* Pen holder */}
      <group position={[1.5, 0.8, 1.5]}>
        <Cylinder args={[0.15, 0.15, 0.3]} position={[0, 0.15, 0]}>
          <meshStandardMaterial color="#8B4513" />
        </Cylinder>

        {/* Pens */}
        {Array.from({ length: 4 }, (_, i) => (
          <Cylinder
            key={i}
            args={[0.01, 0.01, 0.4]}
            position={[
              Math.cos((i / 4) * Math.PI * 2) * 0.05,
              0.35,
              Math.sin((i / 4) * Math.PI * 2) * 0.05,
            ]}
          >
            <meshStandardMaterial color={i % 2 === 0 ? '#FF0000' : '#0000FF'} />
          </Cylinder>
        ))}
      </group>

      {/* Notepad */}
      <Box args={[0.6, 0.02, 0.8]} position={[-0.8, 0.81, 0.8]} castShadow>
        <meshStandardMaterial color="#FFFFFF" />
      </Box>
    </group>
  );
};

export default Desk;
