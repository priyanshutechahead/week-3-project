import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const getTravelNews = async (countryName) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: `${countryName} travel OR tourism OR tech`,
        sortBy: 'publishedAt',
        language: 'en',
        pageSize: 10,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching travel news:', error);
    return [];
  }
};
