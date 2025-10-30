import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  Chip,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  School as SkillIcon,
  Description as DocumentIcon,
  EmojiEvents as AchievementIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { loadFromStorage } from '../utils';
import { STORAGE_KEYS } from '../constants';
import { GRADIENTS } from '../config/constants';

const GlobalSearch = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.length >= 2) {
      performSearch(searchTerm);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const performSearch = (term) => {
    const lowerTerm = term.toLowerCase();
    const foundResults = [];

    const employees = loadFromStorage(STORAGE_KEYS.EMPLOYEES) || [];
    employees.forEach(emp => {
      if (emp.name?.toLowerCase().includes(lowerTerm) || 
          emp.position?.toLowerCase().includes(lowerTerm)) {
        foundResults.push({
          type: 'employee',
          id: emp.id,
          title: emp.name,
          subtitle: emp.position || 'Сотрудник',
          icon: <PersonIcon />,
          path: '/team',
        });
      }
    });

    const competencies = loadFromStorage(STORAGE_KEYS.COMPETENCIES) || [];
    competencies.forEach(comp => {
      if (comp.name?.toLowerCase().includes(lowerTerm) ||
          comp.description?.toLowerCase().includes(lowerTerm)) {
        foundResults.push({
          type: 'competency',
          id: comp.id,
          title: comp.name,
          subtitle: comp.description || 'Компетенция',
          icon: <SkillIcon />,
          path: '/directories',
        });
      }
    });

    setResults(foundResults.slice(0, 20));
  };

  const handleResultClick = (result) => {
    navigate(result.path);
    onClose();
    setSearchTerm('');
  };

  const getTypeLabel = (type) => {
    const labels = {
      employee: 'Сотрудник',
      competency: 'Компетенция',
      knowledge: 'База знаний',
      plan: 'План развития',
    };
    return labels[type] || type;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          position: 'fixed',
          top: 100,
          m: 0,
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Поиск сотрудников, навыков, ресурсов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {searchTerm.length < 2 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <SearchIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Введите минимум 2 символа для поиска
            </Typography>
          </Box>
        ) : results.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Ничего не найдено
            </Typography>
          </Box>
        ) : (
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {results.map((result, index) => (
              <React.Fragment key={`${result.type}-${result.id}`}>
                <ListItem
                  button
                  onClick={() => handleResultClick(result)}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ background: GRADIENTS.primary }}>
                      {result.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" fontWeight={600}>
                          {result.title}
                        </Typography>
                        <Chip
                          label={getTypeLabel(result.type)}
                          size="small"
                          color="primary"
                        />
                      </Box>
                    }
                    secondary={result.subtitle}
                  />
                </ListItem>
                {index < results.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearch;

