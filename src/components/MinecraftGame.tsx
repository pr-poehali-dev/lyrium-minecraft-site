import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function MinecraftGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const gameStateRef = useRef({
    playerY: 150,
    playerVelocity: 0,
    obstacles: [] as { x: number; height: number }[],
    score: 0,
    isJumping: false,
    gameSpeed: 5
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GRAVITY = 0.6;
    const JUMP_FORCE = -12;
    const PLAYER_SIZE = 40;
    const GROUND_Y = 250;
    const OBSTACLE_WIDTH = 30;

    let animationFrame: number;
    let obstacleSpawnTimer = 0;

    const resetGame = () => {
      gameStateRef.current = {
        playerY: GROUND_Y - PLAYER_SIZE,
        playerVelocity: 0,
        obstacles: [],
        score: 0,
        isJumping: false,
        gameSpeed: 5
      };
      setScore(0);
      setGameOver(false);
    };

    const spawnObstacle = () => {
      const height = 30 + Math.random() * 40;
      gameStateRef.current.obstacles.push({
        x: canvas.width,
        height
      });
    };

    const handleJump = () => {
      if (!gameOver && gameStateRef.current.playerY >= GROUND_Y - PLAYER_SIZE - 5) {
        gameStateRef.current.playerVelocity = JUMP_FORCE;
        gameStateRef.current.isJumping = true;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameOver) {
          resetGame();
        } else {
          handleJump();
        }
      }
    };

    const handleClick = () => {
      if (gameOver) {
        resetGame();
      } else {
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('click', handleClick);

    const gameLoop = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#7CFC00';
      ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);

      const state = gameStateRef.current;

      if (!gameOver) {
        state.playerVelocity += GRAVITY;
        state.playerY += state.playerVelocity;

        if (state.playerY > GROUND_Y - PLAYER_SIZE) {
          state.playerY = GROUND_Y - PLAYER_SIZE;
          state.playerVelocity = 0;
          state.isJumping = false;
        }

        obstacleSpawnTimer++;
        if (obstacleSpawnTimer > 80) {
          spawnObstacle();
          obstacleSpawnTimer = 0;
        }

        state.obstacles = state.obstacles.filter(obs => obs.x > -OBSTACLE_WIDTH);

        state.obstacles.forEach(obstacle => {
          obstacle.x -= state.gameSpeed;

          if (
            50 + PLAYER_SIZE > obstacle.x &&
            50 < obstacle.x + OBSTACLE_WIDTH &&
            state.playerY + PLAYER_SIZE > GROUND_Y - obstacle.height
          ) {
            setGameOver(true);
            if (state.score > highScore) {
              setHighScore(state.score);
            }
          }

          if (obstacle.x + OBSTACLE_WIDTH < 50 && !obstacle.passed) {
            obstacle.passed = true;
            state.score++;
            setScore(state.score);
            
            if (state.score % 10 === 0) {
              state.gameSpeed += 0.5;
            }
          }
        });
      }

      ctx.fillStyle = '#8B4513';
      ctx.fillRect(48, state.playerY - 2, PLAYER_SIZE + 4, PLAYER_SIZE + 4);
      
      ctx.fillStyle = '#00CED1';
      ctx.fillRect(50, state.playerY, PLAYER_SIZE, PLAYER_SIZE);

      ctx.fillStyle = '#000';
      ctx.fillRect(55, state.playerY + 8, 8, 8);
      ctx.fillRect(67, state.playerY + 8, 8, 8);

      ctx.fillStyle = '#8B4513';
      ctx.fillRect(60, state.playerY + 20, 10, 4);

      state.obstacles.forEach(obstacle => {
        ctx.fillStyle = '#654321';
        ctx.fillRect(
          obstacle.x,
          GROUND_Y - obstacle.height,
          OBSTACLE_WIDTH,
          obstacle.height
        );
        
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(
          obstacle.x + 5,
          GROUND_Y - obstacle.height,
          OBSTACLE_WIDTH - 10,
          obstacle.height - 5
        );
      });

      if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.font = '20px Arial';
        ctx.fillText(`Счёт: ${state.score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText('Нажми SPACE или клик для рестарта', canvas.width / 2, canvas.height / 2 + 50);
      }

      animationFrame = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('click', handleClick);
    };
  }, [gameOver, highScore]);

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500/30">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-heading font-bold text-white">
            🎮 Minecraft Runner
          </h3>
          <div className="flex justify-around text-white">
            <div>
              <p className="text-sm text-gray-400">Счёт</p>
              <p className="text-3xl font-bold text-red-500">{score}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Рекорд</p>
              <p className="text-3xl font-bold text-yellow-500">{highScore}</p>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            width={600}
            height={300}
            className="w-full max-w-full border-2 border-red-500/50 rounded-lg bg-sky-400"
          />
          <p className="text-gray-400 text-sm">
            Нажми SPACE или кликни для прыжка
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
