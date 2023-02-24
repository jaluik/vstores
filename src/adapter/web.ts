import { VstoreAdapter } from '../types/types';

const adapterFactory = (type: 'localStorage' | 'sessionStorage') => {
  function getStore() {
    if (type === 'localStorage') {
      return window.localStorage;
    } else {
      return window.sessionStorage;
    }
  }

  return {
    set(key: string, value: Record<string, any>): void {
      const store = getStore();
      return store.setItem(key, JSON.stringify(value));
    },
    get(key: string): Record<string, any> | void {
      const store = getStore();
      const result = store.getItem(key);
      if (result) {
        try {
          return JSON.parse(result);
        } catch {
          return { data: result };
        }
      }
    },
    del(key: string): void {
      const store = getStore();
      return store.removeItem(key);
    },
    clear(): void {
      const store = getStore();
      return store.clear();
    },
  };
};

export const webAdapter: VstoreAdapter = adapterFactory('localStorage');

export const sessionAdapter: VstoreAdapter = adapterFactory('sessionStorage');
