import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchCategoryPlaces } from '../api/travelAPI'
import Footer from '../components/layout/Footer'
import ChatAssistant from '../components/ui/ChatAssistant'

export default function CategoryPage() {
  const location = useLocation()
  const navigate = useNavigate()

  // Retrieve state or default to safe fallbacks
  const country = location.state?.country || 'Japan'
  const category = location.state?.category || 'Must Visit'

  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const loadPlaces = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchCategoryPlaces(country, category)
        if (isMounted) {
          setPlaces(data || [])
          setLoading(false)
        }
      } catch (err) {
        console.error('Error loading category places:', err)
        if (isMounted) {
          setError('Failed to fetch destinations. Please try again.')
          setLoading(false)
        }
      }
    }

    loadPlaces()
    return () => {
      isMounted = false
    }
  }, [country, category])

  const handleBack = () => {
    navigate('/dashboard', { state: { selectedCountry: country } })
  }

  // category badge styling
  const getCategoryStyles = (cat) => {
    switch (cat) {
      case 'Must Visit':
        return {
          pill: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: 'explore',
          accent: 'text-blue-600',
          gradient: 'from-blue-600/10 to-blue-600/0'
        }
      case 'Hidden Gems':
        return {
          pill: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: 'diamond',
          accent: 'text-purple-600',
          gradient: 'from-purple-600/10 to-purple-600/0'
        }
      case 'Local Eats':
        return {
          pill: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: 'restaurant',
          accent: 'text-amber-600',
          gradient: 'from-amber-600/10 to-amber-600/0'
        }
      case 'Active Life':
        return {
          pill: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: 'directions_run',
          accent: 'text-emerald-600',
          gradient: 'from-emerald-600/10 to-emerald-600/0'
        }
      default:
        return {
          pill: 'bg-primary-fixed text-primary border-primary-fixed/30',
          icon: 'map',
          accent: 'text-primary',
          gradient: 'from-primary/10 to-primary/0'
        }
    }
  }

  const styles = getCategoryStyles(category)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-[24px] max-w-[1280px] mx-auto flex-1 w-full">
        {/* Navigation & Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-body-sm font-medium text-secondary hover:text-primary transition-colors mb-4 group cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
            Back to Dashboard
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`material-symbols-outlined text-[20px] ${styles.accent}`}>{styles.icon}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${styles.pill}`}>
                  {category}
                </span>
              </div>
              <h2 className="font-headline-md text-3xl text-on-surface mt-1">
                Exploring {category} in <span className="text-primary font-bold">{country}</span>
              </h2>
              <p className="text-body-sm text-on-surface-variant mt-1">
                Discover curated destinations, activities, and local experiences tailor-made for your profile.
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden h-[420px] flex flex-col animate-pulse">
                <div className="h-48 bg-surface-container-high w-full"></div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="h-6 bg-surface-container-high rounded-md w-3/4"></div>
                  <div className="h-4 bg-surface-container-high rounded-md w-1/2"></div>
                  <div className="space-y-2 flex-1 mt-2">
                    <div className="h-3 bg-surface-container-high rounded w-full"></div>
                    <div className="h-3 bg-surface-container-high rounded w-full"></div>
                    <div className="h-3 bg-surface-container-high rounded w-5/6"></div>
                  </div>
                  <div className="h-10 bg-surface-container-high rounded-lg w-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-error-container border border-error/20 text-on-error-container p-6 rounded-2xl text-center max-w-lg mx-auto my-12 shadow-sm">
            <span className="material-symbols-outlined text-4xl text-error mb-2">error</span>
            <p className="font-medium text-body-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-error text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-body-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && places.length === 0 && (
          <div className="bg-surface-container-low border border-outline-variant p-12 rounded-2xl text-center max-w-lg mx-auto my-12">
            <span className="material-symbols-outlined text-5xl text-outline mb-3">location_off</span>
            <h4 className="font-headline-md text-[18px] text-on-surface mb-2">No Destinations Found</h4>
            <p className="text-body-sm text-on-surface-variant mb-6">
              We couldn't locate specific recommendations for {category} in {country} right now.
            </p>
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-body-sm"
            >
              Explore Other Categories
            </button>
          </div>
        )}

        {/* Grid Results */}
        {!loading && !error && places.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {places.map((place, index) => (
              <div
                key={index}
                className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden hover-lift flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={place.image}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-60"></div>

                  {/* Subtle Top-Right Overlay category representation */}
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] text-white font-semibold uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">{styles.icon}</span>
                    {category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Place Name */}
                  <h3 className="font-headline-md text-[20px] text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {place.name}
                  </h3>

                  {/* Location Info */}
                  <div className="flex items-center gap-1.5 mb-4 text-body-sm text-on-surface-variant font-medium shrink-0">
                    <span className={`material-symbols-outlined text-[18px] ${styles.accent}`}>location_on</span>
                    <span className="truncate">{place.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-body-sm text-on-surface-variant leading-relaxed line-clamp-4 flex-1">
                    {place.description}
                  </p>

                  {/* Footer Action Inside Card */}
                  <div className="mt-6 pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                    <span className="text-[10px] text-secondary font-mono uppercase">DISCOVERLY INSIGHT</span>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(place.name + ' ' + place.location)}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-body-sm font-semibold flex items-center gap-1 hover:underline transition-colors ${styles.accent}`}
                    >
                      Learn More
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer variant="dashboard" />
      <ChatAssistant />
    </div>
  )
}
