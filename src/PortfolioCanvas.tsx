import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Text, OrbitControls } from '@react-three/drei';

export interface Skill {
  label: string;
  category: string;
  description: string;
  hue: number;
  cluster?: string;
  isPrimary?: boolean;
  isRoot?: boolean;
}

interface Node3D extends Skill {
  position: [number, number, number];
  originalIndex: number;
}

export interface PortfolioCanvasProps {
  skills: Skill[];
  selectedNodeIndex: number;
  onNodeSelect: (index: number) => void;
  theme: 'dark' | 'light';
}

// Individual 3D skill node component
function SkillNode({ 
  skill, 
  position, 
  isSelected, 
  isHovered,
  onClick,
  theme 
}: {
  skill: Node3D;
  position: [number, number, number];
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  theme: 'dark' | 'light';
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  // Smooth animations for hover/selection
  const { scale, emissiveIntensity } = useSpring({
    scale: isSelected ? 1.4 : isHovered ? 1.2 : 1.0,
    emissiveIntensity: isSelected ? 0.3 : isHovered ? 0.1 : 0,
    config: { tension: 300, friction: 10 }
  });

  // Continuous rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      
      // Floating animation
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time + skill.originalIndex) * 0.1;
    }
  });

  // Make text always face the camera
  useFrame(() => {
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion);
    }
  });

  const nodeColor = `hsl(${skill.hue}, 70%, 60%)`;
  const nodeSize = skill.isRoot ? 0.8 : skill.isPrimary ? 0.6 : 0.4;

  return (
    <group position={position}>
      <animated.mesh
        ref={meshRef}
        scale={scale}
        onClick={onClick}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <sphereGeometry args={[nodeSize, 32, 32]} />
        <animated.meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.2}
          metalness={0.8}
        />
      </animated.mesh>

      {/* 3D Text Label */}
      {(isSelected || isHovered || skill.isRoot) && (
        <Text
          ref={textRef}
          position={[0, nodeSize + 0.8, 0]}
          fontSize={skill.isRoot ? 0.3 : 0.2}
          color={theme === 'dark' ? '#ffffff' : '#000000'}
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {skill.label}
          <meshBasicMaterial
            color={theme === 'dark' ? '#ffffff' : '#000000'}
            transparent
            opacity={0.9}
          />
        </Text>
      )}
    </group>
  );
}

// Connection lines between nodes
function ConnectionLines({ 
  nodes, 
  connections,
  theme 
}: {
  nodes: Node3D[];
  connections: Array<{ i: number; j: number; type: 'root' | 'cluster' }>;
  theme: 'dark' | 'light';
}) {
  const linesRef = useRef<THREE.BufferGeometry>(null);

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    connections.forEach(conn => {
      const n1 = nodes[conn.i];
      const n2 = nodes[conn.j];
      if (n1 && n2) {
        pts.push(new THREE.Vector3(...n1.position));
        pts.push(new THREE.Vector3(...n2.position));
      }
    });
    return pts;
  }, [nodes, connections]);

  return (
    <line>
      <bufferGeometry ref={linesRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[
            new Float32Array(points.flatMap(p => [p.x, p.y, p.z])),
            3
          ]}
          count={points.length}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={theme === 'dark' ? '#ffffff' : '#000000'}
        transparent
        opacity={0.2}
        linewidth={1}
      />
    </line>
  );
}

// Main modern portfolio canvas component
export function PortfolioCanvas({
  skills,
  selectedNodeIndex,
  onNodeSelect,
  theme
}: PortfolioCanvasProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Create 3D node positions (replaces your cluster positioning logic)
  const { nodes, connections } = useMemo(() => {
    const nodesList: Node3D[] = [];
    const connectionsList: Array<{ i: number; j: number; type: 'root' | 'cluster' }> = [];

    // Root node
    const rootSkill = skills[0];
    nodesList.push({
      ...rootSkill,
      position: [0, 0, 0],
      originalIndex: 0
    });

    // Group skills by cluster, ensuring Node3D type
    const clusters: Record<string, Node3D[]> = {};
    skills.slice(1).forEach((skill, index) => {
      const clusterKey = skill.cluster || 'default';
      if (!clusters[clusterKey]) {
        clusters[clusterKey] = [];
      }
      clusters[clusterKey].push({
        ...skill,
        position: [0, 0, 0], // Will be set below
        originalIndex: index + 1,
      });
    });

    // Position clusters around root
    const clusterNames = Object.keys(clusters);
    const radius = 4;

    clusterNames.forEach((clusterName, clusterIndex) => {
      const clusterAngle = (clusterIndex / clusterNames.length) * Math.PI * 2;
      const clusterX = Math.cos(clusterAngle) * radius;
      const clusterZ = Math.sin(clusterAngle) * radius;
      const clusterY = (clusterIndex % 3 - 1) * 2;

      const clusterSkills = clusters[clusterName];
      const nodeRadius = 1.5;

      clusterSkills.forEach((skill, nodeIndex) => {
        const nodeAngle = (nodeIndex / clusterSkills.length) * Math.PI * 2;
        const x = clusterX + Math.cos(nodeAngle) * nodeRadius;
        const y = clusterY + (nodeIndex % 2) * 0.5;
        const z = clusterZ + Math.sin(nodeAngle) * nodeRadius;

        const nodeId = nodesList.length;
        nodesList.push({
          ...skill,
          position: [x, y, z],
          originalIndex: skill.originalIndex,
        });

        // Connect to root
        connectionsList.push({ i: 0, j: nodeId, type: 'root' });
      });
    });

    return { nodes: nodesList, connections: connectionsList };
  }, [skills]);

  return (
    <div className="fixed inset-0 w-screen h-screen z-0">
      <Canvas
        camera={{ 
          position: [0, 0, 10], 
          fov: 50,
          near: 0.1,
          far: 1000 
        }}
        style={{ background: '#000000' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Connection Lines */}
        <ConnectionLines nodes={nodes} connections={connections} theme={theme} />

        {/* Skill Nodes */}
        {nodes.map((node, index) => (
          <SkillNode
            key={`${node.label}-${index}`}
            skill={node}
            position={node.position}
            isSelected={selectedNodeIndex === node.originalIndex}
            isHovered={hoveredIndex === node.originalIndex}
            onClick={() => onNodeSelect(node.originalIndex)}
            theme={theme}
          />
        ))}

        {/* Background particles effect */}
        <mesh>
          <sphereGeometry args={[50, 32, 32]} />
          <meshBasicMaterial
            color={theme === 'dark' ? '#000511' : '#f0f2f5'}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      </Canvas>
    </div>
  );
}

