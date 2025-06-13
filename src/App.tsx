/**
 * TripPlanr - AI-powered travel itinerary generator
 * 
 * IMPORTANT: This is NOT open-source software. This code is provided as a demonstration
 * of the application structure only. The complete version with full functionality
 * is proprietary and not publicly available.
 * 
 * © 2024 TripPlanr. All rights reserved.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from './components/ui/toaster'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App