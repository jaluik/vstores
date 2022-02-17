import { VstoreAdapter } from './../types/types';

const wxAdapter: VstoreAdapter = {
  set(key: string, value: Record<string, any>): void {
    try {
      wx.setStorageSync(key, value);
    } catch (err) {
      console.log('wx.setStorageSync err:', err);
    }
  },
  get(key: string): Record<string, any> | void {
    try {
      return wx.getStorageSync(key);
    } catch (err) {
      console.log('wx.getStorageSync err:', err);
      return void 0;
    }
  },
  del(key: string): void {
    try {
      return wx.removeStorageSync(key);
    } catch (err) {
      console.log('wx.removeStorageSync err:', err);
      return void 0;
    }
  },
  clear(): void {
    try {
      return wx.clearStorageSync();
    } catch (err) {
      console.log('wx.clearStorageSync err:', err);
      return void 0;
    }
  },
};

export default wxAdapter;

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
