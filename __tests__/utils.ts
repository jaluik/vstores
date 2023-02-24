import {
  filterEmptyValueAndFuncValue,
  getDefaultAdapter,
} from '../src/utils/utils';
import { wxAdapter } from '../src/adapter/wx';
import { aliAdapter } from '../src/adapter/ali';
import { webAdapter } from '../src/adapter/web';

describe('Test filterEmptyValueAndFuncValue Fn in utils', () => {
  it('should return undefined when data is not object or null', () => {
    expect(filterEmptyValueAndFuncValue(null as any)).toBeUndefined();
  });
  it('should filterEmptyValue', () => {
    expect(filterEmptyValueAndFuncValue({ a: '' })).toBeUndefined();
  });
  it('should filterFuncValue', () => {
    expect(
      filterEmptyValueAndFuncValue({ a: '', b: () => {} })
    ).toBeUndefined();
  });
  it('should filterEmptyValueAndFuncValue and return object', () => {
    expect(
      filterEmptyValueAndFuncValue({ a: '', c: 1, b: () => {} })
    ).toMatchObject({ c: 1 });
  });
});

describe('Test getDefaultAdapter Fn in utils', () => {
  beforeEach(() => {
    (global as any).window = undefined;
    global.wx = undefined;
    global.my = undefined;
  });
  it('should return web adapter in web', () => {
    global.window = {} as any;
    expect(getDefaultAdapter()).toBe(webAdapter);
  });
  it('should return wx adapter in wx', () => {
    global.wx = {} as any;
    expect(getDefaultAdapter()).toBe(wxAdapter);
  });
  it('should return ali adapter in ali platform', () => {
    global.my = {} as any;
    expect(getDefaultAdapter()).toBe(aliAdapter);
  });
  it('should return undefined when ali platform not matched', () => {
    expect(getDefaultAdapter()).toBe(undefined);
  });
});
