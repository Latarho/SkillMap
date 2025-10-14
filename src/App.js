import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
  Button,
} from '@mui/material';
import MyProfile from './components/MyProfile';
import MyTeam from './components/MyTeam';
import Directories from './components/Directories';

// Компонент для обработки ошибок
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" color="error">
            Ошибка в компоненте
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {this.state.error?.message || 'Неизвестная ошибка'}
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(0);
  const [error, setError] = useState(null);

  // Обработка ошибок
  useEffect(() => {
    const handleError = (error) => {
      console.error('App Error:', error);
      setError(error.message);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    const routes = ['/profile', '/team', '/directories'];
    navigate(routes[newValue] || '/profile');
  };

  // Определяем текущую вкладку на основе URL
  useEffect(() => {
    const path = location.pathname;
    const tabMap = {
      '/profile': 0,
      '/team': 1,
      '/directories': 2,
    };
    setCurrentTab(tabMap[path] || 0);
  }, [location.pathname]);

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" color="error">
          Ошибка приложения
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Перезагрузить страницу
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SkillMap - Управление навыками
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label="Мой профиль" />
          <Tab label="Моя команда" />
          <Tab label="Справочники" />
        </Tabs>
      </Box>

      <Container 
        maxWidth={false} 
        sx={{ 
          mt: 3, 
          mb: 3,
          px: 0,
          maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1400px', xl: '1600px' }
        }}
      >
        <Routes>
          <Route path="/" element={<ErrorBoundary><MyProfile /></ErrorBoundary>} />
          <Route path="/profile" element={<ErrorBoundary><MyProfile /></ErrorBoundary>} />
          <Route path="/team" element={<ErrorBoundary><MyTeam /></ErrorBoundary>} />
          <Route path="/directories" element={<ErrorBoundary><Directories /></ErrorBoundary>} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;