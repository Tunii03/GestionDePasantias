import React from 'react';

const Input = ({ 
  label, 
  error, 
  className = '', 
  size = 'md',
  fullWidth = true,
  ...props 
}) => {
  const baseClasses = 'w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200';
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };
  
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${sizes[size]} ${errorClasses} ${widthClass} ${className}`;
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input 
        className={classes}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input; 