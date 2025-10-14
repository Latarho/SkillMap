// Моковые данные для карьерных треков
export const defaultCareerTracks = [
  {
    id: 1,
    name: 'Backend разработчик',
    level: 'Career Track',
    description: 'Карьерный трек для backend разработчиков с 5 уровнями развития',
    profileId: 1, // Связь с профилем "Backend разработчик"
    requirements: ['JavaScript', 'Node.js', 'SQL', 'Git', 'Docker'],
    levels: {
      1: {
        name: 'Junior Backend Developer',
        description: 'Начинающий backend разработчик',
        skills: {
          'JavaScript': 2,
          'Node.js': 2,
          'SQL': 2,
          'Git': 2,
          'Docker': 1
        },
        responsibilities: [
          'Разработка простых API endpoints',
          'Работа с базами данных',
          'Написание unit тестов',
          'Участие в code review'
        ]
      },
      2: {
        name: 'Middle Backend Developer',
        description: 'Опытный backend разработчик',
        skills: {
          'JavaScript': 3,
          'Node.js': 3,
          'SQL': 3,
          'Git': 3,
          'Docker': 2,
          'Agile': 2
        },
        responsibilities: [
          'Проектирование API архитектуры',
          'Оптимизация производительности',
          'Работа с микросервисами',
          'Менторство junior разработчиков'
        ]
      },
      3: {
        name: 'Senior Backend Developer',
        description: 'Старший backend разработчик',
        skills: {
          'JavaScript': 4,
          'Node.js': 4,
          'SQL': 4,
          'Git': 4,
          'Docker': 3,
          'Agile': 3,
          'Командная работа': 3
        },
        responsibilities: [
          'Архитектурные решения',
          'Техническое лидерство в проектах',
          'Code review и наставничество',
          'Планирование технических задач'
        ]
      },
      4: {
        name: 'Lead Backend Developer',
        description: 'Ведущий backend разработчик',
        skills: {
          'JavaScript': 5,
          'Node.js': 5,
          'SQL': 5,
          'Git': 5,
          'Docker': 4,
          'Agile': 4,
          'Командная работа': 4,
          'Лидерство': 3
        },
        responsibilities: [
          'Техническое планирование команды',
          'Принятие архитектурных решений',
          'Управление техническими проектами',
          'Развитие команды разработчиков'
        ]
      },
      5: {
        name: 'Principal Backend Developer',
        description: 'Главный backend разработчик',
        skills: {
          'JavaScript': 5,
          'Node.js': 5,
          'SQL': 5,
          'Git': 5,
          'Docker': 5,
          'Agile': 5,
          'Командная работа': 5,
          'Лидерство': 5,
          'Коммуникация': 4
        },
        responsibilities: [
          'Стратегическое техническое планирование',
          'Исследование новых технологий',
          'Техническое консультирование',
          'Развитие технической культуры компании'
        ]
      }
    },
    horizontalGrowth: {
      'DevOps Engineer': {
        description: 'Переход в DevOps с фокусом на инфраструктуру',
        additionalSkills: ['Docker', 'Git'],
        requirements: 'Уровень 3+ в Backend разработке'
      },
      'Fullstack Developer': {
        description: 'Расширение в frontend разработку',
        additionalSkills: ['React', 'JavaScript'],
        requirements: 'Уровень 2+ в Backend разработке'
      },
      'Tech Lead': {
        description: 'Переход к техническому лидерству',
        additionalSkills: ['Лидерство', 'Коммуникация', 'Agile'],
        requirements: 'Уровень 4+ в Backend разработке'
      },
      'Data Engineer': {
        description: 'Специализация в работе с данными',
        additionalSkills: ['SQL', 'Python'],
        requirements: 'Уровень 3+ в Backend разработке'
      }
    }
  },
  {
    id: 2,
    name: 'Frontend разработчик',
    level: 'Career Track',
    description: 'Карьерный трек для frontend разработчиков',
    profileId: 2, // Связь с профилем "Frontend разработчик"
    requirements: ['JavaScript', 'React', 'Git'],
    levels: {
      1: {
        name: 'Junior Frontend Developer',
        description: 'Начинающий frontend разработчик',
        skills: {
          'JavaScript': 2,
          'React': 2,
          'Git': 2
        },
        responsibilities: [
          'Разработка UI компонентов',
          'Интеграция с API',
          'Написание тестов',
          'Участие в code review'
        ]
      },
      2: {
        name: 'Middle Frontend Developer',
        description: 'Опытный frontend разработчик',
        skills: {
          'JavaScript': 3,
          'React': 3,
          'Git': 3,
          'Agile': 2
        },
        responsibilities: [
          'Проектирование UI архитектуры',
          'Оптимизация производительности',
          'Менторство junior разработчиков',
          'Работа с state management'
        ]
      },
      3: {
        name: 'Senior Frontend Developer',
        description: 'Старший frontend разработчик',
        skills: {
          'JavaScript': 4,
          'React': 4,
          'Git': 4,
          'Agile': 3,
          'Командная работа': 3
        },
        responsibilities: [
          'Архитектурные решения',
          'Техническое лидерство',
          'Code review и наставничество',
          'Планирование технических задач'
        ]
      },
      4: {
        name: 'Lead Frontend Developer',
        description: 'Ведущий frontend разработчик',
        skills: {
          'JavaScript': 5,
          'React': 5,
          'Git': 5,
          'Agile': 4,
          'Командная работа': 4,
          'Лидерство': 3
        },
        responsibilities: [
          'Техническое планирование команды',
          'Принятие архитектурных решений',
          'Управление техническими проектами',
          'Развитие команды разработчиков'
        ]
      },
      5: {
        name: 'Principal Frontend Developer',
        description: 'Главный frontend разработчик',
        skills: {
          'JavaScript': 5,
          'React': 5,
          'Git': 5,
          'Agile': 5,
          'Командная работа': 5,
          'Лидерство': 5,
          'Коммуникация': 4
        },
        responsibilities: [
          'Стратегическое техническое планирование',
          'Исследование новых технологий',
          'Техническое консультирование',
          'Развитие технической культуры компании'
        ]
      }
    },
    horizontalGrowth: {
      'Fullstack Developer': {
        description: 'Расширение в backend разработку',
        additionalSkills: ['Node.js', 'SQL'],
        requirements: 'Уровень 2+ в Frontend разработке'
      },
      'UI/UX Designer': {
        description: 'Переход в дизайн',
        additionalSkills: ['Коммуникация'],
        requirements: 'Уровень 3+ в Frontend разработке'
      },
      'Tech Lead': {
        description: 'Переход к техническому лидерству',
        additionalSkills: ['Лидерство', 'Коммуникация', 'Agile'],
        requirements: 'Уровень 4+ в Frontend разработке'
      }
    }
  },
  {
    id: 3,
    name: 'Fullstack разработчик',
    level: 'Career Track',
    description: 'Карьерный трек для fullstack разработчиков',
    profileId: 3, // Связь с профилем "Fullstack разработчик"
    requirements: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
    levels: {
      1: {
        name: 'Junior Fullstack Developer',
        description: 'Начинающий fullstack разработчик',
        skills: {
          'JavaScript': 2,
          'React': 2,
          'Node.js': 2,
          'SQL': 2,
          'Git': 2
        },
        responsibilities: [
          'Разработка простых веб-приложений',
          'Работа с базами данных',
          'Интеграция frontend и backend',
          'Написание тестов'
        ]
      },
      2: {
        name: 'Middle Fullstack Developer',
        description: 'Опытный fullstack разработчик',
        skills: {
          'JavaScript': 3,
          'React': 3,
          'Node.js': 3,
          'SQL': 3,
          'Git': 3,
          'Agile': 2
        },
        responsibilities: [
          'Разработка сложных веб-приложений',
          'Проектирование архитектуры',
          'Оптимизация производительности',
          'Менторство junior разработчиков'
        ]
      },
      3: {
        name: 'Senior Fullstack Developer',
        description: 'Старший fullstack разработчик',
        skills: {
          'JavaScript': 4,
          'React': 4,
          'Node.js': 4,
          'SQL': 4,
          'Git': 4,
          'Agile': 3,
          'Командная работа': 3
        },
        responsibilities: [
          'Архитектурные решения',
          'Техническое лидерство',
          'Code review и наставничество',
          'Планирование технических задач'
        ]
      },
      4: {
        name: 'Lead Fullstack Developer',
        description: 'Ведущий fullstack разработчик',
        skills: {
          'JavaScript': 5,
          'React': 5,
          'Node.js': 5,
          'SQL': 5,
          'Git': 5,
          'Agile': 4,
          'Командная работа': 4,
          'Лидерство': 3
        },
        responsibilities: [
          'Техническое планирование команды',
          'Принятие архитектурных решений',
          'Управление техническими проектами',
          'Развитие команды разработчиков'
        ]
      },
      5: {
        name: 'Principal Fullstack Developer',
        description: 'Главный fullstack разработчик',
        skills: {
          'JavaScript': 5,
          'React': 5,
          'Node.js': 5,
          'SQL': 5,
          'Git': 5,
          'Agile': 5,
          'Командная работа': 5,
          'Лидерство': 5,
          'Коммуникация': 4
        },
        responsibilities: [
          'Стратегическое техническое планирование',
          'Исследование новых технологий',
          'Техническое консультирование',
          'Развитие технической культуры компании'
        ]
      }
    },
    horizontalGrowth: {
      'Tech Lead': {
        description: 'Переход к техническому лидерству',
        additionalSkills: ['Лидерство', 'Коммуникация', 'Agile'],
        requirements: 'Уровень 4+ в Fullstack разработке'
      },
      'DevOps Engineer': {
        description: 'Специализация в DevOps',
        additionalSkills: ['Docker', 'Kubernetes'],
        requirements: 'Уровень 3+ в Fullstack разработке'
      },
      'Product Manager': {
        description: 'Переход в продуктовое управление',
        additionalSkills: ['Коммуникация', 'Адаптивность'],
        requirements: 'Уровень 3+ в Fullstack разработке'
      }
    }
  },
  {
    id: 4,
    name: 'DevOps инженер',
    level: 'Career Track',
    description: 'Карьерный трек для DevOps инженеров',
    profileId: 4, // Связь с профилем "DevOps инженер"
    requirements: ['Docker', 'Kubernetes', 'Git', 'Мониторинг', 'Безопасность'],
    levels: {
      1: {
        name: 'Junior DevOps Engineer',
        description: 'Начинающий DevOps инженер',
        skills: {
          'Docker': 2,
          'Git': 2,
          'Мониторинг': 2,
          'Безопасность': 1
        },
        responsibilities: [
          'Настройка CI/CD пайплайнов',
          'Работа с контейнерами',
          'Мониторинг базовых метрик',
          'Документирование процессов'
        ]
      },
      2: {
        name: 'Middle DevOps Engineer',
        description: 'Опытный DevOps инженер',
        skills: {
          'Docker': 3,
          'Kubernetes': 2,
          'Git': 3,
          'Мониторинг': 3,
          'Безопасность': 2,
          'Agile': 2
        },
        responsibilities: [
          'Автоматизация развертывания',
          'Управление инфраструктурой',
          'Настройка мониторинга',
          'Обеспечение безопасности'
        ]
      },
      3: {
        name: 'Senior DevOps Engineer',
        description: 'Старший DevOps инженер',
        skills: {
          'Docker': 4,
          'Kubernetes': 4,
          'Git': 4,
          'Мониторинг': 4,
          'Безопасность': 3,
          'Agile': 3,
          'Командная работа': 3
        },
        responsibilities: [
          'Архитектура инфраструктуры',
          'Техническое лидерство',
          'Менторство команды',
          'Планирование технических задач'
        ]
      },
      4: {
        name: 'Lead DevOps Engineer',
        description: 'Ведущий DevOps инженер',
        skills: {
          'Docker': 5,
          'Kubernetes': 5,
          'Git': 5,
          'Мониторинг': 5,
          'Безопасность': 4,
          'Agile': 4,
          'Командная работа': 4,
          'Лидерство': 3
        },
        responsibilities: [
          'Техническое планирование команды',
          'Принятие архитектурных решений',
          'Управление инфраструктурными проектами',
          'Развитие команды'
        ]
      },
      5: {
        name: 'Principal DevOps Engineer',
        description: 'Главный DevOps инженер',
        skills: {
          'Docker': 5,
          'Kubernetes': 5,
          'Git': 5,
          'Мониторинг': 5,
          'Безопасность': 5,
          'Agile': 5,
          'Командная работа': 5,
          'Лидерство': 5,
          'Коммуникация': 4
        },
        responsibilities: [
          'Стратегическое планирование инфраструктуры',
          'Исследование новых технологий',
          'Техническое консультирование',
          'Развитие DevOps культуры'
        ]
      }
    },
    horizontalGrowth: {
      'Site Reliability Engineer': {
        description: 'Специализация в надежности систем',
        additionalSkills: ['Мониторинг', 'Коммуникация'],
        requirements: 'Уровень 3+ в DevOps'
      },
      'Security Engineer': {
        description: 'Переход в кибербезопасность',
        additionalSkills: ['Безопасность', 'Коммуникация'],
        requirements: 'Уровень 3+ в DevOps'
      },
      'Cloud Architect': {
        description: 'Архитектура облачных решений',
        additionalSkills: ['Коммуникация', 'Лидерство'],
        requirements: 'Уровень 4+ в DevOps'
      }
    }
  }
];
