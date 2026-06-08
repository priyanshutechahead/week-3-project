import axiosInstance from './axios';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axiosInstance.post('/auth/signup', userData);
  return response.data;
};

export const googleLogin = async (token) => {
  const response = await axiosInstance.post('/auth/google', { token });
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};

export const updateMe = async (data) => {
  const response = await axiosInstance.patch('/users/me', data);
  return response.data;
};
