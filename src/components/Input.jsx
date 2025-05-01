import React from 'react';

export default function Input({ label, id, className = '', ...props }) {
  return (
    <div className="form-group">
      {label && (
        <label className="block text-text-secondary mb-2" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`input ${className}`}
        {...props}
      />
    </div>
  );
}