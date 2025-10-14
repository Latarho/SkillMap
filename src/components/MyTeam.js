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
import { loadFromStorage, saveToStorage, getSkillLevelInfo, calculateLevelMatch } from '../utils';
import { STORAGE_KEYS } from '../constants';
import { defaultCompetencies, mockTeamMembers } from '../data/mockData';
import CompetencyCard from './common/CompetencyCard';
import NotificationSnackbar from './common/NotificationSnackbar';
import EmployeeAssessmentDialog from './common/EmployeeAssessmentDialog';

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
    setEvaluationDialogOpen(true);
  }, []);

  const handleCloseEvaluation = useCallback(() => {
    setEvaluationDialogOpen(false);
    setSelectedMember(null);
  }, []);

  const handleSaveAssessment = useCallback((assessmentData) => {
    if (selectedMember) {
      const updatedMembers = teamMembers.map(member => {
        if (member.id === selectedMember.id) {
          return {
            ...member,
            managerAssessment: assessmentData.assessments,
            managerAssessmentLevel: assessmentData.overallLevel,
            managerAssessmentDate: assessmentData.calculatedAt,
            managerComment: assessmentData.comment || ''
          };
        }
        return member;
      });
      setTeamMembers(updatedMembers);
      showSnackbar('Оценка сотрудника успешно сохранена!');
      handleCloseEvaluation();
    }
  }, [selectedMember, teamMembers, showSnackbar, handleCloseEvaluation]);

  const handleCloseSnackbar = () => {
    hideSnackbar();
  };

  // Функция для расчета процента соответствия
  const calculateCompliancePercentage = (member) => {
    if (!member.selectedCareerTrack || !member.selectedCareerTrack.levels) {
      return { selfAssessment: 0, managerAssessment: 0 };
    }

    const currentLevel = member.currentLevel || 1;
    const levelData = member.selectedCareerTrack.levels[currentLevel];
    
    if (!levelData || !levelData.skills) {
      return { selfAssessment: 0, managerAssessment: 0 };
    }

    const selfMatch = member.selfAssessment ? 
      calculateLevelMatch(member.selfAssessment, levelData.skills, competencies) : 
      { percentage: 0 };
    
    const managerMatch = member.managerAssessment ? 
      calculateLevelMatch(member.managerAssessment, levelData.skills, competencies) : 
      { percentage: 0 };

    return {
      selfAssessment: selfMatch.percentage,
      managerAssessment: managerMatch.percentage
    };
  };

  return (
    <Box>
      <Box sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
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
      </Box>

      <TableContainer 
        component={Paper}
        sx={{ 
          maxHeight: { xs: 600, lg: 700, xl: 800 },
          '& .MuiTable-root': {
            minWidth: '100%'
          }
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '15%', minWidth: 100 }}>Сотрудник</TableCell>
              <TableCell sx={{ width: '12%', minWidth: 100 }}>Должность</TableCell>
              <TableCell sx={{ width: '15%', minWidth: 120 }}>Основной профиль</TableCell>
              <TableCell sx={{ width: '15%', minWidth: 120 }}>Дополнительный профиль</TableCell>
              <TableCell sx={{ width: '20%', minWidth: 180 }}>Навыки</TableCell>
              <TableCell sx={{ width: '10%', minWidth: 100 }}>Уровень профиля</TableCell>
              <TableCell sx={{ width: '8%', minWidth: 80 }}>% самооценка</TableCell>
              <TableCell sx={{ width: '8%', minWidth: 80 }}>% руководитель</TableCell>
              <TableCell sx={{ width: '12%', minWidth: 100 }}>Действия</TableCell>
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
                  {/* Основной профиль (первый в списке) */}
                  {member.profiles && member.profiles.length > 0 && (
                    <Chip 
                      label={member.profiles[0]} 
                      size="small" 
                      color="primary" 
                      variant="filled"
                      sx={{ fontWeight: 'bold' }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {/* Дополнительные профили (остальные) */}
                  {member.profiles && member.profiles.length > 1 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {member.profiles.slice(1).map((profile, index) => (
                        <Chip 
                          key={index} 
                          label={profile} 
                          size="small" 
                          color="secondary" 
                          variant="outlined" 
                        />
                      ))}
                    </Box>
                  )}
                  {(!member.profiles || member.profiles.length <= 1) && (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      Не указан
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {/* Самооценка сотрудника */}
                    {member.selfAssessment && Object.keys(member.selfAssessment).length > 0 && (
                      <Box>
                        <Typography variant="caption" color="info.main" sx={{ fontWeight: 'bold' }}>
                          Самооценка:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.25, mt: 0.5 }}>
                          {Object.entries(member.selfAssessment).map(([skillId, level]) => {
                            const competency = competencies.find(comp => comp.id === parseInt(skillId));
                            if (!competency) return null;
                            const skillInfo = getSkillLevelInfo(level);
                            return (
                              <Chip
                                key={`self-${skillId}`}
                                label={`${competency.name}: ${skillInfo.label}`}
                                size="small"
                                color={skillInfo.color}
                                variant="outlined"
                                sx={{ fontSize: '0.6rem', height: 20 }}
                              />
                            );
                          })}
                        </Box>
                      </Box>
                    )}
                    
                    {/* Оценка руководителя */}
                    {member.managerAssessment && Object.keys(member.managerAssessment).length > 0 && (
                      <Box>
                        <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold' }}>
                          Оценка руководителя:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.25, mt: 0.5 }}>
                          {Object.entries(member.managerAssessment).map(([skillId, level]) => {
                            const competency = competencies.find(comp => comp.id === parseInt(skillId));
                            if (!competency) return null;
                            const skillInfo = getSkillLevelInfo(level);
                            return (
                              <Chip
                                key={`manager-${skillId}`}
                                label={`${competency.name}: ${skillInfo.label}`}
                                size="small"
                                color={skillInfo.color}
                                variant="filled"
                                sx={{ fontSize: '0.6rem', height: 20 }}
                              />
                            );
                          })}
                        </Box>
                      </Box>
                    )}
                    
                    {/* Если нет оценок, показываем старые навыки */}
                    {(!member.selfAssessment || Object.keys(member.selfAssessment).length === 0) && 
                     (!member.managerAssessment || Object.keys(member.managerAssessment).length === 0) && (
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
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  {/* Уровень профиля */}
                  {(() => {
                    if (member.managerAssessmentLevel) {
                      const levelInfo = getSkillLevelInfo(member.managerAssessmentLevel.average);
                      return (
                        <Box sx={{ textAlign: 'center' }}>
                          <Chip
                            label={levelInfo.label}
                            color={levelInfo.color}
                            variant="filled"
                            size="small"
                            sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', display: 'block', mt: 0.5 }}>
                            {member.managerAssessmentLevel.average.toFixed(1)}
                          </Typography>
                        </Box>
                      );
                    } else {
                      return (
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.75rem' }}>
                            Не оценен
                          </Typography>
                        </Box>
                      );
                    }
                  })()}
                </TableCell>
                <TableCell>
                  {/* Процент соответствия самооценки */}
                  {(() => {
                    const compliance = calculateCompliancePercentage(member);
                    return (
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            color: compliance.selfAssessment >= 70 ? 'success.main' : 
                                   compliance.selfAssessment >= 50 ? 'warning.main' : 'error.main'
                          }}
                        >
                          {compliance.selfAssessment}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                          {compliance.selfAssessment >= 70 ? 'Высокое' : 
                           compliance.selfAssessment >= 50 ? 'Среднее' : 'Низкое'}
                        </Typography>
                      </Box>
                    );
                  })()}
                </TableCell>
                <TableCell>
                  {/* Процент соответствия оценки руководителя */}
                  {(() => {
                    const compliance = calculateCompliancePercentage(member);
                    return (
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            color: compliance.managerAssessment >= 70 ? 'success.main' : 
                                   compliance.managerAssessment >= 50 ? 'warning.main' : 'error.main'
                          }}
                        >
                          {compliance.managerAssessment}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                          {compliance.managerAssessment >= 70 ? 'Высокое' : 
                           compliance.managerAssessment >= 50 ? 'Среднее' : 'Низкое'}
                        </Typography>
                      </Box>
                    );
                  })()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<AssessmentIcon />}
                    onClick={() => handleOpenEvaluation(member)}
                    size="small"
                    sx={{ fontSize: '0.75rem', minWidth: 'auto', px: 1 }}
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
      <EmployeeAssessmentDialog
        open={evaluationDialogOpen}
        onClose={handleCloseEvaluation}
        employee={selectedMember}
        competencies={competencies}
        onSaveAssessment={handleSaveAssessment}
      />

      <NotificationSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default MyTeam;