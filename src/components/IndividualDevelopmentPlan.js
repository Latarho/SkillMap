import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { loadFromStorage } from '../utils';
import { STORAGE_KEYS } from '../constants';
import { GRADIENTS } from '../config/constants';

const IndividualDevelopmentPlan = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const savedPlans = loadFromStorage(STORAGE_KEYS.DEVELOPMENT_PLANS) || [];
    setPlans(savedPlans);
  }, []);

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
          Индивидуальные планы развития
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: GRADIENTS.primary,
            '&:hover': { background: GRADIENTS.primaryHover },
          }}
        >
          Создать план
        </Button>
      </Box>

      {plans.length === 0 ? (
        <Alert severity="info">
          У вас пока нет планов развития. Создайте первый план для отслеживания прогресса.
        </Alert>
      ) : (
        <Paper sx={{ p: 3 }}>
          <Typography>Здесь будут отображаться планы развития</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default IndividualDevelopmentPlan;

