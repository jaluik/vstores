import wxAdapter from '../adapter/wx';
import aliAdapter from '../adapter/ali';
import webAdapter from '../adapter/web';

/** 过滤对象的空值属性以及方法属性 */
export const filterEmptyValueAndFuncValue = (
  data: Record<string, any>
): Record<string, any> => {
  if (typeof data !== 'object' || !data) {
    return void 0;
  }
  const res = Object.keys(data).reduce(
    (obj: Record<string, any>, key: string) => {
      if (
        !['', void 0, null].includes(data[key]) &&
        typeof data[key] !== 'function'
      ) {
        obj[key] = data[key];
      }
      return obj;
    },
    {} as Record<string, any>
  );
  return Object.keys(res).length === 0 ? void 0 : res;
};

export const getDefaultAdapter = () => {
  if (typeof window === 'object') {
    return webAdapter;
  }
  if (typeof wx === 'object') {
    return wxAdapter;
  }
  if (typeof my === 'object') {
    return aliAdapter;
  }
  return undefined;
};

declare const my: any;
declare const wx: any;
