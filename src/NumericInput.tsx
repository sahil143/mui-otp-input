import { Input as MuiInput, styled } from '@mui/material';
import * as React from 'react';
import { OTPInputType, OTPType } from './type';
import { TypeRegExp } from './utils';

type NumericInputProps = {
  value: string;
  focus: boolean;
  type: OTPInputType;
  isSecure?: boolean;
  isDisabled?: boolean;
  onChange: (value: string) => void;
  onInputPaste: React.ClipboardEventHandler<HTMLInputElement>;
  onInputFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input = styled(MuiInput)({
  width: '30px',
  height: '30px',
  margin: '0 5px',
  '& > input': {
    textAlign: 'center',
  },
  '& > input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& > input[type=number]::-webkit-outer-spin-button,': {
    WebkitAppearance: 'none',
  },
  '& > input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
  },
});

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  focus,
  type,
  isSecure = false,
  isDisabled,
  onChange,
  onKeyDown,
  onInputPaste,
  onInputFocus,
}) => {
  const inputRef = React.useRef<HTMLInputElement>();

  const inputType = isSecure ? 'password' : OTPType[type];

  React.useEffect(() => {
    const inputEl = inputRef.current;
    if (focus && inputEl) {
      inputEl.focus();
    }
  }, [focus]);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      if (TypeRegExp[type].test(val[0])) {
        onChange(val[0]);
      }
    },
    [type]
  );

  return (
    <Input
      type={inputType}
      inputRef={inputRef}
      value={value}
      disabled={isDisabled}
      onKeyDown={onKeyDown}
      onChange={handleChange}
      onPaste={onInputPaste}
      onFocus={onInputFocus}
      inputProps={{ maxLength: 1, 'data-testid': 'otp-input' }}
    />
  );
};

export default NumericInput;
