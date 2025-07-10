import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  shadow = 'md',
  padding = 'lg',
  hover = false,
  ...props 
}) => {
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    none: 'shadow-none'
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
    none: 'p-0'
  };

  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-200
        ${shadowClasses[shadow]}
        ${paddingClasses[padding]}
        ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`mb-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h2 className={`text-2xl font-bold text-gray-900 mb-2 ${className}`} {...props}>
      {children}
    </h2>
  );
};

const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-gray-600 text-lg ${className}`} {...props}>
      {children}
    </p>
  );
};

const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`mt-6 pt-6 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Export components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;