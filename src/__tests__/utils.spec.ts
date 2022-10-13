import {
  getFormattedInputValue,
  getInputValueFromFormattedValue,
  getNextInputIndex,
} from '../utils';

describe('utils tests', () => {
  describe('getNextInputIndex', () => {
    const InputFormat = '_/_-_//__'.split('');

    it('should return next input index for +1 values', () => {
      expect(getNextInputIndex(InputFormat, 0, +1)).toEqual(2);
      expect(getNextInputIndex(InputFormat, 1, +1)).toEqual(2);
      expect(getNextInputIndex(InputFormat, 8, +1)).toEqual(null);
      expect(getNextInputIndex(InputFormat, 5, +1)).toEqual(7);
      expect(getNextInputIndex(InputFormat, -1, +1)).toEqual(0);
    });

    it('should return prev input index for -1 values', () => {
      expect(getNextInputIndex(InputFormat, 0, -1)).toEqual(null);
      expect(getNextInputIndex(InputFormat, 1, -1)).toEqual(0);
      expect(getNextInputIndex(InputFormat, 8, -1)).toEqual(7);
      expect(getNextInputIndex(InputFormat, 5, -1)).toEqual(4);
      expect(getNextInputIndex(InputFormat, -1, -1)).toEqual(null);
    });
  });

  describe('getFormattedInputValue', () => {
    it('should return values integrated in format', () => {
      expect(getFormattedInputValue('123456', '__-__-__')).toEqual('12-34-56');
      expect(getFormattedInputValue('12345', '_/_-_//__')).toEqual('1/2-3//45');
      expect(getFormattedInputValue('12br5', '/_/_-_//__/')).toEqual(
        '/1/2-b//r5/'
      );
      expect(getFormattedInputValue('12345', '_____')).toEqual('12345');
      expect(getFormattedInputValue('12b', '/_/_-_//__/')).toEqual(
        '/1/2-b//__/'
      );
    });
  });

  describe('getInputValueFromFormattedValue', () => {
    it('should return input values from the formatted values', () => {
      expect(getInputValueFromFormattedValue('12-34-56', '__-__-__')).toEqual(
        '123456'
      );
      expect(getInputValueFromFormattedValue('1/2-3//45', '_/_-_//__')).toEqual(
        '12345'
      );
      expect(
        getInputValueFromFormattedValue('/1/2-b//r5/', '/_/_-_//__/')
      ).toEqual('12br5');

      expect(getInputValueFromFormattedValue('12345', '_____')).toEqual(
        '12345'
      );
      expect(
        getInputValueFromFormattedValue('/1/2-b//__/', '/_/_-_//__/')
      ).toEqual('12b');
    });
  });
});
