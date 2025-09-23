import { GlobalKey } from './keys';

class GlobalDataService {
  private global = globalThis as any;

  set<T>(key: GlobalKey, value: T): void {
    this.global[key] = value;
  }

  get<T>(key: GlobalKey): T | undefined {
    return this.global[key] as T | undefined;
  }

  createSingleton<T>(key: GlobalKey, value: T): T {
    if (!this.global[key]) {
      this.global[key] = value;
    }
    return this.global[key] as T;
  }

  clear(key: GlobalKey): void {
    this.global[key] = null;
  }
}

export const globalDataService = new GlobalDataService();
