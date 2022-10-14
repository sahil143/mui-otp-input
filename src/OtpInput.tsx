import * as React from 'react';
import NumericInput from './NumericInput';
import {
  FormattedOtpInputValue,
  OtpInputFormat,
  OTPInputType,
  OtpInputValue,
} from './type';
import { useInputFormat } from './useInputFormat';
import {
  getFormattedInputValue,
  getInputValueFromFormattedValue,
  INPUT_SYMBOL,
} from './utils';

type OtpInputProps = {
  format: OtpInputFormat;
  value: OtpInputValue;
  type?: OTPInputType;
  isSecure?: boolean;
  isDisabled?: boolean;
  onChange: (
    value: OtpInputValue,
    formattedValue: FormattedOtpInputValue
  ) => void;
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
    return format.match(new RegExp('_', 'g'))?.length;
  }, [inputFormat, format]);

  const changeValue = React.useCallback(
    (
      newValue: FormattedOtpInputValue | OtpInputValue,
      isFormatted: boolean = true
    ) =>
      isFormatted
        ? onChange(
            getInputValueFromFormattedValue(newValue, format),
            newValue as FormattedOtpInputValue
          )
        : onChange(
            newValue as OtpInputValue,
            getFormattedInputValue(newValue, format)
          ),
    [onChange, format]
  );

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
    const currentInputIndex = inputFormat
      .slice(0, activeIndex + 1)
      .join('')
      .match(new RegExp('_', 'g'))?.length;
    const pastedOtp = event.clipboardData
      ?.getData('text/plain')
      .slice(
        0,
        otpLength && currentInputIndex
          ? otpLength - (currentInputIndex - 1)
          : undefined
      );
    const slicedValue = value.slice(
      0,
      currentInputIndex ? currentInputIndex - 1 : undefined
    );
    const newValue = slicedValue + pastedOtp;
    changeValue(newValue, false);
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
              onInputFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                onInputFocus(event, index)
              }
            />
          );
        }

        return (
          <span key={index} data-testid="otp-seperator">
            {item}
          </span>
        );
      })}
    </>
  );
};

export default OtpInput;
