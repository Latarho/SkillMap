import React, { memo } from 'react';
import { Box, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { SkillChip, ContentPaper } from './StyledComponents';
import { getSkillLevelInfo } from '../../utils';

/**
 * Компонент для отображения карточки компетенции
 * @param {Object} competency - объект компетенции
 * @param {number} level - уровень навыка
 * @param {function} onEdit - функция редактирования
 * @param {function} onDelete - функция удаления
 * @param {boolean} showActions - показывать ли действия
 */
const CompetencyCard = memo(({ 
  competency, 
  level = 1, 
  onEdit, 
  onDelete, 
  showActions = true 
}) => {
  const skillInfo = getSkillLevelInfo(level);

  return (
    <ContentPaper variant="default">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {competency.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {competency.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
            <Chip 
              label={competency.type} 
              size="small" 
              variant="outlined" 
              color="secondary"
            />
            <SkillChip 
              label={`${skillInfo.label} (${level})`}
              skillLevel={level}
              size="small"
            />
          </Box>
        </Box>
        
        {showActions && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {onEdit && (
              <Tooltip title="Редактировать">
                <IconButton 
                  size="small" 
                  color="primary" 
                  onClick={() => onEdit(competency)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Удалить">
                <IconButton 
                  size="small" 
                  color="error" 
                  onClick={() => onDelete(competency.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </Box>
    </ContentPaper>
  );
});

CompetencyCard.displayName = 'CompetencyCard';

export default CompetencyCard;