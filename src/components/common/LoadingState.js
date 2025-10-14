import React, { memo } from 'react';
import { LoadingContainer, ErrorContainer } from './StyledComponents';
import { CircularProgress, Typography, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

/**
 * Компонент для отображения состояния загрузки
 * @param {boolean} loading - состояние загрузки
 * @param {Object} error - объект ошибки
 * @param {function} onRetry - функция повторной попытки
 * @param {React.ReactNode} children - дочерние элементы
 * @param {string} loadingText - текст при загрузке
 * @param {string} errorText - текст при ошибке
 */
const LoadingState = memo(({ 
  loading, 
  error, 
  onRetry, 
  children, 
  loadingText = 'Загрузка...',
  errorText = 'Произошла ошибка при загрузке данных'
}) => {
  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress size={40} />
        <Typography variant="body1" sx={{ mt: 2 }}>
          {loadingText}
        </Typography>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <Typography variant="h6" gutterBottom>
          Ошибка загрузки
        </Typography>
        <Typography variant="body2" paragraph>
          {errorText}
        </Typography>
        {onRetry && (
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            sx={{ mt: 2 }}
          >
            Попробовать снова
          </Button>
        )}
      </ErrorContainer>
    );
  }

  return children;
});

LoadingState.displayName = 'LoadingState';

export default LoadingState;
