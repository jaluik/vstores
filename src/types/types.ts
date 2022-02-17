export interface VstoreConfig {
  expireAt?: string | number;
  expire?: number | [number, string];
  adapter?: VstoreAdapter;
  formatKey?: (v: string) => string;
}

export interface VstoreSetConfig
  extends Omit<VstoreConfig, 'adapter' | 'formatKey'> {
  once?: boolean;
}

export interface VstoreAdapter {
  set(key: string, value: Record<string, any>): void;
  get(key: string): Record<string, any> | void;
  del(key: string): void;
  clear(): void;
}

export interface SavedDataType {
  data: any;
  /** Set expiration time in milliseconds  */
  expireAt?: number;
  /** used once */
  once?: boolean;
}
