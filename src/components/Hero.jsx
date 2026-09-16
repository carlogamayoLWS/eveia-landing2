import heroBg from '../assets/hero-bg.png'

export default function Hero() {
  return (
    <header
      className="hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <p className="eyebrow">YOUR PRIVATE ENTERPRISE AI</p>
      <h1 className="logo-mark">Eveia.AI</h1>
      <p className="tagline"><span className="t1">MOVE YOUR TEAM</span> <span className="t2">FORWARD</span></p>
      <p className="hero-desc">Turn your organization's knowledge into<br />instant answers, reports, and proposals in minutes.</p>
      <div className="hero-ctas">
        <a className="btn btn-primary" href="#">Request a Private Demo</a>
        <a className="btn btn-secondary" href="#">Send us a message</a>
      </div>
    </header>
  )
}
