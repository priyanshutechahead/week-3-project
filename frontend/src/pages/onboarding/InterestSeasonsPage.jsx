import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

  useEffect(() => {
    seasons.forEach((_, index) => {
      setTimeout(() => {
        setVisible(prev => [...prev, index])
      }, index * 100)
    })
  }, [])

  const toggleSelection = (name) => {
    const next = new Set(selected)
    if (next.has(name)) {
      next.delete(name)
    } else {
      next.add(name)
      setTimeout(() => navigate('/onboarding/flora-fauna'), 400)
    }
    setSelected(next)
  }

  return (
    <div className="bg-surface text-on-surface font-body-lg h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <header className="w-full bg-surface-container-lowest border-b border-outline-variant py-[24px] sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-[24px] flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4">
            <span className="text-primary font-headline-md font-bold tracking-tight">Discoverly</span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">Step 2 of 4</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-1/2 transition-all duration-500 ease-out"></div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow overflow-y-auto flex flex-col items-center py-[64px] px-[24px] max-w-[1280px] mx-auto w-full">
        <div className="text-center mb-[64px] max-w-2xl">
          <h1 className="font-display-lg text-display-lg text-on-background mb-4">When do you prefer to travel?</h1>
          <p className="text-body-lg text-on-surface-variant">Select your favorite seasons to help us curate intelligence-driven itineraries that match your climate preferences.</p>
        </div>

        {/* Season Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] w-full">
          {seasons.map((season, index) => (
            <div
              key={season.name}
              className={`season-card group relative bg-surface-container-lowest rounded-xl p-[24px] flex flex-col items-center justify-center cursor-pointer aspect-square ${
                selected.has(season.name) ? 'selected' : ''
              }`}
              onClick={() => toggleSelection(season.name)}
              style={{
                opacity: visible.includes(index) ? 1 : 0,
                transform: visible.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 400ms ease-out',
              }}
            >
              <div className={`absolute top-4 right-4 check-icon transition-opacity ${selected.has(season.name) ? 'opacity-100' : 'opacity-0'}`}>
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div className="mb-4 text-primary bg-primary-fixed p-4 rounded-full group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">{season.icon}</span>
              </div>
              <h3 className="font-headline-md text-on-surface">{season.name}</h3>
              <p className="text-label-caps font-label-caps text-secondary mt-2">{season.months}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-outline-variant py-[24px] mt-auto">
        <div className="max-w-[1280px] mx-auto px-[24px] flex justify-between items-center">
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium" onClick={() => navigate('/onboarding/countries')}>
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back</span>
          </button>
          <button className="text-secondary font-medium hover:text-on-surface transition-colors" onClick={() => navigate('/onboarding/flora-fauna')}>Skip</button>
        </div>
      </footer>
    </div>
  )
}
