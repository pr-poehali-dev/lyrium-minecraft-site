import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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
    window.open('https://t.me/+AoYEDChPREJkMjg6', '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-b from-red-950/20 via-black to-black pointer-events-none" />
      
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-red-900/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/6aaa4688-5762-4d13-96c1-778a00a8f135.jpg" 
                alt="Lyrium Logo" 
                className="w-12 h-12 rounded-lg border-2 border-red-500 animate-glow"
              />
              <span className="text-3xl font-heading font-bold bg-gradient-to-r from-red-500 via-red-600 to-red-500 bg-clip-text text-transparent">
                LYRIUM
              </span>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={handleRules}
                variant="outline" 
                className="border-red-500/50 text-red-500 hover:bg-red-500/10"
              >
                <Icon name="Book" size={16} className="mr-2" />
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
                  Лучший приватный сервер с валютой
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                  <div className="bg-gradient-to-r from-red-950/50 to-black border-2 border-red-500/30 rounded-xl px-8 py-4 font-mono text-xl backdrop-blur-sm">
                    <div className="text-red-500 text-sm mb-1">IP АДРЕС СЕРВЕРА:</div>
                    <div className="text-white font-bold">LyriumMine.aternos.me:19305</div>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={copyIP}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg px-8 py-6 shadow-lg shadow-red-500/50 animate-scale-in"
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

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <Card className="relative bg-gradient-to-br from-gray-900 via-blue-950/20 to-black border-2 border-blue-500/30 overflow-hidden group hover:scale-105 transition-all duration-300 animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8 space-y-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/50 mb-3">
                      Посейдон
                    </Badge>
                    <h3 className="text-3xl font-heading font-bold text-white">1,599₽</h3>
                    <p className="text-gray-400">навсегда</p>
                  </div>
                  <img 
                    src="https://cdn.poehali.dev/files/cbd7462c-d182-41c6-8685-c9202d5ce61b.jpg" 
                    alt="Посейдон" 
                    className="w-24 h-24 rounded-xl border-2 border-blue-500 shadow-lg shadow-blue-500/50"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Префикс [ПОСЕЙДОН]</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Уникальные водные способности</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Дыхание под водой</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Трезубец Посейдона</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Быстрое плавание</span>
                  </div>
                </div>

                <Button 
                  onClick={handleDonate}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg py-6 shadow-lg shadow-blue-500/50"
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Купить Посейдон
                </Button>
              </CardContent>
            </Card>

            <Card className="relative bg-gradient-to-br from-gray-900 via-yellow-950/20 to-black border-2 border-yellow-500/30 overflow-hidden group hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="absolute top-0 right-0">
                <Badge className="bg-gradient-to-r from-red-500 to-yellow-500 text-white border-0 rounded-tl-none rounded-br-none px-4 py-2">
                  ТОП ВЫБОР
                </Badge>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8 space-y-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 mb-3">
                      EveryFly
                    </Badge>
                    <h3 className="text-3xl font-heading font-bold text-white">1,799₽</h3>
                    <p className="text-gray-400">навсегда</p>
                  </div>
                  <img 
                    src="https://cdn.poehali.dev/files/38fb2a9a-f34f-4440-875f-1069d481d322.jpg" 
                    alt="EveryFly" 
                    className="w-24 h-24 rounded-xl border-2 border-yellow-500 shadow-lg shadow-yellow-500/50"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Префикс [EVERYFLY]</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Королевские крылья</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Уникальные эффекты полёта</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Доступ к эксклюзивным зонам</span>
                  </div>
                </div>

                <Button 
                  onClick={handleDonate}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold text-lg py-6 shadow-lg shadow-yellow-500/50"
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
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
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-500/20 hover:border-red-500/40 transition-all hover:scale-105">
              <CardContent className="p-6 text-center space-y-3">
                <div className="mx-auto w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                  <Icon name="Users" size={28} className="text-red-500" />
                </div>
                <p className="text-3xl font-heading font-bold text-white">0/20</p>
                <p className="text-gray-400">Игроков онлайн</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-500/20 hover:border-red-500/40 transition-all hover:scale-105">
              <CardContent className="p-6 text-center space-y-3">
                <div className="mx-auto w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                  <Icon name="Zap" size={28} className="text-red-500" />
                </div>
                <p className="text-3xl font-heading font-bold text-white">1.20.1</p>
                <p className="text-gray-400">Версия</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-500/20 hover:border-red-500/40 transition-all hover:scale-105">
              <CardContent className="p-6 text-center space-y-3">
                <div className="mx-auto w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                  <Icon name="Globe" size={28} className="text-red-500" />
                </div>
                <p className="text-3xl font-heading font-bold text-white">RU</p>
                <p className="text-gray-400">Регион</p>
              </CardContent>
            </Card>
          </div>
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