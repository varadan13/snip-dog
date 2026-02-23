/**
 * ✅ The Fix — buffer messages, flush with requestAnimationFrame.
 *
 * bufferRef absorbs all 200 messages/second as plain object mutations (no React involvement).
 * A single setState merges the entire batch at the next animation frame (~60/sec).
 * React does one reconciliation pass instead of 200.
 *
 * Result: UI becomes smooth immediately, CPU usage drops dramatically.
 */

function useLiveMarketData() {
  const [prices, setPrices] = useState<Record<string, number>>({});

  // Buffer accumulates messages between frames
  const bufferRef = useRef<Record<string, number>>({});
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket('wss://market-feed.example.com');

    ws.onmessage = (event) => {
      const { symbol, price } = JSON.parse(event.data);

      // Merge into buffer — no React state touched yet
      bufferRef.current[symbol] = price;

      // Schedule a flush if one isn't already pending
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setPrices((prev) => ({ ...prev, ...bufferRef.current }));
          bufferRef.current = {};
          rafRef.current = null;
        });
      }
    };

    return () => {
      ws.close();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return prices;
}
