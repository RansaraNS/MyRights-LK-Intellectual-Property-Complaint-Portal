export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]{10,13}$/;
  const cleaned = phone.replace(/[^\d]/g, '');
  return phoneRegex.test(cleaned);
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateMaxLength = (value, max) => {
  return !value || value.length <= max;
};

export const validateMinLength = (value, min) => {
  return value && value.length >= min;
};

export const validateComplaintForm = (formData) => {
  const errors = {};

  // Personal Information
  if (!validateRequired(formData.fullName)) {
    errors.fullName = 'Full name is required';
  } else if (!validateMaxLength(formData.fullName, 100)) {
    errors.fullName = 'Full name must be less than 100 characters';
  }

  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  } else if (!validateMaxLength(formData.email, 100)) {
    errors.email = 'Email must be less than 100 characters';
  }

  if (!validateRequired(formData.phoneNumber)) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!validatePhone(formData.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid phone number (10-13 digits)';
  }

  if (!validateRequired(formData.address)) {
    errors.address = 'Address is required';
  } else if (!validateMaxLength(formData.address, 500)) {
    errors.address = 'Address must be less than 500 characters';
  }

  // Complaint Details
  if (!validateRequired(formData.originalWorkTypes)) {
    errors.originalWorkTypes = 'Original work type is required';
  }

  if (!validateRequired(formData.originalWorkUrl)) {
    errors.originalWorkUrl = 'Original work URL is required';
  } else if (!validateURL(formData.originalWorkUrl)) {
    errors.originalWorkUrl = 'Please enter a valid URL';
  }

  if (!formData.copyrightWorkTypes || formData.copyrightWorkTypes.length === 0) {
    errors.copyrightWorkTypes = 'Please select at least one copyright work type';
  }

  if (!validateRequired(formData.copyrightWorkUrl)) {
    errors.copyrightWorkUrl = 'Copyright work URL is required';
  } else if (!validateURL(formData.copyrightWorkUrl)) {
    errors.copyrightWorkUrl = 'Please enter a valid URL';
  }

  if (!validateRequired(formData.reportReason)) {
    errors.reportReason = 'Report reason is required';
  }

  if (formData.description && !validateMaxLength(formData.description, 1000)) {
    errors.description = 'Description must be less than 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatPhoneNumber = (phoneNumber) => {
  // Remove any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format for display (e.g., 0771234567 -> 077 123 4567)
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  
  return phoneNumber;
};