import React, { memo, useMemo, useCallback } from 'react';
import { debounce, throttle } from '../utils';
import { PERFORMANCE_CONFIG } from '../constants';

/**
 * HOC для мемоизации компонента
 * @param {React.Component} Component - компонент для мемоизации
 * @param {Array} compareProps - пропсы для сравнения
 */
export const withMemo = (Component, compareProps = []) => {
  return memo(Component, (prevProps, nextProps) => {
    if (compareProps.length === 0) {
      return false; // Всегда перерендеривать если не указаны пропсы для сравнения
    }
    
    return compareProps.every(prop => prevProps[prop] === nextProps[prop]);
  });
};

/**
 * Хук для создания мемоизированного значения с зависимостями
 * @param {Function} factory - функция для создания значения
 * @param {Array} deps - зависимости
 */
export const useMemoizedValue = (factory, deps) => {
  return useMemo(factory, deps);
};

/**
 * Хук для создания мемоизированной функции
 * @param {Function} callback - функция для мемоизации
 * @param {Array} deps - зависимости
 */
export const useMemoizedCallback = (callback, deps) => {
  return useCallback(callback, deps);
};

/**
 * Хук для создания дебаунсированной функции
 * @param {Function} callback - функция для дебаунса
 * @param {number} delay - задержка
 */
export const useDebouncedCallback = (callback, delay = PERFORMANCE_CONFIG.DEBOUNCE_DELAY) => {
  return useMemo(
    () => debounce(callback, delay),
    [callback, delay]
  );
};

/**
 * Хук для создания троттлированной функции
 * @param {Function} callback - функция для троттлинга
 * @param {number} limit - лимит
 */
export const useThrottledCallback = (callback, limit = PERFORMANCE_CONFIG.THROTTLE_DELAY) => {
  return useMemo(
    () => throttle(callback, limit),
    [callback, limit]
  );
};

/**
 * Хук для оптимизации списков
 * @param {Array} items - массив элементов
 * @param {Function} keyExtractor - функция извлечения ключа
 * @param {Function} filterFn - функция фильтрации
 * @param {Function} sortFn - функция сортировки
 */
export const useOptimizedList = (items, keyExtractor, filterFn, sortFn) => {
  return useMemo(() => {
    let result = items;
    
    if (filterFn) {
      result = result.filter(filterFn);
    }
    
    if (sortFn) {
      result = result.sort(sortFn);
    }
    
    return result;
  }, [items, filterFn, sortFn]);
};

/**
 * Хук для кэширования вычислений
 * @param {Function} computeFn - функция вычисления
 * @param {Array} deps - зависимости
 * @param {number} cacheDuration - длительность кэша в мс
 */
export const useCachedValue = (computeFn, deps, cacheDuration = PERFORMANCE_CONFIG.CACHE_DURATION) => {
  const [cache, setCache] = React.useState(new Map());
  const [lastUpdate, setLastUpdate] = React.useState(Date.now());

  return useMemo(() => {
    const now = Date.now();
    const cacheKey = JSON.stringify(deps);
    
    // Проверяем кэш
    if (cache.has(cacheKey) && (now - lastUpdate) < cacheDuration) {
      return cache.get(cacheKey);
    }
    
    // Вычисляем новое значение
    const newValue = computeFn();
    
    // Обновляем кэш
    const newCache = new Map(cache);
    newCache.set(cacheKey, newValue);
    
    // Ограничиваем размер кэша
    if (newCache.size > PERFORMANCE_CONFIG.MAX_CACHE_SIZE) {
      const firstKey = newCache.keys().next().value;
      newCache.delete(firstKey);
    }
    
    setCache(newCache);
    setLastUpdate(now);
    
    return newValue;
  }, deps);
};

/**
 * Компонент для виртуализации списков
 * @param {Array} items - массив элементов
 * @param {Function} renderItem - функция рендеринга элемента
 * @param {number} itemHeight - высота элемента
 * @param {number} containerHeight - высота контейнера
 */
export const VirtualizedList = memo(({ 
  items, 
  renderItem, 
  itemHeight = 50, 
  containerHeight = 400 
}) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      index: startIndex + index
    }));
  }, [items, scrollTop, itemHeight, containerHeight]);
  
  const totalHeight = items.length * itemHeight;
  
  const handleScroll = useThrottledCallback((e) => {
    setScrollTop(e.target.scrollTop);
  });
  
  return (
    <div
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item) => (
          <div
            key={item.index}
            style={{
              position: 'absolute',
              top: item.index * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            {renderItem(item, item.index)}
          </div>
        ))}
      </div>
    </div>
  );
});

VirtualizedList.displayName = 'VirtualizedList';
