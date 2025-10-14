import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { UI_CONFIG } from '../../constants';

// Стилизованная карточка с адаптивными отступами
export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: UI_CONFIG.BORDER_RADIUS.medium,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
}));

// Стилизованный контент карточки
export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

// Стилизованный заголовок секции
export const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.fontWeightBold,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.h6.fontSize,
  },
}));

// Стилизованная бумага для контента
export const ContentPaper = styled(Paper)(({ theme, variant = 'default' }) => {
  const variants = {
    primary: {
      backgroundColor: theme.palette.primary.light + '20',
      border: `1px solid ${theme.palette.primary.light}`,
    },
    secondary: {
      backgroundColor: theme.palette.secondary.light + '20',
      border: `1px solid ${theme.palette.secondary.light}`,
    },
    success: {
      backgroundColor: theme.palette.success.light + '20',
      border: `1px solid ${theme.palette.success.light}`,
    },
    warning: {
      backgroundColor: theme.palette.warning.light + '20',
      border: `1px solid ${theme.palette.warning.light}`,
    },
    error: {
      backgroundColor: theme.palette.error.light + '20',
      border: `1px solid ${theme.palette.error.light}`,
    },
    default: {
      backgroundColor: theme.palette.grey[50],
      border: `1px solid ${theme.palette.grey[200]}`,
    },
  };

  return {
    padding: theme.spacing(2),
    borderRadius: UI_CONFIG.BORDER_RADIUS.small,
    ...variants[variant],
  };
});

// Стилизованная кнопка действия
export const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: UI_CONFIG.BORDER_RADIUS.small,
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  padding: theme.spacing(1, 2),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
}));

// Стилизованный чип с уровнем навыка
export const SkillChip = styled(Chip)(({ theme, skillLevel }) => {
  const getColor = (level) => {
    const colors = {
      1: theme.palette.grey[500],
      2: theme.palette.error.main,
      3: theme.palette.warning.main,
      4: theme.palette.success.main,
      5: theme.palette.primary.main,
    };
    return colors[level] || theme.palette.grey[500];
  };

  return {
    backgroundColor: getColor(skillLevel) + '20',
    color: getColor(skillLevel),
    border: `1px solid ${getColor(skillLevel)}`,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      backgroundColor: getColor(skillLevel) + '30',
    },
  };
});

// Стилизованный диалог
export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: UI_CONFIG.BORDER_RADIUS.medium,
    maxWidth: '90vw',
    maxHeight: '90vh',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '80vw',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '70vw',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '60vw',
    },
  },
}));

// Стилизованный список элементов
export const StyledList = styled(List)(({ theme }) => ({
  '& .MuiListItem-root': {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: UI_CONFIG.BORDER_RADIUS.small,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light + '10',
    },
  },
}));

// Стилизованный элемент списка
export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: UI_CONFIG.BORDER_RADIUS.small,
  marginBottom: theme.spacing(1),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.grey[200]}`,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light + '10',
  },
}));

// Стилизованная форма
export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputLabel-root': {
    fontSize: theme.typography.body2.fontSize,
  },
  '& .MuiSelect-select': {
    fontSize: theme.typography.body2.fontSize,
  },
}));

// Стилизованный контейнер с прокруткой
export const ScrollableContainer = styled(Box)(({ theme, maxHeight = '400px' }) => ({
  maxHeight,
  overflowY: 'auto',
  padding: theme.spacing(1),
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.grey[100],
    borderRadius: UI_CONFIG.BORDER_RADIUS.small,
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[400],
    borderRadius: UI_CONFIG.BORDER_RADIUS.small,
    '&:hover': {
      background: theme.palette.grey[600],
    },
  },
}));

// Стилизованный контейнер для сетки
export const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
  },
}));

// Стилизованный контейнер для кнопок
export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
  '& > *': {
    flex: '1 1 auto',
    minWidth: '120px',
  },
}));

// Стилизованный индикатор загрузки
export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  color: theme.palette.text.secondary,
}));

// Стилизованный контейнер для ошибок
export const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.error.main,
  backgroundColor: theme.palette.error.light + '10',
  borderRadius: UI_CONFIG.BORDER_RADIUS.medium,
  border: `1px solid ${theme.palette.error.light}`,
}));
