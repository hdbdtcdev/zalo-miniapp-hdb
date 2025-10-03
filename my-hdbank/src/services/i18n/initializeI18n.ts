import i18n, { type InitOptions } from 'i18next';
import { initReactI18next, setI18n } from 'react-i18next';
import { merge } from 'lodash';
import { WebStorage } from '../storage';
import { DEFAULT_LANGUAGE, LANGUAGE_PREFERENCE_KEY } from '@/constants';

export async function initializeI18n<T>(options: InitOptions<T>) {
  const mergedOptions = merge({}, i18n.options, options);
  await i18n.use(initReactI18next).init({
    fallbackLng: DEFAULT_LANGUAGE,
    lng: DEFAULT_LANGUAGE,
    interpolation: { escapeValue: false },
    ...mergedOptions,
  });
  return i18n;
}

export async function initializeI18nFromStorage(initOptions?: InitOptions) {
  setI18n(i18n);
  const lng = await WebStorage.getItem(LANGUAGE_PREFERENCE_KEY);
  await initializeI18n({ lng: lng || DEFAULT_LANGUAGE, ...initOptions });
}
