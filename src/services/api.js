import axios from 'axios';
import { toast } from 'react-toastify';

// .env faylidan API manzilini olish
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// So'rov yuborishdan oldin header'ga Token'ni qo'shish
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xatoliklarni markazlashtirilgan holda ushlash
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
        // Token muddati o'tgan yoki yaroqsiz bo'lsa
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login'; // Login sahifasiga yo'naltirish
    }
    
    // Boshqa xatoliklar uchun toast ko'rsatish
    const message = error.response?.data?.detail || error.message || 'Serverda xatolik yuz berdi';
    toast.error(message);
    
    return Promise.reject(error);
  }
);

export default api;