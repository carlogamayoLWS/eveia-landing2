import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { DemoModalProvider } from './components/DemoModal.jsx'
import HomePage from './pages/HomePage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import ProposalPage from './pages/ProposalPage.jsx'
import SummariesPage from './pages/SummariesPage.jsx'
import EnterprisePage from './pages/EnterprisePage.jsx'
import IndustryPage from './pages/IndustryPage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import SecurityPage from './pages/SecurityPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <DemoModalProvider>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/proposals" element={<ProposalPage />} />
          <Route path="/summaries" element={<SummariesPage />} />
          <Route path="/enterprise" element={<EnterprisePage />} />
          <Route path="/government" element={<IndustryPage id="government" />} />
          <Route path="/healthcare" element={<IndustryPage id="healthcare" />} />
          <Route path="/education" element={<IndustryPage id="education" />} />
          <Route path="/legal" element={<IndustryPage id="legal" />} />
          <Route path="/financial-services" element={<IndustryPage id="finance" />} />
          <Route path="/energy" element={<IndustryPage id="energy" />} />
          <Route path="/manufacturing" element={<IndustryPage id="manufacturing" />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/security" element={<SecurityPage />} />
        </Routes>
      </DemoModalProvider>
    </BrowserRouter>
  )
}
