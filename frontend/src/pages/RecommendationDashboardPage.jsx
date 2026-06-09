import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { getPersonalizedRecommendations } from '../api/recommendationApi';

export default function RecommendationDashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  

  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState({ main: null, suggestions: [] });
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getPersonalizedRecommendations();
        setRecommendations(data);
      } catch (err) {
        console.error('Failed to load recommendations', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);



  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleCountrySelect = (countryName) => {
    navigate('/dashboard', { state: { selectedCountry: countryName } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface">
        <div className="text-xl font-bold">Generating Personalized Recommendations...</div>
      </div>
    );
  }

  const mainCountry = recommendations.main;
  const suggestions = recommendations.suggestions;

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="bg-surface text-on-surface font-body-lg min-h-screen">
        {/* TopNavBar */}
        <nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
          <div className="flex justify-between items-center px-4 md:px-6 py-4 max-w-[1280px] mx-auto">
            <div className="flex items-center gap-8">
              <span className="font-display-lg text-headline-md font-bold text-primary">Discoverly</span>
              <div className="hidden md:flex gap-6"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden lg:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-24 pb-[64px] max-w-[1280px] mx-auto px-4 md:px-6">
          {/* Welcome Greeting & Persona Banner */}
          <header className="mb-[24px]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-display-lg text-[48px] leading-[1.1] font-semibold tracking-tight text-on-surface">Welcome back, {user?.name || 'Explorer'}</h1>
              </div>
              <div className="flex items-center gap-3 bg-primary-container/10 border border-primary/20 rounded-xl p-4">
                <div className="font-medium text-primary">Your Journey Begins</div>
              </div>
            </div>
          </header>

          {/* Cinematic Hero Card */}
          {mainCountry && (
            <section 
              className="relative h-[500px] rounded-[32px] overflow-hidden mb-[24px] group cursor-pointer"
              onClick={() => handleCountrySelect(mainCountry.country)}
            >
              {/* Dummy image since we don't have a reliable image DB mapping yet, fallback to a cool abstract gradient or generic placeholder if needed. For now, using Unsplash with country keyword. */}
              <img 
                alt={`${mainCountry.country} Hero`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={`https://picsum.photos/seed/${mainCountry.country.replace(/\s+/g, '')}Hero/1600/900`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
              <div className="relative h-full flex flex-col md:flex-row p-10 items-center justify-between">
                <div className="text-white max-w-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary text-[12px] font-bold rounded-full">TOP MATCH ({mainCountry.match_percentage}%)</span>
                  </div>
                  <h2 className="font-display-lg text-[48px] leading-none font-semibold tracking-tight">{mainCountry.country}</h2>
                  <p className="font-headline-md text-[24px] mt-2 opacity-90 font-medium">Your Prime Destination</p>
                  <div className="mt-8 flex gap-4 flex-wrap">
                    {mainCountry.landscapes.slice(0, 3).map(l => (
                      <span key={l} className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm">{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Similar Destinations Carousel */}
          {suggestions.length > 0 && (
            <section className="mt-[64px]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-headline-md text-[32px] font-semibold text-on-surface">Other Matches For You</h3>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="p-2 rounded-full border border-outline-variant text-outline hover:text-primary hover:border-primary transition-all flex items-center justify-center"
                    onClick={scrollLeft}
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                  <button 
                    className="p-2 rounded-full border border-outline-variant text-outline hover:text-primary hover:border-primary transition-all flex items-center justify-center"
                    onClick={scrollRight}
                  >
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar" ref={scrollRef}>
                {suggestions.map((country, idx) => (
                  <div 
                    key={idx} 
                    className="min-w-[300px] bg-white border border-outline-variant rounded-xl overflow-hidden group cursor-pointer shadow-[0px_4px_20px_rgba(0,0,0,0.02)]"
                    onClick={() => handleCountrySelect(country.country)}
                  >
                    <div className="h-48 overflow-hidden relative bg-surface-variant">
                      <img 
                        alt={country.country} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                        src={`https://picsum.photos/seed/${country.country.replace(/\s+/g, '')}/600/400`} 
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-primary">
                        {country.match_percentage}% MATCH
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-headline-md text-[24px] font-medium text-on-surface mb-2">{country.country}</h4>
                      <p className="text-body-sm text-[14px] text-secondary mb-4 line-clamp-2">Matches your interest in {country.seasons[0]} and {country.landscapes[0]}.</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {country.flora_fauna.slice(0, 2).map(f => (
                          <span key={f} className="px-2 py-1 bg-surface-container text-[10px] font-bold rounded uppercase truncate max-w-[120px]">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}
