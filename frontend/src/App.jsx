import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import useAuthStore from './store/authStore'
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
import RecommendationDashboardPage from './pages/RecommendationDashboardPage'
import CategoryPage from './pages/CategoryPage'
import DashboardLayout from './components/layout/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
        
        {/* Recommendation Dashboard */}
        <Route path="/recommendation" element={<RecommendationDashboardPage />} />

        {/* Dashboard Pages (with sidebar layout) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/intelligence" element={<IntelligencePage />} />
          <Route path="/itineraries" element={<ItinerariesPage />} />
          <Route path="/explore" element={<CategoryPage />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App
