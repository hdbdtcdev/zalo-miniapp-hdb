import { useContext } from 'react';
import i18n from 'i18next';
import { LanguageContext } from './LanguageProvider';

export function useI18n() {
  const context = useContext(LanguageContext);
  return context ? context.i18n : i18n;
}
