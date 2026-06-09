import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMe } from '../../api/authAPI'
import useAuthStore from '../../store/authStore'

const seasons = [
  { name: 'Spring', icon: 'filter_vintage', months: 'March - May' },
  { name: 'Summer', icon: 'wb_sunny', months: 'June - August' },
  { name: 'Autumn', icon: 'eco', months: 'September - November' },
  { name: 'Winter', icon: 'ac_unit', months: 'December - February' },
]

export default function InterestSeasonsPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(new Set())
  const [visible, setVisible] = useState([])
  const [loading, setLoading] = useState(false)

  const user = useAuthStore((state) => state.user)
  const updateUserStore = useAuthStore((state) => state.updateUser)

  useEffect(() => {
    seasons.forEach((_, index) => {
      setTimeout(() => {
        setVisible(prev => [...prev, index])
      }, index * 60)
    })
  }, [])

  const toggleSelection = async (name) => {
    const next = new Set([name])
    setSelected(next)

    setLoading(true)
    try {
      const updatedUser = await updateMe({
        interests: {
          ...user?.interests,
          seasons: [name]
        }
      })
      updateUserStore(updatedUser)
      setTimeout(() => navigate('/onboarding/flora-fauna'), 400)
    } catch (err) {
      console.error('Failed to save season', err)
      navigate('/onboarding/flora-fauna')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col font-body-lg text-body-lg bg-surface text-on-surface select-none">
      <header className="w-full bg-surface-container-lowest border-b border-outline-variant py-[12px] md:py-[16px] shrink-0 z-50">
        <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-2">
            <span className="text-primary text-base md:font-headline-md font-bold tracking-tight">Discoverly</span>
            <span className="text-[10px] md:text-label-caps font-label-caps text-on-surface-variant">Step 2 of 4</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-1/2 transition-all duration-500 ease-out"></div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex flex-col justify-center items-center px-[16px] md:px-[24px] py-[16px] md:py-[32px] max-w-[1280px] mx-auto w-full overflow-hidden">
        <div className="text-center mb-[16px] md:mb-[32px] shrink-0">
          <h1 className="text-xl md:text-headline-md text-on-background capitalize font-bold">when do you prefer to travel?</h1>
        </div>

        {/* Season Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[12px] md:gap-[24px] w-full max-w-5xl justify-center items-center py-2">
          {seasons.map((season, index) => {
            const isSelected = selected.has(season.name);
            return (
              <div
                key={season.name}
                className={`group relative rounded-xl p-[12px] md:p-[24px] flex flex-col items-center justify-center cursor-pointer min-h-[110px] md:min-h-[160px] border transition-all ${isSelected
                    ? 'border-primary bg-primary-container text-on-primary-container selected-ring'
                    : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-on-surface'
                  }`}
                onClick={() => toggleSelection(season.name)}
                style={{
                  opacity: visible.includes(index) ? 1 : 0,
                  transform: visible.includes(index) ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'all 400ms cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.2s ease, border-color 0.2s ease',
                }}
              >
                {/* Check Action Indicator */}
                <div className={`absolute top-2 right-2 md:top-4 md:right-4 transition-all duration-200 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}>
                  <span className="material-symbols-outlined text-primary text-[20px] md:text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>

                {/* Central Visual Icon Plate */}
                <div className={`mb-2 md:mb-4 p-2 md:p-4 rounded-full transition-transform duration-300 group-hover:scale-105 ${isSelected ? 'bg-primary text-white' : 'bg-surface-container-high text-primary'
                  }`}>
                  <span className="material-symbols-outlined text-3xl md:text-4xl block">{season.icon}</span>
                </div>

                {/* Card Descriptions */}
                <h3 className={`text-base md:text-xl font-semibold transition-colors ${isSelected ? 'text-primary' : 'text-on-surface'
                  }`}>
                  {season.name}
                </h3>

                <p className={`text-[10px] md:text-xs mt-1 font-medium tracking-wider transition-colors uppercase ${isSelected ? 'text-on-primary-container/80' : 'text-secondary'
                  }`}>
                  {season.months}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-outline-variant py-[12px] md:py-[16px] shrink-0">
        <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] flex justify-between items-center">
          <button
            className="flex items-center gap-1 md:gap-2 text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors font-medium"
            onClick={() => navigate('/onboarding/countries')}
            disabled={loading}
          >
            <span className="material-symbols-outlined text-[20px] md:text-[24px]">arrow_back</span>
            <span>Back</span>
          </button>
          <button
            className="text-secondary text-sm md:text-base font-medium hover:text-on-surface transition-colors"
            onClick={() => navigate('/onboarding/flora-fauna')}
            disabled={loading}
          >
            Skip
          </button>
        </div>
      </footer>
    </div>
  )
}