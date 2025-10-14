import { SKILL_LEVELS } from '../constants';

// Утилиты для работы с навыками
export const getSkillLevelInfo = (level) => {
  const normalizedLevel = Math.max(SKILL_LEVELS.MIN, Math.min(SKILL_LEVELS.MAX, level));
  return {
    label: SKILL_LEVELS.LABELS[normalizedLevel] || 'Неизвестно',
    color: SKILL_LEVELS.COLORS[normalizedLevel] || 'default',
    level: normalizedLevel
  };
};

export const getSkillLevelColor = (level) => {
  return getSkillLevelInfo(level).color;
};

export const getSkillLevelLabel = (level) => {
  return getSkillLevelInfo(level).label;
};

// Утилиты для работы с localStorage
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Ошибка загрузки из localStorage (${key}):`, error);
    return defaultValue;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Ошибка сохранения в localStorage (${key}):`, error);
    return false;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Ошибка удаления из localStorage (${key}):`, error);
    return false;
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Ошибка при очистке localStorage:', error);
    return false;
  }
};

// Утилиты для форматирования
export const formatSkillsString = (skills) => {
  if (!skills || typeof skills !== 'object') return '';
  return Object.entries(skills)
    .map(([skill, level]) => `${skill}:${level}`)
    .join(', ');
};

export const parseSkillsString = (skillsString) => {
  const skills = {};
  if (skillsString) {
    skillsString.split(',').forEach(skillPair => {
      const [skill, level] = skillPair.trim().split(':');
      if (skill && level) {
        skills[skill.trim()] = parseInt(level.trim());
      }
    });
  }
  return skills;
};

// Утилиты для валидации
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.length <= maxLength;
};

export const validateNumber = (value, min = null, max = null) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  if (min !== null && num < min) return false;
  if (max !== null && num > max) return false;
    return true;
};

// Утилиты для работы с массивами
export const findById = (array, id) => {
  return array.find(item => item.id === id);
};

export const findIndexById = (array, id) => {
  return array.findIndex(item => item.id === id);
};

export const removeById = (array, id) => {
  return array.filter(item => item.id !== id);
};

export const updateById = (array, id, updates) => {
  return array.map(item => item.id === id ? { ...item, ...updates } : item);
};

// Утилиты для работы с объектами
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return true;
  if (typeof obj === 'string') return obj.trim() === '';
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

// Утилиты для работы с датами
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Intl.DateTimeFormat('ru-RU', { ...defaultOptions, ...options }).format(new Date(date));
};

export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return checkDate.toDateString() === today.toDateString();
};

// Утилиты для работы с текстом
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Утилиты для работы с URL
export const getQueryParams = (url = window.location.href) => {
  const params = new URLSearchParams(new URL(url).search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

export const setQueryParam = (url, key, value) => {
  const urlObj = new URL(url);
  urlObj.searchParams.set(key, value);
  return urlObj.toString();
};

// Утилиты для работы с производительностью
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Утилиты для расчета уровня на основе самооценки
export const calculateOverallLevel = (assessments) => {
  if (!assessments || Object.keys(assessments).length === 0) {
    return {
      level: SKILL_LEVELS.DEFAULT,
      label: 'Не оценено',
      description: 'Самооценка не проведена',
      confidence: 0
    };
  }

  const values = Object.values(assessments);
  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  const roundedLevel = Math.round(average);
  
  // Определяем уровень с учетом весов
  const weightedLevel = calculateWeightedLevel(assessments);
  const finalLevel = Math.max(roundedLevel, weightedLevel);
  
  const skillInfo = getSkillLevelInfo(finalLevel);
  
  // Рассчитываем уверенность в оценке
  const variance = values.reduce((sum, val) => sum + Math.pow(val - average, 2), 0) / values.length;
  const confidence = Math.max(0, Math.min(100, 100 - (variance * 20)));
  
  return {
    level: finalLevel,
    label: skillInfo.label,
    description: getLevelDescription(finalLevel, average, confidence),
    confidence: Math.round(confidence),
    average: Math.round(average * 10) / 10,
    skillCount: values.length
  };
};

const calculateWeightedLevel = (assessments) => {
  // Веса для разных типов навыков
  const weights = {
    'Профессиональные': 1.2,
    'Корпоративные': 0.8
  };
  
  let weightedSum = 0;
  let totalWeight = 0;
  
  Object.entries(assessments).forEach(([skillId, level]) => {
    // Здесь можно добавить логику определения типа навыка
    // Пока используем равные веса
    const weight = 1;
    weightedSum += level * weight;
    totalWeight += weight;
  });
  
  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : SKILL_LEVELS.DEFAULT;
};

const getLevelDescription = (level, average, confidence) => {
  const descriptions = {
    1: 'Начальный уровень. Рекомендуется изучение основ и получение базовых знаний.',
    2: 'Низкий уровень. Необходимо углубленное изучение и практика.',
    3: 'Средний уровень. Хорошие базовые знания, можно развивать специализацию.',
    4: 'Высокий уровень. Отличные навыки, можно брать сложные задачи.',
    5: 'Экспертный уровень. Мастер своего дела, можно обучать других.'
  };
  
  const baseDescription = descriptions[level] || descriptions[1];
  const confidenceText = confidence > 80 ? 'Высокая уверенность в оценке.' : 
                        confidence > 60 ? 'Средняя уверенность в оценке.' : 
                        'Низкая уверенность в оценке.';
  
  return `${baseDescription} ${confidenceText}`;
};

// Утилиты для анализа самооценки
export const analyzeSelfAssessment = (assessments, competencies) => {
  const analysis = {
    strengths: [],
    weaknesses: [],
    recommendations: [],
    overallScore: 0
  };
  
  if (!assessments || Object.keys(assessments).length === 0) {
    return analysis;
  }
  
  const values = Object.values(assessments);
  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  analysis.overallScore = Math.round(average * 20); // Процент от максимума
  
  // Находим сильные и слабые стороны
  Object.entries(assessments).forEach(([skillId, level]) => {
    const competency = competencies.find(c => c.id === skillId);
    if (competency) {
      if (level >= 4) {
        analysis.strengths.push({
          name: competency.name,
          level,
          description: competency.description
        });
      } else if (level <= 2) {
        analysis.weaknesses.push({
          name: competency.name,
          level,
          description: competency.description
        });
      }
    }
  });
  
  // Генерируем рекомендации
  if (analysis.weaknesses.length > 0) {
    analysis.recommendations.push({
      type: 'improvement',
      title: 'Области для развития',
      description: `Рекомендуется сосредоточиться на развитии ${analysis.weaknesses.length} навыков`,
      skills: analysis.weaknesses.map(w => w.name)
    });
  }
  
  if (analysis.strengths.length > 0) {
    analysis.recommendations.push({
      type: 'leverage',
      title: 'Сильные стороны',
      description: `Используйте свои сильные стороны в ${analysis.strengths.length} областях`,
      skills: analysis.strengths.map(s => s.name)
    });
  }
  
  return analysis;
};

// Утилита для расчета соответствия уровню карьерного трека
export const calculateLevelMatch = (userSkills, requiredSkills, competencies = []) => {
  if (!userSkills || !requiredSkills || Object.keys(requiredSkills).length === 0) {
    return {
      score: 0,
      percentage: 0,
      status: 'Не оценено',
      color: 'default',
      details: []
    };
  }

  let totalScore = 0;
  let totalWeight = 0;
  const details = [];

  // Создаем карту компетенций для быстрого поиска по названию
  const competencyMap = {};
  if (competencies && competencies.length > 0) {
    competencies.forEach(comp => {
      competencyMap[comp.name] = comp;
    });
  }

  // Проходим по всем требуемым навыкам
  Object.entries(requiredSkills).forEach(([skillName, requiredLevel]) => {
    // Ищем компетенцию по названию
    const competency = competencyMap[skillName];
    let userLevel = 0;
    
    if (competency && userSkills[competency.id]) {
      // Если найдена компетенция, используем уровень по ID
      userLevel = userSkills[competency.id];
    } else if (userSkills[skillName]) {
      // Fallback: если навык хранится по названию
      userLevel = userSkills[skillName];
    }
    
    const weight = 1; // Все навыки имеют одинаковый вес
    
    // Рассчитываем соответствие для каждого навыка
    let skillScore = 0;
    if (userLevel >= requiredLevel) {
      skillScore = 1; // Полное соответствие
    } else if (userLevel > 0) {
      skillScore = userLevel / requiredLevel; // Частичное соответствие
    }
    
    totalScore += skillScore * weight;
    totalWeight += weight;
    
    details.push({
      skill: skillName,
      required: requiredLevel,
      current: userLevel,
      score: skillScore,
      status: userLevel >= requiredLevel ? 'Соответствует' : 
              userLevel > 0 ? 'Частично' : 'Не соответствует'
    });
  });

  const percentage = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 0;
  
  // Определяем статус и цвет
  let status, color;
  if (percentage >= 90) {
    status = 'Отлично';
    color = 'success';
  } else if (percentage >= 70) {
    status = 'Хорошо';
    color = 'primary';
  } else if (percentage >= 50) {
    status = 'Удовлетворительно';
    color = 'warning';
  } else if (percentage >= 30) {
    status = 'Слабо';
    color = 'error';
  } else {
    status = 'Не соответствует';
    color = 'default';
  }

  return {
    score: Math.round(totalScore * 10) / 10,
    percentage,
    status,
    color,
    details,
    totalSkills: Object.keys(requiredSkills).length,
    matchedSkills: details.filter(d => d.score >= 1).length
  };
};

// Утилита для принудительного обновления данных
export const forceUpdateData = () => {
  try {
    localStorage.clear();
    console.log('Данные localStorage очищены');
    return true;
  } catch (error) {
    console.error('Ошибка при очистке localStorage:', error);
    return false;
  }
};
