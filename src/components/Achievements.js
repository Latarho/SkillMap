import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { GRADIENTS } from '../config/constants';

const Achievements = () => {
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
        Достижения и рейтинги
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <TrophyIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700}>0</Typography>
              <Typography variant="body2" color="text.secondary">
                Достижений
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <StarIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" fontWeight={700}>0</Typography>
              <Typography variant="body2" color="text.secondary">
                Очков
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Achievements;

