import React, { Component } from 'react';
import { ErrorContainer } from './StyledComponents';
import { Typography, Button, Box } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

/**
 * Компонент для обработки ошибок в React компонентах
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние для отображения UI ошибки
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Логируем ошибку
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Отображаем UI ошибки
      return (
        <ErrorContainer>
          <Typography variant="h6" gutterBottom>
            Что-то пошло не так
          </Typography>
          <Typography variant="body2" paragraph>
            Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу.
          </Typography>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="caption" component="pre" sx={{ fontSize: '0.75rem' }}>
                {this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </Typography>
            </Box>
          )}
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={this.handleRetry}
            sx={{ mt: 2 }}
          >
            Попробовать снова
          </Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
