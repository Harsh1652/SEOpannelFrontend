import axios from 'axios';
import API_CONFIG, { getApiUrl, getBackendUrl } from '../config/api';

const API_URL = API_CONFIG.API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication and logging
api.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No auth token found in localStorage');
    }
    
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`, config.data || '');
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging and auth handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response || error);
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Page API endpoints
export const getPages = async () => {
  try {
    const response = await api.get('/pages');
    return response.data;
  } catch (error) {
    console.error('Error in getPages:', error);
    throw error;
  }
};

export const getPageBySlug = async (slug) => {
  try {
    console.log('Calling getPageBySlug with slug:', slug);
    const response = await api.get(`/pages/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getPageBySlug for slug ${slug}:`, error);
    throw error;
  }
};

export const updatePageSEO = async (slug, pageData) => {
  try {
    console.log('Calling updatePageSEO with slug:', slug);
    const response = await api.put(`/pages/${slug}`, pageData);
    return response.data;
  } catch (error) {
    console.error(`Error in updatePageSEO for slug ${slug}:`, error);
    throw error;
  }
};

export const createPage = async (pageData) => {
  try {
    console.log('Calling createPage');
    const response = await api.post('/pages', pageData);
    return response.data;
  } catch (error) {
    console.error('Error in createPage:', error);
    throw error;
  }
};

// Blog API endpoints
export const getBlogs = async () => {
  const response = await api.get('/blogs');
  return response.data;
};

export const getBlogBySlug = async (slug) => {
  const response = await api.get(`/blogs/${slug}`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const formData = new FormData();
  
  // Add text fields
  formData.append('title', blogData.title);
  formData.append('slug', blogData.slug);
  formData.append('content', blogData.content);
  if (blogData.country) formData.append('country', blogData.country);
  if (blogData.continent) formData.append('continent', blogData.continent);
  
  // Add SEO data
  formData.append('seo', JSON.stringify(blogData.seo));
  
  // Add image if exists
  if (blogData.image) {
    formData.append('image', blogData.image);
  }
  
  // Get auth token
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await axios.post(`${getApiUrl('/blogs')}`, formData, { headers });
  
  return response.data;
};

export const updateBlog = async (slug, blogData) => {
  const formData = new FormData();
  
  // Add text fields
  if (blogData.title) formData.append('title', blogData.title);
  if (blogData.content) formData.append('content', blogData.content);
  if (blogData.country) formData.append('country', blogData.country);
  if (blogData.continent) formData.append('continent', blogData.continent);
  
  // Add SEO data
  if (blogData.seo) formData.append('seo', JSON.stringify(blogData.seo));
  
  // Add image if exists
  if (blogData.image) {
    formData.append('image', blogData.image);
  }
  
  // Get auth token
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await axios.put(`${getApiUrl(`/blogs/${slug}`)}`, formData, { headers });
  
  return response.data;
};

export const deleteBlog = async (slug) => {
  const response = await api.delete(`/blogs/${slug}`);
  return response.data;
}; 