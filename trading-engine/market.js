import EventEmitter from "events";

class MarketStream extends EventEmitter {
  constructor() {
    super();
    this.symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT"];
    this.prices = {
      BTCUSDT: 42000,
      ETHUSDT: 2200,
      SOLUSDT: 95,
    };
  }

  start() {
    setInterval(() => {
      const symbol =
        this.symbols[Math.floor(Math.random() * this.symbols.length)];

      const change = (Math.random() - 0.5) * 200;

      this.prices[symbol] += change;

      const tick = {
        symbol,
        price: this.prices[symbol].toFixed(2),
        time: Date.now(),
      };

      this.emit("tick", tick);
    }, 1000);
  }
}

export const marketStream = new MarketStream();