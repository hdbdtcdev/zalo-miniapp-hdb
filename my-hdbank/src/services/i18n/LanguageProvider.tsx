import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  DEFAULT_LANGUAGE,
  initializeI18n,
  LANGUAGE_PREFERENCE_KEY,
} from './initializeI18n';
import i18n, { type InitOptions } from 'i18next';
import { WebStorage } from '../storage';

export interface LanguageContextType {
  i18n: typeof i18n;
  language: string;
  changeLanguage: (lng: string) => Promise<void>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  initOptions?: InitOptions;
  shouldInitializeI18n?: boolean;
}

export const LanguageProvider = ({
  children,
  initOptions,
  shouldInitializeI18n = true,
}: PropsWithChildren<LanguageProviderProps>) => {
  const [language, setLanguage] = useState<string>(i18n.language);

  const changeLanguage = useCallback(async (lng: string) => {
    await WebStorage.setItem(LANGUAGE_PREFERENCE_KEY, lng);
    await i18n.changeLanguage(lng);
  }, []);

  useEffect(() => {
    const initI18n = async () => {
      const lng = await WebStorage.getItem(LANGUAGE_PREFERENCE_KEY);

      if (shouldInitializeI18n) {
        await initializeI18n({ lng: lng || DEFAULT_LANGUAGE, ...initOptions });
      }
      setLanguage(lng || i18n.language);

      i18n.on('languageChanged', (lng) => {
        WebStorage.setItem(LANGUAGE_PREFERENCE_KEY, lng);
        setLanguage(lng);
      });
    };

    initI18n();

    return () => i18n.off('languageChanged');
  }, [initOptions]);

  return (
    <LanguageContext.Provider value={{ i18n, language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
