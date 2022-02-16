export interface VstoreConfig {
  expireAt?: string | number;
  expire?: number | [number, string];
  adapter?: any;
  formatKey?: (v: string) => string;
}

export interface VstoreSetConfig
  extends Omit<VstoreConfig, 'adapter' | 'formatKey'> {
  once?: boolean;
}

export interface SavedDataType {
  data: any;
  /** Set expiration time in milliseconds  */
  expireAt?: number;
  /** used once */
  once?: boolean;
}
