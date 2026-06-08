import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMe } from '../../api/authAPI'
import useAuthStore from '../../store/authStore'

const interests = [
  {
    label: 'ECOSYSTEM',
    name: 'Tropical Rainforests',
    colSpan: 'md:col-span-8',
    aspect: 'aspect-[16/7]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfS1NYy6x8DNmuTYFytBv4UV0Jcn9BF5zdKyT6LLkfM5gp3qQ7V-qvg11E4ERFMo3825y1eA29yFYVLAcp12D5Qsj21zH3qnj-n3HIWkVjofE8meFtw59gxZQULGpNJoZOqtbAy9-MRKlNYp_FbT4Yz3fqond7ilSUAPVdd3bLWo2Wmeq6fZhwUGetGnR0rZE2g9NYik9CR9dL29rtsyoyH5NRencbd42JmcSDp4w1QMa3FRpqIVTDDPMURtcAktRXBWoQBe4oGGM',
  },
  {
    label: 'WILDLIFE',
    name: 'Marine Life',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-square',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd8XLy6yOqcVtP8x4StJFdlTf8nfL9H9gbenqkCVbJTD1ZqouXuU2fHjQJdJQOmJfBP6AkBjNYtpPdzWRqRpkPZVHCLZ3PbsmhLUXZjTxsCM5Dl9WHUe7zYsrllCuvaYhDHypP_HdKPrGLN-xNb93fwdMfL5DBz23v0A8Le3TauB_eEJBjyEe4e41BJqcmwJug2Hdhl4SebaFN9_M5qeS1J2qN3aBHmF8tZjHLwEz4p-d8nv7WLElX2uTYIqyfhrCYHJq2bxNnPII',
  },
  {
    label: 'AVIAN',
    name: 'Rare Birds',
    colSpan: 'md:col-span-4',
    aspect: 'aspect-square',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfLzryNA5N9VEwuAvWPQihSlW8cfvGdSm7X_zbHTwx8sk7P34yn7Ph_2OAA7bf4X_JDsNO_mLXY9gW5ykoQ1Cp-ZSWoHUqC3MxoItE7e6yl35yieqgW7qlqrgYRgv6eTZCPDmtZ_QcBCnhB5xpD_rodRv-p0Uk4bW7bq_MwpwUeVffYtUaGz8ycdsiaWL5PO0Cwg4M0atfq9MhcsmG3hleQapUor_-z2SYzCCM7HUiG27zjiL5GJ7nFGl-eYooL-J6NDypRzVEVzA',
  },
  {
    label: 'POLAR',
    name: 'Arctic Fauna',
    colSpan: 'md:col-span-8',
    aspect: 'aspect-[16/7]',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtY-CJkN8vhFE9O7zo5wvXQuf7tVvujVjL3IrHjYi99MkXSjREUlmsVfSlYR7PT5XJ09sVZ58Zlvq0PcwntGaf7o12ufKqU5j_PTRJuO6_FkMcVSZMtWtFeTKdPCo_5zsd7KE-WtaaHlSTMmewCSNEAnoHyytw8Ul5sJ0ENbifl5ShmQf_pwbe9iV12gbZnOUqJT1GQSWBj04bfSh07qrDhHP5H1AD9XfmG0MCh7qox_KnJuzM8-iyejDnBe6LAT9WZBA9WlQ91fg',
  },
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
      }, index * 100)
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
    <div className="h-screen overflow-hidden flex flex-col font-body-lg text-body-lg bg-surface text-on-surface">
      {/* Header */}
      <header className="w-full bg-surface-container-lowest border-b border-outline-variant py-[24px] sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-[24px] flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4">
            <span className="text-primary font-headline-md font-bold tracking-tight">Discoverly</span>
            <span className="text-label-caps font-label-caps text-on-surface-variant">Step 3 of 4</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-3/4 transition-all duration-500 ease-out"></div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow overflow-y-auto py-[64px] px-[24px] max-w-[1280px] mx-auto w-full">
        <div className="max-w-4xl mx-auto mb-[24px] text-center">
          <h1 className="font-headline-md text-headline-md text-on-background mb-[8px]">Curate Your Biological Focus</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Select the ecosystem or species that drives your itinerary intelligence.
          </p>
        </div>

        {/* Interest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px]">
          {interests.map((item, index) => (
            <div
              key={item.name}
              className={`interest-card-hover ${item.colSpan} relative group cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest ${selected.has(item.name) ? 'selected-ring' : ''
                }`}
              onClick={() => toggleSelection(item.name)}
              style={{
                opacity: visible.includes(index) ? 1 : 0,
                transform: visible.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            >
              <div className={`${item.aspect} w-full relative overflow-hidden`}>
                <img alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={item.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="p-[24px] absolute bottom-0 left-0 right-0">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-label-caps font-label-caps text-white/80 mb-1 block">{item.label}</span>
                    <h3 className="text-headline-md font-headline-md text-white">{item.name}</h3>
                  </div>
                  <div className={`bg-primary text-white p-2 rounded-full transition-opacity duration-200 ${selected.has(item.name) ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="material-symbols-outlined">check</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-outline-variant py-[24px] mt-auto">
        <div className="max-w-[1280px] mx-auto px-[24px] flex justify-between items-center">
          <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium" onClick={() => navigate('/onboarding/seasons')}>
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back</span>
          </button>
          <button className="text-secondary font-medium hover:text-on-surface transition-colors" onClick={() => navigate('/onboarding/landscapes')}>Skip</button>
        </div>
      </footer>
    </div>
  )
}
