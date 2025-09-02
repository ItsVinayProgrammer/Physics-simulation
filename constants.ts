import type { SimulationDataPoint, LevelConfig } from './types';
import { Level } from './types';

export const TRACK_MIN = -50;
export const TRACK_MAX = 50;

export const INITIAL_STATE: {
  time: number;
  position: number;
  velocity: number;
  acceleration: number;
  distance: number;
  history: SimulationDataPoint[];
  minPositionReached: number;
  maxPositionReached: number;
} = {
  time: 0,
  position: 0,
  velocity: 0,
  acceleration: 0,
  distance: 0,
  history: [{ time: 0, position: 0, distance: 0, velocity: 0, acceleration: 0 }],
  minPositionReached: 0,
  maxPositionReached: 0,
};

export const LEVEL_CONFIG: Record<Level, LevelConfig> = {
  [Level.Level1]: {
    trackMin: 0,
    trackMax: 100,
    velMin: 0,
    velMax: 10,
    initialPosition: 0,
    description: "Distance-only tracking with simple linear motion."
  },
  [Level.Level2]: {
    trackMin: -50,
    trackMax: 50,
    velMin: -10,
    velMax: 10,
    initialPosition: 0,
    description: "Introduce displacement by allowing movement in two directions."
  },
  [Level.Level3]: {
    trackMin: -50,
    trackMax: 50,
    velMin: -10,
    velMax: 10,
    initialPosition: 0,
    description: "Compare distance and displacement using side-by-side graphs."
  },
  [Level.Level4]: {
    trackMin: -50,
    trackMax: 50,
    velMin: -20,
    velMax: 20,
    initialPosition: 0,
    description: "Advanced motion analysis with a wider range of velocities.",
  },
};