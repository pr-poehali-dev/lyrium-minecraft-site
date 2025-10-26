import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import MinecraftGame from '@/components/MinecraftGame';
import ModeratorApplication from '@/components/ModeratorApplication';

export default function Index() {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText('LyriumMine.aternos.me:19305');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDonate = () => {
    window.open('https://t.me/LyriumMine', '_blank');
  };

  const handleRules = () => {
    window.open('https://t.me/+38RvWeEJmstjMmQy', '_blank');
  };

  const handleChat = () => {
    window.open('https://t.me/+AoYEDChPREJkMjg6', '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-b from-red-950/20 via-black to-black pointer-events-none" />
      
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-red-900/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/6aaa4688-5762-4d13-96c1-778a00a8f135.jpg" 
                alt="Lyrium Logo" 
                className="w-12 h-12 rounded-lg border-2 border-red-500 animate-glow"
              />
              <span className="text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
                LYRIUM
              </span>
            </div>
            
            <div className="flex gap-2 md:gap-4">
              <Button 
                onClick={handleChat}
                variant="outline" 
                size="sm"
                className="border-red-500/50 text-red-500 hover:bg-red-500/10"
              >
                <Icon name="MessageCircle" size={16} className="mr-1 md:mr-2" />
                <span className="hidden sm:inline">Чат сервера</span>
                <span className="sm:hidden">Чат</span>
              </Button>
              <Button 
                onClick={handleRules}
                variant="outline" 
                size="sm"
                className="border-red-500/50 text-red-500 hover:bg-red-500/10 transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
              >
                <Icon name="Book" size={16} className="mr-1 md:mr-2" />
                Правила
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative pt-20">
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse-red" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse-red" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="container mx-auto px-4 py-16 relative">
            <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
              <div className="text-center space-y-6">
                <div className="inline-block">
                  <img 
                    src="https://cdn.poehali.dev/files/6aaa4688-5762-4d13-96c1-778a00a8f135.jpg" 
                    alt="Lyrium Server Logo" 
                    className="w-48 h-48 mx-auto rounded-2xl border-4 border-red-500 shadow-2xl shadow-red-500/50 animate-float"
                  />
                </div>
                
                <h1 className="text-7xl md:text-9xl font-heading font-black tracking-tight">
                  <span className="bg-gradient-to-b from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                    LYRIUM
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                  Лучший приватный сервер в Minecraft с валютой и магазинами! Доброе комьюнити только у нас!
                </p>

                <div className="inline-block mt-4">
                  <Badge className="bg-red-500/20 text-red-400 border border-red-500/50 text-lg px-4 py-2">
                    Версия: 1.17
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                  <div className="bg-gradient-to-r from-red-950/50 to-black border-2 border-red-500/30 rounded-xl px-8 py-4 font-mono text-xl backdrop-blur-sm">
                    <div className="text-red-500 text-sm mb-1">IP АДРЕС СЕРВЕРА:</div>
                    <div className="text-white font-bold">LyriumMine.aternos.me:19305</div>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={copyIP}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg px-8 py-6 shadow-lg shadow-red-500/50 animate-scale-in transition-all hover:scale-110 hover:shadow-2xl hover:shadow-red-500/60"
                  >
                    <Icon name={copied ? "Check" : "Copy"} size={20} className="mr-2" />
                    {copied ? 'Скопировано!' : 'Копировать IP'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-5xl font-heading font-bold">
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Донат привилегии
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Поддержи сервер и получи эксклюзивные возможности
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto mb-12">
            <Card className="relative bg-gradient-to-br from-gray-900 via-purple-950/30 to-black border-2 border-purple-500/50 overflow-hidden group hover:scale-110 transition-all duration-300 animate-fade-in shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/40">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Minecraft particles */}
              <div className="minecraft-particle text-purple-400" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>◆</div>
              <div className="minecraft-particle text-purple-300" style={{ top: '25%', right: '8%', animationDelay: '0.5s' }}>✦</div>
              <div className="minecraft-particle text-purple-500" style={{ bottom: '30%', left: '3%', animationDelay: '1s' }}>▣</div>
              <div className="minecraft-particle text-purple-400" style={{ bottom: '15%', right: '5%', animationDelay: '1.5s' }}>◈</div>
              <div className="minecraft-particle text-purple-300" style={{ top: '40%', left: '2%', animationDelay: '2s' }}>❖</div>
              <div className="minecraft-particle text-purple-500" style={{ top: '60%', right: '3%', animationDelay: '2.5s' }}>♦</div>
              <CardContent className="p-6 space-y-4 relative z-10">
                <div className="text-center">
                  <div className="minecraft-frame text-purple-500">
                    <img 
                      src="https://cdn.poehali.dev/files/529276fb-e401-4762-8426-dfeb7dccfc39.jpg" 
                      alt="Premium" 
                      className="w-full h-48 object-contain rounded-xl border-2 border-purple-500 shadow-lg shadow-purple-500/50 mb-4 bg-gradient-to-br from-purple-950/30 to-black relative z-0"
                    />
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/50 mb-2 title-glow">
                    Premium
                  </Badge>
                  <h3 className="text-3xl font-heading font-bold bg-gradient-to-b from-purple-300 to-purple-500 bg-clip-text text-transparent">45₽</h3>
                  <p className="text-gray-400 text-sm">навсегда</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Префикс ❊ в чате</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Доступ к /tpa</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Особый кит</span>
                  </div>
                </div>

                <Button 
                  onClick={handleDonate}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-5 shadow-lg shadow-purple-500/50"
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Купить Premium
                </Button>
              </CardContent>
            </Card>

            <Card className="relative bg-gradient-to-br from-gray-900 via-purple-950/30 to-black border-2 border-purple-500/50 overflow-hidden group hover:scale-110 transition-all duration-300 animate-fade-in shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/40" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full blur-3xl" />
              {/* Minecraft particles */}
              <div className="minecraft-particle text-purple-400" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>▣</div>
              <div className="minecraft-particle text-purple-300" style={{ top: '20%', right: '8%', animationDelay: '0.5s' }}>⛏</div>
              <div className="minecraft-particle text-purple-500" style={{ bottom: '30%', left: '3%', animationDelay: '1s' }}>▦</div>
              <div className="minecraft-particle text-purple-400" style={{ bottom: '15%', right: '5%', animationDelay: '1.5s' }}>⚒</div>
              <div className="minecraft-particle text-purple-300" style={{ top: '40%', left: '2%', animationDelay: '2s' }}>■</div>
              <div className="minecraft-particle text-purple-500" style={{ top: '60%', right: '3%', animationDelay: '2.5s' }}>▨</div>
              <CardContent className="p-6 space-y-4 relative z-10">
                <div className="text-center">
                  <div className="minecraft-frame text-purple-500">
                    <img 
                      src="https://cdn.poehali.dev/files/21c9c387-c6a4-4cc7-b30b-47e8cab985c3.jpg" 
                      alt="Строитель" 
                      className="w-full h-48 object-contain rounded-xl border-2 border-purple-500 shadow-lg shadow-purple-500/50 mb-4 bg-gradient-to-br from-purple-950/30 to-black relative z-0"
                    />
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-500/30 to-purple-600/30 text-purple-300 border-2 border-purple-400/60 mb-2 text-base font-bold shadow-lg title-glow">
                    Строитель
                  </Badge>
                  <h3 className="text-3xl font-heading font-bold bg-gradient-to-b from-purple-300 to-purple-500 bg-clip-text text-transparent">125₽</h3>
                  <p className="text-gray-400 text-sm">навсегда</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Префикс ☐</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Эксклюзивные блоки</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Режим полёта</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">WorldEdit лайт</span>
                  </div>
                </div>

                <Button 
                  onClick={handleDonate}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-5 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all hover:scale-105"
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Купить Строитель
                </Button>
              </CardContent>
            </Card>

            <Card className="relative bg-gradient-to-br from-gray-900 via-red-950/30 to-black border-2 border-red-500/50 overflow-hidden group hover:scale-110 transition-all duration-300 animate-fade-in shadow-xl shadow-red-500/20 hover:shadow-2xl hover:shadow-red-500/40" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 rounded-full blur-3xl" />
              {/* Minecraft particles */}
              <div className="minecraft-particle text-red-400" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>⚔</div>
              <div className="minecraft-particle text-red-300" style={{ top: '25%', right: '8%', animationDelay: '0.5s' }}>⛨</div>
              <div className="minecraft-particle text-red-500" style={{ bottom: '30%', left: '3%', animationDelay: '1s' }}>☠</div>
              <div className="minecraft-particle text-red-400" style={{ bottom: '15%', right: '5%', animationDelay: '1.5s' }}>⚡</div>
              <div className="minecraft-particle text-red-300" style={{ top: '40%', left: '2%', animationDelay: '2s' }}>✹</div>
              <div className="minecraft-particle text-red-500" style={{ top: '60%', right: '3%', animationDelay: '2.5s' }}>⚑</div>
              <CardContent className="p-6 space-y-4 relative z-10">
                <div className="text-center">
                  <div className="minecraft-frame text-red-500">
                    <img 
                      src="https://cdn.poehali.dev/files/8f712e9d-950b-4e99-a7b9-4585b3c48f76.jpg" 
                      alt="Воин" 
                      className="w-full h-48 object-contain rounded-xl border-2 border-red-500 shadow-lg shadow-red-500/50 mb-4 bg-gradient-to-br from-red-950/30 to-black relative z-0"
                    />
                  </div>
                  <Badge className="bg-gradient-to-r from-red-500/30 to-red-600/30 text-red-300 border-2 border-red-400/60 mb-2 text-base font-bold shadow-lg title-glow">
                    Воин
                  </Badge>
                  <h3 className="text-3xl font-heading font-bold bg-gradient-to-b from-red-300 to-red-500 bg-clip-text text-transparent">98₽</h3>
                  <p className="text-gray-400 text-sm">навсегда</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Префикс ☭ в чате</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Уникальный кит</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Уникальный меч</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-red-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Уникальные команды</span>
                  </div>
                </div>

                <Button 
                  onClick={handleDonate}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-5 shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 transition-all hover:scale-105"
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Купить Воин
                </Button>
              </CardContent>
            </Card>

            <Card className="relative bg-gradient-to-br from-gray-900 via-blue-950/30 to-black border-2 border-blue-500/50 overflow-hidden group hover:scale-110 transition-all duration-300 animate-fade-in shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full blur-3xl" />
              {/* Minecraft particles */}
              <div className="minecraft-particle text-blue-400" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>≋</div>
              <div className="minecraft-particle text-blue-300" style={{ top: '25%', right: '8%', animationDelay: '0.5s' }}>🔱</div>
              <div className="minecraft-particle text-blue-500" style={{ bottom: '30%', left: '3%', animationDelay: '1s' }}>◉</div>
              <div className="minecraft-particle text-blue-400" style={{ bottom: '15%', right: '5%', animationDelay: '1.5s' }}>⊙</div>
              <div className="minecraft-particle text-blue-300" style={{ top: '40%', left: '2%', animationDelay: '2s' }}>◎</div>
              <div className="minecraft-particle text-blue-500" style={{ top: '60%', right: '3%', animationDelay: '2.5s' }}>⚓</div>
              <CardContent className="p-6 space-y-4 relative z-10">
                <div className="text-center">
                  <div className="minecraft-frame text-blue-500">
                    <img 
                      src="https://cdn.poehali.dev/files/cbd7462c-d182-41c6-8685-c9202d5ce61b.jpg" 
                      alt="Посейдон" 
                      className="w-full h-48 object-contain rounded-xl border-2 border-blue-500 shadow-lg shadow-blue-500/50 mb-4 bg-gradient-to-br from-blue-950/30 to-black relative z-0"
                    />
                  </div>
                  <Badge className="bg-gradient-to-r from-blue-500/30 to-blue-600/30 text-blue-300 border-2 border-blue-400/60 mb-2 text-base font-bold shadow-lg title-glow">
                    Посейдон
                  </Badge>
                  <h3 className="text-3xl font-heading font-bold bg-gradient-to-b from-blue-300 to-blue-500 bg-clip-text text-transparent">1,599₽</h3>
                  <p className="text-gray-400 text-sm">навсегда</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Префикс ✮</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Водные способности</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Дыхание под водой</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Трезубец Посейдона</span>
                  </div>
                </div>

                <Button 
                  onClick={handleDonate}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-5 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all hover:scale-105"
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Купить Посейдон
                </Button>
              </CardContent>
            </Card>

            <Card className="relative bg-gradient-to-br from-gray-900 via-yellow-950/30 to-black border-2 border-yellow-500/50 overflow-hidden group hover:scale-110 transition-all duration-300 animate-fade-in shadow-xl shadow-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-500/40" style={{ animationDelay: '0.5s' }}>
              <div className="absolute top-0 right-0 z-20">
                <Badge className="bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0 rounded-tl-none rounded-br-none px-3 py-1 text-xs">
                  ТОП
                </Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-500/20 rounded-full blur-3xl" />
              {/* Minecraft particles */}
              <div className="minecraft-particle text-yellow-400" style={{ top: '15%', left: '5%', animationDelay: '0s' }}>▲</div>
              <div className="minecraft-particle text-yellow-300" style={{ top: '25%', right: '8%', animationDelay: '0.5s' }}>✦</div>
              <div className="minecraft-particle text-yellow-500" style={{ bottom: '30%', left: '3%', animationDelay: '1s' }}>♔</div>
              <div className="minecraft-particle text-yellow-400" style={{ bottom: '15%', right: '5%', animationDelay: '1.5s' }}>✹</div>
              <div className="minecraft-particle text-yellow-300" style={{ top: '40%', left: '2%', animationDelay: '2s' }}>◊</div>
              <div className="minecraft-particle text-yellow-500" style={{ top: '60%', right: '3%', animationDelay: '2.5s' }}>◈</div>
              <CardContent className="p-6 space-y-4 relative z-10">
                <div className="text-center">
                  <div className="minecraft-frame text-yellow-500">
                    <img 
                      src="https://cdn.poehali.dev/files/38fb2a9a-f34f-4440-875f-1069d481d322.jpg" 
                      alt="EveryFly" 
                      className="w-full h-48 object-contain rounded-xl border-2 border-yellow-500 shadow-lg shadow-yellow-500/50 mb-4 bg-gradient-to-br from-yellow-950/30 to-black relative z-0"
                    />
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 text-yellow-300 border-2 border-yellow-400/60 mb-2 text-base font-bold shadow-lg title-glow">
                    EveryFly
                  </Badge>
                  <h3 className="text-3xl font-heading font-bold bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent">1,799₽</h3>
                  <p className="text-gray-400 text-sm">навсегда</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Префикс ➹</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Королевские крылья</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Эффекты полёта</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Эксклюзивные зоны</span>
                  </div>
                </div>

                <Button 
                  onClick={handleDonate}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-5 shadow-lg shadow-yellow-500/50 hover:shadow-xl hover:shadow-yellow-500/60 transition-all hover:scale-105"
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Купить EveryFly
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-red-950/30 to-black border-2 border-red-500/30">
            <CardContent className="p-8">
              <div className="flex gap-4">
                <Icon name="Info" size={24} className="text-red-500 flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-xl text-white">Информация о донате</h3>
                  <div className="space-y-2 text-gray-400">
                    <p>• После нажатия кнопки вы будете перенаправлены в Telegram чат @LyriumMine</p>
                    <p>• Все привилегии выдаются администратором после подтверждения оплаты</p>
                    <p>• Донат не даёт преимущества в PvP, только уникальные возможности</p>
                    <p>• Поддержка: свяжитесь с администрацией в Telegram</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>



        <section className="container mx-auto px-4 py-16">
          <MinecraftGame />
        </section>

        <section className="container mx-auto px-4 py-16">
          <ModeratorApplication />
        </section>
      </main>

      <footer className="relative border-t border-red-900/30 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="https://cdn.poehali.dev/files/6aaa4688-5762-4d13-96c1-778a00a8f135.jpg" 
              alt="Lyrium" 
              className="w-8 h-8 rounded border border-red-500/50"
            />
            <span className="text-xl font-heading font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              LYRIUM
            </span>
          </div>
          <p className="text-gray-500">© 2025 Lyrium Server. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}