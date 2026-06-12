import axiosInstance from './axios';

export const getTravelNews = async (countryName) => {
  try {
    const response = await axiosInstance.get(`/countries/news/${encodeURIComponent(countryName.trim())}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching travel news:', error);
    return [];
  }
};
