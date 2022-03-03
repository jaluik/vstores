import { VstoreAdapter } from '../types/types';

const aliAdapter: VstoreAdapter = {
  set(key: string, value: Record<string, any>): void {
    const res = my.setStorageSync({ key, data: JSON.stringify(value) });
    if (res.error) {
      throw res.error;
    }
  },
  get(key: string): Record<string, any> | void {
    const res = my.getStorageSync({ key });
    if (res) {
      if (res.error) {
        throw res.error;
      }
      return typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    } else {
      return void 0;
    }
  },
  del(key: string): void {
    const res = my.removeStorageSync({ key });
    if (res.error) {
      throw res.error;
    }
  },
  clear(): void {
    const res = my.clearStorageSync();
    if (res.error) {
      throw res.error;
    }
  },
};

export default aliAdapter;

declare const my: {
  setStorageSync(config: {
    /**
     * 缓存数据的key
     */
    key: string;

    /**
     * 要缓存的数据
     */
    data: string | Record<string, any>;
  }): { error?: string };
  getStorageSync(config: {
    /** 本地缓存中指定的 key */
    key: string;
  }): { error?: string; data: string | Readonly<Record<string, any>> };
  removeStorageSync(config: {
    /** 本地缓存中指定的 key */
    key: string;
  }): { error?: string };
  clearStorageSync(): { error?: string };
};
