import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const landscapes = [
  { icon: 'terrain', name: 'Mountains', desc: 'Elevated peaks, alpine retreats, and challenging trekking trails.' },
  { icon: 'beach_access', name: 'Beaches', desc: 'Coastal horizons, azure waters, and serene island archipelagos.' },
  { icon: 'wb_sunny', name: 'Deserts', desc: 'Arid beauty, dunescapes, and high-contrast geological formations.' },
  { icon: 'ac_unit', name: 'Tundra', desc: 'Arctic expanses, permafrost vistas, and sub-zero distilled landscapes.' },
]

export default function InterestLandscapesPage() {
  const navigate = useNavigate()
  const [active, setActive] = useState(new Set())

  const toggleCard = (name) => {
    const next = new Set(active)
    if (next.has(name)) {
      next.delete(name)
    } else {
      next.add(name)
    }
    setActive(next)
  }

  return (
    <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col font-body-lg">
      {/* Header */}
      <header className="w-full bg-surface-container-lowest border-b border-outline-variant py-[24px] sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-[24px] flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4">
            <span className="text-primary font-headline-md font-bold tracking-tight">Discoverly</span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">Step 4 of 4</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-full transition-all duration-500 ease-out"></div>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto flex flex-col items-center px-[24px] py-[64px]">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center">
          {/* Main Content Header */}
          <header className="w-full max-w-[800px] text-center mb-[64px]">
            <h1 className="font-display-lg text-display-lg text-on-background mb-4">Geographical Landscapes</h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-xl mx-auto">
              Define the environments that inspire your travel intelligence. Your preferences will tailor the AI&apos;s itinerary generation.
            </p>
          </header>

          {/* Landscapes Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] w-full max-w-[1280px]">
            {landscapes.map((item) => (
              <button
                key={item.name}
                className={`landscape-card flex flex-col items-start p-[24px] bg-surface-container-lowest text-left rounded-lg group cursor-pointer ${
                  active.has(item.name) ? 'active' : ''
                }`}
                onClick={() => toggleCard(item.name)}
              >
                <div className="mb-[24px] p-[8px] bg-surface-container rounded-lg group-hover:bg-primary-fixed transition-colors">
                  <span
                    className="material-symbols-outlined text-[32px] text-secondary"
                    style={active.has(item.name) ? { fontVariationSettings: "'FILL' 1", color: '#004ac6' } : {}}
                  >
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-headline-md text-[20px] mb-[8px] text-on-surface">{item.name}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{item.desc}</p>
              </button>
            ))}
          </section>

          {/* Visual Context */}
          <section className="mt-[64px] w-full grid grid-cols-12 gap-[24px]">
            <div className="col-span-12 md:col-span-7 h-[320px] rounded-xl overflow-hidden border border-outline-variant relative">
              <img alt="Landscape inspiration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoSMZSM1efvrezTFrPC-JiQisgvUGes_0N0ww1FCLjUfNgzbPmclUVDlPCmggRxPrEm5CUjyT9LDDdY3BP-Pt70cN0EPpTBMXsdy4J5JueSBkk6lP9HSa6d6pf0U0fI6GHCRrLUiB7mnwk4wFXTLsA5ljwBkykBUs8dRhr5ZzTFjPix0tp4TLN0GCJZZDFykbGrUV5yXI4TRFyUMNa80tXmFtU0MQOKqIzP5e35Qh7-lJpNPabs_TwirWwt3ln3eGfIwqe9PwDlX8" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col justify-center">
              <h4 className="font-headline-md text-headline-md mb-[8px]">Visualizing your path</h4>
              <p className="font-body-lg text-body-lg text-secondary">
                Discoverly utilizes satellite data and regional terrain analysis to ensure your preferences match the real-world complexity of your destination.
              </p>
              <div className="mt-[24px] flex gap-[8px] items-center">
                <div className="h-12 w-12 rounded-full border border-outline-variant flex items-center justify-center bg-white shadow-sm">
                  <span className="material-symbols-outlined text-primary">verified</span>
                </div>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Validated Intelligence</span>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-outline-variant py-[24px] mt-auto">
        <div className="max-w-[1280px] mx-auto px-[24px] flex justify-between items-center">
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium" onClick={() => navigate('/onboarding/flora-fauna')}>
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back</span>
          </button>
          <button className="text-primary font-medium hover:text-on-surface transition-colors" onClick={() => navigate('/dashboard')}>Submit</button>
        </div>
      </footer>
    </div>
  )
}
