export interface VstoreConfig<T> {
  expireAt?: string | number;
  expire?: number | [number, ManipulateType];
  adapter?: VstoreAdapter;
  formatKey?: (v: string) => string;
  errorHandler?: (err: any) => void | false;
  defaultValues?: Partial<T>;
}

export interface VstoreSetConfig
  extends Omit<
    VstoreConfig<any>,
    'adapter' | 'formatKey' | 'errorHandler' | 'defaultValues'
  > {
  /** used once */
  once?: boolean;
}

export interface VstoreAdapter {
  set(key: string, value: Record<string, any>): void;
  get(key: string): Record<string, any> | void;
  del(key: string): void;
  clear(): void;
}

type UnitTypeShort = 'd' | 'M' | 'y' | 'h' | 'm' | 's' | 'ms';

type UnitTypeLong =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'month'
  | 'year'
  | 'date';

type UnitTypeLongPlural =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'months'
  | 'years'
  | 'dates';

type UnitType = UnitTypeLong | UnitTypeLongPlural | UnitTypeShort;

type OpUnitType = UnitType | 'week' | 'weeks' | 'w';
type ManipulateType = Omit<OpUnitType, 'date' | 'dates'>;
