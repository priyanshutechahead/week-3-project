import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import DemoPage from './pages/DemoPage'
import DashboardPage from './pages/DashboardPage'
import IntelligencePage from './pages/IntelligencePage'
import ItinerariesPage from './pages/ItinerariesPage'
import InterestCountriesPage from './pages/onboarding/InterestCountriesPage'
import InterestSeasonsPage from './pages/onboarding/InterestSeasonsPage'
import InterestFloraFaunaPage from './pages/onboarding/InterestFloraFaunaPage'
import InterestLandscapesPage from './pages/onboarding/InterestLandscapesPage'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<IndexPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/demo" element={<DemoPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Onboarding Flow */}
        <Route path="/onboarding/countries" element={<InterestCountriesPage />} />
        <Route path="/onboarding/seasons" element={<InterestSeasonsPage />} />
        <Route path="/onboarding/flora-fauna" element={<InterestFloraFaunaPage />} />
        <Route path="/onboarding/landscapes" element={<InterestLandscapesPage />} />

        {/* Dashboard Pages (with sidebar layout) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/intelligence" element={<IntelligencePage />} />
          <Route path="/itineraries" element={<ItinerariesPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
