import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com';

export const searchPhotos = async (query, perPage = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        query: query,
        per_page: perPage,
        client_id: UNSPLASH_ACCESS_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching photos from Unsplash:', error);
    return [];
  }
};

export const getDestinationImage = async (destination) => {
  const photos = await searchPhotos(destination, 1);
  return photos.length > 0 ? photos[0].urls.regular : null;
};
