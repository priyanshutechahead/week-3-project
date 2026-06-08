import { useEffect, useRef } from 'react'
import Footer from '../components/layout/Footer'

const feedItems = [
  {
    category: 'Emerging Tech',
    categoryColor: 'bg-blue-100 text-blue-800',
    title: 'Autonomous Transport Grid Activated in Neo-Tokyo Corridor',
    desc: "Japan's Ministry of Transport has officially activated the first segment of its autonomous vehicle network in the Greater Tokyo area...",
    time: '42 minutes ago',
    source: 'Nikkei Asia',
    icon: 'memory',
  },
  {
    category: 'Policy Shift',
    categoryColor: 'bg-amber-100 text-amber-800',
    title: 'Revised Digital Nomad Visa Now Permits 12-Month Stay',
    desc: "An updated framework for Japan's Digital Nomad Visa extends the maximum stay from 6 to 12 months, effective next quarter...",
    time: '3 hours ago',
    source: 'Japan Times',
    icon: 'gavel',
  },
  {
    category: 'Socio-Economic',
    categoryColor: 'bg-emerald-100 text-emerald-800',
    title: 'Kyoto\'s New Cultural Preservation Tax on Tourism Revenue',
    desc: 'The Kyoto Prefecture has announced a 2% cultural preservation levy on all tourism-related transactions within the city...',
    time: '7 hours ago',
    source: 'Reuters Japan',
    icon: 'account_balance',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7nEY3MwfxhQ3m_vHcEWHpqXKSdCqxMFSX3fBqcGkSE1_0plpZwi83qSEcpFqSzR6Qp4RTJaqvJ5H3gDLfmFg_HjXTwPPHLQ86jj2rGIKC4g3yLLaE8XYpHIcjPiAA_mYkJgxYKBPqnPqUxDxQ3FWLSGQk-6b2ZPjC-hk7cfXTU7XDMHQ9a8r1DSTu-G-eylCL2wEqJODPwb6Z4JK8dNdDQkEDpVDGLjl-GkD9GxEYQajq74RZJrMhpOuMSC3amYqMi0wdO7Mg',
  },
]

const reports = [
  { title: 'Japan Tech Landscape 2026', pages: '48 pages', icon: 'description' },
  { title: 'Visa & Policy Guide', pages: '32 pages', icon: 'description' },
  { title: 'Cultural Intelligence Brief', pages: '24 pages', icon: 'description' },
]

export default function IntelligencePage() {
  const cardRefs = useRef([])

  useEffect(() => {
    const handlers = []
    cardRefs.current.forEach(card => {
      if (card) {
        const handler = (e) => {
          const rect = card.getBoundingClientRect()
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
        }
        card.addEventListener('mousemove', handler)
        handlers.push({ card, handler })
      }
    })
    return () => handlers.forEach(({ card, handler }) => card.removeEventListener('mousemove', handler))
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-[24px] max-w-[1280px] mx-auto flex-1 w-full">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-[24px]">
          <div>
            <span className="text-label-caps font-label-caps text-primary uppercase tracking-widest">Intelligence Engine</span>
            <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Live Intelligence Feed</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-body-sm font-medium hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-body-sm font-medium hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Board
            </button>
          </div>
        </div>

        {/* Feed Items */}
        <div className="space-y-[24px] mb-[24px]">
          {feedItems.map((item, index) => (
            <div
              key={item.title}
              ref={el => cardRefs.current[index] = el}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="p-[24px] flex gap-6">
                <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.categoryColor}`}>{item.category}</span>
                    <span className="text-label-caps text-on-surface-variant">{item.time}</span>
                  </div>
                  <h3 className="font-headline-md text-[18px] text-on-surface mb-2">{item.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{item.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-label-caps text-outline">Source: {item.source}</span>
                    <button className="text-primary text-body-sm font-medium hover:underline flex items-center gap-1">
                      Read Analysis <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
                {item.img && (
                  <div className="hidden lg:block w-48 h-32 rounded-xl overflow-hidden shrink-0">
                    <img alt={item.title} className="w-full h-full object-cover" src={item.img} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sentiment Heatmap */}
        <section className="mb-[24px]">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Sentiment Heatmap</h3>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-[24px] relative overflow-hidden">
            <div className="relative h-[300px] bg-surface-container rounded-xl flex items-center justify-center overflow-hidden">
              <img alt="World map heatmap" className="w-full h-full object-contain opacity-30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQG3ZvGYAh7xRDPEfXK3o0hc9r95dlkqLq2RvyZfMUkTsM-VkUCb3xKFVGzQBRfrRKSVy6dVJxPTXjIjFkUlXlb3FzM8I5MHPRtNTk6Iw1IzaZ78pC9eDq2HchT2eR4Iac3FsPAnBLQdD-f-DkZNAA2F6N3xbLIb5N-kfnC7BnP3E3-4R7RFfREgQXPKLKR5Xt-37ztTGOiJGb7Pp-C8rCR4J3oYwJhnJRt5VZeePcYpSCEPtWJIXipXlbk_fWPz7xc2Xv9HXSY" />
              {/* Animated heatmap blobs */}
              <div className="absolute top-[30%] left-[70%] w-16 h-16 bg-emerald-500/30 rounded-full animate-pulse blur-xl"></div>
              <div className="absolute top-[40%] left-[20%] w-12 h-12 bg-amber-500/20 rounded-full animate-pulse blur-xl" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-[50%] left-[50%] w-20 h-20 bg-blue-500/20 rounded-full animate-pulse blur-xl" style={{ animationDelay: '2s' }}></div>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center gap-6 text-body-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div> Positive</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-full"></div> Neutral</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Negative</div>
              </div>
              <div className="text-body-sm text-on-surface-variant">
                Overall Sentiment: <span className="text-emerald-600 font-semibold">Highly Positive (87%)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Intelligence Reports */}
        <section className="mb-[24px]">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Intelligence Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {reports.map(report => (
              <div key={report.title} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px] hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">{report.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-on-surface">{report.title}</h4>
                    <p className="text-label-caps text-on-surface-variant">{report.pages}</p>
                  </div>
                </div>
                <button className="w-full py-2 border border-outline-variant rounded-lg text-body-sm font-medium text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer variant="dashboard" />
    </div>
  )
}
