import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920, // FullHD
      xxxl: 2560, // 4K
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e',
      light: '#e33371',
      dark: '#9a0036',
      contrastText: '#fff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '2.75rem',
      },
      '@media (min-width:900px)': {
        fontSize: '3rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '3.25rem',
      },
      '@media (min-width:1536px)': {
        fontSize: '3.5rem',
      },
      '@media (min-width:1920px)': {
        fontSize: '3.75rem',
      },
      '@media (min-width:2560px)': {
        fontSize: '4rem',
      },
    },
    h2: {
      fontSize: '2.25rem',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.75rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '3rem',
      },
      '@media (min-width:1536px)': {
        fontSize: '3.25rem',
      },
      '@media (min-width:1920px)': {
        fontSize: '3.5rem',
      },
      '@media (min-width:2560px)': {
        fontSize: '3.75rem',
      },
    },
    h3: {
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '2.25rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '2.75rem',
      },
      '@media (min-width:1536px)': {
        fontSize: '3rem',
      },
      '@media (min-width:1920px)': {
        fontSize: '3.25rem',
      },
      '@media (min-width:2560px)': {
        fontSize: '3.5rem',
      },
    },
    h4: {
      fontSize: '1.75rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.25rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:1536px)': {
        fontSize: '2.75rem',
      },
      '@media (min-width:1920px)': {
        fontSize: '3rem',
      },
      '@media (min-width:2560px)': {
        fontSize: '3.25rem',
      },
    },
    h5: {
      fontSize: '1.6rem',
      '@media (min-width:600px)': {
        fontSize: '1.75rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '2.25rem',
      },
      '@media (min-width:1536px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:1920px)': {
        fontSize: '2.75rem',
      },
      '@media (min-width:2560px)': {
        fontSize: '3rem',
      },
    },
    h6: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '1.6rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.75rem',
      },
      '@media (min-width:1200px)': {
        fontSize: '2rem',
      },
      '@media (min-width:1536px)': {
        fontSize: '2.25rem',
      },
      '@media (min-width:1920px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:2560px)': {
        fontSize: '2.75rem',
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
