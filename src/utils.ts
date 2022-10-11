import {
  FormattedOtpInputValue,
  OtpInputFormat,
  InputIndexSymbols,
  OtpInputValue,
} from './type';

export const INPUT_SYMBOL = '_';

export const TypeRegExp = {
  numeric: /^[0-9]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
};

export const getNextInputIndex = (
  inputFormat: OtpInputFormat | OtpInputFormat[],
  currIndex: number,
  symbol: InputIndexSymbols
): number | null => {
  const nextIndex = currIndex + symbol;
  if (inputFormat[nextIndex] === INPUT_SYMBOL) {
    return nextIndex;
  }
  if (nextIndex === inputFormat.length || nextIndex < 0) {
    return null;
  }
  return getNextInputIndex(inputFormat, nextIndex, symbol);
};

export const getFormattedInputValue = (
  value: OtpInputValue,
  format: OtpInputFormat
): FormattedOtpInputValue => {
  const inputFormat = format.split('');
  const inputValue = value.split('');
  let inputValueIndex = 0;
  return inputFormat
    .map(iv => {
      if (inputValueIndex > inputValue.length - 1) {
        return iv;
      }
      if (iv === INPUT_SYMBOL) {
        inputValueIndex++;
        return inputValue[inputValueIndex - 1];
      }
      return inputValue[Math.max(inputValueIndex - 1, 0)] ? iv : '_';
    })
    .join('');
};

export const getInputValueFromFormattedValue = (
  formattedValue: FormattedOtpInputValue | FormattedOtpInputValue[],
  format: OtpInputFormat
): OtpInputValue => {
  const formattingCharacters = format.replace(/_/g, '') + INPUT_SYMBOL;
  const tempFormattedValue =
    formattedValue instanceof Array ? formattedValue : formattedValue.split('');
  return tempFormattedValue
    .map(iv => (!formattingCharacters.includes(iv) ? iv : ''))
    .join('');
};
