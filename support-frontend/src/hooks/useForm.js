import { useState } from 'react';

export const useForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate single field
    if (validationSchema && validationSchema[name]) {
      const error = validationSchema[name](values[name]);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validate = () => {
    if (!validationSchema) return true;

    const newErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(field => {
      const error = validationSchema[field](values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationSchema).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}));

    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const setValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setValue,
    setErrors
  };
};