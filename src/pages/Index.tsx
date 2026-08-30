import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface CurrencyRate {
  value: number;
  prev: number;
  change: number;
}

interface RatesResponse {
  date: string | null;
  usd: CurrencyRate;
  eur: CurrencyRate;
}

const Index = () => {
  const [rates, setRates] = useState<RatesResponse | null>(null);
  const [ratesLoading, setRatesLoading] = useState(true);

  useEffect(() => {
    fetch("https://functions.poehali.dev/bfada09f-a3f5-4b41-b8df-d2bf21e3ee9d")
      .then((res) => res.json())
      .then((data: RatesResponse) => setRates(data))
      .catch(() => setRates(null))
      .finally(() => setRatesLoading(false));
  }, []);

  // Данные вклада
  const depositData = {
    accountHolder: "Сидоров Виталий Александрович",
    depositType: "Вклад \"В плюсе\"",
    amount: 1179000,
    interestRate: 18.5,
    startDate: "10.07.2025",
    endDate: "11.11.2026",
    term: 16, // месяцев
    accruedInterest: 61600,
    interestDate: "11.07.2026"
  };

  const cardData = {
    cardName: "Мультикарта ВТБ",
    cardNumber: "2200 15** **** 4871",
    balance: 98,
    validThru: "07/29",
    paymentSystem: "МИР"
  };

  const progressPercentage = 50; // Условно 50% срока прошло

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
            <TabsTrigger value="investments" className="text-white data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Инвестиции
            </TabsTrigger>
            <TabsTrigger value="history" className="text-white data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="History" size={16} className="mr-2" />
              История операций
            </TabsTrigger>
          </TabsList>

          {/* Обзор вклада */}
          <TabsContent value="overview" className="space-y-6 mt-6 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 duration-300">
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


                </CardContent>
              </Card>

              {/* Боковая панель с дополнительной информацией */}
              <div className="space-y-6">
                <div className="relative w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-primary to-blue-900 p-5 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center justify-between">
                    <Icon name="Building2" size={24} className="text-white" />
                    <span className="text-white font-semibold text-sm">{cardData.paymentSystem}</span>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs mb-1">Баланс карты</p>
                    <p className="text-white text-2xl font-bold">{cardData.balance.toLocaleString('ru-RU')} ₽</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/70 text-xs mb-1">Номер карты</p>
                      <p className="text-white text-sm font-medium tracking-wider">{cardData.cardNumber}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-xs mb-1">Действует до</p>
                      <p className="text-white text-sm font-medium">{cardData.validThru}</p>
                    </div>
                  </div>
                </div>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Доходность</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <p className="text-2xl font-bold text-primary">61 600 ₽</p>
                      <p className="text-sm text-white/70">Начисленные проценты</p>
                      <p className="text-xs text-white/50">Дата начисления: {depositData.interestDate}</p>
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

          {/* Инвестиции */}
          <TabsContent value="investments" className="space-y-6 mt-6 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <span className="text-2xl">🇺🇸</span>
                    Доллар США
                  </CardTitle>
                  <CardDescription className="text-white/70">USD / RUB</CardDescription>
                </CardHeader>
                <CardContent>
                  {ratesLoading ? (
                    <p className="text-white/50">Загрузка курса...</p>
                  ) : rates ? (
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold text-white">{rates.usd.value.toFixed(2)} ₽</p>
                      <span className={`flex items-center text-sm font-medium ${rates.usd.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                        <Icon name={rates.usd.change >= 0 ? "ArrowUp" : "ArrowDown"} size={14} className="mr-1" />
                        {Math.abs(rates.usd.change).toFixed(2)} ₽
                      </span>
                    </div>
                  ) : (
                    <p className="text-white/50">Курс временно недоступен</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <span className="text-2xl">🇪🇺</span>
                    Евро
                  </CardTitle>
                  <CardDescription className="text-white/70">EUR / RUB</CardDescription>
                </CardHeader>
                <CardContent>
                  {ratesLoading ? (
                    <p className="text-white/50">Загрузка курса...</p>
                  ) : rates ? (
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-bold text-white">{rates.eur.value.toFixed(2)} ₽</p>
                      <span className={`flex items-center text-sm font-medium ${rates.eur.change >= 0 ? "text-green-400" : "text-red-400"}`}>
                        <Icon name={rates.eur.change >= 0 ? "ArrowUp" : "ArrowDown"} size={14} className="mr-1" />
                        {Math.abs(rates.eur.change).toFixed(2)} ₽
                      </span>
                    </div>
                  ) : (
                    <p className="text-white/50">Курс временно недоступен</p>
                  )}
                </CardContent>
              </Card>

              {rates?.date && (
                <p className="md:col-span-2 text-xs text-white/50">
                  Курсы ЦБ РФ на {new Date(rates.date).toLocaleDateString('ru-RU')}
                </p>
              )}
            </div>
          </TabsContent>

          {/* История операций */}
          <TabsContent value="history" className="space-y-6 mt-6 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 duration-300">
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
                        <Icon name="TrendingUp" size={16} className="text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Начисление процентов</p>
                        <p className="text-sm text-white/70">11.07.2026</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-400 whitespace-nowrap">+61 600 ₽</p>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-900/20 flex items-center justify-center">
                        <Icon name="TrendingUp" size={16} className="text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Начисление процентов</p>
                        <p className="text-sm text-white/70">11.03.2026</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-400 whitespace-nowrap">+59 600 ₽</p>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-900/20 flex items-center justify-center">
                        <Icon name="TrendingUp" size={16} className="text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Начисление процентов</p>
                        <p className="text-sm text-white/70">11.11.2025</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-400 whitespace-nowrap">+57 800 ₽</p>
                  </div>
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
                    <p className="font-bold text-green-400 whitespace-nowrap">+1 000 000 ₽</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>
      </div>
    </div>
  );
};

export default Index;