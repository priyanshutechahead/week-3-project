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
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-lg">
      <main className="flex-grow flex flex-col items-center justify-center px-[24px] py-[64px]">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col items-center">
          {/* Header */}
          <header className="w-full max-w-[800px] text-center mb-[64px]">
            <div className="mb-[8px]">
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Step 4 of 4</span>
            </div>
            <h1 className="font-headline-md text-headline-md mb-[8px] text-on-background">Geographical Landscapes</h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-xl mx-auto">
              Define the environments that inspire your travel intelligence. Your preferences will tailor the AI&apos;s itinerary generation.
            </p>
            <div className="mt-[24px] w-full max-w-md mx-auto bg-surface-container h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-full transition-all duration-700 ease-out"></div>
            </div>
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

          {/* Navigation */}
          <footer className="mt-[64px] w-full max-w-[800px] flex flex-col md:flex-row items-center justify-between gap-[24px]">
            <button className="w-full md:w-auto px-10 py-3 border border-outline text-secondary font-body-lg font-medium rounded-lg hover:bg-surface-container transition-all active:scale-95 flex items-center justify-center gap-2" onClick={() => navigate('/onboarding/flora-fauna')}>
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back
            </button>
            <div className="flex-grow hidden md:block"></div>
            <button className="w-full md:w-auto px-12 py-3 bg-primary text-white font-body-lg font-medium rounded-lg hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/10" onClick={() => navigate('/dashboard')}>
              Submit
            </button>
          </footer>
        </div>
      </main>
    </div>
  )
}
