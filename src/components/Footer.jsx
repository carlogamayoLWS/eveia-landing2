import { Link } from 'react-router-dom'
import footerLogo from '../assets/footer-logo.png'

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      {/* Ambient Gradient Glows */}
      <div className="footer-ambient-left" aria-hidden="true" />
      <div className="footer-ambient-right" aria-hidden="true" />

      <div className="footer-container">
        <div className="footer-top">
          {/* Col 1: Brand Info & Socials */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <img
                src={footerLogo}
                alt="Eveia.AI logo"
                className="footer-logo-img"
              />
              <span className="footer-brand-name">Eveia.AI</span>
            </div>

            <p className="footer-tagline">
              Your Private Enterprise AI. Built to
              <br />
              help your team complete work faster.
            </p>

            <p className="footer-sub">
              A product of{' '}
              <a
                href="https://lightweightsolutions.com"
                target="_blank"
                rel="noreferrer"
                className="footer-link-underline"
              >
                Lightweight Solutions
              </a>
            </p>

            <div className="footer-socials">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="footer-social-btn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="footer-social-btn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="#instagram"
                aria-label="Instagram"
                className="footer-social-btn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="footer-col">
            <h4 className="footer-col-title">Product</h4>
            <ul className="footer-links">
              <li><a href="#blog">Blog</a></li>
              <li><Link to="/">What is Eveia.AI</Link></li>
              <li><Link to="/reports">AI Report Generation</Link></li>
              <li><Link to="/proposals">Proposal Drafting</Link></li>
              <li><Link to="/#pricing">Pricing</Link></li>
              <li><a href="#request-demo">Request a Private Demo</a></li>
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="mailto:inquiry@eveia.ai">inquiry@eveia.ai</a></li>
            </ul>
          </div>

          {/* Col 4: Get in Touch */}
          <div className="footer-col footer-col-touch">
            <h4 className="footer-col-title">Get in Touch</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon">✉</span>
                <a href="mailto:inquiry@eveia.ai">inquiry@eveia.ai</a>
              </li>
              <li>
                <span className="footer-contact-icon">📞</span>
                <a href="tel:+63915974975">+63 91597 4975</a>
              </li>
              <li>
                <span className="footer-contact-icon">☎</span>
                <a href="tel:0270071075">(02) 7007 1075</a>
              </li>
            </ul>

            <button className="footer-touch-btn">
              Send us a message
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Eveia.AI. All rights reserved.
          </p>
          <p className="footer-brand-motto">
            Private • Trusted • Enterprise AI
          </p>
        </div>
      </div>
    </footer>
  )
}
