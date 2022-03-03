import { VstoreAdapter } from '../types/types';

const webAdaper: VstoreAdapter = {
  set(key: string, value: Record<string, any>): void {
    return window.localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string): Record<string, any> | void {
    const result = window.localStorage.getItem(key);
    if (result) {
      return JSON.parse(result);
    } else {
      return void 0;
    }
  },
  del(key: string): void {
    return window.localStorage.removeItem(key);
  },
  clear(): void {
    return window.localStorage.clear();
  },
};

export default webAdaper;
