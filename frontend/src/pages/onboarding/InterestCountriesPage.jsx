import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const countries = [
  "Japan", "Iceland", "Norway", "New Zealand", "Portugal", "Italy", "Greece", "Switzerland",
  "Thailand", "Vietnam", "Canada", "Australia", "Morocco", "France", "Spain", "Mexico",
  "South Africa", "Peru", "Chile", "Finland", "Denmark", "Scotland", "Ireland", "Germany"
]

export default function InterestCountriesPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState(new Set())

  const filtered = countries.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()))

  const toggleCountry = (country) => {
    const next = new Set(selected)
    if (next.has(country)) {
      next.delete(country)
    } else {
      next.add(country)
      setTimeout(() => navigate('/onboarding/seasons'), 400)
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
            <span className="text-label-caps font-label-caps text-on-surface-variant">Step 1 of 4</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-1/4 transition-all duration-500 ease-out"></div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow overflow-y-auto flex justify-center py-[64px] px-[24px]">
        <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant p-10 rounded-xl">
          <section className="mb-[24px] text-center">
            <h1 className="text-display-lg font-display-lg text-on-surface mb-2">Where to next?</h1>
            <p className="text-body-lg font-body-lg text-secondary">Select the countries you&apos;re interested in exploring. We&apos;ll use this to distill intelligence for your itineraries.</p>
          </section>

          {/* Search */}
          <div className="relative mb-[24px] group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">public</span>
            </div>
            <input
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary transition-all font-body-lg text-on-surface placeholder:text-outline"
              placeholder="Search for a country..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tags Grid */}
          <div className="flex flex-wrap gap-3 mb-[64px] max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
            {filtered.map(country => (
              <button
                key={country}
                className={`px-4 py-2 border border-outline-variant rounded-full text-body-sm font-body-sm transition-all cursor-pointer hover:border-primary active:scale-95 flex items-center gap-2 ${selected.has(country) ? 'country-tag-selected' : ''
                  }`}
                onClick={() => toggleCountry(country)}
              >
                {selected.has(country) && <span className="material-symbols-outlined text-[14px]">check</span>}
                {country}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-outline-variant py-[24px] mt-auto">
        <div className="max-w-[1280px] mx-auto px-[24px] flex justify-between items-center">
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium" onClick={() => navigate('/signup')}>
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back</span>
          </button>
          <button className="text-secondary font-medium hover:text-on-surface transition-colors" onClick={() => navigate('/onboarding/seasons')}>Skip</button>
        </div>
      </footer>
    </div>
  )
}
