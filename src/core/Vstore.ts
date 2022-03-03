import { VstoreConfig, VstoreSetConfig } from '../types/types';
import {
  filterEmptyValueAndFuncValue,
  getDefaultAdapter,
} from '../utils/utils';
import dayjs from 'dayjs';

class Vstore<T extends object = any> {
  config: VstoreConfig;

  constructor(config?: VstoreConfig) {
    this.config = config || {};
    this.config.adapter = this.config.adapter || getDefaultAdapter();
  }
  set<K extends keyof T>(
    originalKey: K,
    value: T[K],
    config?: VstoreSetConfig
  ) {
    const key = this.getKey(originalKey);
    const expireAt = this.getExpireAt(config);
    const originData = {
      data: value,
      expireAt,
      once: config?.once,
    };
    const data = filterEmptyValueAndFuncValue(originData);
    if (data) {
      try {
        this.config.adapter.set(key, data);
      } catch (err) {
        this.config.errorHandler?.(err);
      }
    }
    return this;
  }
  get<K extends keyof T>(originalKey: K): T[K] | undefined {
    const key = this.getKey(originalKey);
    try {
      const result = this.config.adapter.get(key);
      if (!result) {
        return void 0;
      }
      if (result.expireAt) {
        const isexpired = dayjs().isAfter(dayjs(result.expireAt));
        if (isexpired) {
          this.del(key);
          return void 0;
        } else {
          return result.data;
        }
      } else {
        if (result?.once) {
          this.del(key);
        }
        return result.data;
      }
    } catch (err) {
      this.config.errorHandler?.(err);
    }
  }
  del(originalKey) {
    const key = this.getKey(originalKey);
    try {
      return this.config.adapter.del(key);
    } catch (err) {
      this.config.errorHandler?.(err);
    }
  }
  clear() {
    try {
      return this.config.adapter.clear();
    } catch (err) {
      this.config.errorHandler?.(err);
    }
  }
  private getKey(key) {
    if (this.config.formatKey) {
      return this.config.formatKey(key);
    }
    return key;
  }
  private getExpireAt(config?: VstoreSetConfig): undefined | number {
    if (config?.expireAt || (!config?.expire && this.config.expireAt)) {
      const expireAt = config?.expireAt || this.config.expireAt;
      // like '2022-01-01 12:00:00'
      const obj = dayjs(expireAt);
      if (obj.isValid()) {
        return obj.valueOf();
      }
      return void 0;
    }

    if (config?.expire || this.config.expire) {
      const expire = config.expire || this.config.expire;
      let obj;
      if (typeof expire === 'number') {
        obj = dayjs().add(expire, 's');
      } else {
        obj = dayjs().add(expire?.[0], expire?.[1]);
      }
      if (obj.isValid()) {
        return obj.valueOf();
      }
      return void 0;
    }

    return void 0;
  }
  create<D extends object>(config?: VstoreConfig) {
    return new Vstore<D>(config);
  }
}

export default Vstore;
