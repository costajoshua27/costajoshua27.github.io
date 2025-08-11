// src/components/SceneManager.tsx
import React from 'react';
import { useAppStore } from '../stores/appStore';
import { SceneState } from '../types/scene';
import BasketballScene from './scenes/BasketballScene';
import ClimbingScene from './scenes/ClimbingScene';
import GamingScene from './scenes/GamingScene';
import OfficeScene from './scenes/OfficeScene';

const SceneManager: React.FC = () => {
  const currentScene = useAppStore(state => state.currentScene);
  const isTransitioning = useAppStore(state => state.isTransitioning);

  const renderScene = () => {
    switch (currentScene) {
      case SceneState.WORK:
        return <OfficeScene />;
      case SceneState.BASKETBALL:
        return <BasketballScene />;
      case SceneState.CLIMBING:
        return <ClimbingScene />;
      case SceneState.GAMING:
        return <GamingScene />;
      default:
        return <OfficeScene />;
    }
  };

  return (
    <group>
      {/* Transition overlay */}
      {isTransitioning && (
        <mesh position={[0, 0, 5]}>
          <planeGeometry args={[50, 50]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.8} />
        </mesh>
      )}

      {/* Current Scene */}
      <group>
        {renderScene()}
        {/* Dim overlay when transitioning */}
        {isTransitioning && (
          <mesh position={[0, 0, 4.99]}>
            <planeGeometry args={[50, 50]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.7} />
          </mesh>
        )}
      </group>
    </group>
  );
};

export default SceneManager;
