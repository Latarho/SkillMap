import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, Brightness4 as DarkIcon, Brightness7 as LightIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';
import GlobalSearch from '../GlobalSearch';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import { DRAWER_WIDTH, APP_NAME, GRADIENTS, BREAKPOINTS } from '../../config/constants';

const AppLayout = ({ 
  currentTab, 
  mobileOpen, 
  onNavigate, 
  onDrawerToggle, 
  children 
}) => {
  const theme = useTheme();
  const { mode, toggleTheme } = useCustomTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down(BREAKPOINTS.mobile));

  const drawerContent = (
    <Sidebar
      currentTab={currentTab}
      onNavigate={onNavigate}
      isMobile={isMobile}
      onClose={onDrawerToggle}
    />
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar для мобильных */}
      <AppBar
        position="fixed"
        sx={{
          display: { [BREAKPOINTS.mobile]: 'none' },
          background: GRADIENTS.primary,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, flexGrow: 1 }}>
            {APP_NAME}
          </Typography>
          <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Боковая навигация */}
      <Box
        component="nav"
        sx={{ 
          width: { [BREAKPOINTS.mobile]: DRAWER_WIDTH }, 
          flexShrink: { [BREAKPOINTS.mobile]: 0 } 
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', [BREAKPOINTS.mobile]: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', [BREAKPOINTS.mobile]: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Основной контент */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { [BREAKPOINTS.mobile]: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          background: GRADIENTS.background,
        }}
      >
        <Toolbar sx={{ display: { [BREAKPOINTS.mobile]: 'none' } }} />
        {children}
      </Box>

      {/* Глобальный поиск */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </Box>
  );
};

export default AppLayout;

