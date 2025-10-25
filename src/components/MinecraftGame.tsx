import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function MinecraftGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [showPrefixShop, setShowPrefixShop] = useState(false);
  const [prefixCode, setPrefixCode] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([
    { name: 'Steve', score: 45 },
    { name: 'Alex', score: 38 },
    { name: 'Herobrine', score: 32 },
    { name: 'Creeper', score: 28 },
    { name: 'Enderman', score: 25 }
  ]);
  
  const gameStateRef = useRef({
    playerY: 150,
    playerVelocity: 0,
    obstacles: [] as { x: number; height: number; passed?: boolean }[],
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
      setShowNameInput(false);
    };

    const spawnObstacle = () => {
      const height = 30 + Math.random() * 40;
      gameStateRef.current.obstacles.push({
        x: canvas.width,
        height,
        passed: false
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

        state.obstacles = state.obstacles.filter(obs => obs.x > -OBSTACLE_WIDTH);

        state.obstacles.forEach(obstacle => {
          obstacle.x -= state.gameSpeed;

          if (
            50 + PLAYER_SIZE > obstacle.x &&
            50 < obstacle.x + OBSTACLE_WIDTH &&
            state.playerY + PLAYER_SIZE > GROUND_Y - obstacle.height
          ) {
            setGameOver(true);
            if (state.score > 0) {
              setShowNameInput(true);
            }
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
        
        if (!showNameInput) {
          ctx.fillText('Нажми SPACE или клик для рестарта', canvas.width / 2, canvas.height / 2 + 50);
        }
      }

      animationFrame = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('click', handleClick);
    };
  }, [gameOver, showNameInput]);

  const saveScore = () => {
    if (playerName.trim() && score > 0) {
      const newLeaderboard = [...leaderboard, { name: playerName.trim(), score }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      setLeaderboard(newLeaderboard);
      setPlayerName('');
      setShowNameInput(false);
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
              className="w-full max-w-full border-2 border-red-500/50 rounded-lg"
            />
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                Нажми SPACE или кликни для прыжка
              </p>
              <p className="text-yellow-400 text-sm font-medium">
                ⚡ За каждые 5 очков = 1 монета
              </p>
              <Button
                onClick={buyPrefix}
                disabled={coins < 20}
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Star" size={18} className="mr-2" />
                Купить префикс ✢ (20 монет)
              </Button>
            </div>

            {showPrefixShop && (
              <div className="bg-yellow-950/30 border border-yellow-500/30 rounded-lg p-4 space-y-3">
                <div className="text-center space-y-2">
                  <Icon name="Star" size={32} className="text-yellow-500 mx-auto" />
                  <p className="text-white font-bold text-lg">Префикс ✢ куплен!</p>
                  <div className="bg-black border border-yellow-500/50 rounded-lg p-3">
                    <p className="text-gray-400 text-sm mb-2">Твой код:</p>
                    <p className="text-yellow-500 text-2xl font-mono font-bold">{prefixCode}</p>
                  </div>
                </div>
                <Button
                  onClick={copyCode}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600"
                >
                  <Icon name={codeCopied ? "Check" : "Copy"} size={18} className="mr-2" />
                  {codeCopied ? 'Скопировано!' : 'Скопировать код'}
                </Button>
                <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-3">
                  <p className="text-white text-sm">
                    📌 Чтобы получить префикс, напиши код в <a href="https://t.me/LyriumMine" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 underline">@LyriumMine</a>
                  </p>
                </div>
                <Button
                  onClick={() => setShowPrefixShop(false)}
                  variant="outline"
                  className="w-full border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                >
                  Закрыть
                </Button>
              </div>
            )}

            {showNameInput && (
              <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4 space-y-3">
                <p className="text-white font-bold">Сохрани свой результат!</p>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveScore()}
                  placeholder="Введи своё имя"
                  className="w-full px-4 py-2 bg-black border border-red-500/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  maxLength={20}
                  autoFocus
                />
                <Button
                  onClick={saveScore}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600"
                >
                  <Icon name="Trophy" size={18} className="mr-2" />
                  Сохранить результат
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500/30">
        <CardContent className="p-6">
          <h3 className="text-2xl font-heading font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-6 text-center">
            🏆 Таблица лидеров
          </h3>
          <div className="space-y-2">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  index === 0
                    ? 'bg-yellow-950/20 border-yellow-500/30'
                    : index === 1
                    ? 'bg-gray-700/20 border-gray-400/30'
                    : index === 2
                    ? 'bg-orange-950/20 border-orange-700/30'
                    : 'bg-red-950/20 border-red-500/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : index === 1
                        ? 'bg-gray-400/20 text-gray-400'
                        : index === 2
                        ? 'bg-orange-700/20 text-orange-700'
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{entry.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-red-500">{entry.score}</span>
                  {index < 3 && (
                    <Icon
                      name="Trophy"
                      size={20}
                      className={
                        index === 0
                          ? 'text-yellow-500'
                          : index === 1
                          ? 'text-gray-400'
                          : 'text-orange-700'
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}