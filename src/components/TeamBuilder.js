import React from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { GRADIENTS } from '../config/constants';

const TeamBuilder = () => {
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
        Подбор команды под проект
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Умный подбор сотрудников
        </Typography>
        <Typography color="text.secondary">
          Определите требуемые навыки, и система подберет подходящих специалистов.
        </Typography>
      </Paper>
    </Box>
  );
};

export default TeamBuilder;

