import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon
} from '@mui/icons-material';
import { calculateLevelMatch } from '../../utils';

const CareerTrackTree = ({ careerTrack, currentLevel = 1, onLevelChange, userSkills = {}, competencies = [] }) => {
  if (!careerTrack || !careerTrack.levels) {
    return (
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Карьерный трек не выбран
        </Typography>
      </Box>
    );
  }

  const levels = Object.entries(careerTrack.levels).sort(([a], [b]) => parseInt(a) - parseInt(b));

  const getLevelColor = (level) => {
    const levelNum = parseInt(level);
    if (levelNum <= currentLevel) {
      return 'success';
    } else if (levelNum === currentLevel + 1) {
      return 'warning';
    } else {
      return 'default';
    }
  };

  const getLevelIcon = (level) => {
    const levelNum = parseInt(level);
    if (levelNum < currentLevel) {
      return <CheckCircleIcon color="success" />;
    } else if (levelNum === currentLevel) {
      return <StarIcon color="primary" />;
    } else {
      return <RadioButtonUncheckedIcon color="disabled" />;
    }
  };

  const calculateProgress = () => {
    return (currentLevel / 5) * 100;
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Заголовок и прогресс */}
      <Paper sx={{ p: 1, mb: 1.5, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TimelineIcon color="primary" />
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            {careerTrack.name}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {careerTrack.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2">
              Прогресс развития
            </Typography>
            <Chip 
              label={`${currentLevel}/5`} 
              color="primary" 
              variant="filled"
              size="small"
            />
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={calculateProgress()} 
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      </Paper>

      {/* Дерево уровней */}
      <Box sx={{ position: 'relative' }}>
        {/* Вертикальная линия */}
        <Box sx={{
          position: 'absolute',
          left: 24,
          top: 0,
          bottom: 0,
          width: 2,
          bgcolor: 'primary.main',
          opacity: 0.3,
          borderRadius: 1
        }} />

        {levels.map(([level, levelData], index) => {
          const levelNum = parseInt(level);
          const isCompleted = levelNum < currentLevel;
          const isCurrent = levelNum === currentLevel;
          const isNext = levelNum === currentLevel + 1;
          const isFuture = levelNum > currentLevel + 1;

          return (
            <Box key={level} sx={{ position: 'relative', mb: 3 }}>
              {/* Горизонтальная линия */}
              <Box sx={{
                position: 'absolute',
                left: 24,
                top: 24,
                width: 20,
                height: 2,
                bgcolor: isCompleted || isCurrent ? 'primary.main' : 'grey.300',
                borderRadius: 1
              }} />

              {/* Узел уровня */}
              <Box sx={{
                position: 'absolute',
                left: 20,
                top: 16,
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: isCompleted ? 'success.main' : isCurrent ? 'primary.main' : 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
              }}>
                {getLevelIcon(level)}
              </Box>

              {/* Карточка уровня */}
              <Card sx={{ 
                ml: 6, 
                border: '1px solid',
                borderColor: isCurrent ? 'primary.main' : isCompleted ? 'success.main' : 'grey.300',
                bgcolor: isCurrent ? 'primary.50' : isCompleted ? 'success.50' : 'grey.50',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: isCurrent ? 'primary.100' : isCompleted ? 'success.100' : 'grey.100'
                },
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out'
              }}
              onClick={() => onLevelChange && onLevelChange(levelNum)}
              >
                <CardContent sx={{ p: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Chip 
                      label={`Уровень ${level}`} 
                      size="small" 
                      color={getLevelColor(level)}
                      variant={isCurrent ? "filled" : "outlined"}
                      sx={{ fontWeight: 'bold' }}
                    />
                    {isCurrent && (
                      <Chip 
                        label="Текущий" 
                        size="small" 
                        color="primary"
                        variant="filled"
                        sx={{ fontWeight: 'bold' }}
                      />
                    )}
                    {isCompleted && (
                      <Chip 
                        label="Пройден" 
                        size="small" 
                        color="success"
                        variant="filled"
                        sx={{ fontWeight: 'bold' }}
                      />
                    )}
                  </Box>

                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {levelData.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {levelData.description}
                  </Typography>

                  {/* Навыки */}
                  {levelData.skills && typeof levelData.skills === 'object' && Object.keys(levelData.skills).length > 0 && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold', display: 'block' }}>
                        Требуемые навыки:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                        {Object.entries(levelData.skills).map(([skill, skillLevel]) => (
                          <Chip
                            key={skill}
                            label={`${skill}: ${skillLevel}`}
                            size="small"
                            variant="outlined"
                            color={getLevelColor(level)}
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Оценка соответствия уровню */}
                  {levelData.skills && typeof levelData.skills === 'object' && Object.keys(levelData.skills).length > 0 && (
                    <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
                      {(() => {
                        const levelMatch = calculateLevelMatch(userSkills, levelData.skills, competencies);
                        
                        // Если навыки пользователя пустые, показываем сообщение
                        if (!userSkills || Object.keys(userSkills).length === 0) {
                          return (
                            <Box sx={{ textAlign: 'center', py: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                Проведите самооценку навыков, чтобы увидеть соответствие уровню
                              </Typography>
                            </Box>
                          );
                        }
                        
                        return (
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                Соответствие уровню:
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CircularProgress
                                  variant="determinate"
                                  value={levelMatch.percentage}
                                  size={40}
                                  thickness={4}
                                  sx={{ 
                                    color: levelMatch.color === 'default' ? 'grey.500' : `${levelMatch.color}.main`,
                                    '& .MuiCircularProgress-circle': {
                                      strokeLinecap: 'round',
                                    }
                                  }}
                                />
                                <Typography variant="h6" sx={{ 
                                  fontWeight: 'bold', 
                                  color: levelMatch.color === 'default' ? 'grey.500' : `${levelMatch.color}.main` 
                                }}>
                                  {levelMatch.percentage}%
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <Chip 
                                label={levelMatch.status} 
                                size="small" 
                                color={levelMatch.color === 'default' ? 'default' : levelMatch.color}
                                variant="filled"
                                sx={{ 
                                  fontWeight: 'bold',
                                  backgroundColor: levelMatch.color === 'default' ? 'grey.500' : undefined,
                                  color: levelMatch.color === 'default' ? 'white' : undefined
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {levelMatch.matchedSkills} из {levelMatch.totalSkills} навыков соответствуют требованиям
                              </Typography>
                            </Box>

                            <LinearProgress 
                              variant="determinate" 
                              value={levelMatch.percentage} 
                              sx={{ 
                                height: 6, 
                                borderRadius: 3,
                                bgcolor: 'grey.200',
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 3,
                                  bgcolor: levelMatch.color === 'default' ? 'grey.500' : `${levelMatch.color}.main`
                                }
                              }}
                            />
                          </Box>
                        );
                      })()}
                    </Box>
                  )}

                  {/* Обязанности */}
                  {levelData.responsibilities && Array.isArray(levelData.responsibilities) && levelData.responsibilities.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold', display: 'block' }}>
                        Основные обязанности:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                        {levelData.responsibilities.map((responsibility, idx) => (
                          <Chip
                            key={idx}
                            label={responsibility}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>

      {/* Горизонтальный рост */}
      {careerTrack.horizontalGrowth && (
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 2 }} />
          <Paper sx={{ p: 1, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TrendingUpIcon color="info" />
              <Typography variant="subtitle2" color="info.main" sx={{ fontWeight: 'bold' }}>
                Возможности горизонтального роста
              </Typography>
            </Box>
            {(() => {
              const horizontalGrowth = careerTrack.horizontalGrowth;
              
              if (typeof horizontalGrowth === 'string') {
                return (
                  <Typography variant="body2" color="text.secondary">
                    {horizontalGrowth}
                  </Typography>
                );
              }
              
              if (Array.isArray(horizontalGrowth)) {
                return (
                  <Typography variant="body2" color="text.secondary">
                    {horizontalGrowth.join(', ')}
                  </Typography>
                );
              }
              
              if (typeof horizontalGrowth === 'object' && horizontalGrowth !== null) {
                return (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.entries(horizontalGrowth).map(([role, details]) => (
                      <Box key={role} sx={{ 
                        p: 1, 
                        bgcolor: 'background.paper', 
                        borderRadius: 1, 
                        border: '1px solid', 
                        borderColor: 'grey.200' 
                      }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                          {role}
                        </Typography>
                        
                        {details.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {details.description}
                          </Typography>
                        )}
                        
                        {details.requirements && (
                          <Box sx={{ mb: 1 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                              Требования:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {details.requirements}
                            </Typography>
                          </Box>
                        )}
                        
                        {details.additionalSkills && Array.isArray(details.additionalSkills) && (
                          <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                              Дополнительные навыки:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                              {details.additionalSkills.map((skill, index) => (
                                <Chip
                                  key={index}
                                  label={skill}
                                  size="small"
                                  variant="outlined"
                                  color="info"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                );
              }
              
              return (
                <Typography variant="body2" color="text.secondary">
                  {JSON.stringify(horizontalGrowth)}
                </Typography>
              );
            })()}
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default CareerTrackTree;
