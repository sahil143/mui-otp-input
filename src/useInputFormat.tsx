import * as React from 'react';
import {
  FormattedOtpInputValue,
  InputIndexSymbols,
  OtpInputFormat,
  OtpInputValue,
} from './type';
import {
  getFormattedInputValue,
  getNextInputIndex,
  INPUT_SYMBOL,
} from './utils';

export type UseInputFormat = {
  inputFormat: OtpInputFormat[];
  inputFormattedValue: FormattedOtpInputValue;
  activeIndex: number;
  onInputFocus: (
    event: React.FocusEvent<HTMLInputElement>,
    index: number
  ) => void;
  nextActiveInputIndex: (symbol: InputIndexSymbols) => void;
  changeValueAtActiveIndex: (value: string) => FormattedOtpInputValue;
}

export const useInputFormat = (
  format: OtpInputFormat,
  value: OtpInputValue
): UseInputFormat => {
  const [activeIndex, setActiveIndex] = React.useState<number>(
    format.indexOf(INPUT_SYMBOL)
  );

  const activeIndexRef = React.useRef<number>(activeIndex);

  activeIndexRef.current = activeIndex;

  const inputFormattedValueRef = React.useRef(
    getFormattedInputValue(value, format)
  );

  inputFormattedValueRef.current = getFormattedInputValue(value, format);

  const changeValueAtActiveIndex = (value: string): FormattedOtpInputValue => {
    const newInputValue = inputFormattedValueRef.current.split('');
    newInputValue[activeIndexRef.current] = value;
    return newInputValue.join('');
  };

  const nextActiveInputIndex = React.useCallback(
    (symbol: InputIndexSymbols) => {
      setActiveIndex(i => {
        const nextIndex = getNextInputIndex(format, i, symbol);
        if (nextIndex !== null) {
          return nextIndex;
        }
        return i;
      });
    },
    [format]
  );

  const onInputFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>, index: number) => {
      setActiveIndex(index);
      event.target.select();
    },
    []
  );

  if (!format.includes('_')) {
    throw new Error(
      'Format must contain "_" because it represents an input field, e.g. "__/__/____"'
    );
  }

  return {
    inputFormat: format.split(''),
    inputFormattedValue: inputFormattedValueRef.current,
    activeIndex,
    onInputFocus,
    nextActiveInputIndex,
    changeValueAtActiveIndex,
  };
};
