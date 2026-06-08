import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMe } from '../../api/authAPI'
import useAuthStore from '../../store/authStore'

const landscapes = [
  { icon: 'terrain', name: 'Mountains', desc: 'Elevated peaks, alpine retreats, and challenging trekking trails.' },
  { icon: 'beach_access', name: 'Beaches', desc: 'Coastal horizons, azure waters, and serene island archipelagos.' },
  { icon: 'wb_sunny', name: 'Deserts', desc: 'Arid beauty, dunescapes, and high-contrast geological formations.' },
  { icon: 'ac_unit', name: 'Tundra', desc: 'Arctic expanses, permafrost vistas, and sub-zero distilled landscapes.' },
]

export default function InterestLandscapesPage() {
  const navigate = useNavigate()
  const [active, setActive] = useState(new Set())
  const [loading, setLoading] = useState(false)
  
  const user = useAuthStore((state) => state.user)
  const updateUserStore = useAuthStore((state) => state.updateUser)

  const toggleCard = (name) => {
    const next = new Set(active)
    if (next.has(name)) {
      next.delete(name)
    } else {
      next.add(name)
    }
    setActive(next)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const updatedUser = await updateMe({
        interests: { 
          ...user?.interests,
          landscapes: Array.from(active) 
        }
      })
      updateUserStore(updatedUser)
      navigate('/dashboard')
    } catch (err) {
      console.error('Failed to save landscapes', err)
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
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
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] w-full max-w-[1280px] mb-[64px]">
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

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full max-w-md py-4 bg-primary text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? 'Finalizing Profile...' : 'Submit'}
            <span className="material-symbols-outlined">verified</span>
          </button>

        </div>
      </main>


    </div>
  )
}
