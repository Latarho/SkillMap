export const exportToJSON = (data, filename) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadFile(blob, `${filename}.json`);
};

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvRows = [];

  csvRows.push(headers.join(','));

  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvRows.push(values.join(','));
  });

  const csvString = csvRows.join('\n');
  const blob = new Blob(['\ufeff' + csvString], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, `${filename}.csv`);
};

export const importFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Ошибка при парсинге JSON файла'));
      }
    };
    
    reader.onerror = () => reject(new Error('Ошибка при чтении файла'));
    reader.readAsText(file);
  });
};

const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportSkillsMatrix = (teamData, competencies) => {
  const matrix = [];
  
  const allSkills = new Set();
  teamData.forEach(emp => {
    if (emp.assessments) {
      Object.keys(emp.assessments).forEach(skill => allSkills.add(skill));
    }
  });
  
  const skillsList = Array.from(allSkills).sort();

  teamData.forEach(emp => {
    const row = {
      'Сотрудник': emp.name,
      'Должность': emp.position || '',
    };
    
    skillsList.forEach(skill => {
      const level = emp.assessments?.[skill]?.level || 0;
      row[skill] = level;
    });
    
    matrix.push(row);
  });

  exportToCSV(matrix, 'skills-matrix');
};

export const exportDevelopmentPlans = (plans) => {
  const exportData = [];
  
  plans.forEach(plan => {
    plan.goals?.forEach(goal => {
      exportData.push({
        'Сотрудник': plan.employeeName,
        'Период': plan.period,
        'Цель': goal.title,
        'Описание': goal.description,
        'Компетенция': goal.competency,
        'Текущий уровень': goal.currentLevel,
        'Целевой уровень': goal.targetLevel,
        'Срок': goal.deadline,
        'Статус': goal.status,
      });
    });
  });

  exportToCSV(exportData, 'development-plans');
};

export const exportTeamReport = (teamData) => {
  const report = teamData.map(emp => {
    const assessments = Object.values(emp.assessments || {});
    const avgLevel = assessments.length > 0
      ? (assessments.reduce((sum, a) => sum + (a.level || 0), 0) / assessments.length).toFixed(1)
      : '0.0';
    
    const expertSkills = assessments.filter(a => a.level >= 4).length;
    
    return {
      'Сотрудник': emp.name,
      'Должность': emp.position || '',
      'Профили': emp.profiles?.map(p => p.name).join('; ') || '',
      'Всего навыков': assessments.length,
      'Средний уровень': avgLevel,
      'Экспертных навыков': expertSkills,
    };
  });

  exportToCSV(report, 'team-report');
};

