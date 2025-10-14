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
  FormControlLabel,
  Checkbox,
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
import { loadFromStorage, saveToStorage, calculateOverallLevel, analyzeSelfAssessment } from '../utils';
import { STORAGE_KEYS, MAX_ADDITIONAL_PROFILES, COMPETENCY_TYPES } from '../constants';
import { defaultProfiles, defaultCompetencies } from '../data/mockData';
import { defaultCareerTracks } from '../data/careerTracks';
import NotificationSnackbar from './common/NotificationSnackbar';
import SelfAssessmentDialog from './common/SelfAssessmentDialog';
import CareerTrackTree from './common/CareerTrackTree';

const MyProfile = () => {
  console.log('MyProfile: Компонент инициализируется');
  
  const [selectedProfile, setSelectedProfile] = useState('');
  const [availableProfiles, setAvailableProfiles] = useState([]);
  const [careerTracks, setCareerTracks] = useState([]);
  const [userProfile, setUserProfile] = useState({
    mainProfile: null,
    additionalProfiles: [],
    selectedCareerTrack: null,
    currentLevel: 1,
    selfAssessment: null,
    calculatedLevel: null,
    considersHorizontalTransition: false
  });
  const [careerTrackDialogOpen, setCareerTrackDialogOpen] = useState(false);
  const [selfAssessmentDialogOpen, setSelfAssessmentDialogOpen] = useState(false);
  const [allCompetencies, setAllCompetencies] = useState([]);
  const [competencies, setCompetencies] = useState([]);
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

  // Обновляем компетенции при изменении основного профиля
  useEffect(() => {
    if (userProfile?.mainProfile && allCompetencies.length > 0) {
      const filteredCompetencies = filterCompetenciesByProfile(userProfile.mainProfile, allCompetencies);
      setCompetencies(filteredCompetencies);
    } else {
      setCompetencies([]);
    }
  }, [userProfile?.mainProfile, allCompetencies, filterCompetenciesByProfile]);

  // Функция для фильтрации компетенций по основному профилю
  const filterCompetenciesByProfile = useCallback((profile, allCompetencies) => {
    if (!profile || !allCompetencies || allCompetencies.length === 0) {
      return [];
    }

    // Собираем все навыки из всех уровней профиля
    const profileSkills = new Set();
    Object.values(profile.levels || {}).forEach(level => {
      if (level.skills && Array.isArray(level.skills)) {
        level.skills.forEach(skill => profileSkills.add(skill));
      }
    });

    // Фильтруем компетенции по навыкам профиля
    const filteredCompetencies = allCompetencies.filter(competency => 
      profileSkills.has(competency.name)
    );

    console.log('Фильтрация компетенций:', {
      profile: profile.name,
      profileSkills: Array.from(profileSkills),
      allCompetencies: allCompetencies.length,
      filteredCompetencies: filteredCompetencies.length,
      filteredNames: filteredCompetencies.map(c => c.name)
    });

    return filteredCompetencies;
  }, []);

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

      // Загружаем компетенции
      const savedCompetencies = loadFromStorage(STORAGE_KEYS.COMPETENCIES);
      if (savedCompetencies) {
        setAllCompetencies(savedCompetencies);
        console.log('Компетенции загружены:', savedCompetencies);
      } else {
        setAllCompetencies(defaultCompetencies);
        saveToStorage(STORAGE_KEYS.COMPETENCIES, defaultCompetencies);
        console.log('Компетенции инициализированы:', defaultCompetencies);
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
      
      // Автоматически выбираем первый подходящий карьерный трек
      const availableTracks = careerTracks.filter(track => {
        const profileName = profile.name.toLowerCase();
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
      
      // Если есть подходящие треки, выбираем первый
      if (availableTracks.length > 0) {
        updatedProfile.selectedCareerTrack = availableTracks[0];
        updatedProfile.currentLevel = 1;
        console.log('Автоматически выбран карьерный трек:', availableTracks[0].name);
      }
      
      setUserProfile(updatedProfile);
      saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfile);
      
      if (availableTracks.length > 0) {
        showSnackbar(`Основной профиль установлен! Автоматически выбран карьерный трек: "${availableTracks[0].name}"`);
      } else {
        showSnackbar('Основной профиль установлен!');
      }
    }
  }, [availableProfiles, userProfile, careerTracks, showSnackbar]);

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

  const handleHorizontalTransitionChange = useCallback((event) => {
    const checked = event.target.checked;
    const updatedProfile = {
      ...userProfile,
      considersHorizontalTransition: checked
    };
    setUserProfile(updatedProfile);
    saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfile);
    
    if (checked) {
      showSnackbar('Включен режим горизонтального развития');
    } else {
      showSnackbar('Отключен режим горизонтального развития');
    }
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
        currentLevel: 1,
        selfAssessment: null,
        calculatedLevel: null
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

  const handleSaveSelfAssessment = useCallback((assessmentData) => {
    try {
      const updatedProfile = {
        ...userProfile,
        selfAssessment: assessmentData.assessments,
        calculatedLevel: assessmentData.overallLevel,
        assessmentDate: assessmentData.calculatedAt,
        assessmentComment: assessmentData.comment || ''
      };
      
      setUserProfile(updatedProfile);
      saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfile);
      showSnackbar('Самооценка сохранена!');
      
      // Обновляем текущий уровень в карьерном треке если он есть
      if (userProfile.selectedCareerTrack && assessmentData.overallLevel.level !== userProfile.currentLevel) {
        const updatedProfileWithLevel = {
          ...updatedProfile,
          currentLevel: assessmentData.overallLevel.level
        };
        setUserProfile(updatedProfileWithLevel);
        saveToStorage(STORAGE_KEYS.USER_PROFILE, updatedProfileWithLevel);
        showSnackbar(`Уровень в карьерном треке обновлен до ${assessmentData.overallLevel.level}`);
      }
    } catch (error) {
      console.error('Error saving self assessment:', error);
      showSnackbar('Ошибка при сохранении самооценки');
    }
  }, [userProfile, showSnackbar]);

  const handleOpenSelfAssessment = () => {
    setSelfAssessmentDialogOpen(true);
  };

  const getAvailableCareerTracks = () => {
    if (!userProfile || !userProfile?.mainProfile) return [];
    
    try {
      console.log('Filtering career tracks for profile:', userProfile.mainProfile.name);
      console.log('Available career tracks:', careerTracks);
      
      // Фильтрация карьерных треков по основному профилю
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
    <Box sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
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
        {/* Первая строка: Основной профиль и Дополнительные профили */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
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

        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
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

              {/* Чекбокс горизонтального перехода */}
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userProfile?.considersHorizontalTransition || false}
                      onChange={handleHorizontalTransitionChange}
                      color="secondary"
                    />
                  }
                  label="Рассматривает горизонтальный переход"
                />
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                  Если отмечено, доступен выбор профилей для горизонтального развития
                </Typography>
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

              {userProfile?.additionalProfiles?.length < MAX_ADDITIONAL_PROFILES && userProfile?.considersHorizontalTransition && (
                <Box>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Добавить профиль для горизонтального развития</InputLabel>
                    <Select
                      value={selectedProfile}
                      onChange={handleProfileChange}
                      label="Добавить профиль для горизонтального развития"
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

              {!userProfile?.considersHorizontalTransition && (
                <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Отметьте чекбокс выше, чтобы добавить профили для горизонтального развития
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Вторая строка: Самооценка навыков */}
        <Grid item xs={12}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <StarIcon color="warning" sx={{ fontSize: { xs: '1.5rem', lg: '1.75rem', xl: '2rem' } }} />
                <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', lg: '1.5rem', xl: '1.75rem' } }}>
                  Самооценка навыков
                </Typography>
              </Box>

              {userProfile?.calculatedLevel ? (
                <Box>
                  <Paper sx={{ p: 2, mb: 2, bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
                    <Typography variant="h6" gutterBottom>
                      Определенный уровень: {userProfile.calculatedLevel.level}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {userProfile.calculatedLevel.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Средний уровень: {userProfile.calculatedLevel.average}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Оценено навыков: {userProfile.calculatedLevel.skillCount}
                        </Typography>
                      </Box>
                      <Chip 
                        label={userProfile.calculatedLevel.label} 
                        color="warning" 
                        variant="filled"
                        size="small"
                      />
                    </Box>
                  </Paper>

                  {/* Комментарий к самооценке */}
                  {userProfile?.assessmentComment && (
                    <Paper sx={{ p: 2, mb: 2, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
                      <Typography variant="subtitle2" gutterBottom color="info.main">
                        Комментарий к самооценке:
                      </Typography>
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        "{userProfile.assessmentComment}"
                      </Typography>
                    </Paper>
                  )}
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      onClick={handleOpenSelfAssessment}
                      startIcon={<StarIcon />}
                    >
                      Обновить оценку
                    </Button>
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => {
                        const analysis = analyzeSelfAssessment(userProfile.selfAssessment, competencies);
                        console.log('Анализ самооценки:', analysis);
                        showSnackbar('Анализ сохранен в консоли разработчика');
                      }}
                    >
                      Показать анализ
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Проведите самооценку своих навыков для определения текущего уровня развития
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleOpenSelfAssessment}
                    startIcon={<StarIcon />}
                    color="warning"
                  >
                    Начать самооценку
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Третья строка: Карьерный трек */}
        <Grid item xs={12}>
          <Card sx={{ height: '100%', maxHeight: '800px' }}>
            <CardContent sx={{ 
              p: { xs: 2, sm: 3, md: 4 },
              height: 'calc(100% - 32px)',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#c1c1c1',
                borderRadius: '4px',
                '&:hover': {
                  background: '#a8a8a8',
                },
              },
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <TimelineIcon color="success" sx={{ fontSize: { xs: '1.5rem', lg: '1.75rem', xl: '2rem' } }} />
                <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', lg: '1.5rem', xl: '1.75rem' } }}>
                  Карьерный трек
                </Typography>
              </Box>

              {userProfile && userProfile?.mainProfile ? (
                <Box>
                  {userProfile.selectedCareerTrack ? (
                    <CareerTrackTree 
                      careerTrack={userProfile.selectedCareerTrack}
                      currentLevel={userProfile?.currentLevel || 1}
                      onLevelChange={handleSetCurrentLevel}
                      userSkills={userProfile?.selfAssessment || {}}
                      competencies={competencies}
                    />
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

      {/* Диалог самооценки */}
      <SelfAssessmentDialog
        open={selfAssessmentDialogOpen}
        onClose={() => setSelfAssessmentDialogOpen(false)}
        userProfile={userProfile}
        competencies={competencies}
        onSaveAssessment={handleSaveSelfAssessment}
      />

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
        <DialogContent sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
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
