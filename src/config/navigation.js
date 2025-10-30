import React from 'react';
import {
  Person as PersonIcon,
  Group as GroupIcon,
  Folder as FolderIcon,
  Assessment as AssessmentIcon,
  BarChart as BarChartIcon,
  School as SchoolIcon,
  LibraryBooks as LibraryBooksIcon,
  EmojiEvents as TrophyIcon,
  People as PeopleIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  CloudUpload as DataIcon,
} from '@mui/icons-material';

export const NAVIGATION_SECTIONS = [
  {
    id: 'career',
    title: 'Карьера',
    items: [
      { 
        id: 'profile',
        text: 'Мой профиль', 
        icon: <PersonIcon />, 
        path: '/profile', 
        index: 0 
      },
      { 
        id: 'team',
        text: 'Моя команда', 
        icon: <GroupIcon />, 
        path: '/team', 
        index: 1 
      },
    ]
  },
  {
    id: 'analytics',
    title: 'Аналитика и развитие',
    items: [
      { 
        id: 'analytics',
        text: 'Аналитика команды', 
        icon: <BarChartIcon />, 
        path: '/analytics', 
        index: 3 
      },
      { 
        id: 'idp',
        text: 'Планы развития', 
        icon: <SchoolIcon />, 
        path: '/idp', 
        index: 4 
      },
      { 
        id: 'feedback360',
        text: '360 Обратная связь', 
        icon: <AssessmentIcon />, 
        path: '/feedback360', 
        index: 5 
      },
      { 
        id: 'knowledge',
        text: 'База знаний', 
        icon: <LibraryBooksIcon />, 
        path: '/knowledge', 
        index: 6 
      },
      { 
        id: 'achievements',
        text: 'Достижения', 
        icon: <TrophyIcon />, 
        path: '/achievements', 
        index: 7 
      },
      { 
        id: 'experts',
        text: 'Эксперты', 
        icon: <PeopleIcon />, 
        path: '/experts', 
        index: 8 
      },
      { 
        id: 'team-builder',
        text: 'Подбор команды', 
        icon: <SearchIcon />, 
        path: '/team-builder', 
        index: 9 
      },
    ]
  },
  {
    id: 'admin',
    title: 'Администрирование',
    items: [
      { 
        id: 'directories',
        text: 'Справочники', 
        icon: <FolderIcon />, 
        path: '/directories', 
        index: 2 
      },
      { 
        id: 'data-management',
        text: 'Управление данными', 
        icon: <DataIcon />, 
        path: '/data-management', 
        index: 10 
      },
      { 
        id: 'notifications',
        text: 'Уведомления', 
        icon: <NotificationsIcon />, 
        path: '/notifications', 
        index: 11 
      },
    ]
  }
];

export const ROUTE_TAB_MAP = {
  '/': 0,
  '/profile': 0,
  '/team': 1,
  '/directories': 2,
  '/analytics': 3,
  '/idp': 4,
  '/feedback360': 5,
  '/knowledge': 6,
  '/achievements': 7,
  '/experts': 8,
  '/team-builder': 9,
  '/data-management': 10,
  '/notifications': 11,
};

export const getTabIndexByPath = (path) => {
  return ROUTE_TAB_MAP[path] || 0;
};

export const getAllMenuItems = () => {
  return NAVIGATION_SECTIONS.flatMap(section => section.items);
};

