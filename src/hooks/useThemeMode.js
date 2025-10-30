import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils';
import { STORAGE_KEYS } from '../constants';

export const useThemeMode = () => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedSettings = loadFromStorage(STORAGE_KEYS.USER_SETTINGS) || {};
    if (savedSettings.themeMode) {
      setMode(savedSettings.themeMode);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    
    const settings = loadFromStorage(STORAGE_KEYS.USER_SETTINGS) || {};
    settings.themeMode = newMode;
    saveToStorage(STORAGE_KEYS.USER_SETTINGS, settings);
  };

  const setThemeMode = (newMode) => {
    setMode(newMode);
    
    const settings = loadFromStorage(STORAGE_KEYS.USER_SETTINGS) || {};
    settings.themeMode = newMode;
    saveToStorage(STORAGE_KEYS.USER_SETTINGS, settings);
  };

  return {
    mode,
    toggleTheme,
    setThemeMode,
    isDark: mode === 'dark',
  };
};

