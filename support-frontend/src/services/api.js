import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const complaintsAPI = {
  // Send OTP to phone number
  sendOTP: async (phoneNumber) => {
    try {
      const response = await api.post('/complaints/send-otp', {
        phoneNumber: phoneNumber
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send OTP');
    }
  },

  // Verify OTP
  verifyOTP: async (phoneNumber, otpCode) => {
    try {
      const response = await api.post('/complaints/verify-otp', {
        phoneNumber: phoneNumber,
        otpCode: otpCode
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to verify OTP');
    }
  },

  // Submit complaint
  submitComplaint: async (complaintData) => {
    try {
      const response = await api.post('/complaints/submit', complaintData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit complaint');
    }
  },

  // Track complaint by complaint number
  trackComplaint: async (complaintNumber) => {
    try {
      const response = await api.get(`/complaints/track`, {
        params: { complaintNumber }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to track complaint');
    }
  }
};

export default api;