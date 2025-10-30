import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';
import AppLayout from './components/layout/AppLayout';
import MyProfile from './components/MyProfile';
import MyTeam from './components/MyTeam';
import Directories from './components/Directories';
import Analytics from './components/Analytics';
import IndividualDevelopmentPlan from './components/IndividualDevelopmentPlan';
import KnowledgeBase from './components/KnowledgeBase';
import Achievements from './components/Achievements';
import ExpertsCatalog from './components/ExpertsCatalog';
import TeamBuilder from './components/TeamBuilder';
import Feedback360 from './components/Feedback360';
import DataManagement from './components/DataManagement';
import Notifications from './components/Notifications';
import useNavigation from './hooks/useNavigation';
import { BREAKPOINTS } from './config/constants';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(BREAKPOINTS.mobile));
  
  const { currentTab, mobileOpen, handleNavigation, handleDrawerToggle } = useNavigation(isMobile);

  return (
    <AppLayout
      currentTab={currentTab}
      mobileOpen={mobileOpen}
      onNavigate={handleNavigation}
      onDrawerToggle={handleDrawerToggle}
    >
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 2, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Routes>
          <Route path="/" element={<ErrorBoundary><MyProfile /></ErrorBoundary>} />
          <Route path="/profile" element={<ErrorBoundary><MyProfile /></ErrorBoundary>} />
          <Route path="/team" element={<ErrorBoundary><MyTeam /></ErrorBoundary>} />
          <Route path="/directories" element={<ErrorBoundary><Directories /></ErrorBoundary>} />
          <Route path="/analytics" element={<ErrorBoundary><Analytics /></ErrorBoundary>} />
          <Route path="/idp" element={<ErrorBoundary><IndividualDevelopmentPlan /></ErrorBoundary>} />
          <Route path="/feedback360" element={<ErrorBoundary><Feedback360 /></ErrorBoundary>} />
          <Route path="/knowledge" element={<ErrorBoundary><KnowledgeBase /></ErrorBoundary>} />
          <Route path="/achievements" element={<ErrorBoundary><Achievements /></ErrorBoundary>} />
          <Route path="/experts" element={<ErrorBoundary><ExpertsCatalog /></ErrorBoundary>} />
          <Route path="/team-builder" element={<ErrorBoundary><TeamBuilder /></ErrorBoundary>} />
          <Route path="/data-management" element={<ErrorBoundary><DataManagement /></ErrorBoundary>} />
          <Route path="/notifications" element={<ErrorBoundary><Notifications /></ErrorBoundary>} />
        </Routes>
      </Container>
    </AppLayout>
  );
};

export default App;
