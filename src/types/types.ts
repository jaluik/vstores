export interface VstoreConfig {
  expireAt?: string | number;
  expire?: number | [number, string];
  adapter: any;
  formatKey?: (v: string) => string;
}

export interface VstoreSetConfig
  extends Omit<VstoreConfig, 'adapter' | 'formatKey'> {
  once?: boolean;
}

export interface SavedDataType {
  data: any;
  /**过期时间,毫秒为单位 */
  expireAt?: number;
  /**是否只使用一次*/
  once?: boolean;
}
