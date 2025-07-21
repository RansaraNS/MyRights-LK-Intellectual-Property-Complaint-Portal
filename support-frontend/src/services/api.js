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
  },
  
  preparePayment: async (complaintId, notifyUrl, returnUrl, cancelUrl) => {
    try {
      const response = await api.post('/complaints/prepare-payment', {
        complaintId,
        notifyUrl,
        returnUrl,
        cancelUrl
      });
      
      // Ensure the response data is properly formatted
      if (response.data && response.data.paymentData) {
        // Convert sandbox string to boolean if needed
        if (typeof response.data.paymentData.sandbox === 'string') {
          response.data.paymentData.sandbox = response.data.paymentData.sandbox === 'true';
        }
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to prepare payment');
    }
  },

  // Check payment status
  getPaymentStatus: async (complaintId) => {
    try {
      const response = await api.get(`/payment/status/${complaintId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get payment status');
    }
  }
};

export default api;