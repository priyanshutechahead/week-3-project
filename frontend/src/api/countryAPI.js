import axios from 'axios';
import axiosInstance from './axios';

const REST_COUNTRIES_BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  const response = await axios.get(`${REST_COUNTRIES_BASE_URL}/all?fields=name,capital,currencies,cca2,flags`);
  return response.data;
};

export const getCountryByName = async (name) => {
  try {
    const response = await axios.get(`${REST_COUNTRIES_BASE_URL}/name/${encodeURIComponent(name.trim())}?fullText=true`);
    return response.data[0];
  } catch (error) {
    // If exact match fails, try generic search
    try {
      const response = await axios.get(`${REST_COUNTRIES_BASE_URL}/name/${encodeURIComponent(name.trim())}`);
      return response.data[0];
    } catch (innerError) {
      console.error(`Failed to fetch country by name: ${name}`, innerError);
      return null;
    }
  }
};

export const getCountryByCode = async (code) => {
  const response = await axios.get(`${REST_COUNTRIES_BASE_URL}/alpha/${code}`);
  return response.data[0];
};

export const getIntelligence = async (countryName) => {
  const response = await axiosInstance.get(`/countries/intelligence/${countryName}`);
  return response.data;
};
