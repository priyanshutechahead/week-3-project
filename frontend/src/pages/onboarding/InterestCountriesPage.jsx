import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMe } from '../../api/authAPI'
import { getAllCountries } from '../../api/countryAPI'
import useAuthStore from '../../store/authStore'

export default function InterestCountriesPage() {
  const navigate = useNavigate()
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  
  const updateUserStore = useAuthStore((state) => state.updateUser)

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await getAllCountries()
        // Sort alphabetically and extract common names
        const sorted = data
          .map(c => c.name.common)
          .sort((a, b) => a.localeCompare(b))
        setCountries(sorted)
      } catch (err) {
        console.error('Failed to fetch countries', err)
      } finally {
        setFetching(false)
      }
    }
    loadCountries()
  }, [])

  const filtered = countries.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleCountry = async (country) => {
    const next = new Set([country]) // Single selection for auto-navigate
    setSelected(next)
    
    try {
      const updatedUser = await updateMe({
        interests: { countries: [country] }
      })
      updateUserStore(updatedUser)
      // Small delay for visual feedback
      setTimeout(() => navigate('/onboarding/seasons'), 400)
    } catch (err) {
      console.error('Failed to save country', err)
      navigate('/onboarding/seasons')
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col font-body-lg text-body-lg bg-surface text-on-surface select-none">
      <header className="w-full bg-surface-container-lowest border-b border-outline-variant py-[12px] md:py-[16px] shrink-0 z-50">
        <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-2">
            <span className="text-primary text-base md:font-headline-md font-bold tracking-tight">Discoverly</span>
            <span className="text-[10px] md:text-label-caps font-label-caps text-on-surface-variant">Step 1 of 4</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-1/4 transition-all duration-500 ease-out"></div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col justify-center items-center px-[16px] md:px-[24px] py-[16px] md:py-[32px] max-w-[1280px] mx-auto w-full overflow-hidden">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-4 md:p-10 rounded-xl h-fit max-h-full flex flex-col">
          <section className="mb-[12px] md:mb-[24px] text-center shrink-0">
            <h1 className="text-xl md:text-display-lg font-bold text-on-surface mb-1 md:mb-2">where to next?</h1>
          </section>

          {/* Search */}
          <div className="relative mb-[12px] md:mb-[24px] group shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-[18px] md:text-[24px] text-outline">public</span>
            </div>
            <input
              className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-all text-sm md:text-base text-on-surface placeholder:text-outline"
              placeholder="Search for a country..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tags Grid */}
          <div className="flex flex-wrap gap-2 md:gap-3 flex-grow overflow-y-auto custom-scrollbar pr-1 md:pr-2 content-start">
            {fetching ? (
              <div className="w-full text-center py-4 md:py-8">
                <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
              </div>
            ) : filtered.map(country => (
              <button
                key={country}
                className={`px-3 py-1.5 md:px-4 md:py-2 border border-outline-variant rounded-full text-[12px] md:text-sm transition-all cursor-pointer hover:border-primary active:scale-95 flex items-center gap-1.5 md:gap-2 ${selected.has(country) ? 'country-tag-selected bg-primary-container border-primary text-on-primary-container' : 'bg-surface text-on-surface'
                  }`}
                onClick={() => toggleCountry(country)}
              >
                {selected.has(country) && <span className="material-symbols-outlined text-[12px] md:text-[14px]">check</span>}
                {country}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-outline-variant py-[12px] md:py-[16px] shrink-0 mt-auto">
        <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] flex justify-between items-center">
          <button className="flex items-center gap-1 md:gap-2 text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors font-medium" onClick={() => navigate('/signup')}>
            <span className="material-symbols-outlined text-[20px] md:text-[24px]">arrow_back</span>
            <span>Back</span>
          </button>
          <button className="text-secondary text-sm md:text-base font-medium hover:text-on-surface transition-colors" onClick={() => navigate('/onboarding/seasons')}>Skip</button>
        </div>
      </footer>
    </div>
  )
}
