import { create } from 'zustand';
import { getMe } from '../api/authAPI';

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isInitialized: false,

  setAuth: (user, token, refreshToken) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    set({ user, token, refreshToken, isAuthenticated: true, isInitialized: true });
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    set({ user: null, token: null, refreshToken: null, isAuthenticated: false, isInitialized: true });
  },

  updateUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, isInitialized: true, user: null });
      return;
    }

    try {
      const userData = await getMe();
      set({ 
        user: userData, 
        isAuthenticated: true, 
        isInitialized: true 
      });
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Auth check failed:', error);
      // If token is invalid or expired, logout
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      set({ 
        user: null, 
        token: null, 
        refreshToken: null, 
        isAuthenticated: false, 
        isInitialized: true 
      });
    }
  },
}));

export default useAuthStore;
