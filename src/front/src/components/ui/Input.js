import React from 'react';

export function Input({ value, onChange, placeholder, className }) {
  const style = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '14px',
  };

  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      className={className}
    />
  );
}
