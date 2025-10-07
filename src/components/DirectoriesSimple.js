import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const DirectoriesSimple = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [competencies] = useState([
    { id: 1, name: 'JavaScript', category: 'Программирование', level: 4 },
    { id: 2, name: 'React', category: 'Frontend', level: 3 },
    { id: 3, name: 'Node.js', category: 'Backend', level: 2 },
  ]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Справочники
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Управление справочниками компетенций и профилей
        </Typography>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Компетенции" />
            <Tab label="Профили" />
            <Tab label="Карьерные треки" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 2 }}>
          {currentTab === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Компетенции</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                  Добавить
                </Button>
              </Box>
              <List>
                {competencies.map((comp) => (
                  <ListItem key={comp.id}>
                    <ListItemText 
                      primary={comp.name}
                      secondary={`${comp.category} - Уровень ${comp.level}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          
          {currentTab === 1 && (
            <Typography variant="body1">
              Профили - в разработке
            </Typography>
          )}
          
          {currentTab === 2 && (
            <Typography variant="body1">
              Карьерные треки - в разработке
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default DirectoriesSimple;
