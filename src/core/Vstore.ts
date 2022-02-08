import { VstoreConfig, VstoreSetConfig } from '../types/types';
import { filterEmptyValueAndFuncValue } from '../utils/utils';
import webAdapter from '../adapter/web';
import dayjs from 'dayjs';

class Vstore {
  config: VstoreConfig;

  constructor(config?: VstoreConfig) {
    this.config = config || {};
    this.config.adapter = this.config.adapter || webAdapter;
  }
  set(originalKey, value, config?: VstoreSetConfig) {
    const key = this.getKey(originalKey);
    const expireAt = this.getExpireAt(config);
    const originData = {
      data: value,
      expireAt,
      once: config?.once,
    };
    const data = filterEmptyValueAndFuncValue(originData);
    if (data) {
      this.config.adapter.set(key, data);
    }
  }
  get(originalKey) {
    const key = this.getKey(originalKey);
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
  }
  del(originalKey) {
    const key = this.getKey(originalKey);
    return this.config.adapter.del(key);
  }
  clear() {
    return this.config.adapter.clear();
  }
  getKey(key) {
    if (this.config.formatKey) {
      return this.config.formatKey(key);
    }
    return key;
  }
  getExpireAt(config?: VstoreSetConfig): undefined | number {
    if (config.expireAt || (!config.expire && this.config.expireAt)) {
      const expireAt = config.expireAt || this.config.expireAt;
      // like '2022-01-01 12:00:00'
      const obj = dayjs(expireAt);
      if (obj.isValid()) {
        return obj.valueOf();
      }
      return void 0;
    }

    if (config.expire || this.config.expire) {
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
}

export default Vstore;
