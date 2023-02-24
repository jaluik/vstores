import { VstoreAdapter } from '../types/types';

const adapterFactory = (type: Storage) => {
  return {
    set(key: string, value: Record<string, any>): void {
      return type.setItem(key, JSON.stringify(value));
    },
    get(key: string): Record<string, any> | void {
      const result = type.getItem(key);
      if (result) {
        try {
          return JSON.parse(result);
        } catch {
          return { data: result };
        }
      }
    },
    del(key: string): void {
      return type.removeItem(key);
    },
    clear(): void {
      return type.clear();
    },
  };
};

export const webAdapter: VstoreAdapter = adapterFactory(window.localStorage);

export const sessionAdapter: VstoreAdapter = adapterFactory(
  window.sessionStorage
);
