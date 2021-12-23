import { VstoreConfig, VstoreSetConfig } from '../types/types';
import { filterEmptyValueAndFuncValue } from '../utils/utils';
import dayjs from 'dayjs';

class Vstore {
  config: VstoreConfig;

  constructor(config?: VstoreConfig) {
    this.config = config;
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
  getExpireAt(config?: VstoreSetConfig) {
    // TODO
    return void 0;
  }
}

export default Vstore;
