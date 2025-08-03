import axios from 'axios';
import API_CONFIG, { getApiUrl } from '../config/api';

const API_BASE_URL = API_CONFIG.API_URL;

// Create axios instance with base configuration
const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API methods
export const authService = {
  // Login user
  login: (email, password) => {
    return authAPI.post('/login', { email, password });
  },

  // Register user
  register: (userData) => {
    return authAPI.post('/register', userData);
  },

  // Get user profile
  getProfile: () => {
    return authAPI.get('/profile');
  },

  // Update user profile
  updateProfile: (profileData) => {
    return authAPI.put('/profile', profileData);
  },

  // Change password
  changePassword: (passwordData) => {
    return authAPI.put('/change-password', passwordData);
  },
};

export { authAPI }; 