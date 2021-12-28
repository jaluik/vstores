import { filterEmptyValueAndFuncValue } from '../src/utils/utils';

describe('Test filterEmptyValueAndFuncValue Fn in utils', () => {
  it('should filterEmptyValueAndFuncValue ', () => {
    expect(filterEmptyValueAndFuncValue({ a: '' })).toBeUndefined();
  });
});
