import './App.css';
import { PortfolioCanvas, type Skill } from './PortfolioCanvas';
import { useState } from 'react';

function App() {
  // Sample skills data
  const skills: Skill[] = [
    {
      label: 'JavaScript',
      category: 'Programming Language',
      description: 'A versatile programming language for web development.',
      hue: 50,
      isRoot: true,
    },
    {
      label: 'React',
      category: 'Library',
      description: 'A JavaScript library for building user interfaces.',
      hue: 200,
      isPrimary: true,
      cluster: 'Frontend',
    },
    {
      label: 'TypeScript',
      category: 'Language',
      description: 'A strongly typed programming language that builds on JavaScript.',
      hue: 210,
      cluster: 'Frontend',
    },
    {
      label: 'Node.js',
      category: 'Runtime',
      description: 'JavaScript runtime built on Chrome\'s V8 engine.',
      hue: 120,
      cluster: 'Backend',
    },
    {
      label: 'Express',
      category: 'Framework',
      description: 'Fast, unopinionated, minimalist web framework for Node.js.',
      hue: 100,
      cluster: 'Backend',
    },
  ];

  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);

  return (
    <PortfolioCanvas
      skills={skills}
      selectedNodeIndex={selectedNodeIndex}
      onNodeSelect={setSelectedNodeIndex}
      theme="dark"
    />
  );
}

export default App;
