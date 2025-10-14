import React, { lazy, Suspense } from 'react';
import { LoadingState } from './common/LoadingState';

// Ленивая загрузка основных компонентов
export const MyProfile = lazy(() => import('./MyProfile'));
export const MyTeam = lazy(() => import('./MyTeam'));
export const Directories = lazy(() => import('./Directories'));

/**
 * HOC для ленивой загрузки компонентов с обработкой ошибок
 * @param {React.Component} Component - компонент для ленивой загрузки
 * @param {string} fallbackText - текст при загрузке
 */
export const withLazyLoading = (Component, fallbackText = 'Загрузка компонента...') => {
  return (props) => (
    <Suspense fallback={<LoadingState loading={true} loadingText={fallbackText} />}>
      <Component {...props} />
    </Suspense>
  );
};

/**
 * Компонент для ленивой загрузки с обработкой ошибок
 * @param {React.Component} Component - компонент для загрузки
 * @param {Object} props - пропсы компонента
 * @param {string} loadingText - текст при загрузке
 */
export const LazyComponent = ({ Component, props = {}, loadingText = 'Загрузка...' }) => {
  const LazyComponent = lazy(() => Component);
  
  return (
    <Suspense fallback={<LoadingState loading={true} loadingText={loadingText} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
