# Mui Otp Input

> Component is in development phase

A Simple One Time Password input component based on [Mui](https://github.com/mui/material-ui). 

<img width="325" alt="Screenshot 2022-07-24 at 9 31 09 PM" src="https://user-images.githubusercontent.com/9278015/180660211-a100fa24-0514-425e-a943-838b94eeb0f0.png">


## Usage

[Codesandbox Playground](https://codesandbox.io/s/mui-otp-input-demo-9x25le)

```tsx
import { OtpInput } from 'mui-otp-input';

function App() {
  const [value, setValue] = React.useState('');

                                       //123456  // 123-456
  const handleChange = React.useCallback((value, formattedValue) => {
    setValue(value);
  }, []);

  return (
    <OtpInput value={value} onChange={handleChange} format="___-___" />
  );
}
```
### Props

```tsx
type OtpInputProps = {
  format: OtpInputFormat;
  value: OtpInputValue;
  type?: OTPInputType; // default: numeric
  isSecure?: boolean; // default: false
  isDisabled?: boolean; // default: false
  onChange: (
    value: OtpInputValue,
    formattedValue: FormattedOtpInputValue
  ) => void;
};
```
| Name       | Type                                                                      | Description                                                                                                                                                                       |
|------------|---------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| format     | string (alias: OtpInputFormat)                                            | Format represents how the input will be rendered with seperators. In format `_` represents an input field ex: `_-_-_-_`. **Note**: `format` must not change in between renders                                                         |
| value      | string (alias: OtpInputValue)                                             | Value to be filled in each rendered input                                                                                                                                         |
| type       | 'numeric'/'alphanumeric'                                                  | `numeric` (default): input type will be number and RegExp `/^[0-9]$/` used to validate input. `alphanumeric`: input type will be text and RegExp `/^[a-zA-Z0-9]$/` used to validate input.  |
| isSecure   | boolean                                                                   | Inputs rendered with type password. Respective RegExp is used based on `type` prop to validate value.                                                                             |
| isDisabled | boolean                                                                   | To Disable all Inputs                                                                                                                                                             |
| onChange   | ( value: OtpInputValue, formattedValue: FormattedOtpInputValue ) => void; | A callback for when the input value changes.                                                                                                                                      |



## Commands

This Project has been bootstrapped using [TSDX](https://github.com/jaredpalmer/tsdx)

TSDX scaffolds your new library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

### Tests

```
yarn test
```

This library uses [Jest](https://jestjs.io/) and [testing-library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests

### Code Quality

[Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) is used to maintain the code quality

```
yarn lint
```

Code quality is set up with `prettier`, `husky`, and `lint-staged`.

## Deploying the Example Playground

The Playground is just a simple [Parcel](https://parceljs.org) app, you can deploy it anywhere you would normally deploy that. Here are some guidelines for **manually** deploying with the Netlify CLI (`npm i -g netlify-cli`):

```bash
cd example # if not already in the example folder
npm run build # builds to dist
netlify deploy # deploy the dist folder
```

Alternatively, if you already have a git repo connected, you can set up continuous deployment with Netlify:

```bash
netlify init
# build command: yarn build && cd example && yarn && yarn build
# directory to deploy: example/dist
# pick yes for netlify.toml
```

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).
