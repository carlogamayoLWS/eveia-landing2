const TICKER_ITEMS = [
  'EXECUTIVE SUMMARIES',
  'DECISION-READY REPORTS',
  'INSTANT ANSWERS',
  'PROPOSALS',
]

function TickerGroup() {
  return (
    <div className="ticker-group">
      {TICKER_ITEMS.map((item) => (
        <div className="ticker-item" key={item}>
          <span className="dot"></span>
          {item}
        </div>
      ))}
    </div>
  )
}

export default function TickerSection() {
  return (
    <div className="ticker-track">
      <TickerGroup />
      <TickerGroup />
    </div>
  )
}
