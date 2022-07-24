import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { OtpInput } from '../src'

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OtpInput value="123456" onChange={() => {}} format="_/_/_-_/_/_" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
