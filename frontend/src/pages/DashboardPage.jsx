import { useState, useEffect, useRef } from 'react'
import ChatAssistant from '../components/ui/ChatAssistant'
import Footer from '../components/layout/Footer'

const tabs = ['Tech Innovation', 'Cultural Heritage', 'Food & Cuisine', 'Cleanliness', 'Safety']

const tabContent = {
  'Tech Innovation': {
    title: 'A Global Hub for Technology',
    desc: "Japan leads in robotics, AI, and consumer electronics. Tokyo's Akihabara district is a pilgrimage for tech enthusiasts, while Osaka drives innovation in manufacturing.",
    stats: [
      { label: 'Robot Density', value: '#1 Globally' },
      { label: 'R&D Spend', value: '3.26% GDP' },
    ],
  },
  'Cultural Heritage': {
    title: 'Thousands of Years of History',
    desc: "From Kyoto's 2,000+ temples to Nara's ancient deer parks, Japan's cultural depth is unmatched. Traditional arts like Ikebana and Kintsugi inspire the world.",
    stats: [
      { label: 'UNESCO Sites', value: '25 Total' },
      { label: 'Temples', value: '77,000+' },
    ],
  },
  'Food & Cuisine': {
    title: 'A Culinary Powerhouse',
    desc: 'Japan has more Michelin-starred restaurants than any other country. From sushi and ramen to kaiseki, every meal is a meticulously crafted experience.',
    stats: [
      { label: 'Michelin Stars', value: '413 Restaurants' },
      { label: 'UNESCO Food', value: 'Washoku (2013)' },
    ],
  },
  'Cleanliness': {
    title: 'A Culture of Purity',
    desc: "Japan's cleanliness is legendary. Public spaces are immaculate, driven by a deep cultural respect for shared environments and meticulous civic responsibility.",
    stats: [
      { label: 'Clean Index', value: '98/100' },
      { label: 'Air Quality', value: 'Good (AQI 42)' },
    ],
  },
  'Safety': {
    title: 'One of the Safest Countries',
    desc: "Japan consistently ranks among the world's safest countries. Low crime rates, reliable infrastructure, and a helpful culture make solo travel remarkably easy.",
    stats: [
      { label: 'Safety Rank', value: '#9 Global' },
      { label: 'Crime Rate', value: 'Very Low' },
    ],
  },
}

const bestPlaces = [
  {
    name: 'Tokyo Skyline',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwEFMrXyolVP8lD6RvzvNwXMw26ZSG-SAvvUEjJkBdrpLAEcscKmMwOe7FAMW3uSwdhLZrAODrJI-ZSos6Nrpgectuotcvn4FzYCYQ7YqEmN-UbOUiukhwnsC0n8Six1ryvHcUnE7GsrnJMvXIwuvhzgPThQ1UBxEJGRBHe444SNEM0IaR4PNL1M01gNNcn49rVqs3s2otj6wEDLRN8cHptceBFRhaZ2iuHB-7ycT6qm_TRNDIMOQGuMTjFK4smEbo4lJYTuU-kIM',
  },
  {
    name: 'Kyoto Gardens',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7nEY3MwfxhQ3m_vHcEWHpqXKSdCqxMFSX3fBqcGkSE1_0plpZwi83qSEcpFqSzR6Qp4RTJaqvJ5H3gDLfmFg_HjXTwPPHLQ86jj2rGIKC4g3yLLaE8XYpHIcjPiAA_mYkJgxYKBPqnPqUxDxQ3FWLSGQk-6b2ZPjC-hk7cfXTU7XDMHQ9a8r1DSTu-G-eylCL2wEqJODPwb6Z4JK8dNdDQkEDpVDGLjl-GkD9GxEYQajq74RZJrMhpOuMSC3amYqMi0wdO7Mg',
  },
  {
    name: 'Mt. Fuji',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyHwMl0xyObMeRt-QPOoNcUH9gBuujvXbdp-BZp7hTLolQfdUW2cQ9rvA7_K3E6aoaKCPx3wvTMkF2yUpNfjw4C4SjZR4LkO2UhVuZ8lqhqVP83M_nvykKKawTmJ1yDXl-TNBFZsOhZQp-e62rqt17Q-FAVGeUHPiv2hWeXRDiMDV-irX8Q2zOUvORCRX-iBikouioAdc-whK9TFpzpL-TMu2QuUM9Z0PFfuhflfFQhTWP-hxdSKmPSLEauwDbjtJQEgSZlnAL9HA',
  },
  {
    name: 'Osaka Streets',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqt4A-h9dWonQDG1WNhNR21Lb-B0kbk8E6nfv3xbpJWw7kN6FXN-B7d_7yC9SB7DXZL_2lGfUFpUHFdVFLJPtCJBYA3Sxr3WW-EIx0kEKwkpZCe2HY2yyY-bWBqbsyXO1WzWLCbS-Af7LGP_8f2dP0L81tA7Cs2Yt3nPoUOPT_ffQ3xCl4ZJGtZqfRmPxfVxVGjQM3prgTJTwONvZeNJB8RU6yzBqjLU-a1hLWvSAGxDkuJpqXR1HKRHHofwsJDa0oJiJGeSeg',
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Tech Innovation')
  const [time, setTime] = useState('')
  const [showModal, setShowModal] = useState(false)
  const placesRef = useRef(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const jstOffset = 9 * 60
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000
      const jst = new Date(utcMs + jstOffset * 60000)
      setTime(jst.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setShowModal(false) }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const scrollPlaces = (dir) => {
    if (placesRef.current) {
      placesRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
    }
  }

  const activeContent = tabContent[activeTab]

  return (
    <div className="min-h-screen">
      {/* Content */}
      <div className="p-[24px] max-w-[1280px] mx-auto">
        {/* Welcome & Persona */}
        <div className="mb-[24px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-caps font-label-caps text-primary">CURATED FOR YOU</p>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Good Morning, John.</h2>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant cursor-pointer hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-primary text-[18px]">flag</span>
              <span className="text-body-sm font-medium">Japan</span>
              <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
            </div>
          </div>
          <div className="mt-4 bg-primary-fixed/30 border border-primary/10 px-6 py-3 rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            <p className="text-body-sm text-on-surface-variant">Tailored for your <strong className="text-primary">Tech Explorer Persona</strong> — All data is curated through a technology-centric lens.</p>
          </div>
        </div>

        {/* Hero Country Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[24px]">
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden group">
            <img alt="Japan scenic" className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVX8teFbpg6QxgNc32g33Fm3y0R0EGBxZjfB6fxJ12SXOI8TZxN0pS1MbJT1IwPE3LOUNy-Cfa1LuWB6TBvpEz0jjQp8RM_zV3VyNLIeqYVB3B9FW7uipIZ-mLMEAyJpnIIlvGDHxLthBJLBfnxZ1sKS48f5yBGHf-pFNGJuIiVR2yvZqwKqPfYqg4M3ypv2ygH64DmtLAuoNfKbSh-3P5mWaUDXCAzDQHMF2yyxjXYLdPWCGHLzr-rQNh-0pZ_4LJjT7r6d6GlM" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-label-caps text-white/80 uppercase">Currently Exploring</span>
              <h1 className="text-4xl text-white font-bold font-headline-md mt-1">Japan</h1>
              <p className="text-white/80 mt-2 max-w-lg">A land where ancient traditions meet cutting-edge innovation. Your personalized intelligence feed is active.</p>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {['Tokyo', 'Kyoto', 'Osaka', 'Sapporo'].map((city) => (
              <div key={city} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
                <span className="material-symbols-outlined text-primary mb-2">location_city</span>
                <h4 className="font-medium">{city}</h4>
                <p className="text-label-caps text-on-surface-variant mt-1">Explore</p>
              </div>
            ))}
            <div className="col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-label-caps text-on-surface-variant">Population</p>
                <p className="text-headline-md font-headline-md">125.7M</p>
              </div>
              <div>
                <p className="text-label-caps text-on-surface-variant">Language</p>
                <p className="text-headline-md font-headline-md">Japanese</p>
              </div>
              <div>
                <p className="text-label-caps text-on-surface-variant">Currency</p>
                <p className="text-headline-md font-headline-md">JPY ¥</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why People Love Japan — Tabs */}
        <section className="mb-[24px]">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Why People Love Japan</h3>
          <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full text-body-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 transition-all">
            <h4 className="font-headline-md text-headline-md text-on-surface mb-4">{activeContent.title}</h4>
            <p className="text-body-lg text-on-surface-variant mb-6">{activeContent.desc}</p>
            <div className="flex gap-6">
              {activeContent.stats.map(stat => (
                <div key={stat.label} className="bg-surface-container-low px-4 py-3 rounded-lg">
                  <p className="text-label-caps text-on-surface-variant">{stat.label}</p>
                  <p className="font-headline-md text-headline-md text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Places Carousel */}
        <section className="mb-[24px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface">Best Places to Visit</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-low transition-colors" onClick={() => scrollPlaces(-1)}>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-low transition-colors" onClick={() => scrollPlaces(1)}>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
          <div ref={placesRef} className="flex gap-[24px] overflow-x-auto no-scrollbar pb-4">
            {bestPlaces.map((place, index) => (
              <div
                key={place.name}
                className="min-w-[280px] rounded-xl overflow-hidden border border-outline-variant group cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => { if (index === 2) setShowModal(true) }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img alt={place.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={place.img} />
                </div>
                <div className="p-4 bg-surface-container-lowest">
                  <h4 className="font-medium text-on-surface">{place.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real-Time Feed */}
        <section className="mb-[24px]">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Real-Time Intelligence Feed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {[
              { cat: 'Tech', title: 'Tokyo unveils new AI-powered transit navigation system', time: '2h ago', color: 'bg-blue-100 text-blue-800' },
              { cat: 'Travel', title: 'Japan eases visa requirements for 15 more countries', time: '4h ago', color: 'bg-emerald-100 text-emerald-800' },
              { cat: 'Culture', title: 'Kyoto launches digital preservation of 200 historic temples', time: '6h ago', color: 'bg-amber-100 text-amber-800' },
              { cat: 'Economy', title: 'Yen strengthens against USD amid policy changes', time: '8h ago', color: 'bg-purple-100 text-purple-800' },
            ].map(item => (
              <div key={item.title} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px] flex items-start gap-4 group cursor-pointer hover:shadow-md transition-shadow">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.color}`}>{item.cat}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-on-surface group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Intelligence Widgets */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[24px]">
          {/* Weather */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">cloud</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Weather</span>
            </div>
            <p className="text-[40px] font-bold text-on-surface leading-none">22°C</p>
            <p className="text-body-sm text-on-surface-variant mt-1">Partly Cloudy — Tokyo</p>
          </div>
          {/* Air Quality */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">air</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Air Quality</span>
            </div>
            <div className="relative w-24 h-24 mx-auto my-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle className="stroke-surface-container-high" cx="18" cy="18" fill="none" r="15.9155" strokeWidth="2"></circle>
                <circle className="stroke-emerald-500" cx="18" cy="18" fill="none" r="15.9155" strokeDasharray="42, 100" strokeLinecap="round" strokeWidth="2"></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-500">42</span>
              </div>
            </div>
            <p className="text-center text-body-sm text-emerald-600 font-semibold">Good</p>
          </div>
          {/* Currency */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">currency_exchange</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Currency</span>
            </div>
            <p className="text-[40px] font-bold text-on-surface leading-none">¥155.2</p>
            <p className="text-body-sm text-on-surface-variant mt-1">per $1 USD</p>
          </div>
          {/* Live Clock */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">JST Time</span>
            </div>
            <p className="text-[40px] font-bold text-on-surface leading-none font-mono">{time || '--:--:--'}</p>
            <p className="text-body-sm text-on-surface-variant mt-1">Japan Standard Time</p>
          </div>
        </section>
      </div>

      <Footer variant="dashboard" />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-surface rounded-2xl max-w-2xl w-full mx-4 overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-outline-variant">
              <h3 className="font-headline-md text-headline-md">Mt. Fuji — Virtual Tour</h3>
              <button className="p-1 hover:bg-surface-container rounded-full" onClick={() => setShowModal(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6">
              <img alt="Mt. Fuji" className="w-full h-64 object-cover rounded-xl mb-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyHwMl0xyObMeRt-QPOoNcUH9gBuujvXbdp-BZp7hTLolQfdUW2cQ9rvA7_K3E6aoaKCPx3wvTMkF2yUpNfjw4C4SjZR4LkO2UhVuZ8lqhqVP83M_nvykKKawTmJ1yDXl-TNBFZsOhZQp-e62rqt17Q-FAVGeUHPiv2hWeXRDiMDV-irX8Q2zOUvORCRX-iBikouioAdc-whK9TFpzpL-TMu2QuUM9Z0PFfuhflfFQhTWP-hxdSKmPSLEauwDbjtJQEgSZlnAL9HA" />
              <p className="text-body-lg text-on-surface-variant mb-6">
                Mount Fuji, at 3,776 meters, is Japan&apos;s highest peak and most iconic landmark. Experience the sunrise from its summit or explore the Five Lakes region at its base.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {['Sunrise Trek', 'Five Lakes', 'Chureito Pagoda'].map(title => (
                  <div key={title} className="bg-surface-container-low rounded-lg p-3 text-center cursor-pointer hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-primary mb-1">play_circle</span>
                    <p className="text-body-sm font-medium">{title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <ChatAssistant />
    </div>
  )
}
