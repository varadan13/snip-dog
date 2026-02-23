/**
 * Usage — drop useLiveMarketData into any component.
 *
 * The component re-renders at most ~60 times/second (display refresh rate),
 * regardless of how many WebSocket messages arrive per second.
 * No messages are lost — they are buffered, not dropped.
 *
 * Before fix: ~200 re-renders/sec, high CPU
 * After fix:  ~60 re-renders/sec, dramatically lower CPU
 */

function MarketDashboard() {
  const prices = useLiveMarketData();

  return (
    <table>
      <tbody>
        {Object.entries(prices).map(([symbol, price]) => (
          <tr key={symbol}>
            <td>{symbol}</td>
            <td>${price.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
