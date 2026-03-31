/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { GameEngine } from './game/engine';
import { Renderer } from './game/renderer';
import { INITIAL_STATE } from './game/constants';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    engineRef.current = new GameEngine(INITIAL_STATE);
    rendererRef.current = new Renderer(canvas);

    let animationFrameId: number;

    const gameLoop = () => {
      if (engineRef.current && rendererRef.current) {
        engineRef.current.update();
        rendererRef.current.render(engineRef.current.getState());
      }
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted]);

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#1a1a1a] text-white p-8 text-center font-mono">
        <div className="mb-12">
          <h1 className="text-6xl font-black italic tracking-tighter mb-4 text-[#f1c40f] uppercase">Retro City Heist</h1>
          <p className="text-gray-400 max-w-md mx-auto">
            A high-performance open-world action game optimized for low-end devices.
            Steal cars, explore the city, and survive.
          </p>
        </div>

        <button
          onClick={() => setGameStarted(true)}
          className="bg-[#f1c40f] text-black px-12 py-4 rounded-none font-black text-2xl hover:bg-white transition-all transform hover:scale-105 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          START GAME
        </button>

        <div className="mt-16 grid grid-cols-2 gap-8 text-left text-sm opacity-60">
          <div>
            <h3 className="font-bold border-b border-gray-700 mb-2 pb-1">CONTROLS</h3>
            <p>WASD - MOVE / DRIVE</p>
            <p>F - ENTER / EXIT CAR</p>
          </div>
          <div>
            <h3 className="font-bold border-b border-gray-700 mb-2 pb-1">TIPS</h3>
            <p>Approach cars to hijack them.</p>
            <p>Stay within city limits.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full bg-[#2c3e50] cursor-crosshair"
    />
  );
}

