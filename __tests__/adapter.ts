import Vstore from '../src/core/Vstore';
import { sessionAdapter } from '../src/adapter/web';

const mockGetFn = jest.fn();
const mockSetFn = jest.fn();
const mockDelFn = jest.fn();
const mockClearFn = jest.fn();

describe('Test Web adapter', () => {
  beforeAll(() => {
    (global as any).window = {
      localStorage: {
        setItem: mockSetFn,
        getItem: mockGetFn,
        removeItem: mockDelFn,
        clear: mockClearFn,
      },
    };
  });
  afterAll(() => {
    delete (global as any).window;
  });
  it('should called with right params in web', () => {
    const store = new Vstore<{ test: number }>();
    store.set('test', 2);
    expect(mockSetFn).toBeCalledWith('test', JSON.stringify({ data: 2 }));

    store.get('test');
    expect(mockGetFn).toBeCalledWith('test');

    mockGetFn.mockReturnValue('invalid object');
    expect(store.get('test')).toBe('invalid object');

    store.del('test');
    expect(mockDelFn).toBeCalledWith('test');

    store.clear();
    expect(mockClearFn).toBeCalledWith();
  });
});

describe('Test Session adapter', () => {
  beforeAll(() => {
    (global as any).window = {
      sessionStorage: {
        setItem: mockSetFn,
        getItem: mockGetFn,
        removeItem: mockDelFn,
        clear: mockClearFn,
      },
    };
  });
  afterAll(() => {
    delete (global as any).window;
  });
  it('should called with right params in web', () => {
    const store = new Vstore<{ test: number }>({ adapter: sessionAdapter });
    store.set('test', 2);
    expect(mockSetFn).toBeCalledWith('test', JSON.stringify({ data: 2 }));
  });
});

describe('Test Weixin adapter', () => {
  beforeAll(() => {
    (global as any).wx = {
      setStorageSync: mockSetFn,
      getStorageSync: mockGetFn,
      removeStorageSync: mockDelFn,
      clearStorageSync: mockClearFn,
    };
  });
  afterAll(() => {
    delete global.wx;
  });
  it('should called with right params in weixin', () => {
    const store = new Vstore<{ test: number }>();
    store.set('test', 2);
    expect(mockSetFn).toBeCalledWith('test', JSON.stringify({ data: 2 }));

    store.set('test', 3);
    expect(mockSetFn).toBeCalledWith('test', { data: 3 });

    store.get('test');
    expect(mockGetFn).toBeCalledWith('test');

    store.del('test');
    expect(mockDelFn).toBeCalledWith('test');

    store.clear();
    expect(mockClearFn).toBeCalled();

    mockClearFn.mockRejectedValue(new Error('error'));
    expect(mockClearFn).toBeCalled();
  });
});

describe('Test Ali adapter', () => {
  let store: Vstore;
  const errorFn = jest.fn();
  beforeAll(() => {
    (global as any).my = {
      setStorageSync: mockSetFn,
      getStorageSync: mockGetFn,
      removeStorageSync: mockDelFn,
      clearStorageSync: mockClearFn,
    };
    store = new Vstore<{ test: number }>({
      errorHandler: errorFn,
    });
  });
  afterAll(() => {
    delete global.wx;
  });
  beforeEach(() => {
    mockSetFn.mockClear();
    mockGetFn.mockClear();
    mockDelFn.mockClear();
    mockClearFn.mockClear();
    errorFn.mockClear();
  });
  it('should called with right params in ali with get Func', () => {
    store.get('test');
    expect(mockGetFn).toHaveBeenLastCalledWith({ key: 'test' });

    mockGetFn.mockReturnValueOnce({ data: { data: 1 } });
    expect(store.get('test')).toBe(1);

    mockGetFn.mockReturnValueOnce({ error: 'error get' });
    store.get('test');
    expect(errorFn).toHaveBeenLastCalledWith('error get');

    mockGetFn.mockReturnValueOnce(undefined);
    expect(store.get('test')).toBeUndefined();
  });
  it('should called with right params in ali with set Func', () => {
    store.set('test', 2);
    expect(mockSetFn).toHaveBeenLastCalledWith({
      key: 'test',
      data: { data: 2 },
    });

    mockSetFn.mockReturnValueOnce({ error: 'error set' });
    store.set('test', 1);
    expect(errorFn).toHaveBeenLastCalledWith('error set');

    mockSetFn.mockReturnValueOnce({ error: undefined });
    store.set('test', 1);
    expect(errorFn).not.toHaveBeenLastCalledWith();
  });
  it('should called with right params in ali with del Func', () => {
    store.del('test');
    expect(mockDelFn).toHaveBeenLastCalledWith({ key: 'test' });

    mockDelFn.mockReturnValueOnce({ error: 'error del' });
    store.del('test');
    expect(errorFn).toHaveBeenLastCalledWith('error del');

    mockDelFn.mockReturnValueOnce({ error: undefined });
    store.del('test');
    expect(errorFn).not.toHaveBeenLastCalledWith();
  });

  it('should called with right params in ali with clear Func', () => {
    store.clear();
    expect(mockClearFn).toBeCalled();

    mockClearFn.mockReturnValueOnce({ error: 'error clear' });
    store.clear();
    expect(errorFn).toHaveBeenLastCalledWith('error clear');
  });
});
