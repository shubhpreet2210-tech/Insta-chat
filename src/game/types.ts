export interface Vector2D {
  x: number;
  y: number;
}

export interface Entity {
  id: string;
  pos: Vector2D;
  angle: number;
  width: number;
  height: number;
  type: 'player' | 'car' | 'pedestrian' | 'building';
}

export interface Car extends Entity {
  speed: number;
  maxSpeed: number;
  acceleration: number;
  friction: number;
  steering: number;
  color: string;
  isOccupied: boolean;
}

export interface Player extends Entity {
  speed: number;
  inventory: string[];
  health: number;
  inVehicle: string | null; // ID of the car the player is in
}

export interface GameState {
  player: Player;
  entities: Entity[];
  cars: Car[];
  camera: Vector2D;
  worldSize: { width: number; height: number };
}
