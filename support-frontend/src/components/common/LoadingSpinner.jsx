import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  className = '',
  text = '',
  inline = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    white: 'border-white',
    red: 'border-red-500',
    green: 'border-green-500'
  };

  const Spinner = () => (
    <div
      className={`
        ${sizeClasses[size]}
        border-4 border-t-transparent rounded-full
        ${colorClasses[color]}
        animate-spin
        ${className}
      `}
    />
  );

  if (inline) {
    return (
      <div className="flex items-center gap-2">
        <Spinner />
        {text && <span className="text-sm text-gray-600">{text}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Spinner />
      {text && (
        <p className="text-sm text-gray-600 text-center">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;