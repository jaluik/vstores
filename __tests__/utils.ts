import {
  filterEmptyValueAndFuncValue,
  getDefaultAdapter,
} from '../src/utils/utils';
import wxAdapter from '../src/adapter/wx';
import aliAdapter from '../src/adapter/ali';
import webAdaper from '../src/adapter/web';

describe('Test filterEmptyValueAndFuncValue Fn in utils', () => {
  it('should return undefined when data is not object or null', () => {
    expect(filterEmptyValueAndFuncValue(null)).toBeUndefined();
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
    global.window = undefined;
    global.wx = undefined;
    global.my = undefined;
  });
  it('should return web adapter in web', () => {
    global.window = {} as any;
    expect(getDefaultAdapter()).toBe(webAdaper);
  });
  it('should return wx adapter in wx', () => {
    global.wx = {} as any;
    expect(getDefaultAdapter()).toBe(wxAdapter);
  });
  it('should return ali adapter in aliplatform', () => {
    global.my = {} as any;
    expect(getDefaultAdapter()).toBe(aliAdapter);
  });
  it('should throw error when aliplatform not matched', () => {
    const getError = () => {
      getDefaultAdapter();
    };
    expect(getError).toThrowError(new Error('you need to define an adapter'));
  });
});
