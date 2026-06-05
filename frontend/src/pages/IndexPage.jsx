import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PublicNavbar from '../components/layout/PublicNavbar'
import Footer from '../components/layout/Footer'

export default function IndexPage() {
  const cardRefs = useRef([])

  useEffect(() => {
    const handleMouseMove = (card) => (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    }
    const handlers = []
    cardRefs.current.forEach((card) => {
      if (card) {
        const handler = handleMouseMove(card)
        card.addEventListener('mousemove', handler)
        handlers.push({ card, handler })
      }
    })
    return () => {
      handlers.forEach(({ card, handler }) => card.removeEventListener('mousemove', handler))
    }
  }, [])

  return (
    <div className="font-body-lg text-body-lg">
      <PublicNavbar />

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex flex-col items-center justify-center text-center px-[24px] overflow-hidden">
          <div className="max-w-3xl space-y-[24px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-caps font-label-caps uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              Introducing v2.0
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">
              Discover the World Through <span className="text-primary">AI</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Hyper-personalized travel intelligence and global navigation tailored to your unique preferences. Real-time insights for the modern explorer.
            </p>
            <div className="flex flex-col sm:flex-row gap-[8px] justify-center pt-[8px]">
              <Link
                to="/demo"
                className="px-8 py-4 border border-outline-variant bg-surface-container-lowest text-on-surface rounded-lg font-semibold hover:bg-surface-container-low transition-all"
              >
                Explore Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Bento Features Grid */}
        <section className="max-w-[1280px] mx-auto px-[24px] py-[64px]">
          <div className="text-center mb-[64px]">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-[8px]">Intelligence for Every Journey</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">Our specialized AI agents handle the complexities of global travel so you can focus on the experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {/* Card 1: Country Explorer */}
            <div ref={(el) => (cardRefs.current[0] = el)} className="glass-card p-[24px] rounded-xl md:col-span-2">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <span className="material-symbols-outlined text-primary text-4xl mb-4">explore</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Country Explorer</h3>
                </div>
                <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-label-caps font-label-caps">Advanced</span>
              </div>
              <p className="text-on-surface-variant mb-8">Deep-dive into culture, local etiquette, and hidden gems with our semantic knowledge graph. Understand destinations before you even arrive.</p>
              <div className="relative h-48 overflow-hidden rounded-lg">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFyBZUAlsMxfLUzbtUNjExagsZGcErJEpN8tHeOZH3asNPpe5rYsB7LMdZQp1CtGGn4_bL3rERwL8y39N-pExRFzRhkbjeqgX7s0sMPOZZuHUK_ONeiK3JvSaVGtVy-oh2GJ1re8NxJVvaAmpeRRbLy9i0jQscr4kHD-aejdsLA18fgF9b4jXI5SsyEgekuq5gQp8RnirE7MCwSlzu_xoDXYyoOGJoCtPCVx7pa4ThWJuxBgy95VXLpbrkcOzaDWKE1I8WvUeIM8g" alt="Country explorer landscape" />
              </div>
            </div>
            {/* Card 2: Live Weather */}
            <div ref={(el) => (cardRefs.current[1] = el)} className="glass-card p-[24px] rounded-xl">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">cloud_sync</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">Live Weather</h3>
              <p className="text-on-surface-variant mt-2 mb-6">Real-time micro-climate predictions for your exact coordinates.</p>
              <div className="flex flex-col gap-3">
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[75%]"></div>
                </div>
                <div className="flex justify-between text-label-caps font-label-caps text-on-surface-variant">
                  <span>Humidity 45%</span>
                  <span>Temp 22°C</span>
                </div>
              </div>
            </div>
            {/* Card 3: AI Planner */}
            <div ref={(el) => (cardRefs.current[2] = el)} className="glass-card p-[24px] rounded-xl">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">smart_toy</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">AI Planner</h3>
              <p className="text-on-surface-variant mt-2">Dynamic itineraries that adapt to your mood, pace, and local events on the fly.</p>
            </div>
            {/* Card 4: Precision Maps */}
            <div ref={(el) => (cardRefs.current[3] = el)} className="glass-card p-[24px] rounded-xl md:col-span-2">
              <div className="flex gap-[24px]">
                <div className="flex-1">
                  <span className="material-symbols-outlined text-primary text-4xl mb-4">map</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Precision Maps</h3>
                  <p className="text-on-surface-variant mt-2">Highly detailed vector maps with real-time foot traffic and accessibility layers.</p>
                </div>
                <div className="hidden sm:block flex-1 rounded-lg overflow-hidden border border-outline-variant">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALJ_PJdzIZHy1ud3kRIWKkcP80gt8KjI5_VaBdVEGpD7NCgeRqwyXrRbSaoi3OxJgMMM0O-SF18pgNRZyF9MwGyhaWSRKAsS_mKRB1_EnU5Lk8VuSTyqY2CXmTLHEnWthRo4Ohjl7PnNLDECCJZZ8Okjnc3oK7H5YrE1POwYbKQw8pC9Pc9QhnqaerijL3f7SLud45NrdXUSIY4WRbrx8icHJ44tZ_nM0oUCxcmrceEYj4ugK5YZvemokyBv02OHoCOe_gfdUBDSM" alt="Precision maps" />
                </div>
              </div>
            </div>
            {/* Card 5: Finance Flux */}
            <div ref={(el) => (cardRefs.current[4] = el)} className="glass-card p-[24px] rounded-xl">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">payments</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">Finance Flux</h3>
              <p className="text-on-surface-variant mt-2">Automated currency conversion and spending insights in local context.</p>
            </div>
            {/* Card 6: Safety Pulse */}
            <div ref={(el) => (cardRefs.current[5] = el)} className="glass-card p-[24px] rounded-xl">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">security</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">Safety Pulse</h3>
              <p className="text-on-surface-variant mt-2">Continuous monitoring of local safety alerts and emergency protocols.</p>
            </div>
          </div>
        </section>

        {/* How It Works Timeline */}
        <section className="bg-surface-container-low py-[64px] overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-[24px]">
            <div className="text-center mb-[64px]">
              <h2 className="font-headline-md text-headline-md text-on-surface">How Intelligence Flows</h2>
              <p className="text-on-surface-variant">Our three-step distillation process ensures accuracy and relevance.</p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px timeline-line hidden md:block"></div>
              <div className="space-y-[64px] relative">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 text-right order-2 md:order-1">
                    <h4 className="font-headline-md text-headline-md text-on-surface">Data Ingestion</h4>
                    <p className="text-on-surface-variant">We aggregate millions of real-time signals from global weather satellites, social trends, and local news.</p>
                  </div>
                  <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center z-10 order-1 md:order-2 font-bold ring-8 ring-surface-container-low">1</div>
                  <div className="flex-1 order-3">
                    <div className="p-6 bg-surface rounded-lg border border-outline-variant floating-element">
                      <span className="material-symbols-outlined text-primary">database</span>
                      <div className="mt-2 space-y-1">
                        <div className="h-1 bg-primary/20 w-full rounded"></div>
                        <div className="h-1 bg-primary/20 w-3/4 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 order-3 md:order-1">
                    <div className="p-6 bg-surface rounded-lg border border-outline-variant floating-element" style={{ animationDelay: '1s' }}>
                      <span className="material-symbols-outlined text-primary">psychology</span>
                      <div className="mt-2 flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center z-10 order-1 md:order-2 font-bold ring-8 ring-surface-container-low">2</div>
                  <div className="flex-1 text-left order-2">
                    <h4 className="font-headline-md text-headline-md text-on-surface">AI Distillation</h4>
                    <p className="text-on-surface-variant">Our LLMs process data through a &apos;Travel-Intent&apos; filter, stripping away noise to find pure insights.</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 text-right order-2 md:order-1">
                    <h4 className="font-headline-md text-headline-md text-on-surface">Personalized Output</h4>
                    <p className="text-on-surface-variant">A tailored narrative and action plan delivered directly to your device, ready for exploration.</p>
                  </div>
                  <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center z-10 order-1 md:order-2 font-bold ring-8 ring-surface-container-low">3</div>
                  <div className="flex-1 order-3">
                    <div className="p-6 bg-surface rounded-lg border border-outline-variant floating-element" style={{ animationDelay: '2s' }}>
                      <span className="material-symbols-outlined text-primary">verified</span>
                      <p className="text-label-caps font-label-caps mt-2">Ready to Go</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[1280px] mx-auto px-[24px] py-[64px] text-center">
          <div className="bg-inverse-surface text-inverse-on-surface p-12 md:p-[64px] rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <span className="material-symbols-outlined text-[160px]">travel_explore</span>
            </div>
            <div className="relative z-10">
              <h2 className="font-display-lg text-headline-md md:text-display-lg mb-6">Ready to redesign your world view?</h2>
              <p className="text-body-lg mb-10 opacity-80 max-w-xl mx-auto">Join 50,000+ explorers using Discoverly to navigate the planet with surgical precision.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
