import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { GRADIENTS } from '../config/constants';

const Feedback360 = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            background: GRADIENTS.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          360-градусная обратная связь
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: GRADIENTS.primary,
            '&:hover': { background: GRADIENTS.primaryHover },
          }}
        >
          Создать запрос
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Сбор обратной связи от коллег
        </Typography>
        <Typography color="text.secondary">
          Система многосторонней оценки для объективной обратной связи.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Feedback360;

