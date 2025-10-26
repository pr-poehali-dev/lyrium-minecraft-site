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
  const [swordClicked, setSwordClicked] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  
  const gameStateRef = useRef({
    playerY: 150,
    playerVelocity: 0,
    obstacles: [] as { x: number; height: number; passed?: boolean }[],
    walls: [] as { x: number; y: number; health: number }[],
    mobs: [] as { x: number; y: number; type: 'zombie' | 'skeleton' | 'creeper'; passed?: boolean }[],
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
    let mobSpawnTimer = 0;
    const MOB_SIZE = 35;

    const resetGame = () => {
      gameStateRef.current = {
        playerY: GROUND_Y - PLAYER_SIZE,
        playerVelocity: 0,
        obstacles: [],
        walls: [],
        mobs: [],
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
      const health = Math.random() > 0.5 ? 1 : 2;
      gameStateRef.current.walls.push({
        x: canvas.width,
        y,
        health
      });
    };

    const spawnMob = () => {
      const types: ('zombie' | 'skeleton' | 'creeper')[] = ['zombie', 'skeleton', 'creeper'];
      const type = types[Math.floor(Math.random() * types.length)];
      const y = GROUND_Y - MOB_SIZE - Math.random() * 80;
      gameStateRef.current.mobs.push({
        x: canvas.width,
        y,
        type,
        passed: false
      });
    };

    const playSound = (frequency: number, duration: number, type: OscillatorType = 'square') => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    };

    const handleJump = () => {
      if (!gameOver && gameStateRef.current.playerY >= GROUND_Y - PLAYER_SIZE - 5) {
        gameStateRef.current.playerVelocity = JUMP_FORCE;
        gameStateRef.current.isJumping = true;
        playSound(400, 0.1, 'sine');
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

        mobSpawnTimer++;
        if (mobSpawnTimer > 120) {
          spawnMob();
          mobSpawnTimer = 0;
        }

        state.obstacles = state.obstacles.filter(obs => obs.x > -OBSTACLE_WIDTH);
        state.walls = state.walls.filter(wall => wall.x > -WALL_SIZE && wall.health > 0);
        
        state.mobs.forEach(mob => {
          if (mob.x + MOB_SIZE < 0 && !mob.passed) {
            mob.passed = true;
            setCoins(prev => Math.max(0, prev - 1));
            playSound(200, 0.15, 'sawtooth');
          }
        });
        
        state.mobs = state.mobs.filter(mob => mob.x > -MOB_SIZE);

        state.obstacles.forEach(obstacle => {
          obstacle.x -= state.gameSpeed;

          if (
            50 + PLAYER_SIZE > obstacle.x &&
            50 < obstacle.x + OBSTACLE_WIDTH &&
            state.playerY + PLAYER_SIZE > GROUND_Y - obstacle.height
          ) {
            setGameOver(true);
            playSound(300, 0.1);
            setTimeout(() => playSound(250, 0.1), 100);
            setTimeout(() => playSound(200, 0.3), 200);
          }

          if (obstacle.x + OBSTACLE_WIDTH < 50 && !obstacle.passed) {
            obstacle.passed = true;
            state.score++;
            setScore(state.score);
            playSound(600, 0.1, 'sine');
            setTimeout(() => playSound(800, 0.1, 'sine'), 50);
            
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
            playSound(300, 0.1);
            setTimeout(() => playSound(250, 0.1), 100);
            setTimeout(() => playSound(200, 0.3), 200);
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
        const alpha = wall.health / 2;
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

      state.mobs.forEach(mob => {
        mob.x -= state.gameSpeed;

        if (mob.type === 'zombie') {
          ctx.fillStyle = '#2d5016';
          ctx.fillRect(mob.x, mob.y, MOB_SIZE, MOB_SIZE);
          ctx.fillStyle = '#3a6b1e';
          ctx.fillRect(mob.x + 5, mob.y + 5, MOB_SIZE - 10, MOB_SIZE - 10);
          ctx.fillStyle = '#1a1a1a';
          ctx.fillRect(mob.x + 8, mob.y + 10, 6, 6);
          ctx.fillRect(mob.x + 21, mob.y + 10, 6, 6);
        } else if (mob.type === 'skeleton') {
          ctx.fillStyle = '#c0c0c0';
          ctx.fillRect(mob.x, mob.y, MOB_SIZE, MOB_SIZE);
          ctx.fillStyle = '#e0e0e0';
          ctx.fillRect(mob.x + 5, mob.y + 5, MOB_SIZE - 10, MOB_SIZE - 10);
          ctx.fillStyle = '#1a1a1a';
          ctx.fillRect(mob.x + 8, mob.y + 10, 6, 6);
          ctx.fillRect(mob.x + 21, mob.y + 10, 6, 6);
        } else if (mob.type === 'creeper') {
          ctx.fillStyle = '#0f5a0f';
          ctx.fillRect(mob.x, mob.y, MOB_SIZE, MOB_SIZE);
          ctx.fillStyle = '#17a317';
          ctx.fillRect(mob.x + 5, mob.y + 5, MOB_SIZE - 10, MOB_SIZE - 10);
          ctx.fillStyle = '#1a1a1a';
          ctx.fillRect(mob.x + 8, mob.y + 10, 6, 6);
          ctx.fillRect(mob.x + 21, mob.y + 10, 6, 6);
          ctx.fillRect(mob.x + 12, mob.y + 20, 11, 8);
        }
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
      playSound(200, 0.15, 'square');
      if (closestWall.health <= 0) {
        setScore(prev => prev + 5);
        setCoins(prev => prev + 2);
        playSound(150, 0.2, 'sawtooth');
      }
    }
  };

  const handleSwordClick = () => {
    if (gameOver) return;
    
    setSwordClicked(true);
    setTimeout(() => setSwordClicked(false), 200);

    const state = gameStateRef.current;
    const closestMob = state.mobs.find(
      mob => mob.x > 30 && mob.x < 150
    );

    if (closestMob) {
      const mobIndex = state.mobs.indexOf(closestMob);
      state.mobs.splice(mobIndex, 1);
      playSound(350, 0.15, 'triangle');
    }
  };

  const buyPrefix = () => {
    if (coins >= 35) {
      setCoins(prev => prev - 35);
      playSound(500, 0.05, 'sine');
      setTimeout(() => {
        playSound(600, 0.1, 'sine');
        setTimeout(() => playSound(800, 0.1, 'sine'), 50);
      }, 100);
      const codes = ['HDHUDIE', 'DBDIDIE', 'SGADOC'];
      const randomCode = codes[Math.floor(Math.random() * codes.length)];
      setPrefixCode(randomCode);
      setShowPrefixShop(true);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(prefixCode);
    setCodeCopied(true);
    playSound(500, 0.05, 'sine');
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const playSound = (frequency: number, duration: number, type: OscillatorType = 'square') => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-br from-gray-900 via-red-950/10 to-black border-2 border-red-500/40 shadow-2xl shadow-red-500/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="relative">
              <h3 className="text-3xl font-heading font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                🎮 Minecraft Runner
              </h3>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent blur-xl -z-10" />
            </div>
            <div className="flex justify-center gap-4">
              <div className="bg-gradient-to-br from-red-950/50 to-black border-2 border-red-500/40 rounded-xl px-6 py-3 shadow-lg shadow-red-500/20 hover:scale-105 transition-transform">
                <p className="text-sm text-gray-400">Счёт</p>
                <p className="text-4xl font-bold bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent">{score}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-950/50 to-black border-2 border-yellow-500/40 rounded-xl px-6 py-3 shadow-lg shadow-yellow-500/20 hover:scale-105 transition-transform">
                <p className="text-sm text-gray-400">Монеты</p>
                <p className="text-4xl font-bold bg-gradient-to-b from-yellow-400 to-yellow-600 bg-clip-text text-transparent">{coins}</p>
              </div>
            </div>
            <canvas
              ref={canvasRef}
              width={600}
              height={300}
              className="w-full max-w-2xl mx-auto border-2 border-red-500/60 rounded-xl bg-black cursor-pointer shadow-2xl shadow-red-500/30 hover:border-red-500/80 transition-all"
            />
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <Button
                onClick={handlePickaxeClick}
                disabled={gameOver}
                className={`bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl ${
                  pickaxeClicked ? 'scale-90' : 'scale-100 hover:scale-105'
                }`}
              >
                <Icon name="Pickaxe" size={20} className="mr-2" />
                Ломать стенки (⛏️)
              </Button>
              <Button
                onClick={handleSwordClick}
                disabled={gameOver}
                className={`bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl shadow-red-500/30 ${
                  swordClicked ? 'scale-90' : 'scale-100 hover:scale-105'
                }`}
              >
                <Icon name="Sword" size={20} className="mr-2" />
                Убить моба (⚔️)
              </Button>
              <p className="text-gray-400 text-sm bg-black/30 px-4 py-2 rounded-lg border border-red-500/20">
                Используй <span className="text-red-400 font-bold">SPACE</span> или клик для прыжка
              </p>
            </div>

            {!showPrefixShop ? (
              <div className="bg-gradient-to-r from-yellow-950/40 via-yellow-900/20 to-black border-2 border-yellow-500/40 rounded-xl p-5 shadow-xl shadow-yellow-500/10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h4 className="text-yellow-400 font-bold text-xl flex items-center gap-2">
                      <Icon name="Gift" size={24} />
                      Магазин префиксов
                    </h4>
                    <p className="text-gray-400 text-sm">Обменяй монеты на уникальный префикс для сервера</p>
                  </div>
                  <Button
                    onClick={buyPrefix}
                    disabled={coins < 35}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-lg hover:shadow-xl shadow-yellow-500/30"
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Купить за 35 монет
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-950/40 via-green-900/20 to-black border-2 border-green-500/40 rounded-xl p-5 space-y-3 shadow-xl shadow-green-500/20 animate-fade-in">
                <Icon name="CheckCircle" size={48} className="text-green-500 mx-auto drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <h4 className="text-green-400 font-bold text-xl">🎉 Поздравляем!</h4>
                <p className="text-white">Ваш код префикса:</p>
                <div className="bg-black/60 border-2 border-green-500/40 rounded-lg p-4 shadow-inner">
                  <code className="text-green-400 text-2xl font-mono font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">{prefixCode}</code>
                </div>
                <Button
                  onClick={copyCode}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
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
                  onClick={() => {
                    setShowPrefixShop(false);
                    playSound(500, 0.05, 'sine');
                  }}
                  variant="outline"
                  className="w-full border-green-500/50 text-green-500 hover:bg-green-500/10 transition-all hover:scale-105"
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