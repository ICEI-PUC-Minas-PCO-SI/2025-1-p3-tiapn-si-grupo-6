import React from 'react';

export function Button({ children, onClick, type = 'button', variant = 'default', size = 'md' }) {
  const base = {
    default: {
      background: '#2563eb',
      color: '#fff',
      border: 'none',
    },
    outline: {
      background: '#fff',
      color: '#2563eb',
      border: '1px solid #2563eb',
    },
    destructive: {
      background: '#dc2626',
      color: '#fff',
      border: 'none',
    }
  };

  const sizes = {
    sm: '6px 12px',
    md: '8px 16px',
    lg: '10px 20px'
  };

  const style = {
    padding: sizes[size],
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    ...base[variant],
  };

  return (
    <button onClick={onClick} type={type} style={style}>
      {children}
    </button>
  );
}
