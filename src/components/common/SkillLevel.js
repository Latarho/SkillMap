import React from 'react';
import { Chip } from '@mui/material';
import { getSkillLevelInfo } from '../../utils';

const SkillLevel = ({ skill, level, size = 'small', showSkillName = true }) => {
  const skillInfo = getSkillLevelInfo(level);
  const label = showSkillName ? `${skill}: ${skillInfo.label}` : skillInfo.label;
  
  return (
    <Chip
      label={label}
      size={size}
      color={skillInfo.color}
      variant="outlined"
    />
  );
};

export default SkillLevel;
