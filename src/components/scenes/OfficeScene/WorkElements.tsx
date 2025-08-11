// src/components/scenes/OfficeScene/WorkElements.tsx
import { Box, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';

const WorkElements: React.FC = () => {
  const monitorsRef = useRef<THREE.Group>(null);
  const codeRef = useRef<THREE.Group>(null);
  const [hoveredMonitor, setHoveredMonitor] = useState<number | null>(null);

  useFrame(state => {
    // Gentle floating animation for code snippets
    if (codeRef.current) {
      codeRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
        child.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      });
    }
  });

  return (
    <group>
      {/* Monitors */}
      <group ref={monitorsRef} position={[0, 0.8, 1.8]}>
        {/* Main monitor */}
        <Monitor
          position={[0, 0.8, 0]}
          size={[2, 1.2, 0.05]}
          content="main"
          onHover={() => setHoveredMonitor(0)}
          onUnhover={() => setHoveredMonitor(null)}
          isHovered={hoveredMonitor === 0}
        />
      </group>
    </group>
  );
};

interface MonitorProps {
  position: [number, number, number];
  size: [number, number, number];
  content: string;
  onHover: () => void;
  onUnhover: () => void;
  isHovered: boolean;
  rotation?: [number, number, number];
}

const Monitor: React.FC<MonitorProps> = ({
  position,
  size,
  content,
  onHover,
  onUnhover,
  isHovered,
  rotation = [0, 0, 0],
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Monitor frame */}
      <Box args={size} castShadow>
        <meshStandardMaterial color="#2F2F2F" />
      </Box>

      {/* Screen */}
      <Box
        args={[size[0] - 0.1, size[1] - 0.1, 0.01]}
        position={[0, 0, 0.03]}
        onPointerEnter={onHover}
        onPointerLeave={onUnhover}
        castShadow
      >
        <meshStandardMaterial
          color={isHovered ? '#4169E1' : '#000080'}
          emissive={isHovered ? '#001122' : '#000011'}
        />
      </Box>

      {/* Screen content */}
      <Html position={[0, 0, 0.04]} transform occlude distanceFactor={1}>
        <div
          style={{
            width: `${size[0] * 50}px`,
            height: `${size[1] * 50}px`,
            background: isHovered ? 'linear-gradient(45deg, #1e3c72, #2a5298)' : '#000033',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '8px',
            padding: '10px',
            overflow: 'hidden',
            border: '1px solid #00ff00',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {content === 'main' ? (
            <div>
              <div>$ npm run dev</div>
              <div>🟢 Local: http://localhost:5173</div>
              <div>📦 Building portfolio...</div>
              <div>✨ React Three Fiber</div>
              <div>⚡ Vite HMR ready</div>
              <div className={isHovered ? 'animate-pulse' : ''}>
                {isHovered ? '🔥 INTERACTIVE MODE' : '💻 Work Mode Active'}
              </div>
            </div>
          ) : (
            <div>
              <div>📊 Analytics Dashboard</div>
              <div>👥 Portfolio Views: 1,247</div>
              <div>⭐ GitHub Stars: 89</div>
              <div>🌍 Global Reach: 23 countries</div>
              <div className={isHovered ? 'animate-pulse' : ''}>
                {isHovered ? '📈 Click for details' : '📱 Side Monitor'}
              </div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

export default WorkElements;
