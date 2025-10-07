// Моковые данные для карьерных треков
export const defaultCareerTracks = [
  {
    id: 1,
    name: 'Backend разработчик',
    level: 'Career Track',
    description: 'Карьерный трек для backend разработчиков с 5 уровнями развития',
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
  }
];
