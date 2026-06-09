import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import ChatAssistant from '../components/ui/ChatAssistant'
import Footer from '../components/layout/Footer'
import { getCountryByName, getAllCountries, getIntelligence } from '../api/countryAPI'
import { getDestinationImage } from '../api/imageAPI'
import { getWeatherData } from '../api/weather_service'
import { getTravelNews } from '../api/news_service'
import useAuthStore from '../store/authStore'

const tabs = ['Tech Innovation', 'Cultural Heritage', 'Food & Cuisine', 'Cleanliness', 'Safety']

const getFallbackContent = (country) => ({
  'Tech Innovation': {
    title: `Technology in ${country}`,
    desc: `${country} is making significant strides in digital transformation and infrastructure development, fostering a unique tech ecosystem.`,
    stats: [{ label: 'Innovation', value: 'High' }, { label: 'Tech Hubs', value: 'Growing' }],
  },
  'Cultural Heritage': {
    title: `The Soul of ${country}`,
    desc: `Experience the rich history and traditions that define ${country}, from historic landmarks to local craftsmanship.`,
    stats: [{ label: 'UNESCO Sites', value: 'Multiple' }, { label: 'History', value: 'Ancient' }],
  },
  'Food & Cuisine': {
    title: `A Taste of ${country}`,
    desc: `The culinary scene in ${country} is a vibrant blend of traditional recipes and modern flavors.`,
    stats: [{ label: 'Street Food', value: 'World Class' }, { label: 'Top Dish', value: 'Local Favorite' }],
  },
  'Cleanliness': {
    title: 'Environmental Focus',
    desc: `Commitment to sustainability and urban maintenance is a visible priority throughout ${country}.`,
    stats: [{ label: 'Eco Index', value: 'Verified' }, { label: 'Air Quality', value: 'Monitored' }],
  },
  'Safety': {
    title: 'Peace of Mind',
    desc: `${country} maintains a welcoming environment with robust safety protocols for international travelers.`,
    stats: [{ label: 'Safety Rank', value: 'Top Tier' }, { label: 'Crime Rate', value: 'Low' }],
  },
})

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('Tech Innovation')
  const [time, setTime] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [countryData, setCountryData] = useState(null)
  const [weather, setWeather] = useState(null)
  const [news, setNews] = useState([])
  const [aiIntelligence, setAiIntelligence] = useState(null)
  const [heroImage, setHeroImage] = useState('')
  const [carouselPlaces, setCarouselPlaces] = useState([])
  const [showCountrySelector, setShowCountrySelector] = useState(false)
  const [allCountries, setCountriesList] = useState([])
  const [countrySearch, setCountrySearch] = useState('')
  const [usdRate, setUsdRate] = useState(null)

  const user = useAuthStore((state) => state.user)
  const [currentCountry, setCurrentCountry] = useState('Japan')
  const placesRef = useRef(null)

  const activeContent = aiIntelligence ? aiIntelligence[activeTab] : getFallbackContent(currentCountry)[activeTab]

  const location = useLocation()

  useEffect(() => {
    if (location.state?.selectedCountry) {
      setCurrentCountry(location.state.selectedCountry)
    } else if (user?.interests?.countries?.[0]) {
      setCurrentCountry(user.interests.countries[0])
    }
  }, [user, location.state])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries()
        if (data) setCountriesList(data.map(c => c.name.common).sort())
      } catch (err) {
        console.error('Error fetching countries list:', err)
      }
    }
    fetchCountries()
  }, [])

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD')
        const data = await response.json()
        setUsdRate(data.rates)
      } catch (err) {
        console.error('Error fetching exchange rates:', err)
      }
    }
    fetchRates()
  }, [])

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!currentCountry) return;

      try {
        const cData = await getCountryByName(currentCountry);
        setCountryData(cData);

        const [heroImg, place1, place2, place3, place4] = await Promise.all([
          getDestinationImage(`${currentCountry} landscape`).catch(() => null),
          getDestinationImage(`${currentCountry} city skyline`).catch(() => null),
          getDestinationImage(`${currentCountry} nature`).catch(() => null),
          getDestinationImage(`${currentCountry} landmark`).catch(() => null),
          getDestinationImage(`${currentCountry} street`).catch(() => null),
        ]);

        if (heroImg) setHeroImage(heroImg);
        setCarouselPlaces([
          { name: 'Capital View', img: place1 },
          { name: 'Natural Wonders', img: place2 },
          { name: 'Historic Landmarks', img: place3 },
          { name: 'Urban Life', img: place4 },
        ]);

        getTravelNews(currentCountry).then(data => setNews(data ? data.slice(0, 4) : [])).catch(e => console.error("News error", e));
        getIntelligence(currentCountry).then(data => setAiIntelligence(data)).catch(e => console.error("AI error", e));

        if (cData && cData.capital && cData.capital.length > 0) {
          getWeatherData(cData.capital[0]).then(wData => setWeather(wData)).catch(e => console.error("Weather error", e));
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };
    loadDashboardData();
  }, [currentCountry]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      let targetTime = now;
      if (countryData?.timezones?.[0]) {
        const offsetString = countryData.timezones[0];
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const offsetPart = offsetString.replace('UTC', '');
        if (offsetPart) {
          const sign = offsetPart.startsWith('-') ? -1 : 1;
          const parts = offsetPart.replace(/[+-]/, '').split(':').map(Number);
          const hours = parts[0];
          const minutes = parts[1] || 0;
          const totalOffsetMs = sign * ((hours * 3600000) + (minutes * 60000));
          targetTime = new Date(utc + totalOffsetMs);
        }
      }
      setTime(targetTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [countryData])

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

  const filteredCountries = allCountries.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  )

  const selectCountry = (name) => {
    setCurrentCountry(name)
    setShowCountrySelector(false)
    setCountrySearch('')
  }

  return (
    <div className="min-h-screen">
      <div className="p-[24px] max-w-[1280px] mx-auto">
        <div className="mb-[24px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-label-caps font-label-caps text-primary">CURATED FOR YOU</p>
              <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Good Morning, {user?.name?.split(' ')[0] || 'Explorer'}.</h2>
            </div>
            <div className="relative">
              <div
                onClick={() => setShowCountrySelector(!showCountrySelector)}
                className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant cursor-pointer hover:bg-surface-container transition-colors"
              >
                {countryData?.flags?.svg ? (
                  <img src={countryData.flags.svg} alt="flag" className="w-5 h-3.5 object-cover rounded-[2px]" />
                ) : (
                  <span className="material-symbols-outlined text-primary text-[18px]">flag</span>
                )}
                <span className="text-body-sm font-medium">{currentCountry}</span>
                <span className="material-symbols-outlined text-[16px] text-outline">expand_more</span>
              </div>

              {showCountrySelector && (
                <div className="absolute right-0 mt-2 w-64 bg-surface border border-outline-variant rounded-xl shadow-xl z-[100] overflow-hidden">
                  <div className="p-2 border-b border-outline-variant bg-surface-container-low">
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-white border border-outline-variant rounded-lg text-sm focus:outline-none focus:border-primary"
                      placeholder="Search countries..."
                      autoFocus
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map(name => (
                        <div
                          key={name}
                          onClick={() => selectCountry(name)}
                          className="px-4 py-2 text-sm hover:bg-primary-fixed cursor-pointer transition-colors text-on-surface"
                        >
                          {name}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-secondary italic">No countries found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] mb-[24px]">
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden group">
            <img alt={`${currentCountry} scenic`} className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105" src={heroImage || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop'} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="text-label-caps text-white/80 uppercase">Currently Exploring</span>
              <h1 className="text-4xl text-white font-bold font-headline-md mt-1">{currentCountry}</h1>
              <p className="text-white/80 mt-2 max-w-lg">Discovering the unique blend of tradition and modernity in {currentCountry}. Your personalized intelligence feed is active.</p>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 flex-1">
              {['Must Visit', 'Hidden Gems', 'Local Eats', 'Active Life'].map((cat) => (
                <div key={cat} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer">
                  <span className="material-symbols-outlined text-primary mb-2">explore</span>
                  <h4 className="font-medium">{cat}</h4>
                  <p className="text-label-caps text-on-surface-variant mt-1">Explore</p>
                </div>
              ))}
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-0 h-[180px] overflow-hidden relative group">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(currentCountry)}&output=embed`}
                allowFullScreen
                className="grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
              ></iframe>

              <a
                href={countryData?.maps?.googleMaps || '#'}
                target="_blank"
                rel="noreferrer"
                className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold border border-outline-variant text-on-surface hover:text-primary transition-colors"
              >
                View on Google Maps
              </a>
              <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:opacity-0 transition-opacity"></div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-[24px]">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-label-caps text-on-surface-variant">Population</p>
              <p className="text-headline-md font-headline-md">
                {countryData ? (countryData.population > 1000000 ? (countryData.population / 1000000).toFixed(1) + 'M' : (countryData.population / 1000).toFixed(0) + 'K') : '--'}
              </p>
            </div>
            <span className="material-symbols-outlined text-primary/30 text-4xl">groups</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-label-caps text-on-surface-variant">Language</p>
              <p className="text-headline-md font-headline-md">
                {countryData ? Object.values(countryData.languages)[0] : '--'}
              </p>
            </div>
            <span className="material-symbols-outlined text-primary/30 text-4xl">translate</span>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-label-caps text-on-surface-variant">Main Currency</p>
              <p className="text-headline-md font-headline-md truncate max-w-[120px]">
                {countryData ? `${Object.keys(countryData.currencies)[0]} (${Object.values(countryData.currencies)[0].symbol})` : '--'}
              </p>
            </div>
            <span className="material-symbols-outlined text-primary/30 text-4xl">payments</span>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[24px]">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">cloud</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Weather</span>
            </div>
            <p className="text-[40px] font-bold text-on-surface leading-none">
              {weather ? `${Math.round(weather.main.temp)}°C` : '24°C'}
            </p>
            <p className="text-body-sm text-on-surface-variant mt-1 capitalize">
              {weather ? `${weather.weather[0].description} — ${weather.name}` : `Partly Cloudy — ${currentCountry}`}
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">air</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Humidity</span>
            </div>
            <div className="relative w-24 h-24 mx-auto my-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle className="stroke-surface-container-high" cx="18" cy="18" fill="none" r="15.9155" strokeWidth="2"></circle>
                <circle className="stroke-emerald-500" cx="18" cy="18" fill="none" r="15.9155" strokeDasharray={`${weather ? weather.main.humidity : 54}, 100`} strokeLinecap="round" strokeWidth="2"></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-500">{weather ? weather.main.humidity : 54}%</span>
              </div>
            </div>
            <p className="text-center text-body-sm text-emerald-600 font-semibold">Conditions Optimal</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">currency_exchange</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Exchange</span>
              </div>
              <span className="text-[10px] font-bold bg-primary-fixed px-1.5 py-0.5 rounded text-primary">LIVE</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-surface-container-low p-2 rounded-lg border border-outline-variant/30">
                <span className="text-xs font-bold text-on-surface-variant">1 USD</span>
                <span className="material-symbols-outlined text-[14px] text-outline">arrow_forward</span>
                <span className="text-xs font-bold text-primary">
                  {countryData && usdRate ? (
                    `${usdRate[Object.keys(countryData.currencies)[0]]?.toFixed(2) || '--'} ${Object.keys(countryData.currencies)[0]}`
                  ) : '--'}
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant text-center opacity-70">
                Official Currency: {countryData ? Object.values(countryData.currencies)[0].name : '--'}
              </p>
            </div>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Local Time</span>
            </div>
            <p className="text-[40px] font-bold text-on-surface leading-none font-mono">{time || '--:--:--'}</p>
            <p className="text-body-sm text-on-surface-variant mt-1 truncate">
              {countryData?.timezones?.[0] || 'Real-time update'}
            </p>
          </div>
        </section>

        <section className="mb-[24px]">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Why People Love {currentCountry}</h3>
          <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full text-body-sm font-medium whitespace-nowrap transition-all ${activeTab === tab
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

        <section className="mb-[24px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-on-surface">Best Places in {currentCountry}</h3>
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
            {carouselPlaces.map((place, index) => (
              <div
                key={index}
                className="min-w-[280px] rounded-xl overflow-hidden border border-outline-variant group cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img alt={place.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={place.img || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop'} />
                </div>
                <div className="p-4 bg-surface-container-lowest">
                  <h4 className="font-medium text-on-surface">{place.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-[24px]">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-6">Real-Time Intelligence Feed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {news.length > 0 ? (
              news.map((item, idx) => (
                <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[24px] flex items-start gap-4 group cursor-pointer hover:shadow-md transition-shadow">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${idx % 2 === 0 ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {item.source.name}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium text-on-surface group-hover:text-primary transition-colors line-clamp-2">{item.title}</h4>
                    <p className="text-body-sm text-on-surface-variant mt-1">{new Date(item.publishedAt).toLocaleDateString()}</p>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-2 py-10 text-center text-secondary">
                <span className="material-symbols-outlined animate-spin mb-2">progress_activity</span>
                <p>Distilling intelligence feed...</p>
              </div>
            )}
          </div>
        </section>

      </div>
      <ChatAssistant />
    </div>
  )
}
