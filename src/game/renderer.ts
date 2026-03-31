import { GameState, Vector2D } from './types';
import { WORLD_WIDTH, WORLD_HEIGHT } from './constants';

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

  public render(state: GameState) {
    const { ctx, canvas } = this;
    const { player, camera, cars } = state;

    // Clear canvas
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // Center camera on player
    ctx.translate(canvas.width / 2 - player.pos.x, canvas.height / 2 - player.pos.y);

    // Draw Grid/Ground
    this.drawGround();

    // Draw Roads (Simple representation)
    this.drawRoads();

    // Draw Cars
    cars.forEach(car => this.drawCar(car));

    // Draw Player (if not in vehicle)
    if (!player.inVehicle) {
      this.drawPlayer(player);
    }

    ctx.restore();

    // Draw UI
    this.drawUI(state);
  }

  private drawGround() {
    const { ctx } = this;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const step = 100;
    for (let x = 0; x <= WORLD_WIDTH; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, WORLD_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= WORLD_HEIGHT; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WORLD_WIDTH, y);
      ctx.stroke();
    }
  }

  private drawRoads() {
    const { ctx } = this;
    ctx.fillStyle = '#34495e';
    // Horizontal main road
    ctx.fillRect(0, WORLD_HEIGHT / 2 - 50, WORLD_WIDTH, 100);
    // Vertical main road
    ctx.fillRect(WORLD_WIDTH / 2 - 50, 0, 100, WORLD_HEIGHT);
    
    // Road lines
    ctx.strokeStyle = '#f1c40f';
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(0, WORLD_HEIGHT / 2);
    ctx.lineTo(WORLD_WIDTH, WORLD_HEIGHT / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(WORLD_WIDTH / 2, 0);
    ctx.lineTo(WORLD_WIDTH / 2, WORLD_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  private drawCar(car: any) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(car.pos.x, car.pos.y);
    ctx.rotate(car.angle);
    
    // Body
    ctx.fillStyle = car.color;
    ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
    
    // Windshield
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(car.width / 4, -car.height / 2 + 2, 5, car.height - 4);
    
    // Headlights
    ctx.fillStyle = '#fff';
    ctx.fillRect(car.width / 2 - 2, -car.height / 2 + 2, 4, 4);
    ctx.fillRect(car.width / 2 - 2, car.height / 2 - 6, 4, 4);

    ctx.restore();
  }

  private drawPlayer(player: any) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(player.pos.x, player.pos.y);
    ctx.rotate(player.angle);
    
    // Body
    ctx.fillStyle = '#ecf0f1';
    ctx.beginPath();
    ctx.arc(0, 0, player.width / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Direction indicator
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(0, -2, 10, 4);

    ctx.restore();
  }

  private drawUI(state: GameState) {
    const { ctx, canvas } = this;
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`HEALTH: ${state.player.health}%`, 20, 30);
    ctx.fillText(`POS: ${Math.round(state.player.pos.x)}, ${Math.round(state.player.pos.y)}`, 20, 55);
    
    if (state.player.inVehicle) {
      ctx.fillText('IN VEHICLE - [F] TO EXIT', 20, 80);
    } else {
      // Check if near a car
      const nearCar = state.cars.find(car => {
        const dist = Math.hypot(car.pos.x - state.player.pos.x, car.pos.y - state.player.pos.y);
        return dist < 60;
      });
      if (nearCar) {
        ctx.fillText('PRESS [F] TO ENTER VEHICLE', 20, 80);
      }
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(canvas.width - 150, 20, 130, 80);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(canvas.width - 150, 20, 130, 80);
    ctx.fillStyle = 'white';
    ctx.font = '12px monospace';
    ctx.fillText('CONTROLS:', canvas.width - 140, 40);
    ctx.fillText('WASD - MOVE', canvas.width - 140, 60);
    ctx.fillText('F - ENTER/EXIT', canvas.width - 140, 80);
  }
}
