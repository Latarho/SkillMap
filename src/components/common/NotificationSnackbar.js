import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { SNACKBAR_CONFIG } from '../../constants';

/**
 * Универсальный компонент для отображения уведомлений
 * @param {boolean} open - состояние открытия
 * @param {string} message - сообщение
 * @param {string} severity - тип уведомления (success, error, warning, info)
 * @param {function} onClose - функция закрытия
 */
const NotificationSnackbar = ({ 
  open, 
  message, 
  severity = 'info', 
  onClose 
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={SNACKBAR_CONFIG.autoHideDuration}
      onClose={onClose}
      anchorOrigin={SNACKBAR_CONFIG.anchorOrigin}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;
