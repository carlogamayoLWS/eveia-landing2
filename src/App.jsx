import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import ProposalPage from './pages/ProposalPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/proposals" element={<ProposalPage />} />
      </Routes>
    </BrowserRouter>
  )
}
