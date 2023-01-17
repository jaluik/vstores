import { VstoreAdapter } from '../types/types';

const webAdapter: VstoreAdapter = {
  set(key: string, value: Record<string, any>): void {
    return window.localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string): Record<string, any> | void {
    const result = window.localStorage.getItem(key);
    if (result) {
      try {
        return JSON.parse(result);
      } catch {
        return { data: result };
      }
    }
  },
  del(key: string): void {
    return window.localStorage.removeItem(key);
  },
  clear(): void {
    return window.localStorage.clear();
  },
};

export default webAdapter;
