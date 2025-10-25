import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function MinecraftGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showPrefixShop, setShowPrefixShop] = useState(false);
  const [prefixCode, setPrefixCode] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);
  const [pickaxeClicked, setPickaxeClicked] = useState(false);
  
  const gameStateRef = useRef({
    playerY: 150,
    playerVelocity: 0,
    obstacles: [] as { x: number; height: number; passed?: boolean }[],
    walls: [] as { x: number; y: number; health: number }[],
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
    const WALL_SIZE = 50;

    let animationFrame: number;
    let obstacleSpawnTimer = 0;
    let wallSpawnTimer = 0;

    const resetGame = () => {
      gameStateRef.current = {
        playerY: GROUND_Y - PLAYER_SIZE,
        playerVelocity: 0,
        obstacles: [],
        walls: [],
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
        height,
        passed: false
      });
    };

    const spawnWall = () => {
      const y = GROUND_Y - WALL_SIZE - Math.random() * 100;
      gameStateRef.current.walls.push({
        x: canvas.width,
        y,
        health: 3
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

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#1a0000';
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

        wallSpawnTimer++;
        if (wallSpawnTimer > 150) {
          spawnWall();
          wallSpawnTimer = 0;
        }

        state.obstacles = state.obstacles.filter(obs => obs.x > -OBSTACLE_WIDTH);
        state.walls = state.walls.filter(wall => wall.x > -WALL_SIZE && wall.health > 0);

        state.obstacles.forEach(obstacle => {
          obstacle.x -= state.gameSpeed;

          if (
            50 + PLAYER_SIZE > obstacle.x &&
            50 < obstacle.x + OBSTACLE_WIDTH &&
            state.playerY + PLAYER_SIZE > GROUND_Y - obstacle.height
          ) {
            setGameOver(true);
          }

          if (obstacle.x + OBSTACLE_WIDTH < 50 && !obstacle.passed) {
            obstacle.passed = true;
            state.score++;
            setScore(state.score);
            
            if (state.score % 5 === 0) {
              setCoins(prev => prev + 1);
            }
            
            if (state.score % 10 === 0) {
              state.gameSpeed += 0.5;
            }
          }
        });

        state.walls.forEach(wall => {
          wall.x -= state.gameSpeed;

          if (
            50 + PLAYER_SIZE > wall.x &&
            50 < wall.x + WALL_SIZE &&
            state.playerY + PLAYER_SIZE > wall.y &&
            state.playerY < wall.y + WALL_SIZE
          ) {
            setGameOver(true);
          }
        });
      }

      ctx.fillStyle = '#2d0000';
      ctx.fillRect(48, state.playerY - 2, PLAYER_SIZE + 4, PLAYER_SIZE + 4);
      
      ctx.fillStyle = '#EF4444';
      ctx.fillRect(50, state.playerY, PLAYER_SIZE, PLAYER_SIZE);

      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(55, state.playerY + 8, 8, 8);
      ctx.fillRect(67, state.playerY + 8, 8, 8);

      ctx.fillStyle = '#7f0000';
      ctx.fillRect(60, state.playerY + 20, 10, 4);

      state.obstacles.forEach(obstacle => {
        ctx.fillStyle = '#3d0000';
        ctx.fillRect(
          obstacle.x,
          GROUND_Y - obstacle.height,
          OBSTACLE_WIDTH,
          obstacle.height
        );
        
        ctx.fillStyle = '#EF4444';
        ctx.fillRect(
          obstacle.x + 5,
          GROUND_Y - obstacle.height,
          OBSTACLE_WIDTH - 10,
          obstacle.height - 5
        );
      });

      state.walls.forEach(wall => {
        const alpha = wall.health / 3;
        ctx.fillStyle = `rgba(128, 128, 128, ${alpha})`;
        ctx.fillRect(wall.x, wall.y, WALL_SIZE, WALL_SIZE);
        
        ctx.fillStyle = `rgba(96, 96, 96, ${alpha})`;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            ctx.fillRect(
              wall.x + i * 17 + 2,
              wall.y + j * 17 + 2,
              14,
              14
            );
          }
        }
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(wall.health.toString(), wall.x + WALL_SIZE / 2, wall.y + WALL_SIZE / 2 + 7);
      });

      if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#EF4444';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.fillStyle = '#fff';
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
  }, [gameOver]);

  const handlePickaxeClick = () => {
    if (gameOver) return;
    
    setPickaxeClicked(true);
    setTimeout(() => setPickaxeClicked(false), 200);

    const state = gameStateRef.current;
    const closestWall = state.walls.find(
      wall => wall.x > 30 && wall.x < 150
    );

    if (closestWall) {
      closestWall.health--;
      if (closestWall.health <= 0) {
        setScore(prev => prev + 5);
        setCoins(prev => prev + 2);
      }
    }
  };

  const buyPrefix = () => {
    if (coins >= 20) {
      setCoins(prev => prev - 20);
      const codes = ['HDHUDIE', 'DBDIDIE', 'SGADOC'];
      const randomCode = codes[Math.floor(Math.random() * codes.length)];
      setPrefixCode(randomCode);
      setShowPrefixShop(true);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(prefixCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500/30">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-heading font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              🎮 Minecraft Runner
            </h3>
            <div className="flex justify-center gap-4">
              <div className="bg-red-950/30 border border-red-500/30 rounded-lg px-6 py-3">
                <p className="text-sm text-gray-400">Счёт</p>
                <p className="text-4xl font-bold text-red-500">{score}</p>
              </div>
              <div className="bg-yellow-950/30 border border-yellow-500/30 rounded-lg px-6 py-3">
                <p className="text-sm text-gray-400">Монеты</p>
                <p className="text-4xl font-bold text-yellow-500">{coins}</p>
              </div>
            </div>
            <canvas
              ref={canvasRef}
              width={600}
              height={300}
              className="w-full max-w-2xl mx-auto border-2 border-red-500/50 rounded-lg bg-black cursor-pointer"
            />
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <Button
                onClick={handlePickaxeClick}
                disabled={gameOver}
                className={`bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-transform ${
                  pickaxeClicked ? 'scale-90' : 'scale-100'
                }`}
              >
                <Icon name="Pickaxe" size={20} className="mr-2" />
                Ломать стенки (⛏️)
              </Button>
              <p className="text-gray-400 text-sm">
                Используй SPACE или клик для прыжка
              </p>
            </div>

            {!showPrefixShop ? (
              <div className="bg-gradient-to-r from-yellow-950/30 to-black border-2 border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h4 className="text-yellow-500 font-bold text-lg">🎁 Магазин префиксов</h4>
                    <p className="text-gray-400 text-sm">Обменяй монеты на уникальный префикс для сервера</p>
                  </div>
                  <Button
                    onClick={buyPrefix}
                    disabled={coins < 20}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить за 20 монет
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-950/30 to-black border-2 border-green-500/30 rounded-lg p-4 space-y-3">
                <Icon name="CheckCircle" size={48} className="text-green-500 mx-auto" />
                <h4 className="text-green-400 font-bold text-lg">🎉 Поздравляем!</h4>
                <p className="text-white">Ваш код префикса:</p>
                <div className="bg-black border border-green-500/30 rounded-lg p-3">
                  <code className="text-green-400 text-xl font-mono font-bold">{prefixCode}</code>
                </div>
                <Button
                  onClick={copyCode}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600"
                >
                  <Icon name={codeCopied ? "Check" : "Copy"} size={18} className="mr-2" />
                  {codeCopied ? 'Скопировано!' : 'Скопировать код'}
                </Button>
                <p className="text-gray-400 text-sm">
                  📱 Отправьте этот код администратору{' '}
                  <a
                    href="https://t.me/LyriumMine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 underline"
                  >
                    @LyriumMine
                  </a>
                </p>
                <Button
                  onClick={() => setShowPrefixShop(false)}
                  variant="outline"
                  className="w-full border-green-500/50 text-green-500 hover:bg-green-500/10"
                >
                  Закрыть
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
