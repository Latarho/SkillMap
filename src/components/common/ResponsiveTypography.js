import React from 'react';
import { Typography } from '@mui/material';

const ResponsiveTypography = React.forwardRef(({ 
  variant = 'h4', 
  children, 
  sx = {}, 
  ...props 
}, ref) => {
  const responsiveSx = {
    fontSize: {
      xs: variant === 'h1' ? '1.5rem' : 
          variant === 'h2' ? '1.4rem' : 
          variant === 'h3' ? '1.3rem' : 
          variant === 'h4' ? '1.2rem' : 
          variant === 'h5' ? '1.1rem' : 
          variant === 'h6' ? '1rem' : '1rem',
      sm: variant === 'h1' ? '1.75rem' : 
          variant === 'h2' ? '1.6rem' : 
          variant === 'h3' ? '1.5rem' : 
          variant === 'h4' ? '1.4rem' : 
          variant === 'h5' ? '1.3rem' : 
          variant === 'h6' ? '1.2rem' : '1.1rem',
      md: variant === 'h1' ? '2rem' : 
          variant === 'h2' ? '1.8rem' : 
          variant === 'h3' ? '1.6rem' : 
          variant === 'h4' ? '1.5rem' : 
          variant === 'h5' ? '1.4rem' : 
          variant === 'h6' ? '1.3rem' : '1.2rem',
      lg: variant === 'h1' ? '2.25rem' : 
          variant === 'h2' ? '2rem' : 
          variant === 'h3' ? '1.75rem' : 
          variant === 'h4' ? '1.6rem' : 
          variant === 'h5' ? '1.5rem' : 
          variant === 'h6' ? '1.4rem' : '1.3rem',
      xl: variant === 'h1' ? '2.5rem' : 
          variant === 'h2' ? '2.25rem' : 
          variant === 'h3' ? '2rem' : 
          variant === 'h4' ? '1.75rem' : 
          variant === 'h5' ? '1.6rem' : 
          variant === 'h6' ? '1.5rem' : '1.4rem',
    },
    ...sx
  };

  return (
    <Typography 
      ref={ref}
      variant={variant} 
      sx={responsiveSx} 
      {...props}
    >
      {children}
    </Typography>
  );
});

export default ResponsiveTypography;
