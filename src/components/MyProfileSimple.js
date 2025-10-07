import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';

const MyProfileSimple = () => {
  const [testState, setTestState] = useState('Тест работает');

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Мой профиль (простая версия)
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {testState}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setTestState('Кнопка нажата!')}
        >
          Тестовая кнопка
        </Button>
      </CardContent>
    </Card>
  );
};

export default MyProfileSimple;
