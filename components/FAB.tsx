'use client';

import { ReactNode } from 'react';

interface FABProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function FAB({ 
  variant = 'primary', 
  onClick, 
  children, 
  className = '' 
}: FABProps) {
  const baseClasses = 'fab';
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary/90',
    secondary: 'bg-gray-600 hover:bg-gray-700'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
