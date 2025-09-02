
export enum Level {
  Level1 = 'Level 1',
  Level2 = 'Level 2',
  Level3 = 'Level 3',
  Level4 = 'Level 4',
}

export interface SimulationDataPoint {
  time: number;
  position: number;
  distance: number;
  velocity: number;
  acceleration: number;
}

export interface LevelConfig {
  trackMin: number;
  trackMax: number;
  velMin: number;
  velMax: number;
  initialPosition: number;
  description: string;
  accelMin?: number;
  accelMax?: number;
}