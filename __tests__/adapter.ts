import Vstore from '../src/core/Vstore';

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
    delete global.window;
  });
  it('should called withe right params in web', () => {
    const store = new Vstore<{ test: number }>();
    store.set('test', 2);
    expect(mockSetFn).toBeCalledWith('test', JSON.stringify({ data: 2 }));
    store.get('test');
    expect(mockGetFn).toBeCalledWith('test');
    mockGetFn.mockReturnValue('invalid object');
    expect(store.get('test')).toBeUndefined();
    store.del('test');
    expect(mockDelFn).toBeCalledWith('test');
    store.clear();
    expect(mockClearFn).toBeCalledWith();
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
  it('should called withe right params in web', () => {
    const store = new Vstore<{ test: number }>();
    store.set('test', 2);
    expect(mockSetFn).toBeCalledWith('test', JSON.stringify({ data: 2 }));

    mockSetFn.mockRejectedValue(new Error('error'));
    store.set('test', 3);
    expect(mockSetFn).toBeCalledWith('test', { data: 3 });

    store.get('test');
    expect(mockGetFn).toBeCalledWith('test');

    mockGetFn.mockRejectedValue(new Error('error'));
    expect(store.get('test')).toBeUndefined();

    store.del('test');
    expect(mockDelFn).toBeCalledWith('test');

    mockDelFn.mockRejectedValue(new Error('error'));
    expect(mockDelFn).toBeCalledWith('test');

    store.clear();
    expect(mockClearFn).toBeCalled();

    mockClearFn.mockRejectedValue(new Error('error'));
    expect(mockClearFn).toBeCalled();
  });
});

describe('Test Ali adapter', () => {
  beforeAll(() => {
    (global as any).my = {
      setStorageSync: mockSetFn,
      getStorageSync: mockGetFn,
      removeStorageSync: mockDelFn,
      clearStorageSync: mockClearFn,
    };
  });
  afterAll(() => {
    delete global.wx;
  });
  it('should called withe right params in web', () => {
    const store = new Vstore<{ test: number }>();
    store.set('test', 2);
    expect(mockSetFn).toBeCalledWith('test', JSON.stringify({ data: 2 }));

    mockSetFn.mockRejectedValue(new Error('error'));
    store.set('test', 3);
    expect(mockSetFn).toBeCalledWith('test', { data: 3 });

    store.get('test');
    expect(mockGetFn).toBeCalledWith('test');

    mockGetFn.mockRejectedValue(new Error('error'));
    expect(store.get('test')).toBeUndefined();

    store.del('test');
    expect(mockDelFn).toBeCalledWith('test');

    mockDelFn.mockRejectedValue(new Error('error'));
    expect(mockDelFn).toBeCalledWith('test');

    store.clear();
    expect(mockClearFn).toBeCalled();

    mockClearFn.mockRejectedValue(new Error('error'));
    expect(mockClearFn).toBeCalled();
  });
});
