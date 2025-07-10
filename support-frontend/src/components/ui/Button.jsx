import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${disabled || loading ? 'pointer-events-none' : ''}
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-primary-500 to-primary-600 
      hover:from-primary-600 hover:to-primary-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-primary-500 transform hover:scale-105
      active:scale-95
    `,
    secondary: `
      bg-white border-2 border-primary-500 text-primary-600
      hover:bg-primary-50 hover:border-primary-600
      focus:ring-primary-500 transform hover:scale-105
      active:scale-95
    `,
    outline: `
      border-2 border-gray-300 text-gray-700 bg-white
      hover:bg-gray-50 hover:border-gray-400
      focus:ring-gray-500
    `,
    ghost: `
      text-gray-600 hover:text-gray-900 hover:bg-gray-100
      focus:ring-gray-500
    `,
    danger: `
      bg-red-500 hover:bg-red-600 text-white
      focus:ring-red-500 transform hover:scale-105
      active:scale-95
    `,
    success: `
      bg-green-500 hover:bg-green-600 text-white
      focus:ring-green-500 transform hover:scale-105
      active:scale-95
    `
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const LoadingSpinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
};

export default Button;