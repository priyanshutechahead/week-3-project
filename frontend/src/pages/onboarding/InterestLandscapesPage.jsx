import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMe } from '../../api/authAPI'
import useAuthStore from '../../store/authStore'

const landscapes = [
  { icon: 'terrain', name: 'Mountains'},
  { icon: 'beach_access', name: 'Beaches'},
  { icon: 'wb_sunny', name: 'Deserts'},
  { icon: 'ac_unit', name: 'Tundra'},
  { icon: 'nature', name: 'Rainforests'},
  { icon: 'grass', name: 'Savannahs' },
  { icon: 'waves', name: 'Mangroves'},
  { icon: 'volcano', name: 'Volcanoes'},
  { icon: 'forest', name: 'Forests'},
  { icon: 'location_city', name: 'Urban'},
  { icon: 'castle', name: 'Historical'},
  { icon: 'water', name: 'Rivers'}
]

export default function InterestLandscapesPage() {
  const navigate = useNavigate()
  const [active, setActive] = useState(new Set())
  const [visible, setVisible] = useState([])
  const [loading, setLoading] = useState(false)
  
  const user = useAuthStore((state) => state.user)
  const updateUserStore = useAuthStore((state) => state.updateUser)

  useEffect(() => {
    landscapes.forEach((_, index) => {
      setTimeout(() => {
        setVisible(prev => [...prev, index])
      }, index * 30) // Faster stagger execution to avoid rendering lag
    })
  }, [])

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
      navigate('/recommendation')
    } catch (err) {
      console.error('Failed to save landscapes', err)
      navigate('/recommendation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col font-body-lg text-body-lg bg-surface text-on-surface select-none">
      {/* Header */}
      <header className="w-full bg-surface-container-lowest border-b border-outline-variant py-[12px] md:py-[16px] shrink-0 z-50">
        <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-2">
            <span className="text-primary text-base md:font-headline-md font-bold tracking-tight">Discoverly</span>
            <span className="text-[10px] md:text-label-caps font-label-caps text-on-surface-variant">Step 4 of 4</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-full transition-all duration-500 ease-out"></div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex flex-col justify-center items-center px-[16px] md:px-[24px] py-[16px] md:py-[32px] max-w-[1280px] mx-auto w-full overflow-hidden">
        <div className="w-full text-center shrink-0 mb-[16px] md:mb-[32px]">
          <h1 className="text-xl md:text-headline-md text-on-background font-bold">Geographical Landscapes</h1>
        </div>

        {/* Dense Grid layout */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[8px] md:gap-[16px] w-full max-w-5xl items-stretch py-2">
          {landscapes.map((item, index) => {
            const isSelected = active.has(item.name)
            return (
              <div
                key={item.name}
                className={`relative group cursor-pointer overflow-hidden rounded-xl border p-[8px] md:p-[16px] flex flex-col justify-between transition-all min-h-[70px] md:min-h-[120px] h-full ${
                  isSelected 
                    ? 'border-primary bg-primary-container text-on-primary-container selected-ring' 
                    : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-on-surface'
                }`}
                onClick={() => toggleCard(item.name)}
                style={{
                  opacity: visible.includes(index) ? 1 : 0,
                  transform: visible.includes(index) ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div className="overflow-hidden flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-1 md:gap-3">
                  <div className={`p-1 md:p-1.5 rounded-lg inline-block transition-colors shrink-0 ${
                    isSelected ? 'bg-primary text-white' : 'bg-surface-container-high text-secondary group-hover:bg-primary-fixed group-hover:text-primary'
                  }`}>
                    <span 
                      className="material-symbols-outlined text-[16px] md:text-[22px] block"
                      style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className={`tracking-tight text-[10px] md:text-md font-semibold truncate transition-colors ${
                      isSelected ? 'text-primary' : 'text-on-surface'
                    }`}>
                      {item.name}
                    </h3>
                  </div>
                </div>

                <div className="absolute top-1 right-1 md:relative md:top-0 md:right-0 flex justify-end items-end w-full mt-0 md:mt-1 shrink-0">
                  <div className={`p-0.5 md:p-1 rounded-full transition-all duration-200 ${
                    isSelected 
                      ? 'bg-primary text-white scale-100 opacity-100' 
                      : 'bg-surface-container-highest text-on-surface-variant opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'
                  }`}>
                    <span className="material-symbols-outlined text-[12px] md:text-[16px] block">
                      {isSelected ? 'check' : 'add'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Global Action Trigger Block */}
        <div className="w-full flex justify-center shrink-0 mt-[16px] md:mt-[32px]">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full max-w-sm py-2.5 md:py-3.5 bg-primary text-white text-sm md:text-base font-medium rounded-lg flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? 'Finalizing...' : 'Submit'}
            <span className="material-symbols-outlined text-[18px] md:text-[20px]">verified</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-outline-variant py-[12px] md:py-[16px] shrink-0">
        <div className="max-w-[1280px] mx-auto px-[16px] md:px-[24px] flex justify-between items-center">
          <button 
            className="flex items-center gap-1 md:gap-2 text-sm md:text-base text-on-surface-variant hover:text-primary transition-colors font-medium" 
            onClick={() => navigate('/onboarding/flora-fauna')}
            disabled={loading}
          >
            <span className="material-symbols-outlined text-[20px] md:text-[24px]">arrow_back</span>
            <span>Back</span>
          </button>
        </div>
      </footer>
    </div>
  )
}