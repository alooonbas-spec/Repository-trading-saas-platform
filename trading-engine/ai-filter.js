import { EMA, RSI } from "technicalindicators";

export function calculateSignalQuality(data) {
  const { prices, volumes } = data;

  if (prices.length < 50) return 0;

  // 1. EMA Trend Score
  const emaFast = EMA.calculate({ period: 9, values: prices });
  const emaSlow = EMA.calculate({ period: 21, values: prices });

  const trend =
    emaFast[emaFast.length - 1] > emaSlow[emaSlow.length - 1] ? 1 : 0;

  // 2. RSI Score
  const rsi = RSI.calculate({ period: 14, values: prices });
  const rsiValue = rsi[rsi.length - 1];

  let rsiScore = 0.5;
  if (rsiValue < 30) rsiScore = 0.8; // oversold
  if (rsiValue > 70) rsiScore = 0.2; // overbought

  // 3. Volume Score
  const avgVolume =
    volumes.reduce((a, b) => a + b, 0) / volumes.length;

  const lastVolume = volumes[volumes.length - 1];
  const volumeScore = lastVolume > avgVolume ? 1 : 0.5;

  // 4. Volatility (простая)
  const returns = prices.slice(-10);
  const volatility =
    Math.max(...returns) - Math.min(...returns);

  const volatilityScore = volatility > 50 ? 0.4 : 0.7;

  // 5. FINAL SCORE (веса)
  const signal_quality =
    trend * 0.35 +
    rsiScore * 0.25 +
    volumeScore * 0.25 +
    volatilityScore * 0.15;

  return Number(signal_quality.toFixed(3));
}