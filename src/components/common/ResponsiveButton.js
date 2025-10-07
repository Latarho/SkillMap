import React from 'react';
import { Button } from '@mui/material';

const ResponsiveButton = React.forwardRef(({ 
  children, 
  size = 'medium',
  sx = {}, 
  ...props 
}, ref) => {
  const responsiveSx = {
    fontSize: {
      xs: size === 'small' ? '0.75rem' : 
          size === 'medium' ? '0.8rem' : '0.9rem',
      sm: size === 'small' ? '0.8rem' : 
          size === 'medium' ? '0.85rem' : '0.95rem',
      md: size === 'small' ? '0.85rem' : 
          size === 'medium' ? '0.9rem' : '1rem',
      lg: size === 'small' ? '0.9rem' : 
          size === 'medium' ? '0.95rem' : '1.05rem',
      xl: size === 'small' ? '0.95rem' : 
          size === 'medium' ? '1rem' : '1.1rem',
    },
    padding: {
      xs: size === 'small' ? '4px 8px' : 
          size === 'medium' ? '6px 12px' : '8px 16px',
      sm: size === 'small' ? '5px 10px' : 
          size === 'medium' ? '7px 14px' : '9px 18px',
      md: size === 'small' ? '6px 12px' : 
          size === 'medium' ? '8px 16px' : '10px 20px',
      lg: size === 'small' ? '7px 14px' : 
          size === 'medium' ? '9px 18px' : '11px 22px',
      xl: size === 'small' ? '8px 16px' : 
          size === 'medium' ? '10px 20px' : '12px 24px',
    },
    minHeight: {
      xs: size === 'small' ? '28px' : 
          size === 'medium' ? '32px' : '36px',
      sm: size === 'small' ? '30px' : 
          size === 'medium' ? '34px' : '38px',
      md: size === 'small' ? '32px' : 
          size === 'medium' ? '36px' : '40px',
      lg: size === 'small' ? '34px' : 
          size === 'medium' ? '38px' : '42px',
      xl: size === 'small' ? '36px' : 
          size === 'medium' ? '40px' : '44px',
    },
    ...sx
  };

  return (
    <Button 
      ref={ref}
      size={size} 
      sx={responsiveSx} 
      {...props}
    >
      {children}
    </Button>
  );
});

export default ResponsiveButton;
