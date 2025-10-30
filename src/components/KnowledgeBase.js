import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { GRADIENTS } from '../config/constants';

const KnowledgeBase = () => {
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
          База знаний
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: GRADIENTS.primary,
            '&:hover': { background: GRADIENTS.primaryHover },
          }}
        >
          Добавить ресурс
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Библиотека обучающих ресурсов
        </Typography>
        <Typography color="text.secondary">
          Здесь будут отображаться статьи, видео, курсы и другие материалы для обучения.
        </Typography>
      </Paper>
    </Box>
  );
};

export default KnowledgeBase;

