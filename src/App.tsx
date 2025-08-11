// src/App.tsx
import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css';
import SceneManager from './components/SceneManager';
import CameraController from './components/shared/CameraController';
import LoadingScreen from './components/ui/LoadingScreen';
import WorkModeToggle from './components/ui/WorkModeToggle';
import { useAppStore } from './stores/appStore';
import { SceneState } from './types/scene';

function App() {
  const scene = useAppStore(state => state.currentScene);
  const isTransitioning = useAppStore(state => state.isTransitioning);
  return (
    <div className="app">
      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: [0, 2, 8],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

          {/* Environment */}
          <Environment preset="apartment" />

          {/* Scene Content */}
          <SceneManager />

          {/* Custom Camera Controller */}
          <CameraController />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      {scene === SceneState.WORK && !isTransitioning ? <WorkModeToggle /> : null}

      {/* Loading Screen */}
      <Suspense fallback={<LoadingScreen />}>
        <div />
      </Suspense>
    </div>
  );
}

export default App;
