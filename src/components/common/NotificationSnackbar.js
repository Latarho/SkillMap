import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { SNACKBAR_CONFIG } from '../../constants';

const NotificationSnackbar = ({ 
  open, 
  message, 
  onClose, 
  severity = 'success' 
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={SNACKBAR_CONFIG.autoHideDuration}
      onClose={onClose}
      anchorOrigin={SNACKBAR_CONFIG.anchorOrigin}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;
