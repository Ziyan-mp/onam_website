import axios from 'axios';

/**
 * Pre-configured Axios instance for Onam Lucky Draw API backend
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://onam-backend.onrender.com/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('onam_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global Error Handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred.',
      status: error.response?.status,
      data: error.response?.data,
    };

    // Auto-logout on 401 Unauthorized
    if (customError.status === 401) {
      localStorage.removeItem('onam_auth_token');
      localStorage.removeItem('onam_user');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(customError);
  }
);

export default api;
