import Vstore from '../src/core/Vstore';
import dayjs from 'dayjs';

jest.useFakeTimers('modern');

const mockGetFn = jest.fn();
const mockSetFn = jest.fn();
const mockDelFn = jest.fn();
const mockClearFn = jest.fn();
const mockAdapter = {
  get: mockGetFn,
  set: mockSetFn,
  del: mockDelFn,
  clear: mockClearFn,
};

let vstore: Vstore;

function createVstoreAndReset() {
  vstore = new Vstore({
    adapter: mockAdapter,
  });
  mockSetFn.mockReset();
  mockGetFn.mockReset();
  mockDelFn.mockReset();
  mockClearFn.mockReset();
}

describe('Test Vstores  with mock Fn', () => {
  beforeEach(createVstoreAndReset);
  describe('Test Vstores  basic function', () => {
    it('should return Vstore instance', () => {
      expect(vstore).toBeInstanceOf(Vstore);
    });
    it('should return Vstore instance by createcall', () => {
      const vstore1 = vstore.create(vstore.config);
      expect(vstore1).toBeInstanceOf(Vstore);
    });
    it('should format the key', () => {
      vstore.config.formatKey = (key) => `${key}_formatted`;
      vstore.set('test', 1);
      expect(mockSetFn).toBeCalledWith('test_formatted', { data: 1 });
      vstore.get('test');
      expect(mockGetFn).toBeCalledWith('test_formatted');
      vstore.del('test');
      expect(mockDelFn).toBeCalledWith('test_formatted');
      vstore.clear();
      expect(mockClearFn).toBeCalledWith();
    });
  });

  describe('Test Vstores set Function', () => {
    beforeEach(() => {
      mockSetFn.mockReset();
    });
    it('should be called chained ', () => {
      vstore.set('test1', 1).set('test2', '1');
      expect(mockSetFn).toHaveBeenNthCalledWith(1, 'test1', { data: 1 });
      expect(mockSetFn).toHaveBeenNthCalledWith(2, 'test2', { data: '1' });
    });
    it('should set value correctly ', () => {
      vstore.set('test', [1, 2, '3']);
      expect(mockSetFn).toBeCalledWith('test', { data: [1, 2, '3'] });
      vstore.set('test', { a: 1, b: '3', c: null });
      expect(mockSetFn).toBeCalledWith('test', {
        data: { a: 1, b: '3', c: null },
      });
      mockSetFn.mockReset();
      vstore.set('test', undefined);
      expect(mockSetFn).not.toHaveBeenCalled();
      mockSetFn.mockReset();
      vstore.set('test', null);
      expect(mockSetFn).not.toHaveBeenCalled();
    });
  });
});

describe('Test Vstore with realData', () => {
  let savedData = {};
  beforeAll(() => {
    vstore.config.adapter = {
      set: (key, value) => {
        savedData[key] = value;
      },
      get: (key) => {
        return savedData[key];
      },
      del: (key) => {
        delete savedData[key];
      },
      clear: () => {
        savedData = {};
      },
    };
  });
  beforeEach(() => {
    savedData = {};
  });
  describe('Test Vstores basic logic', () => {
    it('should set value and get value correctly', () => {
      vstore.set('test', 1);
      expect(vstore.get('test')).toBe(1);
      vstore.set('test', { a: 1 });
      expect(vstore.get('test')).toMatchObject({ a: 1 });
    });
    it('should get value once when set once config', () => {
      vstore.set('test', { a: 1 }, { once: true });
      expect(vstore.get('test')).toMatchObject({ a: 1 });
      expect(vstore.get('test')).toBeUndefined();
    });
    it('should return undefined after del key', () => {
      vstore.set('test', 1);
      expect(vstore.get('test')).toBe(1);
      vstore.del('test');
      expect(vstore.get('test')).toBeUndefined;
    });
    it('should return undefined after del key', () => {
      vstore.set('test1', 1);
      vstore.set('test2', 2);
      vstore.clear();
      expect(vstore.get('test1')).toBeUndefined;
      expect(vstore.get('test2')).toBeUndefined;
    });
  });

  describe('Test Vstores expiration and expireAt config', () => {
    it('expire in specific time when config expire (number) in vstore', () => {
      const timeInMs = Date.now();
      const val = [1, 2];
      vstore.config.expireAt = timeInMs + 1000;
      vstore.set('test1', val);
      expect(vstore.get('test1')).toMatchObject(val);
      jest.setSystemTime(timeInMs + 999);
      expect(vstore.get('test1')).toMatchObject(val);
      jest.setSystemTime(timeInMs + 10001);
      expect(vstore.get('test1')).toBeUndefined();
    });
    it('expire in specific time when config expire (string) in vstore', () => {
      const nowTime = dayjs().valueOf();
      const val = { b: 3 };
      vstore.config.expireAt = dayjs()
        .add(10, 'second')
        .format('YYYY-MM-DD HH:mm:ss');
      vstore.set('test2', val);
      expect(vstore.get('test2')).toMatchObject(val);
      jest.setSystemTime(nowTime + 1000 * 9);
      expect(vstore.get('test2')).toMatchObject(val);
      jest.setSystemTime(nowTime + 1000 * 11);
      expect(vstore.get('test2')).toBeUndefined();
    });
    it('should return undefined when expireDate is invalid', () => {
      vstore.config.expireAt = 'invalid';
      vstore.set('test3', 1);
      expect(savedData['test3'].expireAt).toBeUndefined();
      vstore.config.expireAt = '2024-02-24';
      vstore.set('test3', 1);
      expect(savedData['test3'].expireAt).not.toBeUndefined();
    });
    it('should return undefined when expire is invalid', () => {
      vstore.config.expireAt = void 0;
      vstore.config.expire = 'UNKOWN' as unknown as number;
      vstore.set('test4', 1);
      expect(savedData['test4'].expire).toBeUndefined();
    });
    it('should set base unit is second when set expire', () => {
      vstore.set('test3', 1, {
        expire: 8,
      });
      expect(savedData['test3'].expireAt).toBe(
        dayjs().add(8, 'second').valueOf()
      );
    });
  });

  describe('Test expire config order in order : key config.expireAt > key config.expire > vstore config expireAt > vstore config expire', () => {
    it('should key config.expireAt > key config.expire', () => {
      vstore.set('test3', 1, {
        expire: [8, 'second'],
        expireAt: dayjs().add(7, 'second').valueOf(),
      });
      expect(savedData['test3'].expireAt).toBe(
        dayjs().add(7, 'second').valueOf()
      );
    });
    it('should  key config.expire > vstore config expireAt', () => {
      vstore.config.expireAt = dayjs()
        .add(9, 'second')
        .format('YYYY-MM-DD HH:mm:ss');
      vstore.set('test3', 1, {
        expire: [8, 'second'],
      });
      expect(savedData['test3'].expireAt).toBe(
        dayjs().add(8, 'second').valueOf()
      );
    });
    it('vstore config expireAt > vstore config expire', () => {
      vstore.config.expire = [10, 'second'];
      vstore.config.expireAt = dayjs()
        .add(9, 'second')
        .format('YYYY-MM-DD HH:mm:ss');
      vstore.set('test3', 1);
      expect(
        dayjs(savedData['test3'].expireAt).format('YYYY-MM-DD HH:mm:ss')
      ).toBe(dayjs().add(9, 'second').format('YYYY-MM-DD HH:mm:ss'));
    });
  });
});
