import React from 'react';

const Select = ({ 
  label, 
  value, 
  onChange, 
  options = [],
  placeholder = 'Select an option',
  error,
  required = false,
  disabled = false,
  multiple = false,
  className = '',
  ...props 
}) => {
  const selectId = `select-${Math.random().toString(36).substr(2, 9)}`;

  const handleChange = (e) => {
    if (multiple) {
      const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
      onChange(selectedValues);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label 
          htmlFor={selectId} 
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          id={selectId}
          value={multiple ? undefined : value}
          onChange={handleChange}
          disabled={disabled}
          multiple={multiple}
          className={`
            w-full px-4 py-3 text-gray-900 bg-white
            border-2 rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-1
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${multiple ? 'min-h-[120px]' : 'appearance-none'}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
            }
            ${disabled ? 'opacity-50' : ''}
          `}
          {...props}
        >
          {!multiple && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              selected={multiple && Array.isArray(value) && value.includes(option.value)}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {!multiple && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-8">
            <svg 
              className="h-5 w-5 text-red-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 animate-slide-in">
          {error}
        </p>
      )}
      
      {multiple && (
        <p className="text-xs text-gray-500">
          Hold Ctrl/Cmd to select multiple options
        </p>
      )}
    </div>
  );
};

export default Select;