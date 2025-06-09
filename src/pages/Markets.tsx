
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const Markets = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useEffect(() => {
    // Simulate market data - in production, this would come from a real API
    const generateMarketData = () => {
      const stocks = [
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.' },
        { symbol: 'MSFT', name: 'Microsoft Corp.' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.' },
        { symbol: 'TSLA', name: 'Tesla Inc.' },
        { symbol: 'META', name: 'Meta Platforms Inc.' },
        { symbol: 'NVDA', name: 'NVIDIA Corp.' },
        { symbol: 'NFLX', name: 'Netflix Inc.' }
      ];

      return stocks.map(stock => {
        const basePrice = Math.random() * 300 + 50;
        const change = (Math.random() - 0.5) * 20;
        const changePercent = (change / basePrice) * 100;

        return {
          ...stock,
          price: parseFloat(basePrice.toFixed(2)),
          change: parseFloat(change.toFixed(2)),
          changePercent: parseFloat(changePercent.toFixed(2))
        };
      });
    };

    setMarketData(generateMarketData());

    // Update market data every 30 seconds
    const interval = setInterval(() => {
      setMarketData(generateMarketData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold neon-text mb-2">Market Data</h1>
          <p className="text-foreground/70">
            Live trading information and market trends
          </p>
        </div>

        <div className="grid gap-6">
          {marketData.map((stock) => (
            <Card key={stock.symbol} className="glass-effect border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{stock.symbol}</h3>
                      <p className="text-foreground/60">{stock.name}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold">${stock.price}</p>
                    <div className={`flex items-center gap-1 ${
                      stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stock.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{stock.change >= 0 ? '+' : ''}{stock.change}</span>
                      <span>({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-foreground/60">
            Market data updates every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Markets;
