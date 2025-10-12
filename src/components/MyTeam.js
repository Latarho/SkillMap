import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import { Assessment as AssessmentIcon, Save as SaveIcon } from '@mui/icons-material';
import { useSnackbar } from '../hooks/useSnackbar';
import { loadFromStorage, saveToStorage, getSkillLevelInfo } from '../utils';
import { STORAGE_KEYS } from '../constants';
import { defaultCompetencies, mockTeamMembers } from '../data/mockData';
import CompetencyCard from './common/CompetencyCard';
import NotificationSnackbar from './common/NotificationSnackbar';

const MyTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [evaluationDialogOpen, setEvaluationDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [evaluations, setEvaluations] = useState({});
  const { snackbarOpen, snackbarMessage, showSnackbar, hideSnackbar } = useSnackbar();

  // Загружаем данные команды и компетенций
  useEffect(() => {
    // Загружаем компетенции
    const savedCompetencies = loadFromStorage(STORAGE_KEYS.COMPETENCIES);
    if (savedCompetencies) {
      // Проверяем, есть ли у компетенций поле levels
      const hasLevels = savedCompetencies.some(comp => comp.levels && Object.keys(comp.levels).length > 0);
      if (!hasLevels) {
        // Если уровни отсутствуют, обновляем данные
        console.log('Обновляем компетенции с уровнями владения в MyTeam');
        setCompetencies(defaultCompetencies);
        saveToStorage(STORAGE_KEYS.COMPETENCIES, defaultCompetencies);
      } else {
        setCompetencies(savedCompetencies);
      }
    } else {
      setCompetencies(defaultCompetencies);
      saveToStorage(STORAGE_KEYS.COMPETENCIES, defaultCompetencies);
    }

    // Загружаем данные команды
    loadTeamData();
  }, [loadTeamData]);

  const loadTeamData = useCallback(() => {
    // В реальном приложении здесь был бы API запрос
    // Пока используем моковые данные
    setTeamMembers(mockTeamMembers);
  }, []);

  const handleOpenEvaluation = useCallback((member) => {
    setSelectedMember(member);
    setEvaluations(member.skills || {});
    setEvaluationDialogOpen(true);
  }, []);

  const handleCloseEvaluation = useCallback(() => {
    setEvaluationDialogOpen(false);
    setSelectedMember(null);
    setEvaluations({});
  }, []);

  const handleSkillEvaluation = useCallback((skillId, value) => {
    setEvaluations(prev => ({
      ...prev,
      [skillId]: value
    }));
  }, []);

  const handleSaveEvaluation = useCallback(() => {
    if (selectedMember) {
      const updatedMembers = teamMembers.map(member => {
        if (member.id === selectedMember.id) {
          return {
            ...member,
            skills: evaluations
          };
        }
        return member;
      });
      setTeamMembers(updatedMembers);
      showSnackbar('Оценки успешно сохранены!');
      handleCloseEvaluation();
    }
  }, [selectedMember, teamMembers, evaluations, showSnackbar, handleCloseEvaluation]);

  const handleCloseSnackbar = () => {
    hideSnackbar();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Моя команда
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Управление профилями и оценка навыков сотрудников команды
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, p: 2, bgcolor: 'info.50', borderRadius: 2, border: '1px solid', borderColor: 'info.200' }}>
        <strong>Уровни владения навыками:</strong> 1 - Начальный, 2 - Развивающийся, 3 - Компетентный, 4 - Продвинутый, 5 - Экспертный. 
        При оценке учитывайте способность сотрудника выполнять задачи соответствующего уровня сложности.
      </Typography>

      <TableContainer 
        component={Paper}
        sx={{ 
          maxHeight: { xs: 600, lg: 700, xl: 800 },
          '& .MuiTable-root': {
            minWidth: { xs: 800, lg: 1000, xl: 1200 }
          }
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: { xs: 120, lg: 150, xl: 180 } }}>Сотрудник</TableCell>
              <TableCell sx={{ minWidth: { xs: 140, lg: 180, xl: 220 } }}>Должность</TableCell>
              <TableCell sx={{ minWidth: { xs: 200, lg: 250, xl: 300 } }}>Профили</TableCell>
              <TableCell sx={{ minWidth: { xs: 300, lg: 400, xl: 500 } }}>Навыки</TableCell>
              <TableCell sx={{ minWidth: { xs: 100, lg: 120, xl: 140 } }}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Typography variant="subtitle2">{member.name}</Typography>
                </TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {member.profiles.map((profile, index) => (
                      <Chip key={index} label={profile} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {Object.entries(member.skills || {}).map(([skill, level]) => {
                      const skillInfo = getSkillLevelInfo(level);
                      const competency = competencies.find(comp => comp.name === skill);
                      return (
                        <Chip
                          key={skill}
                          label={`${skill}: ${skillInfo.label}`}
                          size="small"
                          color={skillInfo.color}
                          variant="outlined"
                          title={competency ? `Тип: ${competency.type}` : ''}
                        />
                      );
                    })}
                  </Box>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<AssessmentIcon />}
                    onClick={() => handleOpenEvaluation(member)}
                    size="small"
                  >
                    Оценить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Диалог оценки навыков */}
      <Dialog 
        open={evaluationDialogOpen} 
        onClose={handleCloseEvaluation} 
        maxWidth={false}
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: { xs: '95vw', sm: '90vw', md: '85vw', lg: '80vw', xl: '75vw' },
            maxHeight: { xs: '90vh', sm: '85vh', md: '80vh', lg: '75vh', xl: '70vh' },
            width: '100%'
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h5" component="div">
            Оценка навыков: {selectedMember?.name}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
            Оцените уровень владения навыками по шкале от 1 до 5
          </Typography>
          
          {/* Профессиональные компетенции */}
          <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 3, color: 'success.main' }}>
            Профессиональные компетенции
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 3, xl: 4 }}>
            {competencies.filter(comp => comp.type === 'Профессиональные').map((competency) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={competency.id}>
                <CompetencyCard
                  competency={competency}
                  evaluation={evaluations[competency.name] || 0}
                  onEvaluationChange={handleSkillEvaluation}
                />
              </Grid>
            ))}
          </Grid>

          {/* Корпоративные компетенции */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3, color: 'info.main' }}>
            Корпоративные компетенции
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 3, xl: 4 }}>
            {competencies.filter(comp => comp.type === 'Корпоративные').map((competency) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={competency.id}>
                <CompetencyCard
                  competency={competency}
                  evaluation={evaluations[competency.name] || 0}
                  onEvaluationChange={handleSkillEvaluation}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEvaluation}>Отмена</Button>
          <Button
            onClick={handleSaveEvaluation}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Сохранить оценки
          </Button>
        </DialogActions>
      </Dialog>

      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default MyTeam;