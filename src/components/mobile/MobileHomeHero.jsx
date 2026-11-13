import heroBg from '../../assets/hero-bg.webp'
import heroShot from '../../assets/reports-chat-ui.webp'
import { MobileIcon } from './MobileIcons.jsx'

// Phone-only home hero. Same copy as the desktop Hero, set as a headline-first fold.
export default function MobileHomeHero() {
  return (
    <header className="m-hero">
      <div className="m-hero-sky" style={{ backgroundImage: `url(${heroBg})` }} aria-hidden="true" />
      <div className="m-hero-glow" aria-hidden="true" />
      <span className="m-chip-eyebrow">
        <i />
        YOUR PRIVATE ENTERPRISE AI
      </span>
      <p className="m-hero-wm">
        Eveia<b>.AI</b>
      </p>
      <h1 className="m-d1">
        Move your
        <br />
        team <span className="m-grad-text">forward.</span>
      </h1>
      <p className="m-lead">
        Turn your organization's knowledge into instant answers, reports, and proposals in minutes.
      </p>
      <a className="m-btn m-btn-primary" href="mailto:inquiry@eveia.ai">
        Request a Private Demo
      </a>
      <a className="m-link-ghost" href="/contact#send-message">
        Send us a message <MobileIcon name="arrow" />
      </a>
      <div className="m-hero-shot">
        <div className="m-shot-frame">
          <img src={heroShot} alt="Eveia.AI generating a board report from company documents" />
        </div>
        <div className="m-float-chip m-fc-a">
          <span className="m-fc-ic">
            <MobileIcon name="doc" />
          </span>
          <span>
            Source-supported
            <br />
            Answers
          </span>
        </div>
        <div className="m-float-chip m-fc-b">
          <span className="m-fc-ic">
            <MobileIcon name="clock" />
          </span>
          <span>
            <small>From Days</small>to Minutes
          </span>
        </div>
      </div>
    </header>
  )
}
