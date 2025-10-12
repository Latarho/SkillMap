import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useSnackbar } from '../hooks/useSnackbar';
import { loadFromStorage, saveToStorage, parseSkillsString, formatSkillsString, forceUpdateData } from '../utils';
import { STORAGE_KEYS, COMPETENCY_TYPES } from '../constants';
import { defaultCompetencies, defaultProfiles } from '../data/mockData';
import { defaultCareerTracks } from '../data/careerTracks';
import NotificationSnackbar from './common/NotificationSnackbar';

const Directories = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { snackbarOpen, snackbarMessage, showSnackbar, hideSnackbar } = useSnackbar();

  // Состояния для каждого справочника
  const [competencies, setCompetencies] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [careerTracks, setCareerTracks] = useState([]);

  // Форма для редактирования
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    level: '',
    type: '',
    levels: {},
    requirements: [],
    horizontalGrowth: {},
  });

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadData = useCallback(() => {
    // Загружаем компетенции
    const savedCompetencies = loadFromStorage(STORAGE_KEYS.COMPETENCIES);
    if (savedCompetencies) {
      // Проверяем, есть ли у компетенций поле levels
      const hasLevels = savedCompetencies.some(comp => comp.levels && Object.keys(comp.levels).length > 0);
      if (!hasLevels) {
        // Если уровни отсутствуют, обновляем данные
        console.log('Обновляем компетенции с уровнями владения');
        setCompetencies(defaultCompetencies);
        saveToStorage(STORAGE_KEYS.COMPETENCIES, defaultCompetencies);
    } else {
        setCompetencies(savedCompetencies);
      }
    } else {
      setCompetencies(defaultCompetencies);
      saveToStorage(STORAGE_KEYS.COMPETENCIES, defaultCompetencies);
    }

    // Загружаем профили
    const savedProfiles = loadFromStorage(STORAGE_KEYS.PROFILES);
    if (savedProfiles) {
      setProfiles(savedProfiles);
    } else {
      setProfiles(defaultProfiles);
      saveToStorage(STORAGE_KEYS.PROFILES, defaultProfiles);
    }

    // Загружаем карьерные треки
    const savedCareerTracks = loadFromStorage(STORAGE_KEYS.CAREER_TRACKS);
    if (savedCareerTracks) {
      setCareerTracks(savedCareerTracks);
    } else {
      setCareerTracks(defaultCareerTracks);
      saveToStorage(STORAGE_KEYS.CAREER_TRACKS, defaultCareerTracks);
    }
  }, []);

  const handleTabChange = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleOpenDialog = useCallback((item = null) => {
    setEditingItem(item);
    if (item) {
      // Обрабатываем уровни профиля, чтобы skills были массивами
      const processedLevels = {};
      if (item.levels) {
        Object.keys(item.levels).forEach(levelKey => {
          const levelData = item.levels[levelKey];
          processedLevels[levelKey] = {
            ...levelData,
            skills: Array.isArray(levelData.skills) ? levelData.skills : []
          };
        });
      }
      
      setFormData({
        name: item.name || '',
        description: item.description || '',
        category: item.category || '',
        level: item.level || '',
        type: item.type || '',
        levels: processedLevels,
        requirements: item.requirements || [],
        horizontalGrowth: item.horizontalGrowth || {},
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        level: '',
        type: '',
        levels: {},
        requirements: [],
        horizontalGrowth: {},
      });
    }
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      level: '',
      type: '',
      levels: {},
      requirements: [],
      horizontalGrowth: {},
    });
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      showSnackbar('Пожалуйста, заполните название');
      return;
    }

    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      level: formData.level,
      type: formData.type,
      levels: formData.levels,
      requirements: formData.requirements,
      horizontalGrowth: formData.horizontalGrowth,
    };

    if (currentTab === 0) {
      // Компетенции
      const updated = editingItem
        ? competencies.map(item => item.id === editingItem.id ? newItem : item)
        : [...competencies, newItem];
      setCompetencies(updated);
      saveToStorage(STORAGE_KEYS.COMPETENCIES, updated);
    } else if (currentTab === 1) {
      // Профили
      const updated = editingItem
        ? profiles.map(item => item.id === editingItem.id ? newItem : item)
        : [...profiles, newItem];
      setProfiles(updated);
      saveToStorage(STORAGE_KEYS.PROFILES, updated);
    } else if (currentTab === 2) {
      // Карьерные треки
      const updated = editingItem
        ? careerTracks.map(item => item.id === editingItem.id ? newItem : item)
        : [...careerTracks, newItem];
      setCareerTracks(updated);
      saveToStorage(STORAGE_KEYS.CAREER_TRACKS, updated);
    }

    showSnackbar(editingItem ? 'Элемент обновлен' : 'Элемент добавлен');
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (currentTab === 0) {
      const updated = competencies.filter(item => item.id !== id);
      setCompetencies(updated);
      saveToStorage(STORAGE_KEYS.COMPETENCIES, updated);
    } else if (currentTab === 1) {
      const updated = profiles.filter(item => item.id !== id);
      setProfiles(updated);
      saveToStorage(STORAGE_KEYS.PROFILES, updated);
    } else if (currentTab === 2) {
      const updated = careerTracks.filter(item => item.id !== id);
      setCareerTracks(updated);
      saveToStorage(STORAGE_KEYS.CAREER_TRACKS, updated);
    }
    showSnackbar('Элемент удален');
  };

  const getCurrentData = () => {
    switch (currentTab) {
      case 0: return competencies;
      case 1: return profiles;
      case 2: return careerTracks;
      default: return [];
    }
  };

  const getCurrentTitle = () => {
    switch (currentTab) {
      case 0: return 'Справочник компетенций';
      case 1: return 'Справочник профилей';
      case 2: return 'Справочник карьерных треков';
      default: return '';
    }
  };

  const handleForceUpdate = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все данные? Это действие нельзя отменить.')) {
      forceUpdateData();
      loadData();
      showSnackbar('Данные обновлены! Страница будет перезагружена.');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };


  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Справочники
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Управление справочными данными системы
      </Typography>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Компетенции" />
            <Tab label="Профили" />
            <Tab label="Карьерные треки" />
          </Tabs>
        </Box>

        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h6">{getCurrentTitle()}</Typography>
              {currentTab === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Уровни владения: 1 - Начальный, 2 - Развивающийся, 3 - Компетентный, 4 - Продвинутый, 5 - Экспертный
                </Typography>
              )}
              {currentTab === 1 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Профили должностей с 5 уровнями развития, компетенциями, обязанностями и зарплатой
                </Typography>
              )}
              {currentTab === 2 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Карьерные треки с 5 уровнями развития и возможностями горизонтального роста
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color="warning"
                onClick={handleForceUpdate}
                size="small"
              >
                Обновить данные
              </Button>
              <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Добавить
              </Button>
            </Box>
          </Box>

          <TableContainer 
            component={Paper} 
            sx={{ 
              maxHeight: { xs: 600, lg: 700, xl: 800 },
              overflowX: 'hidden',
              width: '100%',
              '& .MuiTable-root': {
                width: '100%',
                tableLayout: 'fixed'
              }
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: '15%' }}>Название</TableCell>
                  <TableCell sx={{ width: '25%' }}>Описание</TableCell>
                  <TableCell sx={{ width: '15%' }}>Категория</TableCell>
                  {currentTab === 0 && <TableCell sx={{ width: '10%' }}>Тип</TableCell>}
                  {currentTab === 0 && <TableCell sx={{ width: '25%' }}>Уровни владения (1-5)</TableCell>}
                  {currentTab === 1 && <TableCell sx={{ width: '30%' }}>Уровни развития (1-5)</TableCell>}
                  {currentTab === 2 && <TableCell sx={{ width: '30%' }}>Карьерный трек</TableCell>}
                  <TableCell sx={{ width: '10%' }}>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getCurrentData().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ 
                      width: '15%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>{item.name}</TableCell>
                    <TableCell sx={{ 
                      width: '25%',
                      wordWrap: 'break-word',
                      whiteSpace: 'normal'
                    }}>{item.description}</TableCell>
                    <TableCell>
                      <Chip label={item.category} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    {currentTab === 0 && (
                      <TableCell>
                        <Chip 
                          label={item.type} 
                          size="small" 
                          color={item.type === COMPETENCY_TYPES.PROFESSIONAL ? 'success' : 'info'} 
                          variant="outlined" 
                        />
                      </TableCell>
                    )}
                    {currentTab === 0 && (
                      <TableCell sx={{ 
                        width: '25%',
                        overflow: 'hidden',
                        maxHeight: '200px',
                        overflowY: 'auto'
                      }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          {item.levels && Object.keys(item.levels).length > 0 ? (
                            Object.entries(item.levels).map(([level, indicator]) => (
                              <Box key={level} sx={{ 
                                display: 'flex', 
                                alignItems: 'flex-start', 
                                gap: 1,
                                p: 0.5,
                                border: '1px solid',
                                borderColor: 'grey.200',
                                borderRadius: 0.5,
                                bgcolor: 'grey.50',
                                '&:hover': {
                                  bgcolor: 'primary.50',
                                  borderColor: 'primary.main'
                                }
                              }}>
                                <Chip 
                                  label={level} 
                                  size="small" 
                                  color="primary" 
                                  variant="filled"
                                  sx={{ 
                                    minWidth: 24, 
                                    height: 20,
                                    fontWeight: 'bold',
                                    fontSize: '0.65rem'
                                  }}
                                />
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    fontSize: '0.7rem', 
                                    lineHeight: 1.2,
                                    flex: 1,
                                    color: 'text.primary'
                                  }}
                                >
                                  {indicator}
                                </Typography>
                              </Box>
                            ))
                          ) : (
                            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                              Уровни владения не определены
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                    )}
                    {currentTab === 1 && (
                      <TableCell sx={{ 
                        width: '30%',
                        overflow: 'hidden',
                        maxHeight: '200px',
                        overflowY: 'auto'
                      }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {item.levels && Object.keys(item.levels).length > 0 ? (
                            Object.entries(item.levels).map(([level, levelData]) => (
                              <Box key={level} sx={{ 
                                p: 1.5, 
                                border: '1px solid', 
                                borderColor: 'grey.200', 
                                borderRadius: 1,
                                bgcolor: 'grey.50',
                                '&:hover': {
                                  bgcolor: 'primary.50',
                                  borderColor: 'primary.main'
                                }
                              }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                  <Chip 
                                    label={`${level}`} 
                                    size="small" 
                                    color="primary" 
                                    variant="filled"
                                    sx={{ minWidth: 28, height: 24, fontSize: '0.75rem', fontWeight: 'bold' }}
                                  />
                                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                    {levelData.title}
                                  </Typography>
                                  <Chip 
                                    label={levelData.salary} 
                                    size="small" 
                                    color="success" 
                                    variant="outlined"
                                    sx={{ fontSize: '0.65rem', height: 20 }}
                                  />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.8rem' }}>
                                  {levelData.description}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                    Компетенции:
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.5 }}>
                                    {levelData.skills?.map((skill, index) => (
                                      <Chip 
                                        key={index}
                                        label={skill} 
                                        size="small" 
                                        variant="outlined"
                                        sx={{ fontSize: '0.65rem', height: 18 }}
                                      />
                                    ))}
                                  </Box>
                                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                    Обязанности:
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {levelData.responsibilities?.map((responsibility, index) => (
                                      <Chip 
                                        key={index}
                                        label={responsibility} 
                                        size="small" 
                                        color="info"
                                        variant="outlined"
                                        sx={{ fontSize: '0.65rem', height: 18 }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                              </Box>
                            ))
                          ) : (
                            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                              Уровни развития не определены
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                    )}
                    {currentTab === 2 && (
                      <TableCell sx={{ 
                        width: '30%',
                        overflow: 'hidden',
                        maxHeight: '200px',
                        overflowY: 'auto'
                      }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Typography variant="subtitle2" color="primary" gutterBottom>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {item.description}
                          </Typography>
                          {item.levels && (
                            <Box>
                              <Typography variant="caption" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold', display: 'block' }}>
                                Уровни развития:
                              </Typography>
                              {Object.entries(item.levels).map(([level, levelData]) => (
                                <Box key={level} sx={{ 
                                  mb: 1, 
                                  p: 1, 
                                  border: '1px solid', 
                                  borderColor: 'grey.200', 
                                  borderRadius: 1,
                                  bgcolor: 'grey.50'
                                }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Chip 
                                      label={`${level}`} 
                                      size="small" 
                                      color="primary" 
                                      variant="filled"
                                      sx={{ minWidth: 24, height: 20, fontSize: '0.7rem' }}
                                    />
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>
                                      {levelData.name}
                                    </Typography>
                                  </Box>
                                  <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary', display: 'block', mb: 0.5 }}>
                                    {levelData.description}
                                  </Typography>
                                  {levelData.skills && (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                      {Object.entries(levelData.skills).map(([skill, skillLevel]) => (
                                        <Chip
                                          key={skill}
                                          label={`${skill}: ${skillLevel}`}
                                          size="small"
                                          variant="outlined"
                                          sx={{ fontSize: '0.65rem', height: 18 }}
                                        />
                                      ))}
                                    </Box>
                                  )}
                                </Box>
                              ))}
                            </Box>
                          )}
                          {item.horizontalGrowth && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="caption" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold', display: 'block' }}>
                                Горизонтальное развитие:
                              </Typography>
                              {Object.entries(item.horizontalGrowth).map(([role, growthData]) => (
                                <Box key={role} sx={{ 
                                  mb: 1, 
                                  p: 1, 
                                  border: '1px solid', 
                                  borderColor: 'info.200', 
                                  borderRadius: 1,
                                  bgcolor: 'info.50'
                                }}>
                                  <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem', display: 'block' }}>
                                    {role}
                                  </Typography>
                                  <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', display: 'block', mb: 0.5 }}>
                                    {growthData.description}
                                  </Typography>
                                  <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', display: 'block' }}>
                                    Требования: {growthData.requirements}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                    )}
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(item)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(item.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Диалог редактирования */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog} 
        maxWidth={false}
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: { xs: '95vw', sm: '90vw', md: '80vw', lg: '70vw', xl: '60vw' },
            maxHeight: { xs: '90vh', sm: '85vh', md: '80vh', lg: '75vh', xl: '70vh' },
            width: '100%'
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h5" component="div">
          {editingItem ? 'Редактировать' : 'Добавить'} элемент
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <TextField
            autoFocus
            margin="dense"
            label="Название"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Описание"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Категория"
            fullWidth
            variant="outlined"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            sx={{ mb: 2 }}
          />
          {currentTab === 0 && (
            <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
              <InputLabel>Тип компетенции</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                label="Тип компетенции"
              >
                <MenuItem value={COMPETENCY_TYPES.PROFESSIONAL}>Профессиональные компетенции</MenuItem>
                <MenuItem value={COMPETENCY_TYPES.CORPORATE}>Корпоративные компетенции</MenuItem>
              </Select>
            </FormControl>
          )}
          {currentTab === 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
                Уровни владения компетенции (1-5)
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Опишите индикаторы для каждого уровня владения компетенцией. Чем выше уровень, тем более сложные задачи должен уметь выполнять сотрудник.
              </Typography>
              {[1, 2, 3, 4, 5].map((level) => (
                <Box key={level} sx={{ 
                  mb: 2, 
                  p: 2, 
                  border: '1px solid', 
                  borderColor: 'grey.300', 
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'grey.100'
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Chip 
                      label={`Уровень ${level}`} 
                      color="primary" 
                      variant="filled"
                      sx={{ fontWeight: 'bold', minWidth: 80 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {level === 1 && 'Начальный уровень - базовые знания'}
                      {level === 2 && 'Развивающийся уровень - понимание основ'}
                      {level === 3 && 'Компетентный уровень - уверенное владение'}
                      {level === 4 && 'Продвинутый уровень - экспертное применение'}
                      {level === 5 && 'Экспертный уровень - лидерство в области'}
                    </Typography>
                  </Box>
                  <TextField
                    margin="dense"
                    label={`Опишите, что должен уметь сотрудник на уровне ${level}`}
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    value={formData.levels[level] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      levels: {
                        ...formData.levels,
                        [level]: e.target.value
                      }
                    })}
                    placeholder={`Например: ${level === 1 ? 'Знает базовые команды, может выполнить простые задачи' : 
                      level === 2 ? 'Понимает принципы работы, может решать типовые задачи' :
                      level === 3 ? 'Владеет инструментами, может решать сложные задачи' :
                      level === 4 ? 'Может проектировать решения, обучать других' :
                      'Эксперт в области, может создавать новые подходы'}`}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'white'
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
          {currentTab === 1 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
                Профиль должности
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Создайте профиль должности с 5 уровнями развития, компетенциями, обязанностями и зарплатой
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, mb: 1 }}>
                Уровни развития (1-5)
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Опишите каждый уровень развития для профиля должности
              </Typography>
              
              {[1, 2, 3, 4, 5].map((level) => (
                <Box key={level} sx={{ 
                  mb: 3, 
                  p: 2, 
                  border: '1px solid', 
                  borderColor: 'grey.300', 
                  borderRadius: 2,
                  bgcolor: 'grey.50',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'grey.100'
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Chip 
                      label={`Уровень ${level}`} 
                      color="primary" 
                      variant="filled"
                      sx={{ fontWeight: 'bold', minWidth: 80 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {level === 1 && 'Junior - Начинающий специалист'}
                      {level === 2 && 'Middle - Опытный специалист'}
                      {level === 3 && 'Senior - Ведущий специалист'}
                      {level === 4 && 'Lead - Технический лидер'}
                      {level === 5 && 'Principal - Эксперт в области'}
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        margin="dense"
                        label={`Название должности (уровень ${level})`}
                        fullWidth
                        variant="outlined"
                        value={formData.levels?.[level]?.title || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          levels: {
                            ...formData.levels,
                            [level]: {
                              ...formData.levels?.[level],
                              title: e.target.value
                            }
                          }
                        })}
                        placeholder={`Например: ${level === 1 ? 'Junior Backend разработчик' : 
                          level === 2 ? 'Middle Backend разработчик' :
                          level === 3 ? 'Senior Backend разработчик' :
                          level === 4 ? 'Lead Backend разработчик' :
                          'Principal Backend разработчик'}`}
                        sx={{ mb: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        margin="dense"
                        label={`Зарплата (уровень ${level})`}
                        fullWidth
                        variant="outlined"
                        value={formData.levels?.[level]?.salary || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          levels: {
                            ...formData.levels,
                            [level]: {
                              ...formData.levels?.[level],
                              salary: e.target.value
                            }
                          }
                        })}
                        placeholder="Например: 80,000 - 120,000 руб/мес"
                        sx={{ mb: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="dense"
                        label={`Описание уровня ${level}`}
                        fullWidth
                        multiline
                        rows={2}
                        variant="outlined"
                        value={formData.levels?.[level]?.description || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          levels: {
                            ...formData.levels,
                            [level]: {
                              ...formData.levels?.[level],
                              description: e.target.value
                            }
                          }
                        })}
                        placeholder="Краткое описание уровня и его особенностей"
                        sx={{ mb: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth margin="dense" sx={{ mb: 1 }}>
                        <InputLabel>Компетенции</InputLabel>
                        <Select
                          multiple
                          value={Array.isArray(formData.levels?.[level]?.skills) ? 
                            formData.levels[level].skills : 
                            formData.levels?.[level]?.skills || []}
                          onChange={(e) => setFormData({
                            ...formData,
                            levels: {
                              ...formData.levels,
                              [level]: {
                                ...formData.levels?.[level],
                                skills: e.target.value
                              }
                            }
                          })}
                          label="Компетенции"
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip 
                                  key={value} 
                                  label={value} 
                                  size="small" 
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem', height: 20 }}
                                />
                              ))}
                            </Box>
                          )}
                        >
                          {competencies.map((competency) => (
                            <MenuItem key={competency.id} value={competency.name}>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  {competency.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {competency.description}
                                </Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        margin="dense"
                        label={`Обязанности (через запятую)`}
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        value={Array.isArray(formData.levels?.[level]?.responsibilities) ? 
                          formData.levels[level].responsibilities.join(', ') : 
                          formData.levels?.[level]?.responsibilities || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          levels: {
                            ...formData.levels,
                            [level]: {
                              ...formData.levels?.[level],
                              responsibilities: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                            }
                          }
                        })}
                        placeholder="Разработка API, Code review, Менторство, Планирование"
                        sx={{ mb: 1 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          )}
          {currentTab === 2 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
                Карьерный трек
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Создайте карьерный трек с уровнями развития и возможностями горизонтального роста
              </Typography>
              
              <TextField
                margin="dense"
                label="Название трека"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ mb: 2 }}
                placeholder="Например: Backend разработчик"
              />
              
              <TextField
                margin="dense"
                label="Описание трека"
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                sx={{ mb: 2 }}
                placeholder="Краткое описание карьерного трека"
              />
              
              <TextField
                margin="dense"
                label="Базовые требования (через запятую)"
                fullWidth
                variant="outlined"
                value={Array.isArray(formData.requirements) ? formData.requirements.join(', ') : formData.requirements || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  requirements: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                })}
                sx={{ mb: 2 }}
                placeholder="JavaScript, Node.js, SQL, Git"
              />
              
              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, mb: 1 }}>
                Уровни развития (1-5)
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Опишите каждый уровень развития в рамках карьерного трека
              </Typography>
              
              {[1, 2, 3, 4, 5].map((level) => (
                <Box key={level} sx={{ 
                  mb: 2, 
                  p: 2, 
                  border: '1px solid', 
                  borderColor: 'grey.300', 
                  borderRadius: 2,
                  bgcolor: 'grey.50'
                }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Уровень {level}
                  </Typography>
                  <TextField
                    margin="dense"
                    label={`Название уровня ${level}`}
                    fullWidth
                    variant="outlined"
                    value={formData.levels?.[level]?.name || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      levels: {
                        ...formData.levels,
                        [level]: {
                          ...formData.levels?.[level],
                          name: e.target.value
                        }
                      }
                    })}
                    sx={{ mb: 1 }}
                    placeholder={`Например: ${level === 1 ? 'Junior Developer' : 
                      level === 2 ? 'Middle Developer' :
                      level === 3 ? 'Senior Developer' :
                      level === 4 ? 'Lead Developer' :
                      'Principal Developer'}`}
                  />
                  <TextField
                    margin="dense"
                    label={`Описание уровня ${level}`}
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                    value={formData.levels?.[level]?.description || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      levels: {
                        ...formData.levels,
                        [level]: {
                          ...formData.levels?.[level],
                          description: e.target.value
                        }
                      }
                    })}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    margin="dense"
                    label={`Навыки и их уровни (формат: Навык:Уровень, через запятую)`}
                    fullWidth
                    variant="outlined"
                    value={formData.levels?.[level]?.skills ? 
                      Object.entries(formData.levels[level].skills).map(([skill, skillLevel]) => `${skill}:${skillLevel}`).join(', ') : ''}
                    onChange={(e) => {
                      const skillsText = e.target.value;
                      const skills = {};
                      if (skillsText) {
                        skillsText.split(',').forEach(skillPair => {
                          const [skill, level] = skillPair.trim().split(':');
                          if (skill && level) {
                            skills[skill.trim()] = parseInt(level.trim());
                          }
                        });
                      }
                      setFormData({
                        ...formData,
                        levels: {
                          ...formData.levels,
                          [level]: {
                            ...formData.levels?.[level],
                            skills: skills
                          }
                        }
                      });
                    }}
                    placeholder="JavaScript:3, Node.js:3, SQL:2, Git:3"
                  />
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={hideSnackbar}
      />
    </Box>
  );
};

export default Directories;
