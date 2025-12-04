import axios from 'axios';
import { apiUrl } from '../config/config';

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const transactionApi = {
  processWithdrawal: async (data: {
    mobileNumber: string;
    amount: number;
    primaryPin: string;
    extraPin: string;
  }) => {
    const response = await api.post('/transactions/withdraw', data);
    return response.data;
  },

  getTransactionHistory: async () => {
    const response = await api.get('/transactions/history');
    return response.data;
  },

  getTransactionStatus: async (reference: string) => {
    const response = await api.get(`/transactions/status/${reference}`);
    return response.data;
  }
};

export default api;4
