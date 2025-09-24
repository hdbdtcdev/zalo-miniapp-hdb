import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';

export function useChangeLanguage(): (lng: string) => Promise<void> {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useChangeLanguage must be used within a LanguageProvider');
  }

  return context.changeLanguage;
}
