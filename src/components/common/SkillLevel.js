import React, { memo } from 'react';
import { Box, Typography, Slider, Chip } from '@mui/material';
import { SkillChip } from './StyledComponents';
import { SKILL_LEVELS } from '../../constants';
import { getSkillLevelInfo } from '../../utils';

/**
 * Компонент для отображения и редактирования уровня навыка
 * @param {string} skillName - название навыка
 * @param {number} level - текущий уровень
 * @param {function} onChange - функция изменения уровня
 * @param {boolean} editable - можно ли редактировать
 * @param {boolean} showLabel - показывать ли название навыка
 */
const SkillLevel = memo(({ 
  skillName, 
  level = SKILL_LEVELS.DEFAULT, 
  onChange, 
  editable = true,
  showLabel = true 
}) => {
  const skillInfo = getSkillLevelInfo(level);

  const handleSliderChange = (event, newValue) => {
    if (onChange && editable) {
      onChange(skillName, newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {showLabel && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" fontWeight="medium">
            {skillName}
          </Typography>
          <SkillChip 
            label={skillInfo.label}
            skillLevel={level}
            size="small"
          />
        </Box>
      )}
      
      <Box sx={{ px: 1 }}>
        <Slider
          value={level}
          onChange={handleSliderChange}
          min={SKILL_LEVELS.MIN}
          max={SKILL_LEVELS.MAX}
          step={1}
          marks={[
            { value: SKILL_LEVELS.MIN, label: SKILL_LEVELS.MIN },
            { value: SKILL_LEVELS.MAX, label: SKILL_LEVELS.MAX }
          ]}
          disabled={!editable}
          color={skillInfo.color}
          sx={{
            '& .MuiSlider-thumb': {
              backgroundColor: skillInfo.color === 'default' ? '#9e9e9e' : undefined,
            },
            '& .MuiSlider-track': {
              backgroundColor: skillInfo.color === 'default' ? '#9e9e9e' : undefined,
            },
          }}
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          {SKILL_LEVELS.LABELS[SKILL_LEVELS.MIN]}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {SKILL_LEVELS.LABELS[SKILL_LEVELS.MAX]}
        </Typography>
      </Box>
    </Box>
  );
});

SkillLevel.displayName = 'SkillLevel';

export default SkillLevel;