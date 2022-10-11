import { getFormattedInputValue, getNextInputIndex } from '../utils';

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
      expect(getFormattedInputValue('123456', '__-__-__').join('')).toEqual(
        '12-34-56'
      );
      expect(getFormattedInputValue('12345', '_/_-_//__').join('')).toEqual(
        '1/2-3//45'
      );
      expect(getFormattedInputValue('12br5', '/_/_-_//__').join('')).toEqual(
        '/1/2-b//r5'
      );
      expect(getFormattedInputValue('12345', '_____').join('')).toEqual(
        '12345'
      );
    });
  });
});
