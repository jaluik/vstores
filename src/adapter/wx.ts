import { VstoreAdapter } from './../types/types';

export const wxAdapter: VstoreAdapter = {
  set(key: string, value: Record<string, any>): void {
    wx.setStorageSync(key, value);
  },
  get(key: string): Record<string, any> | void {
    return wx.getStorageSync(key);
  },
  del(key: string): void {
    return wx.removeStorageSync(key);
  },
  clear(): void {
    return wx.clearStorageSync();
  },
};

declare const wx: {
  setStorageSync<T = any>(
    /** 本地缓存中指定的 key */
    key: string,
    /** 需要存储的内容。只支持原生类型、Date、及能够通过`JSON.stringify`序列化的对象。 */
    data: T
  ): void;
  getStorageSync<T = any>(
    /** 本地缓存中指定的 key */
    key: string
  );
  removeStorageSync(
    /** 本地缓存中指定的 key */
    key: string
  ): void;
  clearStorageSync(): void;
};
