import React from 'react';

export default function Alert({ children, type = 'info', className = '' }) {
  const typeClasses = {
    success: 'bg-green-800 text-green-100',
    error: 'bg-red-800 text-red-100',
    warning: 'bg-yellow-700 text-yellow-100',
    info: 'bg-blue-800 text-blue-100'
  };
  
  return (
    <div className={`p-3 rounded-md ${typeClasses[type]} ${className}`}>
      {children}
    </div>
  );
}