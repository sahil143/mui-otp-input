import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OtpInput from '../OtpInput';

describe('OtpInput tests', () => {
  it('should render OtpInput', () => {
    render(<OtpInput format="__" value="" onChange={() => {}} />);
    screen.getAllByTestId('otp-input');
  });

  it('should render number of inputs based on _ in format', () => {
    render(<OtpInput format="__-__" value="" onChange={() => {}} />);
    expect(screen.getAllByTestId('otp-input')).toHaveLength(4);
  });

  it('should have single digit values in each input', () => {
    render(<OtpInput format="__-__" value="12" onChange={() => {}} />);
    expect(screen.getAllByTestId('otp-input')).toHaveLength(4);
    const inputs = screen.getAllByTestId<HTMLInputElement>('otp-input');
    expect(inputs[0].value).toEqual('1');
    expect(inputs[1].value).toEqual('2');
    expect(inputs[2].value).toEqual('');
    expect(inputs[3].value).toEqual('');
  });

  it('should call onChange when user fills value', () => {
    let onChange = jest.fn();
    render(<OtpInput format="__-__" value="" onChange={onChange} />);
    const inputs = screen.getAllByTestId<HTMLInputElement>('otp-input');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should call onChange and focus next element', () => {
    let value = '';
    let formattedValue = '';
    const onChange = jest.fn((v, f) => {
      value = v;
      formattedValue = f;
    });
    const { rerender } = render(
      <OtpInput format="__-__" value={value} onChange={onChange} />
    );
    const inputs = screen.getAllByTestId<HTMLInputElement>('otp-input');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    rerender(<OtpInput format="__-__" value={value} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[0].value
    ).toEqual('1');
    expect(value).toEqual('1');
    expect(formattedValue).toEqual('1_-__');
    expect(document.activeElement).toBe(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[1]
    );

    fireEvent.change(inputs[1], { target: { value: '2' } });
    rerender(<OtpInput format="__-__" value={value} onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[1].value
    ).toEqual('2');
    expect(value).toEqual('12');
    expect(formattedValue).toEqual('12-__');
    expect(document.activeElement).toBe(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[2]
    );
  });

  it('should not allow alphabets/special characters when input type is numeric', () => {
    let value = '';
    let formattedValue = '';
    const onChange = jest.fn((v, f) => {
      value = v;
      formattedValue = f;
    });
    const { rerender } = render(
      <OtpInput format="__-__" value={value} onChange={onChange} />
    );
    const inputs = screen.getAllByTestId<HTMLInputElement>('otp-input');
    fireEvent.change(inputs[0], { target: { value: 'a' } });
    rerender(<OtpInput format="__-__" value={value} onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();
    expect(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[0].value
    ).toEqual('');
    expect(value).toEqual('');
    expect(formattedValue).toEqual('');
    expect(document.activeElement).not.toBe(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[1]
    );
    expect(document.activeElement).toBe(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[0]
    );

    fireEvent.change(inputs[0], { target: { value: '$' } });
    rerender(<OtpInput format="__-__" value={value} onChange={onChange} />);

    expect(onChange).not.toHaveBeenCalled();
    expect(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[0].value
    ).toEqual('');
    expect(value).toEqual('');
    expect(formattedValue).toEqual('');
    expect(document.activeElement).not.toBe(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[1]
    );
    expect(document.activeElement).toBe(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[0]
    );
  });

  it('should not allow special character but allow alphabets/numbers when type is alphanumberic', () => {
    let value = '';
    let formattedValue = '';
    const onChange = jest.fn((v, f) => {
      value = v;
      formattedValue = f;
    });
    const { rerender } = render(
      <OtpInput
        format="__-__"
        value={value}
        onChange={onChange}
        type="alphanumeric"
      />
    );
    const inputs = screen.getAllByTestId<HTMLInputElement>('otp-input');
    fireEvent.change(inputs[0], { target: { value: '$' } });
    rerender(
      <OtpInput
        format="__-__"
        value={value}
        onChange={onChange}
        type="alphanumeric"
      />
    );

    expect(onChange).not.toHaveBeenCalled();
    expect(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[0].value
    ).toEqual('');
    expect(value).toEqual('');
    expect(formattedValue).toEqual('');
    expect(document.activeElement).not.toBe(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[1]
    );
    expect(document.activeElement).toBe(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[0]
    );

    fireEvent.change(screen.getAllByTestId<HTMLInputElement>('otp-input')[0], {
      target: { value: 'a' },
    });
    rerender(
      <OtpInput
        format="__-__"
        value={value}
        onChange={onChange}
        type="alphanumeric"
      />
    );

    expect(onChange).toHaveBeenCalled();
    expect(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[0].value
    ).toEqual('a');
    expect(value).toEqual('a');
    expect(formattedValue).toEqual('a_-__');
    expect(document.activeElement).toBe(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[1]
    );
  });

  it('should be input type password when isSecure props is true', () => {
    render(<OtpInput format="__-__" value="" onChange={() => {}} isSecure />);
    screen.getAllByTestId<HTMLInputElement>('otp-input').forEach(inp => {
      expect(inp.type).toEqual('password');
    });
  });

  it('should be input disabled and not focused when isdisabled prop is true', () => {
    render(<OtpInput format="__-__" value="" onChange={() => {}} isDisabled />);
    screen.getAllByTestId<HTMLInputElement>('otp-input').forEach(inp => {
      expect(inp.disabled).toEqual(true);
    });
    expect(document.activeElement).not.toBe(
      screen.getAllByTestId<HTMLInputElement>('otp-input')[0]
    );
  });
});
