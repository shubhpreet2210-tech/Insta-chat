import { GameState, Car } from './types';

export class GameEngine {
  private state: GameState;
  private keys: Set<string> = new Set();

  constructor(initialState: GameState) {
    this.state = JSON.parse(JSON.stringify(initialState));
    this.setupInput();
  }

  private setupInput() {
    window.addEventListener('keydown', (e) => this.keys.add(e.code));
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
  }

  public update() {
    if (this.state.player.inVehicle) {
      this.updateVehicleMovement();
    } else {
      this.updatePlayerMovement();
    }

    this.handleInteractions();
  }

  private updatePlayerMovement() {
    const { player } = this.state;
    let dx = 0;
    let dy = 0;

    if (this.keys.has('KeyW')) dy -= 1;
    if (this.keys.has('KeyS')) dy += 1;
    if (this.keys.has('KeyA')) dx -= 1;
    if (this.keys.has('KeyD')) dx += 1;

    if (dx !== 0 || dy !== 0) {
      const angle = Math.atan2(dy, dx);
      player.angle = angle;
      player.pos.x += Math.cos(angle) * player.speed;
      player.pos.y += Math.sin(angle) * player.speed;
    }

    // Keep in bounds
    player.pos.x = Math.max(0, Math.min(this.state.worldSize.width, player.pos.x));
    player.pos.y = Math.max(0, Math.min(this.state.worldSize.height, player.pos.y));
  }

  private updateVehicleMovement() {
    const carId = this.state.player.inVehicle;
    const car = this.state.cars.find(c => c.id === carId);
    if (!car) return;

    if (this.keys.has('KeyW')) {
      car.speed += car.acceleration;
    } else if (this.keys.has('KeyS')) {
      car.speed -= car.acceleration;
    } else {
      car.speed *= car.friction;
    }

    // Steering
    if (Math.abs(car.speed) > 0.1) {
      const steeringDir = car.speed > 0 ? 1 : -1;
      if (this.keys.has('KeyA')) car.angle -= car.steering * steeringDir;
      if (this.keys.has('KeyD')) car.angle += car.steering * steeringDir;
    }

    // Speed limits
    car.speed = Math.max(-car.maxSpeed / 2, Math.min(car.maxSpeed, car.speed));

    // Update position
    car.pos.x += Math.cos(car.angle) * car.speed;
    car.pos.y += Math.sin(car.angle) * car.speed;

    // Keep in bounds
    car.pos.x = Math.max(0, Math.min(this.state.worldSize.width, car.pos.x));
    car.pos.y = Math.max(0, Math.min(this.state.worldSize.height, car.pos.y));

    // Update player position to match car
    this.state.player.pos.x = car.pos.x;
    this.state.player.pos.y = car.pos.y;
    this.state.player.angle = car.angle;
  }

  private handleInteractions() {
    if (this.keys.has('KeyF')) {
      this.keys.delete('KeyF'); // Prevent rapid toggle
      
      if (this.state.player.inVehicle) {
        // Exit vehicle
        const car = this.state.cars.find(c => c.id === this.state.player.inVehicle);
        if (car) {
          car.isOccupied = false;
          // Offset player slightly so they don't get stuck
          this.state.player.pos.x += Math.cos(car.angle + Math.PI / 2) * 40;
          this.state.player.pos.y += Math.sin(car.angle + Math.PI / 2) * 40;
        }
        this.state.player.inVehicle = null;
      } else {
        // Try to enter nearest vehicle
        const nearestCar = this.state.cars.find(car => {
          const dist = Math.hypot(car.pos.x - this.state.player.pos.x, car.pos.y - this.state.player.pos.y);
          return dist < 60 && !car.isOccupied;
        });

        if (nearestCar) {
          nearestCar.isOccupied = true;
          this.state.player.inVehicle = nearestCar.id;
        }
      }
    }
  }

  public getState(): GameState {
    return this.state;
  }
}
