// src/components/shared/CameraController.tsx
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CameraController: React.FC = () => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const mousePosition = useRef({ x: 0, y: 0 });

  // Simple static camera position - good overview of the scene
  const CAMERA_POSITION = new THREE.Vector3(0, 4, 8);
  const CAMERA_TARGET = new THREE.Vector3(0, 1, 0);

  // Optional: Very subtle mouse movement (can remove if you want completely static)
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize camera to static position
  useEffect(() => {
    camera.position.copy(CAMERA_POSITION);
    targetPosition.current.copy(CAMERA_POSITION);
    targetLookAt.current.copy(CAMERA_TARGET);
    camera.lookAt(CAMERA_TARGET);
  }, [camera]);

  useFrame(() => {
    if (!camera) return;

    const mouse = mousePosition.current;

    // Optional: Very subtle camera movement based on mouse (remove these lines for completely static camera)
    const offset = new THREE.Vector3(
      mouse.x * 0.5, // Very small horizontal movement
      mouse.y * 0.3, // Very small vertical movement
      0
    );

    // Apply slight movement to both position and target for parallax effect
    targetPosition.current.copy(CAMERA_POSITION).add(offset);
    targetLookAt.current.copy(CAMERA_TARGET).add(offset.clone().multiplyScalar(0.1));

    // Smooth interpolation (very gentle)
    camera.position.lerp(targetPosition.current, 0.02);
    camera.lookAt(targetLookAt.current);

    camera.updateProjectionMatrix();
  });

  return null;
};

export default CameraController;
