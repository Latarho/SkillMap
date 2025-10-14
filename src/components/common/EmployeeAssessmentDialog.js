import React, { memo, useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Chip,
  Grid,
  Paper,
  Divider,
  Alert,
  LinearProgress,
  TextField,
  Tabs,
  Tab
} from '@mui/material';
import { 
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Person as PersonIcon,
  SupervisorAccount as SupervisorAccountIcon
} from '@mui/icons-material';
import SkillLevel from './SkillLevel';
import { ContentPaper, ActionButton, SkillChip } from './StyledComponents';
import { SKILL_LEVELS, COMPETENCY_TYPES } from '../../constants';
import { getSkillLevelInfo, calculateOverallLevel } from '../../utils';

/**
 * Компонент для оценки сотрудника руководителем
 * @param {Object} employee - данные сотрудника
 * @param {Array} competencies - список компетенций
 * @param {function} onSaveAssessment - функция сохранения результатов
 * @param {boolean} open - состояние диалога
 * @param {function} onClose - функция закрытия диалога
 */
const EmployeeAssessmentDialog = memo(({ 
  employee, 
  competencies, 
  onSaveAssessment, 
  open, 
  onClose 
}) => {
  const [assessments, setAssessments] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedLevel, setCalculatedLevel] = useState(null);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  // Инициализация оценок при открытии диалога
  useEffect(() => {
    if (open && employee) {
      // Загружаем оценки руководителя
      setAssessments(employee.managerAssessment || {});
      setComment(employee.managerComment || '');
      
      // Инициализируем пустыми оценками если их нет
      if (!employee.managerAssessment) {
        const initialAssessments = {};
        competencies.forEach(comp => {
          initialAssessments[comp.id] = SKILL_LEVELS.DEFAULT;
        });
        setAssessments(initialAssessments);
      }
    }
  }, [open, employee, competencies]);

  // Расчет общего уровня при изменении оценок
  useEffect(() => {
    if (Object.keys(assessments).length > 0) {
      const overallLevel = calculateOverallLevel(assessments);
      setCalculatedLevel(overallLevel);
    }
  }, [assessments]);

  const handleSkillChange = (competencyId, level) => {
    setAssessments(prev => ({
      ...prev,
      [competencyId]: level
    }));
  };

  const handleSaveAssessment = async () => {
    setIsCalculating(true);
    
    try {
      const overallLevel = calculateOverallLevel(assessments);
      
      const assessmentData = {
        assessments,
        overallLevel,
        calculatedAt: new Date().toISOString(),
        competencyCount: Object.keys(assessments).length,
        comment: comment.trim()
      };

      await onSaveAssessment(assessmentData);
      onClose();
    } catch (error) {
      console.error('Ошибка при сохранении оценки:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const getCompetencyType = (competency) => {
    return competency.type === COMPETENCY_TYPES.PROFESSIONAL ? 'primary' : 'secondary';
  };

  const getAssessmentStats = () => {
    const values = Object.values(assessments);
    const total = values.length;
    const average = values.reduce((sum, val) => sum + val, 0) / total;
    const maxLevel = Math.max(...values);
    const minLevel = Math.min(...values);
    
    return { total, average, maxLevel, minLevel };
  };

  const stats = getAssessmentStats();

  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`assessment-tabpanel-${index}`}
        aria-labelledby={`assessment-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1.5 }}>
            {children}
          </Box>
        )}
      </div>
    );
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssessmentIcon color="primary" />
          <Typography variant="h5">
            Оценка сотрудника: {employee?.name}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Оцените навыки сотрудника по шкале от 1 до 5. Система автоматически определит общий уровень.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab 
              icon={<PersonIcon />} 
              label="Самооценка сотрудника" 
              iconPosition="start"
            />
            <Tab 
              icon={<SupervisorAccountIcon />} 
              label="Оценка руководителя" 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Самооценка сотрудника */}
        <TabPanel value={activeTab} index={0}>
          {employee?.selfAssessment ? (
            <Box>
              {/* Информация о самооценке */}
              <Paper sx={{ p: 1, mb: 1.5, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
                <Typography variant="h6" gutterBottom color="info.main">
                  Самооценка сотрудника
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Дата самооценки: {employee.selfAssessmentDate ? new Date(employee.selfAssessmentDate).toLocaleDateString() : 'Не указана'}
                </Typography>
                
                {employee.selfAssessmentLevel && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography variant="subtitle2">
                      Определенный уровень: {employee.selfAssessmentLevel.level}
                    </Typography>
                    <Chip 
                      label={employee.selfAssessmentLevel.label} 
                      color="info" 
                      variant="filled"
                      size="small"
                    />
                  </Box>
                )}

                {/* Комментарий сотрудника */}
                {employee.selfAssessmentComment && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom color="info.main">
                      Комментарий сотрудника:
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', bgcolor: 'background.paper', p: 1, borderRadius: 1 }}>
                      "{employee.selfAssessmentComment}"
                    </Typography>
                  </Box>
                )}
              </Paper>

              {/* Навыки сотрудника */}
              <Typography variant="h6" gutterBottom>
                Оцененные навыки
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(employee.selfAssessment).map(([skillId, level]) => {
                  const competency = competencies.find(comp => comp.id === parseInt(skillId));
                  if (!competency) return null;
                  
                  return (
                    <Grid item xs={12} sm={6} md={4} key={skillId}>
                      <Paper sx={{ p: 2, border: '1px solid', borderColor: 'info.200' }}>
                        <Typography variant="subtitle2" gutterBottom>
                          {competency.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {competency.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <SkillChip 
                            label={getSkillLevelInfo(level).label}
                            skillLevel={level}
                            size="small"
                          />
                          <Chip 
                            label={competency.type} 
                            size="small" 
                            color={getCompetencyType(competency)}
                            variant="outlined"
                          />
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <PersonIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Самооценка не проведена
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Сотрудник еще не провел самооценку навыков
              </Typography>
            </Box>
          )}
        </TabPanel>

        {/* Оценка руководителя */}
        <TabPanel value={activeTab} index={1}>
          {/* Статистика оценок */}
          <Paper sx={{ p: 1, mb: 1.5, bgcolor: 'primary.50' }}>
            <Typography variant="h6" gutterBottom>
              Текущая статистика оценки
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="primary">
                    {stats.total}
                  </Typography>
                  <Typography variant="caption">
                    Навыков оценено
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="primary">
                    {stats.average.toFixed(1)}
                  </Typography>
                  <Typography variant="caption">
                    Средний уровень
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="success.main">
                    {stats.maxLevel}
                  </Typography>
                  <Typography variant="caption">
                    Максимальный
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <Typography variant="h4" color="warning.main">
                    {stats.minLevel}
                  </Typography>
                  <Typography variant="caption">
                    Минимальный
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Определенный уровень */}
          {calculatedLevel && (
            <Alert 
              severity="info" 
              icon={<TrendingUpIcon />}
              sx={{ mb: 3 }}
            >
              <Typography variant="h6" gutterBottom>
                Определенный уровень: {calculatedLevel.level}
              </Typography>
              <Typography variant="body2">
                {calculatedLevel.description}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <SkillChip 
                  label={calculatedLevel.label}
                  skillLevel={calculatedLevel.level}
                />
              </Box>
            </Alert>
          )}

          {/* Прогресс заполнения */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>
              Прогресс заполнения: {Object.keys(assessments).length} / {competencies.length}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(Object.keys(assessments).length / competencies.length) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Список навыков для оценки */}
          <Typography variant="h6" gutterBottom>
            Оценка навыков
          </Typography>
          
          <Grid container spacing={3}>
            {competencies.map((competency) => (
              <Grid item xs={12} sm={6} key={competency.id}>
                <ContentPaper variant="default">
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        {competency.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {competency.description}
                      </Typography>
                      <Chip 
                        label={competency.type} 
                        size="small" 
                        color={getCompetencyType(competency)}
                        variant="outlined"
                      />
                    </Box>
                    {assessments[competency.id] && (
                      <SkillChip 
                        label={getSkillLevelInfo(assessments[competency.id]).label}
                        skillLevel={assessments[competency.id]}
                        size="small"
                      />
                    )}
                  </Box>
                  
                  <SkillLevel
                    skillName=""
                    level={assessments[competency.id] || SKILL_LEVELS.DEFAULT}
                    onChange={(_, level) => handleSkillChange(competency.id, level)}
                    editable={true}
                    showLabel={false}
                  />
                </ContentPaper>
              </Grid>
            ))}
          </Grid>

          {/* Поле комментария */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Комментарий руководителя
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Добавьте комментарий к оценке сотрудника (необязательно)..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>
        </TabPanel>
      </DialogContent>

      <DialogActions sx={{ p: 1.5 }}>
        <Button onClick={onClose} disabled={isCalculating}>
          Отмена
        </Button>
        <ActionButton
          variant="contained"
          onClick={handleSaveAssessment}
          disabled={isCalculating || Object.keys(assessments).length === 0}
          startIcon={isCalculating ? <LinearProgress size={20} /> : <CheckCircleIcon />}
        >
          {isCalculating ? 'Сохранение...' : 'Сохранить оценку'}
        </ActionButton>
      </DialogActions>
    </Dialog>
  );
});

EmployeeAssessmentDialog.displayName = 'EmployeeAssessmentDialog';

export default EmployeeAssessmentDialog;
