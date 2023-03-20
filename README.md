# react-native-hd-wallet

Hierarchical-deterministic (HD) wallet generator for react native.

## Installation

```sh
npm install react-native-hd-wallet
```

## Usage

```js
import { createHDWallet } from 'react-native-hd-wallet';

// ...

const wallet = await createHDWallet();

// or with account index and mnemonic
const wallet = await createHDWallet(0, 'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat'); 

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
