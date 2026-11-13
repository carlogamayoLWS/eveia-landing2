import { Link, NavLink } from 'react-router-dom'
import footerLogo from '../../assets/footer-logo.webp'
import { MobileIcon } from './MobileIcons.jsx'
import { INDUSTRY_LINKS, NEED_LINKS, PRODUCT_LINKS } from './mobileNavLinks.js'

const curClass = ({ isActive }) => (isActive ? 'm-nav-big is-current' : 'm-nav-big')

export function MobileWordmark({ onClick }) {
  return (
    <Link to="/" className="m-wordmark" aria-label="Eveia.AI home" onClick={onClick}>
      <span className="m-wordmark-mark">
        <img src={footerLogo} alt="" />
      </span>
      <span>
        Eveia<b>.AI</b>
      </span>
    </Link>
  )
}

function Accordion({ title, defaultOpen, children }) {
  return (
    <details className="m-nav-group" open={defaultOpen}>
      <summary className="m-nav-big">
        {title}
        <i>
          <MobileIcon name="plus" />
        </i>
      </summary>
      <div className="m-nav-sub">{children}</div>
    </details>
  )
}

export default function MobileMenuDrawer({ open, onClose }) {
  return (
    <nav
      className={`m-drawer${open ? ' is-open' : ''}`}
      aria-label="Main menu"
      aria-hidden={!open}
      inert={open ? undefined : true}
    >
      <div className="m-drawer-top">
        <MobileWordmark onClick={onClose} />
        <button type="button" className="m-icon-btn" aria-label="Close menu" onClick={onClose}>
          <MobileIcon name="close" />
        </button>
      </div>
      <div className="m-drawer-body">
        <NavLink to="/" end className={curClass} onClick={onClose}>
          Home
        </NavLink>
        <Accordion title="Product">
          {PRODUCT_LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={onClose}>
              {l.label}
            </Link>
          ))}
        </Accordion>
        <Accordion title="Solutions" defaultOpen>
          <h6>BY NEED</h6>
          {NEED_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={onClose}>
              {l.label}
            </NavLink>
          ))}
          <h6 className="m-nav-sub-gap">BY INDUSTRY</h6>
          <div className="m-nav-chips">
            {INDUSTRY_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} onClick={onClose}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </Accordion>
        <NavLink to="/data-privacy" className={curClass} onClick={onClose}>
          Data Privacy and AI
        </NavLink>
        <a href="#blog" className="m-nav-big" onClick={onClose}>
          Blog
        </a>
        <NavLink to="/pricing" className={curClass} onClick={onClose}>
          Pricing
        </NavLink>
        <NavLink to="/contact" className={curClass} onClick={onClose}>
          Contact Us
        </NavLink>
      </div>
      <div className="m-drawer-foot">
        <a href="mailto:inquiry@eveia.ai" className="m-btn m-btn-primary" onClick={onClose}>
          Request a Private Demo
        </a>
        <small>inquiry@eveia.ai · (02) 7007 1075</small>
      </div>
    </nav>
  )
}
