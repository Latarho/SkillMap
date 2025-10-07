// Утилиты для работы с навыками
export const getSkillLevelInfo = (level) => {
  if (level >= 4) return { label: 'Высокий', color: 'success' };
  if (level >= 3) return { label: 'Средний', color: 'warning' };
  if (level >= 2) return { label: 'Низкий', color: 'error' };
  return { label: 'Начальный', color: 'default' };
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
