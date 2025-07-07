import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ComplaintSubmission from './pages/ComplaintSubmission'
import TrackComplaint from './pages/TrackComplaint'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/submit-complaint" element={<ComplaintSubmission />} />
        <Route path="/track-complaint" element={<TrackComplaint />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App