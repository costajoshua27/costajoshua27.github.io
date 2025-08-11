// src/components/ui/ModeToggle.tsx
import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { WorkSceneMode } from '../../types/scene';

const WorkModeToggle: React.FC = () => {
  const mode = useAppStore(state => state.workSceneMode);
  const setWorkSceneMode = useAppStore(state => state.setWorkSceneMode);

  return (
    <div className="mode-toggle">
      <button
        onClick={() =>
          setWorkSceneMode(
            mode === WorkSceneMode.WORKING ? WorkSceneMode.DAYDREAM : WorkSceneMode.WORKING
          )
        }
        className={`toggle-button ${mode === WorkSceneMode.WORKING ? 'work-mode' : 'dream-mode'}`}
        aria-label={`Switch to ${mode === WorkSceneMode.WORKING ? 'daydream' : 'work'} mode`}
      >
        <div className="toggle-slider">
          <span className="toggle-icon">{mode === WorkSceneMode.WORKING ? '💻' : '💭'}</span>
        </div>
        <div className="toggle-labels">
          <span className={`label ${mode === WorkSceneMode.WORKING ? 'active' : ''}`}>Work</span>
          <span className={`label ${mode === WorkSceneMode.DAYDREAM ? 'active' : ''}`}>Dream</span>
        </div>
      </button>

      <div className="mode-description">
        {mode === WorkSceneMode.WORKING ? (
          <p>Explore my professional work and experience</p>
        ) : (
          <p>Discover my hobbies and interests</p>
        )}
      </div>
    </div>
  );
};

export default WorkModeToggle;
