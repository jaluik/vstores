import { VstoreConfig } from '../types';

class Vstore {
  config: VstoreConfig;

  constructor(config?: VstoreConfig) {
    this.config = config;
  }
  set(key, value) {}
  get(key) {}
  del(key) {}
  clear() {}
}

export default Vstore;
