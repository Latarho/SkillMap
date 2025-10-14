import { useState, useEffect, useCallback } from 'react';

/**
 * Хук для работы с localStorage с автоматической синхронизацией
 * @param {string} key - ключ в localStorage
 * @param {any} initialValue - начальное значение
 * @returns {[any, function, function]} - [значение, функция установки, функция очистки]
 */
export const useLocalStorage = (key, initialValue) => {
  // Получаем значение из localStorage или используем начальное значение
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Ошибка чтения localStorage ключа "${key}":`, error);
      return initialValue;
    }
  });

  // Функция для установки значения
  const setValue = useCallback((value) => {
    try {
      // Позволяем value быть функцией, чтобы мы имели тот же API, что и useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}":`, error);
    }
  }, [key, storedValue]);

  // Функция для очистки значения
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Ошибка удаления localStorage ключа "${key}":`, error);
    }
  }, [key, initialValue]);

  // Слушаем изменения в localStorage от других вкладок
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Ошибка парсинга localStorage ключа "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};

/**
 * Хук для работы с массивом в localStorage
 * @param {string} key - ключ в localStorage
 * @param {Array} initialValue - начальный массив
 * @returns {[Array, function, function, function]} - [массив, добавить элемент, удалить элемент, очистить]
 */
export const useLocalStorageArray = (key, initialValue = []) => {
  const [array, setArray, removeArray] = useLocalStorage(key, initialValue);

  const addItem = useCallback((item) => {
    setArray(prev => [...prev, item]);
  }, [setArray]);

  const removeItem = useCallback((index) => {
    setArray(prev => prev.filter((_, i) => i !== index));
  }, [setArray]);

  const updateItem = useCallback((index, newItem) => {
    setArray(prev => prev.map((item, i) => i === index ? newItem : item));
  }, [setArray]);

  return [array, addItem, removeItem, updateItem, removeArray];
};
