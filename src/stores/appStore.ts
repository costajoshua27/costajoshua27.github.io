import { create } from 'zustand';
import { SceneState, WorkSceneMode } from '../types/scene';

export type CharacterAnimations =
  | 'typing'
  | 'stretching'
  | 'daydreaming'
  | 'shooting'
  | 'climbing'
  | 'gaming'
  | 'transitioning';

export const CharacterAnimations = {
  TYPING: 'typing' as CharacterAnimations,
  STRETCHING: 'stretching' as CharacterAnimations,
  DAYDREAMING: 'daydreaming' as CharacterAnimations,
  SHOOTING_BASKETBALL: 'shooting' as CharacterAnimations,
  CLIMBING_POSE: 'climbing' as CharacterAnimations,
  GAMING_SEATED: 'gaming' as CharacterAnimations,
  TRANSITIONING: 'transitioning' as CharacterAnimations,
};

interface HobbyBubble {
  id: string;
  name: string;
  icon: string;
  color: string;
  targetScene: SceneState;
}

interface AppState {
  currentScene: SceneState;
  workSceneMode: WorkSceneMode;
  isTransitioning: boolean;
  hoveredBubble: string | null;
  characterAnimation: CharacterAnimations;
  isFirstLoad: boolean;

  // Actions
  setScene: (scene: SceneState) => void;
  setWorkSceneMode: (mode: WorkSceneMode) => void;
  setHoveredBubble: (bubble: string | null) => void;
  setCharacterAnimation: (animation: CharacterAnimations) => void;
  startTransition: () => void;
  endTransition: () => void;
  setFirstLoadComplete: () => void;
}

export const hobbyBubbles: HobbyBubble[] = [
  {
    id: 'basketball',
    name: 'Basketball',
    icon: '🏀',
    color: '#ff6b35',
    targetScene: SceneState.BASKETBALL,
  },
  {
    id: 'climbing',
    name: 'Climbing',
    icon: '🧗‍♂️',
    color: '#4ecdc4',
    targetScene: SceneState.CLIMBING,
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: '🎮',
    color: '#a8e6cf',
    targetScene: SceneState.GAMING,
  },
];

export const useAppStore = create<AppState>((set, get) => ({
  currentScene: SceneState.WORK,
  workSceneMode: WorkSceneMode.WORKING,
  isTransitioning: false,
  hoveredBubble: null,
  characterAnimation: CharacterAnimations.TYPING,
  isFirstLoad: true,

  setScene: (scene: SceneState) => {
    const { startTransition, endTransition, setCharacterAnimation, workSceneMode } = get();

    startTransition();

    // Set appropriate character animation based on scene
    switch (scene) {
      case SceneState.WORK:
        switch (workSceneMode) {
          case WorkSceneMode.WORKING:
            setCharacterAnimation(CharacterAnimations.TYPING);
            break;
          case WorkSceneMode.DAYDREAM:
            setCharacterAnimation(CharacterAnimations.DAYDREAMING);
            break;
        }
        break;
      case SceneState.BASKETBALL:
        setCharacterAnimation(CharacterAnimations.SHOOTING_BASKETBALL);
        break;
      case SceneState.CLIMBING:
        setCharacterAnimation(CharacterAnimations.CLIMBING_POSE);
        break;
      case SceneState.GAMING:
        setCharacterAnimation(CharacterAnimations.GAMING_SEATED);
        break;
    }

    // Simulate transition delay
    setTimeout(() => {
      set({ currentScene: scene });
      endTransition();
    }, 800); // Slightly longer for smoother camera transitions
  },

  setWorkSceneMode: (mode: WorkSceneMode) => {
    // const { startTransition, endTransition } = get();

    // // Start transition for camera movement
    // startTransition();

    set({ workSceneMode: mode });

    // // Update scene after a brief delay for smooth camera transition
    // setTimeout(() => {
    //   endTransition();
    // }, 600);
  },

  setHoveredBubble: (bubble: string | null) => set({ hoveredBubble: bubble }),

  setCharacterAnimation: (animation: CharacterAnimations) => set({ characterAnimation: animation }),

  startTransition: () => set({ isTransitioning: true }),

  endTransition: () => set({ isTransitioning: false }),

  setFirstLoadComplete: () => set({ isFirstLoad: false }),
}));
