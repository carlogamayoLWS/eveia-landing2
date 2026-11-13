// Phone menu destinations. Mirrors the routes and labels in Navbar.jsx.
export const PRODUCT_LINKS = [
  { to: '/#what-is-eveia', label: 'What is Eveia.AI' },
  { to: '/#how-it-works', label: 'How it Works' },
  { to: '/security', label: 'Security & Privacy' },
  { to: '/philippines', label: 'AI in the Philippines' },
]

export const NEED_LINKS = [
  { to: '/reports', label: 'Decision-Ready Reports' },
  { to: '/search', label: 'Instant Answers from Data' },
  { to: '/proposals', label: 'Proposal Drafting' },
  { to: '/summaries', label: 'Executive Summaries' },
]

export const INDUSTRY_LINKS = [
  { to: '/enterprise', label: 'Enterprise' },
  { to: '/government', label: 'Government' },
  { to: '/healthcare', label: 'Healthcare' },
  { to: '/education', label: 'Education' },
  { to: '/legal', label: 'Legal' },
  { to: '/financial-services', label: 'Financial Services' },
  { to: '/energy', label: 'Energy & Utilities' },
  { to: '/manufacturing', label: 'Manufacturing' },
]

// Sections that render dark on phones; the top bar switches to its dark skin over them.
export const MOBILE_DARK_SELECTOR =
  '.dark, .sec7, .footer, .pricing-hero, .security-hero, .ph-audience, .privacy-approach, ' +
  '.enterprise-page .reports-hero-wrap, .reports-page:not(.summaries-page) .reports-sources'
