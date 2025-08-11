// src/components/scenes/OfficeScene/InteractiveMonitor.tsx
import { Box, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../../stores/appStore';
import { SceneState } from '../../../types/scene';

interface PortfolioTab {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

const portfolioTabs: PortfolioTab[] = [
  {
    id: 'projects',
    title: 'Projects',
    icon: '🚀',
    content: <ProjectsContent />,
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: '💼',
    content: <ExperienceContent />,
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: '⚡',
    content: <SkillsContent />,
  },
  {
    id: 'about',
    title: 'About',
    icon: '👨‍💻',
    content: <AboutContent />,
  },
];

const InteractiveMonitor: React.FC = () => {
  const monitorRef = useRef<THREE.Group>(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [isHovered, setIsHovered] = useState(false);
  const currentScene = useAppStore(state => state.currentScene);
  const workMode = useAppStore(state => state.workSceneMode);

  // Only show in work mode first person view
  const shouldShow = workMode && currentScene === SceneState.WORK;

  useFrame(state => {
    if (!shouldShow || !monitorRef.current) return;

    // Subtle screen glow effect
    const time = state.clock.elapsedTime;
    const glowIntensity = 0.1 + Math.sin(time * 2) * 0.02;

    // Apply glow to screen materials
    monitorRef.current.traverse(child => {
      if (child.userData.isScreen && 'material' in child) {
        const material = child.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = glowIntensity;
      }
    });
  });

  if (!shouldShow) return null;

  return (
    <group ref={monitorRef} position={[0, 1.6, 1.9]}>
      {' '}
      {/* Moved back to correct position */}
      {/* Main Monitor Frame */}
      <Box args={[2.4, 1.6, 0.08]} castShadow>
        {' '}
        {/* Made monitor slightly larger */}
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      {/* Screen */}
      <Box
        args={[2.2, 1.4, 0.02]}
        position={[0, 0, 0.05]}
        userData={{ isScreen: true }}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        castShadow
      >
        <meshStandardMaterial color="#000033" emissive="#001122" emissiveIntensity={0.1} />
      </Box>
      {/* Interactive Screen Content */}
      <Html
        position={[0, 0, 0.06]}
        transform
        occlude
        distanceFactor={0.6}
        style={{
          width: '900px',
          height: '560px',
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            borderRadius: '8px',
            overflow: 'hidden',
            fontFamily: 'monospace',
            color: '#ffffff',
            fontSize: '12px',
            border: isHovered ? '2px solid #4169E1' : '2px solid transparent',
            transition: 'border 0.3s ease',
          }}
        >
          {/* Browser-like interface */}
          <div
            style={{
              background: '#2d2d2d',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 15px',
              borderBottom: '1px solid #444',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ff5f56',
                }}
              ></div>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ffbd2e',
                }}
              ></div>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#27ca3f',
                }}
              ></div>
            </div>
            <div style={{ marginLeft: '20px', fontSize: '11px', color: '#aaa' }}>
              portfolio://localhost:3000/work
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            style={{
              background: '#333',
              display: 'flex',
              borderBottom: '1px solid #444',
            }}
          >
            {portfolioTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? '#4169E1' : 'transparent',
                  border: 'none',
                  color: '#fff',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = '#555';
                  }
                }}
                onMouseLeave={e => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span>{tab.icon}</span>
                {tab.title}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div
            style={{
              padding: '20px',
              height: 'calc(100% - 81px)',
              overflow: 'auto',
            }}
          >
            {portfolioTabs.find(tab => tab.id === activeTab)?.content}
          </div>
        </div>
      </Html>
      {/* Monitor Stand */}
      <Box args={[0.3, 0.1, 0.3]} position={[0, -0.8, 0]}>
        <meshStandardMaterial color="#2F2F2F" />
      </Box>
    </group>
  );
};

// Content Components
function ProjectsContent() {
  return (
    <div style={{ lineHeight: '1.6' }}>
      <h3 style={{ color: '#4ECDC4', marginBottom: '15px' }}>Featured Projects</h3>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#FFD700' }}>🎮 3D Interactive Portfolio</h4>
        <p style={{ fontSize: '11px', color: '#ccc', marginBottom: '8px' }}>
          Immersive portfolio built with React Three Fiber, featuring character-based navigation
          between work and hobby scenes with smooth camera transitions.
        </p>
        <div style={{ fontSize: '10px', color: '#4ECDC4' }}>
          React • TypeScript • Three.js • WebGL
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#FFD700' }}>🚀 E-commerce Platform</h4>
        <p style={{ fontSize: '11px', color: '#ccc', marginBottom: '8px' }}>
          Full-stack e-commerce solution with real-time inventory, payment processing, and admin
          dashboard.
        </p>
        <div style={{ fontSize: '10px', color: '#4ECDC4' }}>
          Node.js • PostgreSQL • Stripe • Docker
        </div>
      </div>

      <div>
        <h4 style={{ color: '#FFD700' }}>📱 Mobile Data Visualization</h4>
        <p style={{ fontSize: '11px', color: '#ccc', marginBottom: '8px' }}>
          Cross-platform mobile app for interactive data visualization with real-time updates.
        </p>
        <div style={{ fontSize: '10px', color: '#4ECDC4' }}>React Native • D3.js • WebSocket</div>
      </div>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div style={{ lineHeight: '1.6' }}>
      <h3 style={{ color: '#4ECDC4', marginBottom: '15px' }}>Work Experience</h3>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#FFD700' }}>Senior Frontend Developer</h4>
        <div style={{ fontSize: '11px', color: '#999', marginBottom: '5px' }}>
          TechCorp Inc. • 2022 - Present
        </div>
        <p style={{ fontSize: '11px', color: '#ccc', marginBottom: '8px' }}>
          Lead development of customer-facing web applications serving 100K+ users. Implemented
          micro-frontend architecture and improved performance by 40%.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#FFD700' }}>Full Stack Developer</h4>
        <div style={{ fontSize: '11px', color: '#999', marginBottom: '5px' }}>
          StartupXYZ • 2020 - 2022
        </div>
        <p style={{ fontSize: '11px', color: '#ccc', marginBottom: '8px' }}>
          Built scalable web applications from concept to deployment. Collaborated with design team
          to create responsive, accessible interfaces.
        </p>
      </div>

      <div>
        <h4 style={{ color: '#FFD700' }}>Junior Developer</h4>
        <div style={{ fontSize: '11px', color: '#999', marginBottom: '5px' }}>
          WebSolutions LLC • 2019 - 2020
        </div>
        <p style={{ fontSize: '11px', color: '#ccc' }}>
          Developed and maintained client websites using modern JavaScript frameworks. Gained
          experience in agile development and version control.
        </p>
      </div>
    </div>
  );
}

function SkillsContent() {
  return (
    <div style={{ lineHeight: '1.6' }}>
      <h3 style={{ color: '#4ECDC4', marginBottom: '15px' }}>Technical Skills</h3>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ color: '#FFD700', marginBottom: '8px' }}>Frontend</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {['React', 'TypeScript', 'Three.js', 'Next.js', 'Vue.js', 'CSS3', 'HTML5'].map(skill => (
            <span
              key={skill}
              style={{
                background: '#4169E1',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '10px',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ color: '#FFD700', marginBottom: '8px' }}>Backend</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'GraphQL'].map(skill => (
            <span
              key={skill}
              style={{
                background: '#228B22',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '10px',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 style={{ color: '#FFD700', marginBottom: '8px' }}>Tools & Others</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {['Git', 'Figma', 'Blender', 'Webpack', 'Jest', 'Cypress', 'Agile'].map(skill => (
            <span
              key={skill}
              style={{
                background: '#9370DB',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '10px',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutContent() {
  return (
    <div style={{ lineHeight: '1.6' }}>
      <h3 style={{ color: '#4ECDC4', marginBottom: '15px' }}>About Me</h3>

      <p style={{ fontSize: '12px', color: '#ccc', marginBottom: '15px' }}>
        Passionate full-stack developer with a love for creating immersive digital experiences. I
        combine technical expertise with creative problem-solving to build applications that users
        love to interact with.
      </p>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ color: '#FFD700', marginBottom: '8px' }}>🎯 What Drives Me</h4>
        <ul style={{ fontSize: '11px', color: '#ccc', paddingLeft: '20px' }}>
          <li>Creating intuitive user experiences</li>
          <li>Pushing the boundaries of web technology</li>
          <li>Building scalable, maintainable code</li>
          <li>Continuous learning and growth</li>
        </ul>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ color: '#FFD700', marginBottom: '8px' }}>🌟 Beyond Code</h4>
        <p style={{ fontSize: '11px', color: '#ccc' }}>
          When I'm not coding, you'll find me on the basketball court, scaling climbing walls, or
          exploring new worlds in video games. These hobbies teach me persistence, strategic
          thinking, and the importance of practice - skills I bring to my development work.
        </p>
      </div>

      <div>
        <h4 style={{ color: '#FFD700', marginBottom: '8px' }}>📫 Let's Connect</h4>
        <div style={{ display: 'flex', gap: '10px', fontSize: '11px' }}>
          <span style={{ color: '#4ECDC4', cursor: 'pointer' }}>📧 Email</span>
          <span style={{ color: '#4ECDC4', cursor: 'pointer' }}>💼 LinkedIn</span>
          <span style={{ color: '#4ECDC4', cursor: 'pointer' }}>🐙 GitHub</span>
          <span style={{ color: '#4ECDC4', cursor: 'pointer' }}>🐦 Twitter</span>
        </div>
      </div>
    </div>
  );
}

export default InteractiveMonitor;
