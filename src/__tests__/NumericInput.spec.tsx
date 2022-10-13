import { render, screen } from '@testing-library/react';
import * as React from 'react';
import NumericInput from '../NumericInput';

const renderInput = (props = {}) => {
  return render(
    <NumericInput
      type="numeric"
      focus
      value=""
      onChange={() => {}}
      onInputFocus={() => {}}
      onInputPaste={() => {}}
      onKeyDown={() => {}}
      {...props}
    />
  );
};

const getOtpInput = () => screen.getByTestId<HTMLInputElement>('otp-input');

describe('NumericInput tests', () => {
  it('should render focused input if focus is true', () => {
    renderInput();
    expect(document.activeElement).toBe(getOtpInput());
  });

  it('should be input type password if isSecure is true', () => {
    renderInput({ isSecure: true });
    expect(getOtpInput().type).toEqual('password');
  });

  it('should be input disabled if isDisabled is true', () => {
    renderInput({ isDisabled: true });
    expect(getOtpInput().disabled).toEqual(true);
  });

  it('should have value passed to it through props', () => {
    renderInput({ value: '1' });
    expect(getOtpInput().value).toEqual('1');
  });

  it('should have maxLength 1 by default', () => {
    renderInput();
    expect(getOtpInput().maxLength).toEqual(1);
  });
});
