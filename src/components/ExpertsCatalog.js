import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { GRADIENTS } from '../config/constants';

const ExpertsCatalog = () => {
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
        Каталог экспертов
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Поиск специалистов по навыкам
        </Typography>
        <Typography color="text.secondary">
          Здесь можно найти экспертов в различных областях.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ExpertsCatalog;

