
// import { LANGUAGE_PREFERENCE_KEY } from '@core/service';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import i18next from 'i18next';

export class StrapiQueries {
  // private static cachedLocale: string | null = null;
  // private static isLoading: boolean = false;

  params: Record<string, any> = {
    'sort[0]': 'updatedAt:desc',
    'filters[is_active]': true,
  };

  constructor(otherParams: Record<string, any> = {}) {
    // const locale = StrapiQueries.cachedLocale || i18next.language || 'vi';
    // StrapiQueries.loadLocaleFromStorage();
    // this.params = { locale, ...this.params, ...otherParams };
  }

  private static async loadLocaleFromStorage() {
    // if (StrapiQueries.isLoading) return;
    // StrapiQueries.isLoading = true;
    // try {
    //   const localStorage = await AsyncStorage.getItem(LANGUAGE_PREFERENCE_KEY);
    //   StrapiQueries.cachedLocale = localStorage || 'vi';
    // } catch (error) {
    //   StrapiQueries.cachedLocale = 'vi';
    // } finally {
    //   StrapiQueries.isLoading = false;
    // }
  }

  static async refreshLocaleCache(): Promise<void> {
    // StrapiQueries.cachedLocale = null;
    // await StrapiQueries.loadLocaleFromStorage();
  }
}

