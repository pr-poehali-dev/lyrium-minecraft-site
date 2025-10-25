import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function ModeratorApplication() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    age: '',
    experience: '',
    cheater: '',
    rights: '',
    time: ''
  });
  const [application, setApplication] = useState('');
  const [copied, setCopied] = useState(false);

  const questions = [
    { key: 'age', question: 'Сколько вам лет?', placeholder: 'Например: 18' },
    { key: 'experience', question: 'Есть ли у вас опыт модерации?', placeholder: 'Расскажите о вашем опыте' },
    { key: 'cheater', question: 'Что вы сделаете, если увидите читера?', placeholder: 'Опишите ваши действия' },
    { key: 'rights', question: 'Как вы будете использовать права модератора?', placeholder: 'Расскажите о принципах работы' },
    { key: 'time', question: 'Сколько времени вы можете уделять серверу в день?', placeholder: 'Например: 3-4 часа' }
  ];

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[currentStep];
    setAnswers(prev => ({ ...prev, [currentQuestion.key]: value }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateApplication();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateApplication = () => {
    const message = `🎮 ЗАЯВКА НА МОДЕРАТОРА LYRIUM

👤 Возраст: ${answers.age}

📋 Опыт модерации: ${answers.experience}

🛡️ Действия при обнаружении читера: ${answers.cheater}

⚖️ Использование прав модератора: ${answers.rights}

⏰ Время онлайн в день: ${answers.time}`;

    setApplication(message);
    setCurrentStep(questions.length);
  };

  const copyApplication = () => {
    navigator.clipboard.writeText(application);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({
      age: '',
      experience: '',
      cheater: '',
      rights: '',
      time: ''
    });
    setApplication('');
    setCopied(false);
  };

  const currentQuestion = questions[currentStep];
  const currentAnswer = currentQuestion ? answers[currentQuestion.key as keyof typeof answers] : '';

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500/30">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Icon name="Shield" size={32} className="text-red-500" />
            <h3 className="text-2xl font-heading font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Заявка на модератора
            </h3>
          </div>

          {currentStep < questions.length ? (
            <>
              <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm">
                    Вопрос {currentStep + 1} из {questions.length}
                  </span>
                  <div className="flex gap-1">
                    {questions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index <= currentStep ? 'bg-red-500' : 'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-white text-lg font-medium mb-4">
                  {currentQuestion.question}
                </p>

                <textarea
                  value={currentAnswer}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full px-4 py-3 bg-black border border-red-500/50 rounded text-white placeholder-gray-500 focus:outline-none focus:border-red-500 resize-none h-32"
                  maxLength={500}
                />
                <p className="text-gray-500 text-xs mt-1 text-right">
                  {currentAnswer.length}/500
                </p>
              </div>

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500/10"
                  >
                    <Icon name="ArrowLeft" size={18} className="mr-2" />
                    Назад
                  </Button>
                )}
                <Button
                  onClick={nextStep}
                  disabled={!currentAnswer.trim()}
                  className={`flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed ${
                    currentStep === 0 ? 'w-full' : ''
                  }`}
                >
                  {currentStep === questions.length - 1 ? (
                    <>
                      <Icon name="Check" size={18} className="mr-2" />
                      Создать заявку
                    </>
                  ) : (
                    <>
                      Далее
                      <Icon name="ArrowRight" size={18} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-4 space-y-3">
                <Icon name="CheckCircle" size={48} className="text-green-500 mx-auto" />
                <p className="text-green-400 font-bold text-lg">
                  Ваша заявка готова!
                </p>
                <div className="bg-black border border-red-500/30 rounded-lg p-4 text-left">
                  <pre className="text-white text-sm whitespace-pre-wrap font-sans">
                    {application}
                  </pre>
                </div>
              </div>

              <Button
                onClick={copyApplication}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600"
              >
                <Icon name={copied ? "Check" : "Copy"} size={18} className="mr-2" />
                {copied ? 'Скопировано!' : 'Скопировать заявку'}
              </Button>

              <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
                <p className="text-white text-sm">
                  📱 Отправьте это сообщение в{' '}
                  <a
                    href="https://t.me/LyriumMine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 underline font-medium"
                  >
                    @LyriumMine
                  </a>
                  {' '}и ждите ответа от администрации!
                </p>
              </div>

              <Button
                onClick={reset}
                variant="outline"
                className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10"
              >
                <Icon name="RotateCcw" size={18} className="mr-2" />
                Создать новую заявку
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
