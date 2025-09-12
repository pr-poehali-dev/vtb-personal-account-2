import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  // Данные вклада
  const depositData = {
    accountHolder: "Сидоров Виталий Александрович",
    depositType: "Вклад \"В плюсе\"",
    amount: 1000000,
    interestRate: 18.5,
    startDate: "10.07.2025",
    endDate: "11.11.2025",
    term: 4, // месяцев
  };

  const progressPercentage = 10; // Условно 10% срока прошло

  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      {/* Заголовок */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Building2" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ВТБ</h1>
              <p className="text-white/70">Личный кабинет</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-900/20 text-green-400 border-green-800">
            Активен
          </Badge>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="PieChart" size={16} className="mr-2" />
              Обзор вклада
            </TabsTrigger>
            <TabsTrigger value="history" className="text-white data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="History" size={16} className="mr-2" />
              История операций
            </TabsTrigger>
            <TabsTrigger value="support" className="text-white data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="Headphones" size={16} className="mr-2" />
              Служба поддержки
            </TabsTrigger>
          </TabsList>

          {/* Обзор вклада */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Основная информация о вкладе */}
              <Card className="lg:col-span-2 bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Wallet" size={20} />
                    {depositData.depositType}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {depositData.accountHolder}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-white/70 mb-1">Сумма вклада</p>
                      <p className="text-3xl font-bold text-white">
                        {depositData.amount.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-white/70 mb-1">Процентная ставка</p>
                      <p className="text-3xl font-bold text-primary">
                        {depositData.interestRate}%
                      </p>
                    </div>
                  </div>
                  
                  <Separator className="bg-border" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Дата открытия</span>
                      <span className="text-white font-medium">{depositData.startDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Дата окончания</span>
                      <span className="text-white font-medium">{depositData.endDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Срок вклада</span>
                      <span className="text-white font-medium">{depositData.term} месяца</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Прогресс срока вклада</span>
                      <span className="text-white">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="w-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Боковая панель с дополнительной информацией */}
              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Доходность</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <p className="text-2xl font-bold text-primary">0 ₽</p>
                      <p className="text-sm text-white/70">Начисленные проценты</p>
                      <p className="text-xs text-white/50">Проценты будут начисляться по окончании срока</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Контакты</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Icon name="Phone" size={16} className="mr-2" />
                      8 800 100-24-24
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Онлайн-чат
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* История операций */}
          <TabsContent value="history" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-white">История операций</CardTitle>
                <CardDescription className="text-white/70">
                  Все операции по вкладу
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-900/20 flex items-center justify-center">
                        <Icon name="ArrowDownLeft" size={16} className="text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Поступление на вклад</p>
                        <p className="text-sm text-white/70">10.07.2025</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">+{depositData.amount.toLocaleString('ru-RU')} ₽</p>
                      <p className="text-sm text-white/70">Зачисление</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Служба поддержки */}
          <TabsContent value="support" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-white">Контакты поддержки</CardTitle>
                  <CardDescription className="text-white/70">
                    Мы готовы помочь 24/7
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30">
                    <Icon name="Phone" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium text-white">Горячая линия</p>
                      <p className="text-white/70">8 800 100-24-24</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30">
                    <Icon name="MessageCircle" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium text-white">Онлайн-чат</p>
                      <p className="text-white/70">Доступен в приложении</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/30">
                    <Icon name="Mail" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <p className="text-white/70">support@vtb.ru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-white">Часто задаваемые вопросы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="font-medium text-white text-sm">Когда начисляются проценты?</p>
                    <p className="text-xs text-white/70 mt-1">Проценты по вкладу "В плюсе" начисляются в конце срока</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="font-medium text-white text-sm">Можно ли пополнить вклад?</p>
                    <p className="text-xs text-white/70 mt-1">Вклад "В плюсе" не предусматривает пополнения</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="font-medium text-white text-sm">Досрочное закрытие</p>
                    <p className="text-xs text-white/70 mt-1">При досрочном закрытии проценты не начисляются</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;