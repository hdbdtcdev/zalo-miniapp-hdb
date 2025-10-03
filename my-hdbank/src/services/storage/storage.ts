export const WebStorage = {
  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error("WebStorage.getItem error", e);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("WebStorage.setItem error", e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("WebStorage.removeItem error", e);
    }
  },
};
