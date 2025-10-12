import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Chip,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { 
  Save as SaveIcon, 
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Timeline as TimelineIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useSnackbar } from '../hooks/useSnackbar';
import { loadFromStorage, saveToStorage } from '../utils';
import { STORAGE_KEYS, MAX_ADDITIONAL_PROFILES } from '../constants';
import { defaultProfiles } from '../data/mockData';
import { defaultCareerTracks } from '../data/careerTracks';
import NotificationSnackbar from './common/NotificationSnackbar';

const MyProfile = () => {
  console.log('MyProfile: Компонент инициализируется');
  
  const [selectedProfile, setSelectedProfile] = useState('');
  const [availableProfiles, setAvailableProfiles] = useState([]);
  const [careerTracks, setCareerTracks] = useState([]);
  const [userProfile, setUserProfile] = useState({
    mainProfile: null,
    additionalProfiles: [],
    selectedCareerTrack: null,
    currentLevel: 1
  });
  const [careerTrackDialogOpen, setCareerTrackDialogOpen] = useState(false);
  const { snackbarOpen, snackbarMessage, showSnackbar, hideSnackbar } = useSnackbar();

  console.log('MyProfile: Состояния инициализированы', {
    selectedProfile,
    availableProfiles: availableProfiles?.length,
    careerTracks: careerTracks?.length,
    userProfile
  });

  // Загружаем данные
  useEffect(() => {
    try {
      loadData();
    } catch (error) {
      console.error('Error in useEffect:', error);
      showSnackbar('Ошибка при инициализации компонента');
    }
  }, [loadData, showSnackbar]);

  const loadData = useCallback(() => {
    try {
      console.log('MyProfile: Загрузка данных...');
      console.log('defaultProfiles:', defaultProfiles);
      console.log('defaultCareerTracks:', defaultCareerTracks);
      
      // Проверяем, что данные импортированы правильно
      if (!defaultProfiles || !Array.isArray(defaultProfiles)) {
        console.error('defaultProfiles не определен или не является массивом');
        showSnackbar('Ошибка: данные профилей не загружены');
        return;
      }
      
      if (!defaultCareerTracks || !Array.isArray(defaultCareerTracks)) {
        console.error('defaultCareerTracks не определен или не является массивом');
        showSnackbar('Ошибка: данные карьерных треков не загружены');
        return;
      }
      
      // Загружаем доступные профили
      const savedProfiles = loadFromStorage(STORAGE_KEYS.PROFILES);
      if (savedProfiles) {
        setAvailableProfiles(savedProfiles);
        console.log('Профили загружены:', savedProfiles);
      } else {
        setAvailableProfiles(defaultProfiles);
        saveToStorage(STORAGE_KEYS.PROFILES, defaultProfiles);
        console.log('Профили инициализированы:', defaultProfiles);
      }

      // Загружаем карьерные треки
      const savedCareerTracks = loadFromStorage(STORAGE_KEYS.CAREER_TRACKS);
      if (savedCareerTracks) {
        setCareerTracks(savedCareerTracks);
        console.log('Карьерные треки загружены:', savedCareerTracks);
      } else {
        setCareerTracks(defaultCareerTracks);
        saveToStorage(STORAGE_KEYS.CAREER_TRACKS, defaultCareerTracks);
        console.log('Карьерные треки инициализированы:', defaultCareerTracks);
      }

      // Загружаем профиль пользователя
      const userProfileData = loadFromStorage(STORAGE_KEYS.USER_PROFILE);
      if (userProfileData) {
        setUserProfile(userProfileData);
        console.log('Профиль загружен:', userProfileData);
      } else {
        // Инициализируем пустой профиль
        const initialProfile = {
          mainProfile: null,
          additionalProfiles: [],
          selectedCareerTrack: null,
          currentLevel: 1
        };
        setUserProfile(initialProfile);
        console.log('Профиль инициализирован:', initialProfile);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      showSnackbar('Ошибка при загрузке данных');
    }
  }, [showSnackbar]);

  const handleProfileChange = (event) => {
    setSelectedProfile(event.target.value);
  };

  const handleSetMainProfile = useCallback((profileId) => {
    const profile = availableProfiles.find(p => p.id === profileId);
    if (profile) {
      const updatedProfile = {
        ...userProfile,
        mainProfile: profile
      };
      setUserProfile(updatedProfile);
      saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfile);
      showSnackbar('Основной профиль установлен!');
    }
  }, [availableProfiles, userProfile, showSnackbar]);

  const handleAddAdditionalProfile = useCallback(() => {
    if (!selectedProfile) {
      showSnackbar('Пожалуйста, выберите профиль');
      return;
    }

    if (!userProfile) {
      showSnackbar('Ошибка: профиль не загружен');
      return;
    }

    const profile = availableProfiles.find(p => p.id === selectedProfile);
    if (profile) {
      // Проверяем, что профиль не является основным и не добавлен как дополнительный
      if (userProfile?.mainProfile?.id === profile.id) {
        showSnackbar('Этот профиль уже является основным');
        return;
      }

      if (userProfile.additionalProfiles.find(p => p.id === profile.id)) {
        showSnackbar('Этот профиль уже добавлен как дополнительный');
        return;
      }

      if (userProfile.additionalProfiles.length >= MAX_ADDITIONAL_PROFILES) {
        showSnackbar(`Можно добавить максимум ${MAX_ADDITIONAL_PROFILES} дополнительных профиля`);
        return;
      }

      const updatedProfile = {
        ...userProfile,
        additionalProfiles: [...userProfile.additionalProfiles, profile]
      };
      setUserProfile(updatedProfile);
      saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfile);
      showSnackbar('Дополнительный профиль добавлен!');
      setSelectedProfile('');
    }
  }, [selectedProfile, availableProfiles, userProfile, showSnackbar]);

  const handleRemoveAdditionalProfile = useCallback((profileId) => {
    if (!userProfile) {
      showSnackbar('Ошибка: профиль не загружен');
      return;
    }

    const updatedProfile = {
      ...userProfile,
      additionalProfiles: userProfile.additionalProfiles.filter(p => p.id !== profileId)
    };
    setUserProfile(updatedProfile);
    saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfile);
    showSnackbar('Дополнительный профиль удален');
  }, [userProfile, showSnackbar]);

  const handleSelectCareerTrack = (careerTrack) => {
    try {
      console.log('handleSelectCareerTrack called with:', careerTrack);
      console.log('Current userProfile:', userProfile);
      
      if (!careerTrack) {
        console.error('Career track is null or undefined');
        showSnackbar('Ошибка: карьерный трек не выбран');
        return;
      }

      if (!userProfile) {
        console.error('User profile is null or undefined');
        showSnackbar('Ошибка: профиль пользователя не загружен');
        return;
      }

      if (!userProfile.mainProfile) {
        console.error('Main profile is not selected');
        showSnackbar('Ошибка: сначала выберите основной профиль');
        return;
      }

      // Проверяем, что карьерный трек совместим с профилем
      const isCompatible = getAvailableCareerTracks().some(track => track.id === careerTrack.id);
      if (!isCompatible) {
        console.error('Career track is not compatible with current profile');
        showSnackbar('Ошибка: выбранный карьерный трек не совместим с текущим профилем');
        return;
      }

      const updatedProfile = {
        ...userProfile,
        selectedCareerTrack: careerTrack,
        currentLevel: 1
      };
      
      console.log('Updated profile:', updatedProfile);
      
      setUserProfile(updatedProfile);
      saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfile);
      showSnackbar(`Карьерный трек "${careerTrack.name}" выбран!`);
      setCareerTrackDialogOpen(false);
    } catch (error) {
      console.error('Error in handleSelectCareerTrack:', error);
      showSnackbar('Ошибка при выборе карьерного трека');
    }
  };

  const handleResetCareerTrack = () => {
    try {
      if (!userProfile) {
        console.error('User profile is null or undefined');
        showSnackbar('Ошибка: профиль пользователя не загружен');
        return;
      }

      const updatedProfile = {
        ...userProfile,
        selectedCareerTrack: null,
        currentLevel: 1
      };

      setUserProfile(updatedProfile);
      saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfile);
      showSnackbar('Карьерный трек сброшен');
    } catch (error) {
      console.error('Error in handleResetCareerTrack:', error);
      showSnackbar('Ошибка при сбросе карьерного трека');
    }
  };

  const handleSetCurrentLevel = (level) => {
    try {
      if (!userProfile) {
        console.error('User profile is null or undefined');
        showSnackbar('Ошибка: профиль пользователя не загружен');
        return;
      }

      const updatedProfile = {
        ...userProfile,
        currentLevel: level
      };
      setUserProfile(updatedProfile);
      saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfile);
      showSnackbar(`Текущий уровень установлен: ${level}`);
    } catch (error) {
      console.error('Error in handleSetCurrentLevel:', error);
      showSnackbar('Ошибка при изменении уровня');
    }
  };

  const handleResetData = () => {
    try {
      // Очищаем localStorage
      localStorage.clear();
      
      // Сбрасываем состояние
      setUserProfile({
        mainProfile: null,
        additionalProfiles: [],
        selectedCareerTrack: null,
        currentLevel: 1
      });
      setSelectedProfile('');
      
      // Перезагружаем данные
      loadData();
      
      showSnackbar('Данные сброшены. Страница будет перезагружена.');
      
      // Перезагружаем страницу через небольшую задержку
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error resetting data:', error);
      showSnackbar('Ошибка при сбросе данных');
    }
  };

  const getAvailableCareerTracks = () => {
    if (!userProfile || !userProfile?.mainProfile) return [];
    
    try {
      console.log('Filtering career tracks for profile:', userProfile.mainProfile.name);
      console.log('Available career tracks:', careerTracks);
      
      // Более гибкая фильтрация карьерных треков
      const filteredTracks = careerTracks.filter(track => {
        const profileName = userProfile.mainProfile.name.toLowerCase();
        const trackName = track.name.toLowerCase();
        
        // Проверяем совпадение по названию профиля и трека
        const nameMatch = trackName.includes(profileName) || profileName.includes(trackName);
        
        // Проверяем требования трека
        const requirementsMatch = track.requirements?.some(req => {
          const reqLower = req.toLowerCase();
          return profileName.includes(reqLower) || reqLower.includes(profileName);
        });
        
        // Проверяем общие ключевые слова
        const commonKeywords = ['разработчик', 'developer', 'backend', 'frontend', 'fullstack'];
        const keywordMatch = commonKeywords.some(keyword => 
          profileName.includes(keyword) && trackName.includes(keyword)
        );
        
        return nameMatch || requirementsMatch || keywordMatch;
      });
      
      console.log('Filtered career tracks:', filteredTracks);
      return filteredTracks;
    } catch (error) {
      console.error('Error in getAvailableCareerTracks:', error);
      return [];
    }
  };

  // Проверяем, что все данные загружены
  if (!userProfile || !availableProfiles || !careerTracks) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <Typography variant="h6">Загрузка данных...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Мой профиль
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleResetData}
          sx={{ ml: 2 }}
        >
          Сбросить данные
        </Button>
      </Box>
      <Typography variant="body1" color="text.secondary" paragraph>
        Настройте свой профессиональный профиль: выберите основной профиль, дополнительные профили и карьерный трек
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 3, xl: 4 }}>
        {/* Основной профиль */}
        <Grid item xs={12} lg={6} xl={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <StarIcon color="primary" sx={{ fontSize: { xs: '1.5rem', lg: '1.75rem', xl: '2rem' } }} />
                <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', lg: '1.5rem', xl: '1.75rem' } }}>
                  Основной профиль
                </Typography>
              </Box>
              
              {userProfile && userProfile?.mainProfile ? (
                <Paper sx={{ p: 2, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {userProfile?.mainProfile?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {userProfile?.mainProfile?.description}
                      </Typography>
                      <Chip 
                        label={userProfile?.mainProfile?.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                    <IconButton 
                      color="error" 
                      onClick={() => {
                        const updatedProfile = {
                          ...userProfile,
                          mainProfile: null,
                          selectedCareerTrack: null,
                          currentLevel: 1
                        };
                        setUserProfile(updatedProfile);
                        saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfile);
                        showSnackbar('Основной профиль удален');
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              ) : (
                <Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Выберите основной профиль из списка доступных
                  </Typography>
                  <List>
                    {availableProfiles.map((profile) => (
                      <ListItem key={profile.id} sx={{ border: '1px solid', borderColor: 'grey.200', borderRadius: 1, mb: 1 }}>
                        <ListItemText
                          primary={profile.name}
                          secondary={profile.description}
                        />
                        <ListItemSecondaryAction>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleSetMainProfile(profile.id)}
                            startIcon={<StarBorderIcon />}
                          >
                            Выбрать
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Дополнительные профили */}
        <Grid item xs={12} lg={6} xl={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <PersonIcon color="secondary" sx={{ fontSize: { xs: '1.5rem', lg: '1.75rem', xl: '2rem' } }} />
                <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', lg: '1.5rem', xl: '1.75rem' } }}>
                  Дополнительные профили
                </Typography>
                <Chip 
                  label={`${userProfile?.additionalProfiles?.length || 0}/${MAX_ADDITIONAL_PROFILES}`} 
                  size="small" 
                  color="secondary" 
                  variant="outlined"
                  sx={{ fontSize: { xs: '0.75rem', lg: '0.8rem', xl: '0.85rem' } }}
                />
              </Box>

              {userProfile?.additionalProfiles?.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  {userProfile?.additionalProfiles?.map((profile) => (
                    <Paper key={profile.id} sx={{ p: 1, mb: 1, bgcolor: 'secondary.50', border: '1px solid', borderColor: 'secondary.200' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {profile.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {profile.description}
                          </Typography>
                        </Box>
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleRemoveAdditionalProfile(profile.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              )}

              {userProfile?.additionalProfiles?.length < MAX_ADDITIONAL_PROFILES && (
                <Box>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Добавить дополнительный профиль</InputLabel>
                    <Select
                      value={selectedProfile}
                      onChange={handleProfileChange}
                      label="Добавить дополнительный профиль"
                    >
                      {availableProfiles
                        .filter(profile => 
                          profile.id !== userProfile?.mainProfile?.id &&
                          !userProfile?.additionalProfiles?.find(p => p.id === profile.id)
                        )
                        .map((profile) => (
                          <MenuItem key={profile.id} value={profile.id}>
                            {profile.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleAddAdditionalProfile}
                    sx={{ mt: 1 }}
                    disabled={!selectedProfile}
                    fullWidth
                  >
                    Добавить профиль
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Карьерный трек */}
        <Grid item xs={12} xl={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <TimelineIcon color="success" sx={{ fontSize: { xs: '1.5rem', lg: '1.75rem', xl: '2rem' } }} />
                <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', lg: '1.5rem', xl: '1.75rem' } }}>
                  Карьерный трек
                </Typography>
              </Box>

              {userProfile && userProfile?.mainProfile ? (
                <Box>
                  {userProfile.selectedCareerTrack ? (
                    <Box>
                      <Paper sx={{ p: 2, mb: 2, bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
                        <Typography variant="h6" gutterBottom>
                          {userProfile.selectedCareerTrack.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {userProfile.selectedCareerTrack.description}
                        </Typography>
                        
                        {userProfile.selectedCareerTrack.levels && (
                          <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                              <Typography variant="subtitle2" gutterBottom>
                                Текущий уровень: {userProfile?.currentLevel || 1}
                              </Typography>
                              <Chip 
                                label={`${userProfile?.currentLevel || 1}/5`} 
                                color="primary" 
                                variant="filled"
                                size="small"
                              />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                              {[1, 2, 3, 4, 5].map((level) => (
                                <Button
                                  key={level}
                                  variant={(userProfile?.currentLevel || 1) === level ? "contained" : "outlined"}
                                  size="small"
                                  onClick={() => handleSetCurrentLevel(level)}
                                  color={(userProfile?.currentLevel || 1) === level ? "primary" : undefined}
                                >
                                  Уровень {level}
                                </Button>
                              ))}
                            </Box>
                            
                            {userProfile?.selectedCareerTrack?.levels?.[userProfile?.currentLevel] && (
                              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                  {userProfile?.selectedCareerTrack?.levels?.[userProfile?.currentLevel]?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                  {userProfile?.selectedCareerTrack?.levels?.[userProfile?.currentLevel]?.description}
                                </Typography>
                                
                                {userProfile?.selectedCareerTrack?.levels?.[userProfile?.currentLevel]?.skills && (
                                  <Box>
                                    <Typography variant="caption" color="text.secondary" gutterBottom>
                                      Требуемые навыки:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                      {Object.entries(userProfile?.selectedCareerTrack?.levels?.[userProfile?.currentLevel]?.skills || {}).map(([skill, level]) => (
                                        <Chip
                                          key={skill}
                                          label={`${skill}: ${level}`}
                                          size="small"
                                          variant="outlined"
                                        />
                                      ))}
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            )}
                          </Box>
                        )}
                      </Paper>
                      
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                          variant="outlined"
                          onClick={() => setCareerTrackDialogOpen(true)}
                          startIcon={<TimelineIcon />}
                        >
                          Изменить карьерный трек
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={handleResetCareerTrack}
                        >
                          Сбросить
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Выберите карьерный трек для развития в рамках вашего основного профиля
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => setCareerTrackDialogOpen(true)}
                        startIcon={<TimelineIcon />}
                      >
                        Выбрать карьерный трек
                      </Button>
                    </Box>
                  )}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Сначала выберите основной профиль для доступа к карьерным трекам
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Диалог выбора карьерного трека */}
      <Dialog 
        open={careerTrackDialogOpen} 
        onClose={() => setCareerTrackDialogOpen(false)} 
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
            Выбор карьерного трека
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
            Выберите карьерный трек для развития в рамках профиля "{userProfile.mainProfile?.name}"
          </Typography>
          
          {getAvailableCareerTracks().length > 0 ? (
            <List>
              {getAvailableCareerTracks().map((track) => (
                <ListItem key={track.id} sx={{ 
                  border: '1px solid', 
                  borderColor: 'grey.200', 
                  borderRadius: 1, 
                  mb: 1,
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.50'
                  }
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {track.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {track.description}
                      </Typography>
                      {track.requirements && track.requirements.length > 0 && (
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" color="text.secondary" gutterBottom>
                            Требования:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                            {track.requirements.map((req, index) => (
                              <Chip 
                                key={index}
                                label={req} 
                                size="small" 
                                variant="outlined"
                                color="secondary"
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => handleSelectCareerTrack(track)}
                      sx={{ ml: 2, minWidth: 100 }}
                    >
                      Выбрать
                    </Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Нет доступных карьерных треков для выбранного профиля
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCareerTrackDialogOpen(false)}>Отмена</Button>
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

export default MyProfile;
