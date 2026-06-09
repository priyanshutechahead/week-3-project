import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMe } from '../../api/authAPI'
import useAuthStore from '../../store/authStore'

const interests = [
  {
    label: 'ECOSYSTEM',
    name: 'Tropical Rainforests'
  },
  {
    label: 'WILDLIFE',
    name: 'Marine Life'
  },
  {
    label: 'AVIAN',
    name: 'Rare Birds'
  },
  {
    label: 'POLAR',
    name: 'Arctic Fauna'
  },
  {
    label: 'SAFARI',
    name: 'Savannah Wildlife'
  },
  {
    label: 'ARID',
    name: 'Desert Reptiles'
  }
]

export default function InterestFloraFaunaPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(new Set())
  const [visible, setVisible] = useState([])
  const [loading, setLoading] = useState(false)
  
  const user = useAuthStore((state) => state.user)
  const updateUserStore = useAuthStore((state) => state.updateUser)

  useEffect(() => {
    interests.forEach((_, index) => {
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
          flora_fauna: [name] 
        }
      })
      updateUserStore(updatedUser)
      setTimeout(() => navigate('/onboarding/landscapes'), 400)
    } catch (err) {
      console.error('Failed to save flora & fauna', err)
      navigate('/onboarding/landscapes')
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
            <span className="text-[10px] md:text-label-caps font-label-caps text-on-surface-variant">Step 3 of 4</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-3/4 transition-all duration-500 ease-out"></div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex flex-col justify-center items-center px-[16px] md:px-[24px] py-[16px] md:py-[32px] max-w-[1280px] mx-auto w-full overflow-hidden">
        <div className="w-full text-center shrink-0 mb-[16px] md:mb-[32px]">
          <h1 className="text-xl md:text-headline-md text-on-background font-bold">Flora and Fauna</h1>
        </div>

        {/* Dynamic Responsiveness Layer */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[10px] md:gap-[24px] w-full max-w-5xl items-stretch justify-center">
          {interests.map((item, index) => {
            const isSelected = selected.has(item.name);
            return (
              <div
                key={item.name}
                className={`relative group cursor-pointer overflow-hidden rounded-xl border p-[12px] md:p-[20px] flex flex-col justify-between transition-all min-h-[90px] md:min-h-[120px] h-full ${
                  isSelected 
                    ? 'border-primary bg-primary-container text-on-primary-container selected-ring' 
                    : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-on-surface'
                }`}
                onClick={() => toggleSelection(item.name)}
                style={{
                  opacity: visible.includes(index) ? 1 : 0,
                  transform: visible.includes(index) ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div>
                  <span className={`text-[10px] md:text-xs font-label-caps mb-1 block transition-colors ${
                    isSelected ? 'text-primary' : 'text-on-surface-variant/80'
                  }`}>
                    {item.label}
                  </span>
                  <h3 className={`tracking-tight text-sm md:text-lg font-semibold transition-colors ${
                    isSelected ? 'text-primary' : 'text-on-surface'
                  }`}>
                    {item.name}
                  </h3>
                </div>

                <div className="flex justify-end items-end w-full mt-1 md:mt-2 shrink-0">
                  <div className={`p-1 md:p-1.5 rounded-full transition-all duration-200 ${
                    isSelected 
                      ? 'bg-primary text-white scale-100 opacity-100' 
                      : 'bg-surface-container-highest text-on-surface-variant opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'
                  }`}>
                    <span className="material-symbols-outlined text-[16px] md:text-[18px] block">
                      {isSelected ? 'check' : 'add'}
                    </span>
                  </div>
                </div>
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
            onClick={() => navigate('/onboarding/seasons')}
            disabled={loading}
          >
            <span className="material-symbols-outlined text-[20px] md:text-[24px]">arrow_back</span>
            <span>Back</span>
          </button>
          <button 
            className="text-secondary text-sm md:text-base font-medium hover:text-on-surface transition-colors" 
            onClick={() => navigate('/onboarding/landscapes')}
            disabled={loading}
          >
            Skip
          </button>
        </div>
      </footer>
    </div>
  )
}