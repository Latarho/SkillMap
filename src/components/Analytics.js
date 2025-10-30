import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import { GRADIENTS } from '../config/constants';

const Analytics = () => {
  const [currentTab, setCurrentTab] = useState(0);

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
        Аналитика команды
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Обзор команды" />
          <Tab label="Матрица навыков" />
          <Tab label="Прогресс развития" />
          <Tab label="Gap-анализ" />
        </Tabs>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {currentTab === 0 && 'Обзор команды'}
          {currentTab === 1 && 'Матрица навыков'}
          {currentTab === 2 && 'Прогресс развития'}
          {currentTab === 3 && 'Gap-анализ'}
        </Typography>
        <Typography color="text.secondary">
          Модуль аналитики команды. Здесь будут отображаться детальные данные.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Analytics;

