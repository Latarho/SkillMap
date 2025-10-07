import { useState } from 'react';

export const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  return {
    snackbarOpen,
    snackbarMessage,
    showSnackbar,
    hideSnackbar
  };
};
