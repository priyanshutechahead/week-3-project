import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

  useEffect(() => {
    interests.forEach((_, index) => {
      setTimeout(() => {
        setVisible(prev => [...prev, index])
      }, index * 100)
    })
  }, [])

  const toggleSelection = (name) => {
    const next = new Set(selected)
    if (next.has(name)) {
      next.delete(name)
      setSelected(next)
    } else {
      next.add(name)
      setSelected(next)
      setTimeout(() => navigate('/onboarding/landscapes'), 400)
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-body-lg text-body-lg">
      {/* Header */}
      <header className="w-full h-16 bg-surface border-b border-outline-variant flex items-center px-[24px] fixed top-0 z-50">
        <div className="max-w-[1280px] w-full mx-auto flex justify-between items-center">
          <span className="text-headline-md font-headline-md font-bold text-primary">Discoverly</span>
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="flex items-center gap-4">
              <span className="text-label-caps font-label-caps text-secondary uppercase tracking-widest">Step 3 of 4</span>
              <div className="w-48 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-primary progress-glow transition-all duration-700"></div>
              </div>
            </div>
            <span className="text-body-sm font-body-sm text-on-surface-variant">Biological Interests</span>
          </div>
          <div className="md:hidden">
            <span className="text-label-caps font-label-caps text-primary">3 / 4</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow pt-[64px] pb-[64px] px-[24px] mt-16 max-w-[1280px] mx-auto w-full">
        <div className="max-w-4xl mx-auto mb-[24px] text-center">
          <h1 className="font-headline-md text-headline-md text-on-background mb-[8px]">Curate Your Biological Focus</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Select the ecosystems and species that drive your itinerary intelligence. Our AI will prioritize these habitats in your future expeditions.
          </p>
        </div>

        {/* Interest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px]">
          {interests.map((item, index) => (
            <div
              key={item.name}
              className={`interest-card-hover ${item.colSpan} relative group cursor-pointer overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest ${
                selected.has(item.name) ? 'selected-ring' : ''
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

        {/* Search */}
        <div className="mt-[64px] max-w-2xl mx-auto">
          <div className="flex flex-col gap-2">
            <label className="text-label-caps font-label-caps text-secondary">DON&apos;T SEE YOUR INTEREST?</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary">search</span>
              <input className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="Search for specific species, biomes, or botanical families..." type="text" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface border-t border-outline-variant py-4 px-[24px] fixed bottom-0 z-50">
        <div className="max-w-[1280px] w-full mx-auto flex justify-between items-center">
          <button className="flex items-center gap-2 px-6 py-2 border border-outline-variant rounded-lg text-secondary font-medium hover:bg-surface-container transition-colors active:scale-95" onClick={() => navigate('/onboarding/seasons')}>
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span>Back</span>
          </button>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-body-sm text-on-surface-variant italic">Next step: Geographical Landscapes</span>
          </div>
          <button className="flex items-center gap-2 px-8 py-2 border border-outline-variant rounded-lg text-secondary font-medium hover:bg-surface-container transition-colors active:scale-95" onClick={() => navigate('/onboarding/landscapes')}>
            <span>Skip</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
