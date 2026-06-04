import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const cityPills = ['Tokyo', 'Kyoto', 'Osaka', 'Fukuoka', 'Sapporo']

const similarDestinations = [
  {
    name: 'South Korea',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkMGVwHnqpR_nK3AlLi2fO3HbVe_AqRjfO1VmrYxrpqA9q3SWekKJOgD_GZo3f_iVZVYvnSU_lgwjOcEOL5RgGcVr4djGVuMN3BwKlSmDRTZH-A44Y3uFiJmtFRwcmTdNKICx83YAFqkfOUPPyh0YHuIiCYCHhFzJPJw-Gz7OSwz05ZkW1mQPk1xUclNmXFPiDl7Woh5KfixpDnYkSE10qqz3L5MaX1p3yjWJqhSO-dJIlcGHcHPY6tJCsmD3iCfkP9aWK7MjmJI',
    match: '94%',
    desc: 'K-pop culture, ancient temples, and cutting-edge technology.',
  },
  {
    name: 'Taiwan',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASm_I7IHfXpFQCWXdxnBgcDe3EUyYhtm9mHJMbMhBnZpQPJxAk_JKoqPSR9lKEuK-QcnA5uPHzPQu67nXpn_Zc4ADn9i5YTmw9BL8aCy3S7RQq2eR-3_y2FeBLBl8QqXKvHwaCYXLUC3ORjkJbVAzOmGQR1TGPMo8tZSM7rBBQY3oa1xaprFLEQIZ_JJ4Bb9nqmLfSVLkGBZXzXVqb_PYYrI-T-8b_1fknGOl15yUDalH64VcIr30u1T9RHvFSmNM4WOG0vhxh1A',
    match: '91%',
    desc: 'Night markets, bubble tea origins, and stunning national parks.',
  },
  {
    name: 'Singapore',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSWwj_qEpK_fCmKd3-6DuWvupVl0eKLULSEjcQxZyYZs66pxuX_RXMQQ_7bKkXfnCyf0aLlr3nfPMCIBixZl9E3-y_U-YXwO3D5ZuFWf1l4vEq0MXX48P-k04V-W8K8hgutLXGtWmLi-JG3bVQMKjMPQxiLmcTM-2VJlj06i8oYnqsXqvdDk0YKvzxpS5UdI0pkLqXGKxXbIhVTptHx2UPNINvOoY_dH4wUhiZUcwq2Xgy6ZCThqrLPSACPbXLkD72gg2qiV5l4',
    match: '88%',
    desc: 'A melting pot of cultures with world-class street food.',
  },
  {
    name: 'Vietnam',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvV-Y3_SxYLbq7rKdTXqDmqLxEW7yFrMC0Kfy5Ub64LD-o5OUJf9IH2pRqGiHKlMbN_FnY3pbgkB5zCYfD8UNUBq6F5Jd-VE4u9qGTFyGLj_eCu3hq_92TnQzPf6bK6eBmLxlsOoHyWP6d-_MFEXZxnuWYmU0Fma3FfPXR5sXLnHqaXBK0lMOXIIE3WkKvFTmDPqxlIoH6ZXx3r1xVJU9IZL-WQQqq7WJ6zhHpIaQaA3YsIkpFJA9dUXcxUOMiAFmAGp5D2_B3j8',
    match: '86%',
    desc: 'Ancient culture, stunning coastlines, and vibrant street life.',
  },
]

export default function DemoPage() {
  const [activeCity, setActiveCity] = useState('Tokyo')
  const [time, setTime] = useState('')
  const carouselRef = useRef(null)

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

  const scrollCarousel = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
    }
  }

  return (
    <div className="font-body-lg text-body-lg bg-surface min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-[24px] py-4 flex justify-between items-center">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">Discoverly</Link>
          <div className="hidden md:flex items-center bg-surface-container-low border border-outline-variant px-4 py-2 rounded-full w-80">
            <span className="material-symbols-outlined text-outline text-body-sm mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-body-sm w-full placeholder:text-on-surface-variant/50 outline-none" placeholder="Search countries, insights..." type="text" />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/signup" className="bg-primary text-on-primary px-6 py-2 rounded-full font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm text-body-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 max-w-[1280px] mx-auto px-[24px] pb-[24px]">
        {/* Welcome Header */}
        <div className="mb-[24px]">
          <p className="text-label-caps font-label-caps text-primary uppercase tracking-widest mb-1">Welcome, Explorer</p>
          <h2 className="font-headline-md text-headline-md text-on-surface">What will you discover today?</h2>
        </div>

        {/* Hero Card */}
        <section className="relative rounded-2xl overflow-hidden mb-[24px] group">
          <img alt="Japan scenic" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVX8teFbpg6QxgNc32g33Fm3y0R0EGBxZjfB6fxJ12SXOI8TZxN0pS1MbJT1IwPE3LOUNy-Cfa1LuWB6TBvpEz0jjQp8RM_zV3VyNLIeqYVB3B9FW7uipIZ-mLMEAyJpnIIlvGDHxLthBJLBfnxZ1sKS48f5yBGHf-pFNGJuIiVR2yvZqwKqPfYqg4M3ypv2ygH64DmtLAuoNfKbSh-3P5mWaUDXCAzDQHMF2yyxjXYLdPWCGHLzr-rQNh-0pZ_4LJjT7r6d6GlM" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="text-label-caps text-white/80 uppercase">Featured Destination</span>
            <h1 className="text-4xl text-white font-bold font-headline-md mt-1">Japan</h1>
            <p className="text-white/80 mt-2 max-w-lg">From ancient shrines to neon-lit streets, discover a nation where tradition seamlessly blends with innovation.</p>
            {/* City Search */}
            <div className="mt-6 flex items-center gap-3 bg-white/20 backdrop-blur-md p-2 rounded-xl w-fit">
              <span className="material-symbols-outlined text-white/80 pl-2">location_city</span>
              <div className="flex gap-2">
                {cityPills.map(city => (
                  <button
                    key={city}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeCity === city ? 'bg-white text-on-surface shadow-sm' : 'text-white/80 hover:bg-white/10'}`}
                    onClick={() => setActiveCity(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Intelligence Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[24px]">
          {/* Weather */}
          <div className="glass-card rounded-xl p-[24px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">cloud</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Weather Now</span>
            </div>
            <p className="text-[40px] font-bold text-on-surface leading-none">22°C</p>
            <p className="text-body-sm text-on-surface-variant mt-1">Partly Cloudy</p>
            <div className="mt-4 flex justify-between text-label-caps text-on-surface-variant">
              <span>Humidity: 65%</span>
              <span>Wind: 12 km/h</span>
            </div>
          </div>
          {/* Air Quality */}
          <div className="glass-card rounded-xl p-[24px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">air</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Air Quality</span>
            </div>
            <p className="text-[40px] font-bold text-emerald-500 leading-none">42</p>
            <p className="text-body-sm text-emerald-600 font-semibold mt-1">Good — Safe for outdoor activities</p>
          </div>
          {/* Exchange Rate */}
          <div className="glass-card rounded-xl p-[24px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">currency_exchange</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Exchange Rate</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-[40px] font-bold text-on-surface leading-none">¥155.2</p>
              <span className="text-body-sm text-secondary">/ $1 USD</span>
            </div>
            <p className="text-body-sm text-emerald-600 mt-2">▲ 0.3% from yesterday</p>
          </div>
          {/* Local Time */}
          <div className="glass-card rounded-xl p-[24px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Local Time (JST)</span>
            </div>
            <p className="text-[40px] font-bold text-on-surface leading-none font-mono">{time || '--:--:-- --'}</p>
            <p className="text-body-sm text-on-surface-variant mt-1">UTC +9 / {activeCity}</p>
          </div>
        </section>

        {/* Why People Love Japan */}
        <section className="mb-[24px]">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Why People Love Japan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
            {[
              { icon: 'temple_buddhist', title: 'Ancient Culture', desc: 'Thousand-year-old temples, tea ceremonies, and samurai heritage.' },
              { icon: 'ramen_dining', title: 'World-Class Cuisine', desc: 'From Michelin-starred sushi to humble ramen shops on every corner.' },
              { icon: 'train', title: 'Bullet Trains', desc: 'The Shinkansen network: punctual, fast, and incredibly scenic.' },
              { icon: 'park', title: 'Natural Beauty', desc: 'Cherry blossoms, volcanic peaks, and pristine coastal regions.' },
            ].map(item => (
              <div key={item.title} className="glass-card rounded-xl p-[24px] group">
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block group-hover:scale-110 transition-transform">{item.icon}</span>
                <h4 className="font-medium text-on-surface mb-2">{item.title}</h4>
                <p className="text-body-sm text-on-surface-variant">{item.desc}</p>
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
              <div key={item.title} className="glass-card rounded-xl p-[24px] flex items-start gap-4 group cursor-pointer">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.color}`}>{item.cat}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-on-surface group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Similar Destinations */}
        <section className="mb-[24px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface">Similar Destinations</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-low transition-colors" onClick={() => scrollCarousel(-1)}>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-low transition-colors" onClick={() => scrollCarousel(1)}>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
          <div ref={carouselRef} className="flex gap-[24px] overflow-x-auto no-scrollbar pb-4">
            {similarDestinations.map(dest => (
              <div key={dest.name} className="min-w-[280px] glass-card rounded-xl overflow-hidden group cursor-pointer">
                <div className="relative h-40 overflow-hidden">
                  <img alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={dest.img} />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-primary">{dest.match} match</div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-on-surface">{dest.name}</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1">{dest.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer variant="minimal" />
    </div>
  )
}
