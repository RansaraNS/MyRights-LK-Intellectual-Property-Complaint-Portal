import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ComplaintSubmission from './pages/ComplaintSubmission'
import TrackComplaint from './pages/TrackComplaint'
import NotFound from './pages/NotFound'
import RefundPolicy from './pages/RefundPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/submit-complaint" element={<ComplaintSubmission />} />
        <Route path="/track-complaint" element={<TrackComplaint />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />

      </Routes>
    </Layout>
  )
}

export default App