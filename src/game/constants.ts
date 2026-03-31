import { GameState, Car, Entity } from './types';

export const WORLD_WIDTH = 4000;
export const WORLD_HEIGHT = 4000;

export const INITIAL_STATE: GameState = {
  player: {
    id: 'player',
    pos: { x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2 },
    angle: 0,
    width: 20,
    height: 20,
    type: 'player',
    speed: 3,
    inventory: [],
    health: 100,
    inVehicle: null,
  },
  entities: [],
  cars: [
    {
      id: 'car1',
      pos: { x: WORLD_WIDTH / 2 + 100, y: WORLD_HEIGHT / 2 },
      angle: 0,
      width: 40,
      height: 25,
      type: 'car',
      speed: 0,
      maxSpeed: 8,
      acceleration: 0.2,
      friction: 0.98,
      steering: 0.05,
      color: '#ff4444',
      isOccupied: false,
    },
    {
      id: 'car2',
      pos: { x: WORLD_WIDTH / 2 - 200, y: WORLD_HEIGHT / 2 + 200 },
      angle: Math.PI / 2,
      width: 40,
      height: 25,
      type: 'car',
      speed: 0,
      maxSpeed: 6,
      acceleration: 0.15,
      friction: 0.97,
      steering: 0.04,
      color: '#4444ff',
      isOccupied: false,
    },
    {
      id: 'car3',
      pos: { x: WORLD_WIDTH / 2 + 300, y: WORLD_HEIGHT / 2 - 150 },
      angle: -Math.PI / 4,
      width: 45,
      height: 28,
      type: 'car',
      speed: 0,
      maxSpeed: 10,
      acceleration: 0.25,
      friction: 0.98,
      steering: 0.06,
      color: '#f1c40f',
      isOccupied: false,
    }
  ],
  camera: { x: 0, y: 0 },
  worldSize: { width: WORLD_WIDTH, height: WORLD_HEIGHT },
};
