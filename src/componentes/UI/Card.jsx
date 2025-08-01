import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'md',
  hover = true,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg transition-all duration-300';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl' : '';
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card; 