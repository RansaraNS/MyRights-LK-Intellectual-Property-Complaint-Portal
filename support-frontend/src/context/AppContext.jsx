import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: null,
  complaintData: {
    phoneVerified: false,
    phoneNumber: '',
    otpVerified: false
  }
};

const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SUCCESS: 'SET_SUCCESS',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  SET_PHONE_VERIFIED: 'SET_PHONE_VERIFIED',
  SET_PHONE_NUMBER: 'SET_PHONE_NUMBER',
  SET_OTP_VERIFIED: 'SET_OTP_VERIFIED',
  RESET_COMPLAINT_DATA: 'RESET_COMPLAINT_DATA'
};

const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case actionTypes.SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
        loading: false
      };
    case actionTypes.CLEAR_MESSAGES:
      return {
        ...state,
        error: null,
        success: null
      };
    case actionTypes.SET_PHONE_VERIFIED:
      return {
        ...state,
        complaintData: {
          ...state.complaintData,
          phoneVerified: action.payload
        }
      };
    case actionTypes.SET_PHONE_NUMBER:
      return {
        ...state,
        complaintData: {
          ...state.complaintData,
          phoneNumber: action.payload
        }
      };
    case actionTypes.SET_OTP_VERIFIED:
      return {
        ...state,
        complaintData: {
          ...state.complaintData,
          otpVerified: action.payload
        }
      };
    case actionTypes.RESET_COMPLAINT_DATA:
      return {
        ...state,
        complaintData: initialState.complaintData
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = (loading) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: actionTypes.SET_ERROR, payload: error });
  };

  const setSuccess = (success) => {
    dispatch({ type: actionTypes.SET_SUCCESS, payload: success });
  };

  const clearMessages = () => {
    dispatch({ type: actionTypes.CLEAR_MESSAGES });
  };

  const setPhoneVerified = (verified) => {
    dispatch({ type: actionTypes.SET_PHONE_VERIFIED, payload: verified });
  };

  const setPhoneNumber = (phoneNumber) => {
    dispatch({ type: actionTypes.SET_PHONE_NUMBER, payload: phoneNumber });
  };

  const setOtpVerified = (verified) => {
    dispatch({ type: actionTypes.SET_OTP_VERIFIED, payload: verified });
  };

  const resetComplaintData = () => {
    dispatch({ type: actionTypes.RESET_COMPLAINT_DATA });
  };

  const value = {
    ...state,
    setLoading,
    setError,
    setSuccess,
    clearMessages,
    setPhoneVerified,
    setPhoneNumber,
    setOtpVerified,
    resetComplaintData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};