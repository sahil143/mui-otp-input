import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { OtpInput } from '../src';

const Div = styled('div')({
  marginBottom: '40px',
});

const App = () => {
  const [value, setValue] = React.useState('');
  const [value1, setValue1] = React.useState('');
  const [value2, setValue2] = React.useState('');
  const [value3, setValue3] = React.useState('');
  const [value4, setValue4] = React.useState('');
  const handleChange = (value: string, formattedValue: string) => {
    setValue(value);
  };
  const handleChange1 = (value: string, formattedValue: string) => {
    setValue1(value);
  };
  const handleChange2 = (value: string, formattedValue: string) => {
    setValue2(value);
  };
  const handleChange3 = (value: string, formattedValue: string) => {
    setValue3(value);
  };
  const handleChange4 = (value: string, formattedValue: string) => {
    setValue4(value);
  };
  return (
    <>
      <Div>
        <p>Numeric Input</p>
        <OtpInput value={value} onChange={handleChange} format="_/_/_-_/_/_" />
      </Div>
      <Div>
        <p>Alphanumeric Input</p>
        <OtpInput
          value={value1}
          onChange={handleChange1}
          format="___-___"
          type="alphanumeric"
        />
      </Div>
      <Div>
        <p>Password Numeric Input</p>
        <OtpInput
          value={value2}
          onChange={handleChange2}
          format="_/_-_/_-_/_"
          type="numeric"
          isSecure
        />
      </Div>
      <Div>
        <p>Password Alphanumeric Input</p>
        <OtpInput
          value={value3}
          onChange={handleChange3}
          format="______"
          type="alphanumeric"
          isSecure
        />
      </Div>
      <Div>
        <p>Disabled Input</p>
        <OtpInput
          value={value4}
          onChange={handleChange4}
          format="_-_-_-_-_-_"
          type="alphanumeric"
          isSecure
          isDisabled
        />
      </Div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
