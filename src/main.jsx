import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/mobile-chrome.css'
import './styles/mobile-home.css'
import './styles/mobile-pages.css'
import './styles/mobile-pages-detail.css'
import './styles/mobile-footer.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
