import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center animate-glow">
                <span className="text-2xl">⚡</span>
              </div>
              <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Lyrium
              </span>
            </div>
            
            <div className="hidden md:flex gap-6">
              {['home', 'donate', 'rules'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`font-medium transition-all ${
                    activeSection === section
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section === 'home' ? 'Главная' : section === 'donate' ? 'Донат' : 'Правила'}
                </button>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Icon name="Users" size={16} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {activeSection === 'home' && <HomeSection />}
        {activeSection === 'donate' && <DonateSection />}
        {activeSection === 'rules' && <RulesSection />}
      </main>

      <footer className="mt-20 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Lyrium Server. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

function HomeSection() {
  const stats = [
    { label: 'Игроков онлайн', value: '248', icon: 'Users' },
    { label: 'Всего игроков', value: '12,847', icon: 'TrendingUp' },
    { label: 'Аптайм', value: '99.9%', icon: 'Zap' },
  ];

  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Icon name="Sparkles" size={14} className="mr-1" />
              Версия 1.20.1
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-heading font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Lyrium
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Погрузись в уникальный мир приключений, кастомных механик и дружного комьюнити
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-card border border-border rounded-lg px-6 py-3 font-mono text-lg">
                play.lyrium.ru
              </div>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 animate-scale-in">
                <Icon name="Copy" size={18} className="mr-2" />
                Копировать IP
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name={stat.icon as any} size={24} className="text-primary" />
                </div>
                <p className="text-3xl font-heading font-bold">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <Card className="border-border bg-gradient-to-br from-card to-primary/5 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-heading font-bold">Присоединяйся к Discord</h2>
                <p className="text-muted-foreground text-lg">
                  Общайся с игроками, участвуй в событиях и получай актуальные новости сервера
                </p>
                <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4]">
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  Открыть Discord
                </Button>
              </div>
              <div className="w-full md:w-auto">
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium">1,847 участников онлайн</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                    <span className="text-muted-foreground">3,254 всего участников</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-heading font-bold">Особенности сервера</h2>
          <p className="text-muted-foreground text-lg">Что делает Lyrium уникальным</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'Sword', title: 'Кастомные предметы', desc: 'Уникальное оружие и броня' },
            { icon: 'Coins', title: 'Экономика', desc: 'Развитая система торговли' },
            { icon: 'Castle', title: 'Приватные территории', desc: 'Защити свои постройки' },
            { icon: 'Trophy', title: 'Ивенты', desc: 'Еженедельные мероприятия' },
          ].map((feature, index) => (
            <Card key={index} className="border-border bg-card/50 hover:bg-card transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon name={feature.icon as any} size={24} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function DonateSection() {
  const packages = [
    {
      name: 'VIP',
      price: '199₽',
      period: 'месяц',
      features: ['Префикс [VIP]', 'Доступ к /fly', '5 приватных зон', 'Цветной ник'],
      popular: false,
    },
    {
      name: 'Premium',
      price: '399₽',
      period: 'месяц',
      features: ['Префикс [PREMIUM]', 'Доступ к /fly и /tp', '15 приватных зон', 'Кастомные эффекты', 'Приоритет в очереди'],
      popular: true,
    },
    {
      name: 'Legend',
      price: '699₽',
      period: 'месяц',
      features: ['Префикс [LEGEND]', 'Все команды Premium', '50 приватных зон', 'Уникальные скины', 'Доступ к эксклюзивным ивентам', 'Личный NPC'],
      popular: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-5xl font-heading font-bold">Донат привилегии</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Поддержи развитие сервера и получи уникальные возможности
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packages.map((pkg, index) => (
          <Card 
            key={index} 
            className={`relative border-2 transition-all hover:scale-105 animate-fade-in ${
              pkg.popular 
                ? 'border-primary bg-gradient-to-b from-primary/10 to-card' 
                : 'border-border bg-card'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-secondary">
                  Популярный
                </Badge>
              </div>
            )}
            
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-heading font-bold">{pkg.name}</h3>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-heading font-bold">{pkg.price}</span>
                  <span className="text-muted-foreground mb-1">/ {pkg.period}</span>
                </div>
              </div>

              <div className="space-y-3">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${
                  pkg.popular 
                    ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                Купить {pkg.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-4xl mx-auto border-border bg-card/50">
        <CardContent className="p-8">
          <h3 className="text-2xl font-heading font-bold mb-4">Информация о донате</h3>
          <div className="space-y-2 text-muted-foreground">
            <p>• Все привилегии активируются автоматически после оплаты</p>
            <p>• Возврат средств возможен в течение 24 часов при технических проблемах</p>
            <p>• Донат не дает преимущества в PvP, только качество жизни</p>
            <p>• Поддержка доната: support@lyrium.ru</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RulesSection() {
  const ruleCategories = [
    {
      title: 'Общие правила',
      icon: 'Book',
      rules: [
        'Уважительное отношение ко всем игрокам',
        'Запрещены оскорбления, мат и токсичное поведение',
        'Запрещена реклама других серверов',
        'Один аккаунт на одного игрока',
      ],
    },
    {
      title: 'Игровой процесс',
      icon: 'Gamepad2',
      rules: [
        'Запрещено использование читов и модификаций',
        'Гриферство запрещено на приватных территориях',
        'Использование багов карается баном',
        'Читерские текстурпаки запрещены (X-Ray и т.п.)',
      ],
    },
    {
      title: 'Постройки',
      icon: 'Home',
      rules: [
        'Постройки должны быть приватизированы',
        'Запрещено строить слишком близко к чужим постройкам',
        'Лагающие фермы подлежат удалению',
        'Неактивные базы (60+ дней) могут быть удалены',
      ],
    },
    {
      title: 'Торговля',
      icon: 'ShoppingCart',
      rules: [
        'Запрещен обман при торговле',
        'Цены должны быть адекватными',
        'Запрещена продажа игровых ценностей за реальные деньги',
        'Все споры решаются администрацией',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-5xl font-heading font-bold">Правила сервера</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Соблюдение правил обязательно для всех игроков
        </p>
      </div>

      <Tabs defaultValue="all" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="all">Все</TabsTrigger>
          {ruleCategories.map((cat, i) => (
            <TabsTrigger key={i} value={cat.title}>{cat.title.split(' ')[0]}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {ruleCategories.map((category, index) => (
            <Card key={index} className="border-border bg-card/50 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon name={category.icon as any} size={20} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold">{category.title}</h3>
                </div>
                <ul className="space-y-2 ml-13">
                  {category.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Icon name="ChevronRight" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {ruleCategories.map((category, index) => (
          <TabsContent key={index} value={category.title}>
            <Card className="border-border bg-card/50">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon name={category.icon as any} size={24} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <Icon name="CheckCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-lg">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="max-w-4xl mx-auto border-destructive/50 bg-destructive/5">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Icon name="AlertTriangle" size={24} className="text-destructive flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-lg">Важно!</h3>
              <p className="text-muted-foreground">
                Незнание правил не освобождает от ответственности. За серьезные нарушения выдается бан без предупреждения.
                Повторные нарушения увеличивают срок наказания.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
