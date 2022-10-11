export enum OTPType {
  numeric = 'number',
  alphanumeric = 'text',
}

export type OTPInputType = 'numeric' | 'alphanumeric';

export enum InputIndexSymbols {
  next = +1,
  prev = -1,
}

// type aliases for better readability
export type FormattedOtpInputValue = string; // example: 12/06/2022
export type OtpInputValue = string;          // example: 12062022
export type OtpInputFormat = string;         // example: __/__/____
