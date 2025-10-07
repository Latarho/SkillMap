import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import MyProfileSimple from './components/MyProfileSimple';
import MyTeamSimple from './components/MyTeamSimple';
import DirectoriesSimple from './components/DirectoriesSimple';
// import MyProfile from './components/MyProfile';
// import MyTeam from './components/MyTeam';
// import Directories from './components/Directories';

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

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(0);
  const [error, setError] = useState(null);

  // Обработка ошибок
  React.useEffect(() => {
    const handleError = (error) => {
      console.error('App Error:', error);
      setError(error.message);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    switch (newValue) {
      case 0:
        navigate('/profile');
        break;
      case 1:
        navigate('/team');
        break;
      case 2:
        navigate('/directories');
        break;
      default:
        navigate('/profile');
    }
  };

  // Определяем текущую вкладку на основе URL
  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/profile') setCurrentTab(0);
    else if (path === '/team') setCurrentTab(1);
    else if (path === '/directories') setCurrentTab(2);
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
          px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
          maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '1400px', xl: '1600px' }
        }}
      >
        <Routes>
          <Route path="/" element={<ErrorBoundary><MyProfileSimple /></ErrorBoundary>} />
          <Route path="/profile" element={<ErrorBoundary><MyProfileSimple /></ErrorBoundary>} />
          <Route path="/team" element={<ErrorBoundary><MyTeamSimple /></ErrorBoundary>} />
          <Route path="/directories" element={<ErrorBoundary><DirectoriesSimple /></ErrorBoundary>} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
