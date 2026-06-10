import axios from 'axios';
import { getDestinationImage } from './imageAPI';

const OPENTRIPMAP_API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY;
const BASE_URL = 'https://api.opentripmap.com/0.1/en';

const CURATED_PLACES = {
  'Japan': {
    'Must Visit': [
      {
        name: 'Mount Fuji',
        description: "Japan's tallest peak and an iconic active volcano, Mount Fuji is a sacred symbol of heritage and stunning natural beauty.",
        location: 'Shizuoka/Yamanashi Prefecture',
        category: 'Must Visit'
      },
      {
        name: 'Fushimi Inari Shrine',
        description: 'Renowned for its mesmerizing path of over 10,000 vibrant red torii gates winding up the sacred Mount Inari in Kyoto.',
        location: 'Kyoto',
        category: 'Must Visit'
      },
      {
        name: 'Kinkaku-ji (Golden Pavilion)',
        description: 'A breathtaking Zen Buddhist temple in Kyoto, whose top two floors are completely covered in brilliant gold leaf.',
        location: 'Kyoto',
        category: 'Must Visit'
      }
    ],
    'Hidden Gems': [
      {
        name: 'Shirakawa-go',
        description: 'A charming mountain village famous for its traditional gassho-zukuri farmhouses built with steep thatched roofs to withstand heavy snow.',
        location: 'Gifu Prefecture',
        category: 'Hidden Gems'
      },
      {
        name: 'Naoshima Art Island',
        description: 'A tranquil island in the Seto Inland Sea transformed into a world-renowned haven for modern art and architecture.',
        location: 'Kagawa Prefecture',
        category: 'Hidden Gems'
      },
      {
        name: 'Takachiho Gorge',
        description: 'A spectacular volcanic chasm where visitors can paddle boats alongside towering basalt columns and cascading waterfalls.',
        location: 'Miyazaki Prefecture',
        category: 'Hidden Gems'
      }
    ],
    'Local Eats': [
      {
        name: 'Sushi Dai (Toyosu Market)',
        description: "World-famous omakase sushi prepared with the freshest morning catches directly from Tokyo's premier seafood market.",
        location: 'Tokyo',
        category: 'Local Eats'
      },
      {
        name: 'Ichiran Ramen',
        description: 'A unique and iconic dining experience featuring rich tonkotsu pork broth ramen served in individual focus booths.',
        location: 'Fukuoka / Tokyo',
        category: 'Local Eats'
      },
      {
        name: 'Dotonbori Okonomiyaki',
        description: "Osaka's classic savory cabbage pancake packed with pork, seafood, and topped with rich sauce, seaweed, and bonito flakes.",
        location: 'Osaka',
        category: 'Local Eats'
      }
    ],
    'Active Life': [
      {
        name: 'Niseko Ski Slopes',
        description: 'A world-class ski destination in Hokkaido celebrated globally for its incredibly deep, light, and dry powder snow.',
        location: 'Hokkaido',
        category: 'Active Life'
      },
      {
        name: 'Shimanami Kaido Cycling Route',
        description: 'An exceptional 70-kilometer cycling highway crossing the beautiful bridges and islands of the Seto Inland Sea.',
        location: 'Hiroshima to Ehime',
        category: 'Active Life'
      },
      {
        name: 'Kumano Kodo Pilgrimage Trail',
        description: 'A network of ancient, sacred trails winding through the dense forests and mist-covered mountains of the Kii Peninsula.',
        location: 'Wakayama Prefecture',
        category: 'Active Life'
      }
    ]
  },
  'France': {
    'Must Visit': [
      {
        name: 'Eiffel Tower',
        description: 'The global icon of France, this towering wrought-iron structure offers breathtaking views of the Paris landscape.',
        location: 'Paris',
        category: 'Must Visit'
      },
      {
        name: 'Palace of Versailles',
        description: 'A gilded symbol of royal absolute power, boasting the stunning Hall of Mirrors and grand manicured French gardens.',
        location: 'Versailles',
        category: 'Must Visit'
      },
      {
        name: 'Mont Saint-Michel',
        description: 'A majestic medieval abbey perched atop a rocky tidal island that becomes completely isolated during high tide.',
        location: 'Normandy',
        category: 'Must Visit'
      }
    ],
    'Hidden Gems': [
      {
        name: 'Gorges du Verdon',
        description: "A dramatic river canyon with turquoise-green waters, widely considered one of Europe's most beautiful natural wonders.",
        location: 'Provence-Alpes-Côte d\'Azur',
        category: 'Hidden Gems'
      },
      {
        name: 'Colmar',
        description: 'A picturesque town in Alsace resembling a fairytale, characterized by colorful half-timbered houses and canals.',
        location: 'Alsace',
        category: 'Hidden Gems'
      },
      {
        name: 'L\'Isle-sur-la-Sorgue',
        description: 'A charming town built around the Sorgue River, famous for its historic waterwheels and vibrant antique markets.',
        location: 'Provence',
        category: 'Hidden Gems'
      }
    ],
    'Local Eats': [
      {
        name: 'Traditional Parisian Bistro Cuisine',
        description: 'Enjoy iconic dishes like Coq au Vin, Escargot, and Crème Brûlée in a historic, cozy corner bistro.',
        location: 'Paris',
        category: 'Local Eats'
      },
      {
        name: 'Croissants & Pâtisseries at Du Pain et des Idées',
        description: 'Taste the ultimate buttery, flaky French croissants and signature escargot pastries in a vintage baker shop.',
        location: 'Paris',
        category: 'Local Eats'
      },
      {
        name: 'Bouillabaisse in Marseille Old Port',
        description: 'A classic, rich Provençal fish stew made with local Mediterranean catches, saffron, orange peel, and fennel.',
        location: 'Marseille',
        category: 'Local Eats'
      }
    ],
    'Active Life': [
      {
        name: 'Hiking in Chamonix-Mont-Blanc',
        description: 'Scenic trails offering spectacular close-up views of glaciers and Europe\'s highest mountain peak.',
        location: 'French Alps',
        category: 'Active Life'
      },
      {
        name: 'Cycling through Loire Valley Vineyards',
        description: 'Leisurely cycle paths winding past majestic Renaissance châteaux, sleepy rivers, and boutique vineyards.',
        location: 'Loire Valley',
        category: 'Active Life'
      },
      {
        name: 'Surfing at Biarritz Côte des Basques',
        description: 'The birthplace of European surfing, featuring excellent waves bordered by stunning cliffs and castles.',
        location: 'Basque Country',
        category: 'Active Life'
      }
    ]
  },
  'Italy': {
    'Must Visit': [
      {
        name: 'The Colosseum',
        description: 'The monumental stone amphitheater in the heart of Rome, an architectural masterpiece of the Roman Empire.',
        location: 'Rome',
        category: 'Must Visit'
      },
      {
        name: 'Florence Cathedral (Duomo)',
        description: "A magnificent Gothic cathedral dominated by Brunelleschi's revolutionary red-tiled brick dome.",
        location: 'Florence',
        category: 'Must Visit'
      },
      {
        name: 'Venice Grand Canal',
        description: 'The main water channel winding through Venice, bordered by glorious palaces and navigated by gondolas.',
        location: 'Venice',
        category: 'Must Visit'
      }
    ],
    'Hidden Gems': [
      {
        name: 'Civita di Bagnoregio',
        description: 'A stunning medieval hill town perched precariously on a crumbling volcanic plateau, known as "The Dying Town."',
        location: 'Lazio',
        category: 'Hidden Gems'
      },
      {
        name: 'Alberobello Trulli',
        description: 'A unique town famous for its whitewashed stone dwellings built with dry-stone conical roofs.',
        location: 'Puglia',
        category: 'Hidden Gems'
      },
      {
        name: 'Val d\'Orcia Scenic Viewpoints',
        description: 'A picturesque landscape of rolling hills, lonely cypresses, and medieval villages in Southern Tuscany.',
        location: 'Tuscany',
        category: 'Hidden Gems'
      }
    ],
    'Local Eats': [
      {
        name: 'Neapolitan Pizza at L\'Antica Pizza da Michele',
        description: 'Simple and legendary wood-fired pizza with fresh tomato sauce, mozzarella di bufala, and basil.',
        location: 'Naples',
        category: 'Local Eats'
      },
      {
        name: 'Trastevere Carbonara Experience',
        description: 'Taste authentic Roman pasta made rich with egg yolks, pecorino romano, guanciale, and cracked black pepper.',
        location: 'Rome',
        category: 'Local Eats'
      },
      {
        name: 'Artisanal Gelato at Giolitti',
        description: "Rome's oldest and most famous gelateria serving exceptionally smooth, fresh, and decadent flavors.",
        location: 'Rome',
        category: 'Local Eats'
      }
    ],
    'Active Life': [
      {
        name: 'Hiking the Path of the Gods',
        description: 'A cliffside trail high above the Amalfi Coast offering spectacular views of coastal cliffs and the Mediterranean Sea.',
        location: 'Amalfi Coast',
        category: 'Active Life'
      },
      {
        name: 'Skiing in Cortina d\'Ampezzo',
        description: 'A prestigious mountain resort in the Dolomites featuring majestic pink peaks and premier alpine runs.',
        location: 'Veneto',
        category: 'Active Life'
      },
      {
        name: 'Sailing around Capri & Blue Grotto',
        description: 'Explore the spectacular limestone sea caves and dramatic rock arches by boat along the Gulf of Naples.',
        location: 'Capri',
        category: 'Active Life'
      }
    ]
  },
  'United States': {
    'Must Visit': [
      {
        name: 'Statue of Liberty',
        description: 'The iconic copper statue welcoming visitors to New York Harbor, representing freedom and democracy.',
        location: 'New York City, NY',
        category: 'Must Visit'
      },
      {
        name: 'Grand Canyon National Park',
        description: 'A massive, colorful canyon carved by the Colorado River, displaying millions of years of geological history.',
        location: 'Arizona',
        category: 'Must Visit'
      },
      {
        name: 'Golden Gate Bridge',
        description: 'The magnificent orange suspension bridge spanning the entrance to the San Francisco Bay.',
        location: 'San Francisco, CA',
        category: 'Must Visit'
      }
    ],
    'Hidden Gems': [
      {
        name: 'Antelope Canyon',
        description: 'A mesmerizing slot canyon on Navajo land, famous for its smooth, flowing sandstone walls and shafts of light.',
        location: 'Arizona',
        category: 'Hidden Gems'
      },
      {
        name: 'Sedona Red Rocks',
        description: 'A scenic region of vibrant red sandstone formations, known for its spiritual energy vortexes and trails.',
        location: 'Arizona',
        category: 'Hidden Gems'
      },
      {
        name: 'Dry Tortugas National Park',
        description: 'A remote, boat-accessible park in the Gulf of Mexico featuring crystal waters, coral reefs, and a 19th-century fort.',
        location: 'Florida Keys, FL',
        category: 'Hidden Gems'
      }
    ],
    'Local Eats': [
      {
        name: 'New York Style Pizza at Joe\'s Pizza',
        description: 'The quintessential thin-crust street slice topped with rich tomato sauce and fresh mozzarella.',
        location: 'New York City, NY',
        category: 'Local Eats'
      },
      {
        name: 'Texas Style Smoked Brisket at Franklin BBQ',
        description: 'Mouth-watering, oak-smoked beef brisket cooked low and slow until it is perfectly tender.',
        location: 'Austin, TX',
        category: 'Local Eats'
      },
      {
        name: 'Clam Chowder at Pike Place Market',
        description: 'Rich and creamy New England style clam chowder served in a fresh sourdough bread bowl.',
        location: 'Seattle, WA',
        category: 'Local Eats'
      }
    ],
    'Active Life': [
      {
        name: 'Hiking Half Dome in Yosemite',
        description: "A challenging and famous trek to the summit of Yosemite's iconic granite dome, using cable handrails.",
        location: 'California',
        category: 'Active Life'
      },
      {
        name: 'Surfing at North Shore, Oahu',
        description: 'The legendary capital of big-wave surfing, featuring massive winter swells and pristine sandy beaches.',
        location: 'Hawaii',
        category: 'Active Life'
      },
      {
        name: 'Rafting in the Colorado River',
        description: 'An adrenaline-fueled whitewater rafting adventure through the dramatic canyons and rapids.',
        location: 'Colorado / Utah',
        category: 'Active Life'
      }
    ]
  }
};

const GENERIC_TEMPLATES = {
  'Must Visit': [
    {
      name: 'National Landmark & Plaza',
      description: 'The historic and cultural center of the nation, showcasing majestic architectural details, statues, and rich local history.',
      location: 'Capital City District'
    },
    {
      name: 'Grand Cathedral & Historic Museum',
      description: 'An architectural masterpiece detailing the artistic journey, religious heritage, and cultural artifacts of the country.',
      location: 'Central Historic District'
    },
    {
      name: 'Scenic UNESCO Heritage Site',
      description: 'An officially protected world heritage treasure recognized for its exceptional cultural significance and timeless preservation.',
      location: 'Scenic Highlands'
    }
  ],
  'Hidden Gems': [
    {
      name: 'Secret Valley Waterfalls',
      description: 'A serene, lesser-known oasis surrounded by lush forests, boasting pristine pools and a peaceful atmosphere far from tourist crowds.',
      location: 'Nature Reserve Foothills'
    },
    {
      name: 'Ancient Citadel Ruins',
      description: 'Tucked away on a misty hilltop, these archaeological remains offer a quiet window into the ancient civilizations of this region.',
      location: 'Highland Border'
    },
    {
      name: 'Panoramic Cliff Viewpoint',
      description: 'A breathtaking and underrated spot overlooking the ocean and valleys, offering spectacular sunset views in total tranquility.',
      location: 'Coastal Ridge'
    }
  ],
  'Local Eats': [
    {
      name: 'Authentic Street Market Food',
      description: "A lively local culinary hub offering traditional snacks, grilled dishes, and authentic family recipes passed down for generations.",
      location: 'Old Town Market'
    },
    {
      name: 'Traditional Family Tavern',
      description: "Taste the country's signature dishes prepared with locally sourced organic ingredients in a warm, welcoming rustic setting.",
      location: 'Down Town Quarter'
    },
    {
      name: 'Artisanal Beverage & Dessert Cafe',
      description: "Enjoy unique regional coffees, local herbal teas, and handcrafted sweets in a charming contemporary space.",
      location: 'Modern Avenue'
    }
  ],
  'Active Life': [
    {
      name: 'Scenic Mountain Hiking Trail',
      description: 'Embark on a trail winding through spectacular alpine forests, featuring panoramic views and diverse local wildlife.',
      location: 'National Forest Park'
    },
    {
      name: 'Adventure Rafting & Kayak River',
      description: 'A thrilling whitewater experience navigating swift currents and dramatic canyons surrounded by raw nature.',
      location: 'River Gorge Region'
    },
    {
      name: 'Coastal Surf & Windsurfing Beach',
      description: 'A gorgeous beach known for its excellent winds, rolling waves, and active water sports options for all skill levels.',
      location: 'Coastal Surf Bay'
    }
  ]
};

function getDefaultDescription(name, category) {
  if (category === 'Must Visit') {
    return `An incredible historic landmark and popular destination in the area, offering visitors a glimpse into the local heritage and beautiful views.`;
  } else if (category === 'Hidden Gems') {
    return `A peaceful, off-the-beaten-path spot loved by locals. Perfect for travelers seeking a unique and authentic regional experience.`;
  } else if (category === 'Local Eats') {
    return `A popular dining destination known for serving authentic regional dishes and delightful local flavors in a welcoming environment.`;
  } else {
    return `An exciting spot offering wonderful outdoor activities, sports, and adventure experiences surrounded by scenic natural landscapes.`;
  }
}

export const fetchCategoryPlaces = async (countryName, category) => {
  if (!countryName) return [];
  const normalizedCountryName = countryName.trim();

  try {
    // 1. Get Country coordinates (capital city coordinates) via REST Countries API
    let lat = 0;
    let lon = 0;
    let locationFallback = normalizedCountryName;
    try {
      const countryRes = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(normalizedCountryName)}?fullText=true`);
      const countryData = countryRes.data?.[0];
      if (countryData) {
        if (countryData.capitalInfo?.latlng && countryData.capitalInfo.latlng.length === 2) {
          lat = countryData.capitalInfo.latlng[0];
          lon = countryData.capitalInfo.latlng[1];
          locationFallback = `${countryData.capital?.[0] || ''}, ${normalizedCountryName}`;
        } else if (countryData.latlng && countryData.latlng.length === 2) {
          lat = countryData.latlng[0];
          lon = countryData.latlng[1];
        }
      }
    } catch (e) {
      console.warn("REST Countries API lookup failed, falling back to OpenTripMap geoname lookup", e);
    }

    // Fallback if REST Countries doesn't provide valid coordinates
    if (lat === 0 && lon === 0) {
      const geonameUrl = `${BASE_URL}/places/geoname?name=${encodeURIComponent(normalizedCountryName)}&apikey=${OPENTRIPMAP_API_KEY}`;
      const geonameRes = await axios.get(geonameUrl);
      if (geonameRes.data && geonameRes.data.status === 'OK') {
        lat = geonameRes.data.lat;
        lon = geonameRes.data.lon;
      }
    }

    if (lat !== 0 || lon !== 0) {
      // Map categories to OpenTripMap kinds
      let kinds = '';
      if (category === 'Must Visit') {
        kinds = 'monuments,tourist_object,unesco,historic_architecture,museums';
      } else if (category === 'Hidden Gems') {
        kinds = 'natural,view_points,ruins,fortresses,abandoned_minerals';
      } else if (category === 'Local Eats') {
        kinds = 'foods,restaurants,cafes';
      } else if (category === 'Active Life') {
        kinds = 'sport,active,diving,surfing,hiking,climbing,nature_reserves';
      }

      // 2. Fetch POIs inside radius (200km)
      const radiusUrl = `${BASE_URL}/places/radius?radius=200000&lon=${lon}&lat=${lat}&kinds=${kinds}&format=json&limit=15&apikey=${OPENTRIPMAP_API_KEY}`;
      const radiusRes = await axios.get(radiusUrl);

      if (Array.isArray(radiusRes.data) && radiusRes.data.length > 0) {
        // Filter out places with no names
        const places = radiusRes.data.filter(p => p.name && p.name.trim() !== '');

        if (places.length > 0) {
          // 3. Fetch detailed information for top 6 items in parallel
          const detailedPlaces = await Promise.all(
            places.slice(0, 6).map(async (p) => {
              try {
                const detailUrl = `${BASE_URL}/places/xid/${p.xid}?apikey=${OPENTRIPMAP_API_KEY}`;
                const detailRes = await axios.get(detailUrl);
                const detail = detailRes.data;

                // Resolve image, fall back to Unsplash
                let image = detail.preview?.source || detail.image || null;
                if (!image) {
                  image = await getDestinationImage(`${detail.name}, ${normalizedCountryName}`).catch(() => null);
                }

                // Resolve description
                let description = detail.wikipedia_extracts?.text || '';
                if (!description) {
                  description = getDefaultDescription(detail.name, category);
                }

                // Resolve location string
                let locationInfo = '';
                if (detail.address) {
                  const addr = detail.address;
                  locationInfo = [addr.city || addr.town || addr.village, addr.state, addr.country]
                    .filter(Boolean)
                    .join(', ');
                }
                if (!locationInfo) {
                  locationInfo = locationFallback;
                }

                return {
                  name: detail.name,
                  description: description,
                  image: image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
                  location: locationInfo,
                  category: category
                };
              } catch (detailErr) {
                console.error(`Error fetching detail for place xid ${p.xid}:`, detailErr);
                return null;
              }
            })
          );

          const filteredDetails = detailedPlaces.filter(Boolean);
          if (filteredDetails.length >= 3) {
            return filteredDetails;
          }
        }
      }
    }
  } catch (apiError) {
    console.error('OpenTripMap API failed or rate limited. Using fallback generator.', apiError);
  }

  // Fallback Logic
  console.log(`Using curated / template fallback for ${normalizedCountryName} -> ${category}`);
  const fallbackList = CURATED_PLACES[normalizedCountryName]?.[category] || GENERIC_TEMPLATES[category] || [];

  return await Promise.all(
    fallbackList.map(async (item) => {
      const customName = item.name.includes('[Country]')
        ? item.name.replace('[Country]', normalizedCountryName)
        : item.name;
      const customDesc = item.description.includes('[Country]')
        ? item.description.replace('[Country]', normalizedCountryName)
        : item.description;

      let image = await getDestinationImage(`${customName}, ${normalizedCountryName}`).catch(() => null);
      if (!image) {
        image = await getDestinationImage(`${normalizedCountryName} landscape`).catch(() => null);
      }

      return {
        ...item,
        name: customName,
        description: customDesc,
        location: item.location === 'Capital City District' ? `Capital of ${normalizedCountryName}` : (item.location || normalizedCountryName),
        image: image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop'
      };
    })
  );
};
