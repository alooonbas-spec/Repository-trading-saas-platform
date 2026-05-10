import { EMA } from "technicalindicators";

export function calculateEMA(prices, period) {
  return EMA.calculate({
    period,
    values: prices,
  });
}

export function generateSignal(prices) {
  if (prices.length < 50) return "HOLD";

  const fastEMA = calculateEMA(prices, 9);
  const slowEMA = calculateEMA(prices, 21);

  const lastFast = fastEMA[fastEMA.length - 1];
  const lastSlow = slowEMA[slowEMA.length - 1];

  const prevFast = fastEMA[fastEMA.length - 2];
  const prevSlow = slowEMA[slowEMA.length - 2];

  // bullish crossover
  if (prevFast < prevSlow && lastFast > lastSlow) {
    return "BUY";
  }

  // bearish crossover
  if (prevFast > prevSlow && lastFast < lastSlow) {
    return "SELL";
  }

  return "HOLD";
}