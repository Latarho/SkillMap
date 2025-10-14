// Типы компетенций
export const COMPETENCY_TYPES = {
  PROFESSIONAL: 'Профессиональные',
  CORPORATE: 'Корпоративные'
};

// Локальные ключи для localStorage
export const STORAGE_KEYS = {
  COMPETENCIES: 'competencies',
  PROFILES: 'availableProfiles', 
  CAREER_TRACKS: 'careerTracks',
  USER_PROFILE: 'userProfile',
  TEAM_MEMBERS: 'teamMembers'
};

// Максимальное количество дополнительных профилей
export const MAX_ADDITIONAL_PROFILES = 2;

// Настройки уведомлений
export const SNACKBAR_CONFIG = {
  autoHideDuration: 3000,
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' }
};

// Уровни навыков
export const SKILL_LEVELS = {
  MIN: 1,
  MAX: 5,
  DEFAULT: 1,
  LABELS: {
    1: 'Начальный',
    2: 'Низкий', 
    3: 'Средний',
    4: 'Высокий',
    5: 'Экспертный'
  },
  COLORS: {
    1: 'default',
    2: 'error',
    3: 'warning', 
    4: 'success',
    5: 'primary'
  }
};

// Типы уведомлений
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Настройки валидации
export const VALIDATION_RULES = {
  REQUIRED: (value) => (!value || value.trim() === '') ? 'Поле обязательно для заполнения' : '',
  MIN_LENGTH: (min) => (value) => value && value.length < min ? `Минимум ${min} символов` : '',
  MAX_LENGTH: (max) => (value) => value && value.length > max ? `Максимум ${max} символов` : '',
  EMAIL: (value) => value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Некорректный email' : '',
  NUMBER: (value) => value && isNaN(value) ? 'Должно быть числом' : '',
  MIN_VALUE: (min) => (value) => value && parseFloat(value) < min ? `Минимальное значение: ${min}` : '',
  MAX_VALUE: (max) => (value) => value && parseFloat(value) > max ? `Максимальное значение: ${max}` : ''
};

// Настройки UI
export const UI_CONFIG = {
  BREAKPOINTS: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536
  },
  SPACING: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  },
  BORDER_RADIUS: {
    small: 4,
    medium: 8,
    large: 12
  }
};

// Настройки производительности
export const PERFORMANCE_CONFIG = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  CACHE_DURATION: 5 * 60 * 1000, // 5 минут
  MAX_CACHE_SIZE: 100
};
