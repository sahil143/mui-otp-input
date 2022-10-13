import * as React from 'react';
import NumericInput from './NumericInput';
import { FormattedOtpInputValue, OtpInputFormat, OTPInputType, OtpInputValue } from './type';
import { useInputFormat } from './useInputFormat';
import {
  getInputValueFromFormattedValue,
  INPUT_SYMBOL,
} from './utils';

type OtpInputProps = {
  format: OtpInputFormat;
  value: OtpInputValue;
  type?: OTPInputType;
  isSecure?: boolean;
  isDisabled?: boolean;
  onChange: (value: OtpInputValue, formattedValue: FormattedOtpInputValue) => void;
};

export const OtpInput: React.FC<OtpInputProps> = ({
  format,
  value,
  type = 'numeric',
  isSecure = false,
  isDisabled = false,
  onChange,
}) => {
  const {
    inputFormat,
    inputFormattedValue,
    activeIndex,
    onInputFocus,
    nextActiveInputIndex,
    changeValueAtActiveIndex,
  } = useInputFormat(format, value);

  const otpLength = React.useMemo(() => {
    let length = 0;
    for (const input of inputFormat) {
      if (input === INPUT_SYMBOL) {
        length++;
      }
    }
    return length;
  }, [inputFormat]);

  const changeValue = (newValue: FormattedOtpInputValue) =>
    onChange(getInputValueFromFormattedValue(newValue, format), newValue);

  const handleChange = (val: string) => {
    changeValue(changeValueAtActiveIndex(val));
    nextActiveInputIndex(+1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Backspace': {
        event.preventDefault();
        changeValue(changeValueAtActiveIndex(INPUT_SYMBOL));
        nextActiveInputIndex(-1);
        break;
      }
      case 'Delete': {
        event.preventDefault();
        changeValue(changeValueAtActiveIndex(INPUT_SYMBOL));
        break;
      }
      default:
        break;
    }
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    const pastedOtp = event.clipboardData
      ?.getData('text/plain')
      // [TODO] get correct active index for the input value
      .slice(0, otpLength - activeIndex);
    changeValue(value + pastedOtp);
  };

  return (
    <>
      {inputFormat.map((item, index) => {
        if (item === INPUT_SYMBOL) {
          return (
            <NumericInput
              key={index}
              type={type}
              isSecure={isSecure}
              isDisabled={isDisabled}
              value={
                inputFormattedValue[index] !== INPUT_SYMBOL
                  ? inputFormattedValue[index]
                  : ''
              }
              focus={activeIndex === index}
              onKeyDown={handleKeyDown}
              onInputPaste={handlePaste}
              onChange={handleChange}
              onInputFocus={(event: React.FocusEvent<HTMLInputElement>) => onInputFocus(event, index)}
            />
          );
        }

        return <span key={index}>{item}</span>;
      })}
    </>
  );
};

export default OtpInput;
