import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Slider
} from '@mui/material';

const CompetencyCard = ({ 
  competency, 
  evaluation = 0, 
  onEvaluationChange,
  showSlider = true 
}) => {
  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, p: { xs: 1.5, sm: 2, md: 2.5 } }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', lg: '1.1rem', xl: '1.2rem' } }}>
          {competency.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
          {competency.category}
        </Typography>
        
        {competency.levels && (
          <Box sx={{ 
            mb: 2, 
            p: { xs: 1, sm: 1.5, md: 2 }, 
            bgcolor: 'grey.50', 
            borderRadius: 2, 
            border: '1px solid', 
            borderColor: 'grey.200',
            flex: 1
          }}>
            <Typography variant="caption" color="text.secondary" gutterBottom sx={{ 
              fontWeight: 'bold', 
              display: 'block', 
              mb: 1,
              fontSize: { xs: '0.7rem', lg: '0.75rem', xl: '0.8rem' }
            }}>
              Индикаторы уровней владения:
            </Typography>
            {Object.entries(competency.levels).map(([level, indicator]) => (
              <Box key={level} sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 1.5, 
                mb: 1,
                p: 1,
                borderRadius: 1,
                bgcolor: evaluation >= parseInt(level) ? 'primary.50' : 'white',
                border: evaluation >= parseInt(level) ? '1px solid' : '1px solid transparent',
                borderColor: evaluation >= parseInt(level) ? 'primary.200' : 'transparent'
              }}>
                <Chip 
                  label={`Уровень ${level}`} 
                  size="small" 
                  color={evaluation >= parseInt(level) ? 'primary' : 'default'}
                  variant={evaluation >= parseInt(level) ? 'filled' : 'outlined'}
                  sx={{ 
                    minWidth: { xs: 50, lg: 60, xl: 70 }, 
                    height: { xs: 18, lg: 20, xl: 22 }, 
                    fontSize: { xs: '0.65rem', lg: '0.7rem', xl: '0.75rem' },
                    fontWeight: 'bold'
                  }}
                />
                <Typography variant="caption" sx={{ 
                  fontSize: { xs: '0.65rem', lg: '0.7rem', xl: '0.75rem' }, 
                  lineHeight: 1.3,
                  flex: 1,
                  color: evaluation >= parseInt(level) ? 'primary.dark' : 'text.secondary'
                }}>
                  {indicator}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        
        {showSlider && (
          <Box sx={{ px: 2 }}>
            <Slider
              value={evaluation}
              onChange={(_, value) => onEvaluationChange(competency.name, value)}
              min={0}
              max={5}
              step={1}
              marks={[
                { value: 0, label: '0' },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
              ]}
              valueLabelDisplay="auto"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CompetencyCard;
