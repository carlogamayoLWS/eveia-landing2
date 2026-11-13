import { useIsMobile } from '../hooks/useIsMobile.js'

const TICKER_ITEMS = [
  'EXECUTIVE SUMMARIES',
  'DECISION-READY REPORTS',
  'INSTANT ANSWERS',
  'PROPOSAL DRAFTING',
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
  const isMobile = useIsMobile()
  const track = (
    <div className="ticker-track">
      <TickerGroup />
      <TickerGroup />
    </div>
  )
  // Phones get a fixed-width band so the edge fade stays put while the track moves.
  return isMobile ? <div className="m-ticker">{track}</div> : track
}
