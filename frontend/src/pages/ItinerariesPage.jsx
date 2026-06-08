import { useEffect } from 'react'
import Footer from '../components/layout/Footer'

const savedLocations = [
  {
    name: 'Shibuya Crossing',
    location: 'Tokyo, Japan',
    badge: 'Top Rated',
    badgeIcon: 'star',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY1WJRF_5NkV3J6olqe9Bh1yU7RUI2Jg4j5xzs4bpPufVF31-L2VcDaUZxjxaMBdSjEPw6hUmFb-SEZX-MjJ9Y4zl_5lCT5uDlMHd1yPg6pJtW1puv_9yCh4dTqrBhDuzpEiA1vwVElJXRcW2trTjw5A1MWB7kW-jCTZ-sMA6_rW40GxNp7qBV_JtjkmFMyp9JYoO4fBWej90c-qWTSk8Rg-zK8mU8SEvWKuQWSEjLe8fhJz8Q3e2KecLkORtfZYfMzxNzVh2qo-o',
  },
  {
    name: 'Vernazza Cliffs',
    location: 'Cinque Terre, IT',
    badge: 'Added 2 days ago',
    badgeIcon: 'collections',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANHdG9qYwICSnNouj7lqwCbVaCJx2ZIle-pCrWlXpe1uuEWGeqY5N8jYbqf3_hJD-piiAi064YcbCmhDKT0ilEtylthoDjf_dq-6kp7d0szUGef2J0EVJ3jgZNRizPkVnneOpl_1UQQvh-8vhXhcZl2OnRPH4YaJDx0DQLdWVdwKYF0J1oC-jSPAl-jXhxL5dMbsP0IxZoimw0-d1TbY6ZdZAJusExk9vvlZ7Aj5ky5RaeOoy3Xpws9r0RKvxpYu2bK3eYdmhX3IM',
  },
  {
    name: 'Library of Longing',
    location: 'Prague, CZ',
    badge: 'Architecture',
    badgeIcon: 'bookmark',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf_YYUfntw7yyO2dexfSJQSPNUOKafEBDvXEWZftWTQPA40FYMO9mxz6d3cUDdq9JXqtKbd58DG_OCsAB8Us04NqxgU2u3GgNjsxBenmfpRGBCbDqK_PpKvspgKFLGF-ORCJPedacIL7F9F8TnChmkprsU9baS6oUnba9QjUi0QaRwOvz_M9TpYxkqx9FfM01cXng_yUcw3VJMQO-3kq5DnrS77M0Lmco8k1P9xPafBB2En7JWu1Xq4aECTW4g0XoxCStm7BLF_Hs',
  },
]

export default function ItinerariesPage() {

  useEffect(() => {
    // Animate progress bars on load
    const timeout = setTimeout(() => {
      const bars = document.querySelectorAll('.progress-bar-animated')
      bars.forEach(bar => {
        const target = bar.dataset.width
        bar.style.width = '0%'
        setTimeout(() => { bar.style.width = target }, 100)
      })
    }, 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant px-[24px] py-4 flex justify-between items-center">
        <div className="flex items-center gap-[24px]">
          <h2 className="font-headline-md text-headline-md text-on-surface">Travel Itineraries</h2>
          <div className="hidden lg:flex items-center bg-surface-container-low border border-outline-variant px-4 py-2 rounded-full min-w-[320px]">
            <span className="material-symbols-outlined text-outline text-body-sm">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-body-sm w-full placeholder:text-on-surface-variant/50 outline-none ml-2" placeholder="Search trips or locations..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest"></span>
          </button>
          <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <img alt="User Profile" className="w-10 h-10 rounded-full border border-outline-variant object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUxOE1aUbajCLnooK01UspnfwLt4Dl_CUdOtb3iSNhHos8HBLb0S2LZXVpEsxO9i1m8brq1SjgtzE1CiSwuRQE090Ka9Ipz04aooFt6Kzs_mtKfqCLQOENfMrncV0QPFbrlphi8-VYh48x9jvxaEUtA3OSbk8sno6O6VoxftTKh0FPxwSkY3iaaJOmykAfXvs4tIChhO9JdGSQUO31OPHBjLDjC3BgFfnSxmdzO6J-L5oEs8UZu-NmABaQ7tuli8Ha0grxhz-259k" />
        </div>
      </header>

      {/* Page Content */}
      <div className="p-[24px] flex gap-[24px] flex-1">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-[64px]">
          {/* Active Itineraries */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Ongoing Journey</span>
                <h3 className="font-headline-md text-headline-md mt-1">Active Plans</h3>
              </div>
              <button className="text-body-sm font-medium text-primary flex items-center gap-1 hover:underline">
                View all journeys <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
              {/* Trip Card 1 */}
              <div className="group relative bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwEFMrXyolVP8lD6RvzvNwXMw26ZSG-SAvvUEjJkBdrpLAEcscKmMwOe7FAMW3uSwdhLZrAODrJI-ZSos6Nrpgectuotcvn4FzYCYQ7YqEmN-UbOUiukhwnsC0n8Six1ryvHcUnE7GsrnJMvXIwuvhzgPThQ1UBxEJGRBHe444SNEM0IaR4PNL1M01gNNcn49rVqs3s2otj6wEDLRN8cHptceBFRhaZ2iuHB-7ycT6qm_TRNDIMOQGuMTjFK4smEbo4lJYTuU-kIM" alt="Japan trip" />
                  <div className="absolute inset-0 trip-card-gradient"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-headline-md text-lg font-semibold">14 Days in Japan - Summer 2026</h4>
                    <div className="flex items-center gap-2 mt-1 opacity-90 text-sm">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span>July 12 - July 26</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-surface-container-lowest">
                  <div className="flex justify-between text-body-sm mb-2">
                    <span className="text-on-surface-variant font-medium">Day 8 of 14</span>
                    <span className="text-primary font-bold">57%</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="progress-bar-animated bg-primary h-full rounded-full transition-all duration-1000" data-width="57%" style={{ width: '57%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex -space-x-2">
                      <img className="w-8 h-8 rounded-full border-2 border-surface-container-lowest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOvKqcKWrnF5lx1jnzNDgZ2KKQ8mB4b8CBnyz-mNB5SkKXhgiC8aTXHaAhiggYS54THVseG9ncenFWWr-8WZ9DToYnczpcUND2Xf74Ucm8JRKugSmJamTN4XpqLnQUBb_8QorY84QQNDQdgpu1kmKHoQkU-CPh4hUrA4kAJ5OeH8Il3wlubrG17VzpOKkqq9YSLn37ZV9lFQ8w98SjRi-lfEyz9bFdkKcv7PqbChxTQf4c9a4OuO4HUJBi5i_4zNyqgQXw5-bGY2E" alt="Collaborator" />
                      <img className="w-8 h-8 rounded-full border-2 border-surface-container-lowest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3p1CDGqjO-rxgSiVFsMImvdbMyau62r7PHhsr5ZPOQJ5i4ur1qGfU4qx4LTI_-1BhpWMleMigg5lu7QbMQjtT8ZS8rVmu87w7Wl_72tdEcyyjTIqlHwqSQ06v-BfhbUdzWnOXK2yMogBKZrxDCqXm7Lylea4reYdmN2enWNwIrRfzVcRHn0LjHxb-C28ZxvFQjJm9Y3u--yjmOe5MRGfH9UMC7ylq11_z54d1SjLr_HroAS13Sl109dezVmLMjJcCfO6kfun_po8" alt="Collaborator" />
                      <div className="w-8 h-8 rounded-full border-2 border-surface-container-lowest bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface-variant">+2</div>
                    </div>
                    <button className="bg-surface-container-low px-3 py-1 rounded-full text-body-sm font-medium hover:bg-surface-container-high transition-colors">Manage</button>
                  </div>
                </div>
              </div>

              {/* Trip Card 2 */}
              <div className="group relative bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyHwMl0xyObMeRt-QPOoNcUH9gBuujvXbdp-BZp7hTLolQfdUW2cQ9rvA7_K3E6aoaKCPx3wvTMkF2yUpNfjw4C4SjZR4LkO2UhVuZ8lqhqVP83M_nvykKKawTmJ1yDXl-TNBFZsOhZQp-e62rqt17Q-FAVGeUHPiv2hWeXRDiMDV-irX8Q2zOUvORCRX-iBikouioAdc-whK9TFpzpL-TMu2QuUM9Z0PFfuhflfFQhTWP-hxdSKmPSLEauwDbjtJQEgSZlnAL9HA" alt="Swiss Alps" />
                  <div className="absolute inset-0 trip-card-gradient"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-headline-md text-lg font-semibold">Swiss Alps Retreat</h4>
                    <div className="flex items-center gap-2 mt-1 opacity-90 text-sm">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span>Aug 04 - Aug 11</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-surface-container-lowest">
                  <div className="flex justify-between text-body-sm mb-2">
                    <span className="text-on-surface-variant font-medium">Pre-trip planning</span>
                    <span className="text-primary font-bold">12%</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="progress-bar-animated bg-primary h-full rounded-full transition-all duration-1000" data-width="12%" style={{ width: '12%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex -space-x-2">
                      <img className="w-8 h-8 rounded-full border-2 border-surface-container-lowest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZS1xtBvAT5hG-BtU6-kavyeukmSSMJ2KMSeatZ6XTuvJMNXQu14P6tPPvbJrp05-M7sOk8V024E6bHr0Cx6m-gbE_M5_MFx_EeDKEYaw8z1Vjm6_IhXK839oi6pw3MGl2T_7w_Vy1MF5-QgOEBKv2EZH0KYToic3HZgz767BIDqN9K1UXIUf6pxYitWWagWyn1CFmOGiIFdzkadl9OR94FvAoSgWVwqTfoSglIy51tla_Lrc1E5Qd_nfYYPkdK0059ozh9Neg9Xc" alt="Collaborator" />
                    </div>
                    <button className="bg-surface-container-low px-3 py-1 rounded-full text-body-sm font-medium hover:bg-surface-container-high transition-colors">Manage</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Intelligence Hub */}
          <section className="bg-primary-container/10 border border-primary/20 rounded-2xl p-[24px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-[120px]">auto_awesome</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary p-2 rounded-lg text-white">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Intelligence Hub</h3>
              </div>
              <p className="text-body-lg text-on-surface-variant max-w-xl mb-6">Start a new itinerary using our global intelligence engine. Define your constraints, and let Discoverly curate the perfect route.</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: 'map', title: 'Custom Builder', desc: 'Step-by-step itinerary creation from scratch.' },
                  { icon: 'auto_awesome', title: 'AI Prompt Tool', desc: 'Describe your dream trip in natural language.' },
                  { icon: 'history', title: 'Clone Previous', desc: 'Re-use a past itinerary template.' },
                ].map(card => (
                  <div key={card.title} className="flex-1 min-w-[240px] bg-white border border-outline-variant p-4 rounded-xl shadow-sm hover:border-primary transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <span className="material-symbols-outlined text-primary">{card.icon}</span>
                      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">add_circle</span>
                    </div>
                    <h5 className="font-medium mb-1">{card.title}</h5>
                    <p className="text-body-sm text-on-surface-variant">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Calendar View */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md">Upcoming Dates</h3>
              <div className="flex bg-surface-container-low rounded-lg p-1">
                <button className="px-4 py-1.5 rounded-md bg-white shadow-sm text-body-sm font-medium">Month</button>
                <button className="px-4 py-1.5 rounded-md text-body-sm text-on-surface-variant hover:bg-white/50 transition-colors">Timeline</button>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden p-6">
              <div className="grid grid-cols-7 gap-4 text-center border-b border-outline-variant pb-4 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                  <span key={d} className="text-label-caps font-label-caps text-on-surface-variant">{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-4">
                {/* Row 1: Prev month days */}
                {[28, 29, 30].map(d => <div key={d} className="h-24 p-2 text-on-surface-variant/40">{d}</div>)}
                {[1, 2, 3, 4].map(d => <div key={d} className="h-24 p-2 text-on-surface-variant">{d}</div>)}
                {/* Row 2 */}
                {[5, 6, 7, 8, 9, 10, 11].map(d => (
                  <div key={d} className={`h-24 p-2 border border-outline-variant/30 rounded-lg ${d === 5 ? 'bg-surface-container-low' : ''}`}>{d}</div>
                ))}
                {/* Row 3: Japan Trip */}
                <div className="h-24 p-2 bg-primary/10 rounded-l-lg border-y border-l border-primary/20 relative">
                  <span className="font-medium">12</span>
                  <div className="mt-2 text-[10px] bg-primary text-white p-1 rounded font-bold truncate">JAPAN TOUR</div>
                </div>
                {[13, 14, 15, 16, 17].map(d => (
                  <div key={d} className="h-24 p-2 bg-primary/10 border-y border-primary/20">
                    <span className="font-medium">{d}</span>
                  </div>
                ))}
                <div className="h-24 p-2 bg-primary/10 rounded-r-lg border-y border-r border-primary/20">
                  <span className="font-medium">18</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="w-80 flex-col gap-[24px] hidden xl:flex">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl flex flex-col h-full sticky top-24">
            <div className="p-6 border-b border-outline-variant">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-headline-md text-lg">Saved Locations</h4>
                <span className="material-symbols-outlined text-primary cursor-pointer hover:rotate-90 transition-transform duration-300">filter_list</span>
              </div>
              <div className="flex items-center bg-surface-container-low px-3 py-2 rounded-lg gap-2">
                <span className="material-symbols-outlined text-[18px] text-outline">search</span>
                <input className="bg-transparent border-none focus:ring-0 text-sm p-0 w-full outline-none" placeholder="Filter saved..." type="text" />
              </div>
            </div>
            <div className="p-4 overflow-y-auto space-y-3 max-h-[600px]">
              {savedLocations.map(loc => (
                <div key={loc.name} className="group flex gap-3 p-2 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer">
                  <img className="w-14 h-14 rounded-lg object-cover" src={loc.img} alt={loc.name} />
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold">{loc.name}</h5>
                    <p className="text-xs text-on-surface-variant">{loc.location}</p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-primary font-bold">
                      <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>{loc.badgeIcon}</span>
                      <span>{loc.badge}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-6 text-center border-2 border-dashed border-outline-variant rounded-xl mt-4">
                <span className="material-symbols-outlined text-outline mb-2">add_location</span>
                <p className="text-xs text-on-surface-variant">Drag locations here to save for later.</p>
              </div>
            </div>
            <div className="mt-auto p-6 bg-surface-container-low/50 rounded-b-2xl">
              <button className="w-full py-3 border border-primary text-primary rounded-xl font-label-caps text-label-caps hover:bg-primary hover:text-white transition-all duration-300">
                Explore New Places
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-surface-container-lowest border-t border-outline-variant py-8">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-label-caps font-label-caps text-on-surface-variant">Discoverly</span>
            <p className="text-body-sm text-on-surface-variant mt-1">© 2026 Discoverly. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">API Status</a>
          </div>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">public</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">mail</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
