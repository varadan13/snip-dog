/**
 * ❌ The Problem — state update on every WebSocket message.
 *
 * A system receiving ~200 real-time updates/second calls setState on each one.
 * Each message triggers: state update → re-render → reconciliation → layout recalculation.
 * React does exactly what you asked — just 200 times per second.
 */

function useLiveMarketData() {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const ws = new WebSocket('wss://market-feed.example.com');

    ws.onmessage = (event) => {
      const { symbol, price } = JSON.parse(event.data);

      // Each message = one setState = one full render cycle
      setPrices((prev) => ({ ...prev, [symbol]: price }));
    };

    return () => ws.close();
  }, []);

  return prices;
}
