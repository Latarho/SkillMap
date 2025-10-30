import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  CloudDownload as DownloadIcon,
  Description as FileIcon,
} from '@mui/icons-material';
import { GRADIENTS } from '../config/constants';
import { exportToJSON } from '../utils/exportUtils';
import { loadFromStorage } from '../utils';
import { STORAGE_KEYS } from '../constants';

const DataManagement = () => {
  const handleExportAll = () => {
    const allData = {
      competencies: loadFromStorage(STORAGE_KEYS.COMPETENCIES) || [],
      profiles: loadFromStorage(STORAGE_KEYS.PROFILES) || [],
      careerTracks: loadFromStorage(STORAGE_KEYS.CAREER_TRACKS) || [],
      employees: loadFromStorage(STORAGE_KEYS.EMPLOYEES) || [],
      userProfile: loadFromStorage(STORAGE_KEYS.USER_PROFILE) || {},
    };

    exportToJSON(allData, `skillmap-backup-${new Date().toISOString().split('T')[0]}`);
  };

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
        Управление данными
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DownloadIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Экспорт данных
                </Typography>
              </Box>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <FileIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Полный бэкап"
                    secondary="Все данные системы в JSON формате"
                  />
                  <Button variant="outlined" size="small" onClick={handleExportAll}>
                    Экспорт
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <UploadIcon sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Импорт данных
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Восстановите данные из резервной копии
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataManagement;

