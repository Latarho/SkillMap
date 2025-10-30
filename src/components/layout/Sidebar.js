import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { NAVIGATION_SECTIONS } from '../../config/navigation';
import { APP_NAME, APP_VERSION, GRADIENTS } from '../../config/constants';

const Sidebar = ({ currentTab, onNavigate, isMobile, onClose }) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          background: GRADIENTS.primary,
          color: 'white',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {APP_NAME}
        </Typography>
        <Typography variant="caption">v{APP_VERSION}</Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
        {NAVIGATION_SECTIONS.map((section, sectionIndex) => (
          <Box key={section.id} sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                px: 3,
                py: 1,
                display: 'block',
                fontWeight: 700,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {section.title}
            </Typography>
            <List>
              {section.items.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    selected={currentTab === item.index}
                    onClick={() => {
                      onNavigate(item.path, item.index);
                      if (isMobile && onClose) {
                        onClose();
                      }
                    }}
                    sx={{
                      mx: 1,
                      borderRadius: 1,
                      '&.Mui-selected': {
                        background: GRADIENTS.primary,
                        color: 'white',
                        '& .MuiListItemIcon-root': {
                          color: 'white',
                        },
                        '&:hover': {
                          background: GRADIENTS.primaryHover,
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {sectionIndex < NAVIGATION_SECTIONS.length - 1 && <Divider sx={{ mx: 2 }} />}
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary">
          © 2025 SkillMap
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;

