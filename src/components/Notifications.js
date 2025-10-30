import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Badge,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { GRADIENTS } from '../config/constants';

const Notifications = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 600,
          background: GRADIENTS.primary,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Уведомления
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
          <Typography variant="h6" fontWeight={600} sx={{ ml: 1 }}>
            Все уведомления
          </Typography>
        </Box>

        <Box sx={{ p: 4, textAlign: 'center' }}>
          <NotificationsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Нет уведомлений
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Notifications;

