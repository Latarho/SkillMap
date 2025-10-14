import { useState, useEffect, useCallback } from 'react';

/**
 * Хук для работы с формами с валидацией
 * @param {Object} initialValues - начальные значения формы
 * @param {Object} validationRules - правила валидации
 * @returns {Object} - объект с методами управления формой
 */
export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Валидация поля
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return '';
  }, [validationRules, values]);

  // Валидация всей формы
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validateField]);

  // Изменение значения поля
  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Валидация при изменении
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  // Отметка поля как "тронутого"
  const setTouchedField = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Валидация при потере фокуса
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField]);

  // Сброс формы
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Отправка формы
  const handleSubmit = useCallback((onSubmit) => {
    return (e) => {
      e.preventDefault();
      setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      
      if (validateForm()) {
        onSubmit(values);
      }
    };
  }, [values, validateForm]);

  return {
    values,
    errors,
    touched,
    setValue,
    setTouchedField,
    resetForm,
    handleSubmit,
    validateForm,
    isValid: Object.keys(errors).length === 0
  };
};

/**
 * Хук для работы с модальными окнами
 * @param {boolean} initialOpen - начальное состояние
 * @returns {Object} - объект с методами управления модальным окном
 */
export const useModal = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
};

/**
 * Хук для работы с загрузкой данных
 * @param {Function} fetchFunction - функция для загрузки данных
 * @param {Array} dependencies - зависимости для перезагрузки
 * @returns {Object} - объект с состоянием загрузки и данными
 */
export const useAsyncData = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch
  };
};
