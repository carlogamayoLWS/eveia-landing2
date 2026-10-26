import { useEffect, useState } from 'react'
import logomark from '../assets/app-shot/logomark.png'
import avatarMatt from '../assets/app-shot/avatar-matt.jpg'
import iconChats from '../assets/app-shot/icon-chats.svg'
import iconProjects from '../assets/app-shot/icon-projects.svg'
import iconChat from '../assets/app-shot/icon-chat.svg'
import iconSettings from '../assets/app-shot/icon-settings.svg'
import iconChevron from '../assets/app-shot/icon-chevron.svg'
import iconCaret from '../assets/app-shot/icon-caret.svg'
import iconMore from '../assets/app-shot/icon-more.svg'
import iconCheck from '../assets/app-shot/icon-check.svg'
import iconDownload from '../assets/app-shot/icon-download.svg'

function Icon({ src, alt = '', className }) {
  return (
    <span className={className} aria-hidden="true">
      <img src={src} alt={alt} />
    </span>
  )
}

function BoardReport() {
  const months = [
    { label: 'Jul 2026', revenue: 12.1, profit: 7.2, cost: 4.1 },
    { label: 'Aug 2026', revenue: 15.3, profit: 8.9, cost: 4.8 },
    { label: 'Sep 2026', revenue: 18.4, profit: 10.1, cost: 5.6 },
  ]

  return (
    <div className="rpt">
      <div className="rpt-head">
        <div>
          <h3>Q3 2026 Board Report</h3>
          <p>Summarize the Q3 2026 board report and highlight key risks.</p>
        </div>
        <div className="rpt-period">
          <span>Jul 1 - Sep 30, 2026</span>
          <button type="button" tabIndex={-1}>
            Q3 2026
            <Icon src={iconCaret} className="rpt-caret" />
          </button>
        </div>
      </div>

      <div className="rpt-kpis">
        <article className="rpt-kpi">
          <span className="rpt-kpi-ico rpt-kpi-ico--pink" aria-hidden="true">
            <span className="rpt-bars" />
          </span>
          <div>
            <p>Total Revenue</p>
            <strong>$18.4M</strong>
            <small><b>↑ +14.8%</b> vs. Q2 2026</small>
          </div>
        </article>
        <article className="rpt-kpi">
          <span className="rpt-kpi-ico rpt-kpi-ico--purple" aria-hidden="true">
            <span className="rpt-users" />
          </span>
          <div>
            <p>Active Clients</p>
            <strong>412</strong>
            <small><b>↑ +11.6%</b> vs. Q2 2026</small>
          </div>
        </article>
        <article className="rpt-kpi">
          <span className="rpt-kpi-ico rpt-kpi-ico--blue" aria-hidden="true">
            <span className="rpt-doc" />
          </span>
          <div>
            <p>Total Orders</p>
            <strong>12,842</strong>
            <small><b>↑ +18.2%</b> vs. Q2 2026</small>
          </div>
        </article>
        <article className="rpt-kpi">
          <span className="rpt-kpi-ico rpt-kpi-ico--rose" aria-hidden="true">
            <span className="rpt-userplus" />
          </span>
          <div>
            <p>New Customers</p>
            <strong>2,350</strong>
            <small><b>↑ +20.1%</b> vs. Q2 2026</small>
          </div>
        </article>
      </div>

      <div className="rpt-body">
        <section className="rpt-chart">
          <div className="rpt-chart-top">
            <h4>Financial Performance</h4>
            <ul>
              <li><i className="dot-rev" /> Revenue</li>
              <li><i className="dot-profit" /> Profit</li>
              <li><i className="dot-cost" /> Operating Cost</li>
            </ul>
          </div>
          <div className="rpt-plot">
            <div className="rpt-y">
              <span>$20M</span>
              <span>$15M</span>
              <span>$10M</span>
              <span>$5M</span>
              <span>$0</span>
            </div>
            <div className="rpt-grid" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
            <div className="rpt-cols">
              {months.map((m) => (
                <div className="rpt-col" key={m.label}>
                  <div className="rpt-bars-group">
                    <div className="rpt-bar rpt-bar--rev" style={{ height: `${(m.revenue / 20) * 100}%` }}>
                      <em>${m.revenue}M</em>
                    </div>
                    <div className="rpt-bar rpt-bar--profit" style={{ height: `${(m.profit / 20) * 100}%` }}>
                      <em>${m.profit}M</em>
                    </div>
                    <div className="rpt-bar rpt-bar--cost" style={{ height: `${(m.cost / 20) * 100}%` }}>
                      <em>${m.cost}M</em>
                    </div>
                  </div>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rpt-note">
            <span className="rpt-note-ico" aria-hidden="true" />
            <p>
              Overall, Q3 2026 delivered strong growth across key metrics, with continued momentum in
              revenue, customer acquisition, and operational performance, while monitoring key risks for Q4.
            </p>
          </div>
        </section>

        <div className="rpt-side">
          <section className="rpt-panel">
            <div className="rpt-panel-head">
              <h4>Key Highlights</h4>
              <span>View Details →</span>
            </div>
            <ul className="rpt-hl">
              <li>
                <span className="rpt-hl-ico rpt-hl-ico--pink" aria-hidden="true" />
                <div>
                  <strong>Revenue Growth</strong>
                  <p>Total revenue increased by 14.8% compared to Q2 2026.</p>
                </div>
              </li>
              <li>
                <span className="rpt-hl-ico rpt-hl-ico--purple" aria-hidden="true" />
                <div>
                  <strong>Customer Expansion</strong>
                  <p>Gained 2,350 new customers, up 20.1% from last quarter.</p>
                </div>
              </li>
              <li>
                <span className="rpt-hl-ico rpt-hl-ico--blue" aria-hidden="true" />
                <div>
                  <strong>Operational Efficiency</strong>
                  <p>Improved order volume and maintained healthy cost levels.</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="rpt-panel">
            <div className="rpt-panel-head">
              <h4>Key Risks</h4>
              <span>View All →</span>
            </div>
            <ul className="rpt-risks">
              <li>
                <span className="rpt-risk-ico rpt-risk-ico--high" aria-hidden="true" />
                <div>
                  <strong>Market Uncertainty</strong>
                  <p>Potential demand fluctuation in Q4 2026.</p>
                </div>
                <b className="badge-high">High</b>
              </li>
              <li>
                <span className="rpt-risk-ico rpt-risk-ico--med" aria-hidden="true" />
                <div>
                  <strong>Rising Operational Costs</strong>
                  <p>Increased vendor and infrastructure expenses.</p>
                </div>
                <b className="badge-med">Medium</b>
              </li>
              <li>
                <span className="rpt-risk-ico rpt-risk-ico--med" aria-hidden="true" />
                <div>
                  <strong>Talent Retention Risk</strong>
                  <p>Higher attrition in key teams.</p>
                </div>
                <b className="badge-med">Medium</b>
              </li>
              <li>
                <span className="rpt-risk-ico rpt-risk-ico--low" aria-hidden="true" />
                <div>
                  <strong>Regulatory Changes</strong>
                  <p>Monitoring upcoming industry compliance updates.</p>
                </div>
                <b className="badge-low">Low</b>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <button type="button" className="rpt-dl" tabIndex={-1} aria-label="Download report">
        <Icon src={iconDownload} />
      </button>
    </div>
  )
}

export default function AppScreenshot({ isVisible = false, skipAnimation = false }) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const visible = isVisible || reducedMotion
  const instant = skipAnimation || reducedMotion

  return (
    <div className={`app-shot-wrap ${visible ? 'is-visible' : ''} ${instant ? 'is-instant' : ''}`}>
      <div className="shot-glow"></div>
      <div className="app-shot" aria-hidden="true">
        <div className="asu">
          <div className="asu-rail">
            <div className="asu-side">
              <div className="asu-side-top">
                <div className="asu-brand">
                  <span className="asu-logo">
                    <img src={logomark} alt="" />
                  </span>
                  <p>
                    Eveia.<span>AI</span>
                  </p>
                </div>
                <span className="asu-collapse" />
              </div>

              <div className="asu-switch">
                <span className="asu-switch-chats">
                  <Icon src={iconChats} />
                  Chats
                </span>
                <span className="asu-switch-projects">
                  <Icon src={iconProjects} />
                  Projects
                </span>
              </div>

              <div className="asu-newchat">New Chat</div>
              <div className="asu-rule" />

              <div className="overlay-sidebar asu-history">
                <Icon src={iconChat} className="asu-history-ico" />
                <div>
                  <p>Summarize Q3 Board Report</p>
                  <span>Aug 28, 2026&nbsp;&nbsp;4:49 PM</span>
                </div>
              </div>

              <div className="asu-help">
                <span className="asu-help-btn">
                  <Icon src={iconSettings} />
                </span>
                Settings and Help
              </div>
            </div>
          </div>

          <div className="asu-main">
            <header className="asu-top">
              <div className="asu-crumb">
                Agents
                <Icon src={iconChevron} className="asu-crumb-chev" />
                <span>Chat</span>
              </div>
              <div className="asu-userchip">
                <span className="asu-chip">
                  <img className="asu-chip-ava" src={avatarMatt} alt="" />
                  <span>
                    <b>Matt</b>
                    <small>Manager</small>
                  </span>
                  <Icon src={iconCaret} className="asu-chip-caret" />
                </span>
                <Icon src={iconMore} className="asu-more" />
              </div>
            </header>

            <div className="asu-thread">
              <div className="overlay-user asu-user">
                <div className="asu-bubble">
                  Summarize the Q3 board report and highlight key risks.
                </div>
                <img className="asu-user-ava" src={avatarMatt} alt="" />
              </div>

              <div className="overlay-ai asu-ai">
                <span className="asu-ai-logo">
                  <img src={logomark} alt="" />
                </span>
                <div className="asu-ai-card">
                  <div className="asu-ai-card-top">
                    <p>Here is your latest sales report.</p>
                    <span>
                      <Icon src={iconCheck} />
                      Generated in&nbsp;&nbsp;2 mins.
                    </span>
                  </div>
                  <div className="asu-ai-frame">
                    <BoardReport />
                  </div>
                  <div className="asu-ai-foot">
                    <span>Source: Eveia.AI Data Hub</span>
                    <span>Data as of May 31, 2024&nbsp;&nbsp;10:24 AM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="asu-composer">
              <div className="asu-input">
                <p>Ask Eveia</p>
                <div className="asu-input-row">
                  <span className="asu-clip" />
                  <span className="asu-hint">
                    Enter to send · Shift+Enter newline · Drag &amp; drop or paste files here
                  </span>
                  <span className="asu-auto">
                    <i>✦</i>
                    Auto
                    <Icon src={iconCaret} />
                  </span>
                  <span className="asu-stop">
                    Stop
                    <b />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
