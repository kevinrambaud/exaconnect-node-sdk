# exaconnect-node-sdk

[![Travis](https://img.shields.io/travis/kevinrambaud/exaconnect-node-sdk.svg)](https://travis-ci.org/kevinrambaud/exaconnect-node-sdk)
[![Test Coverage](https://api.codeclimate.com/v1/badges/631952378883f9a61a1a/test_coverage)](https://codeclimate.com/github/kevinrambaud/exaconnect-node-sdk/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/631952378883f9a61a1a/maintainability)](https://codeclimate.com/github/kevinrambaud/exaconnect-node-sdk/maintainability)

Node.js SDK for exaconnect webservice (https://www.exaprint.fr/).

## Installation

```bash
npm i exaconnect-node-sdk
```

## Usage

### Basic examples

Promise style

```javascript
const exaconnect = require('exaconnect-node-sdk');

exaconnect
  .createClient()
  .then(client =>
    Promise.all([
      client,
      client.getToken({ username: 'you@company.com', password: 'secret' })
    ])
  )
  .then(([client, token]) =>
    client.getOrderStatus({ token: token, orders: [502809] })
  )
  .then(status => console.log('status:', status))
  .catch(err => console.error(err));
```

async/await style

```javascript
const exaconnect = require('exaconnect-node-sdk');

(async () => {
  const client = await exaconnect.createClient();
  const token = await client.getToken({
    username: 'you@company.com',
    password: 'secret'
  });
  const status = await client.getOrderStatus({
    token: token,
    orders: [502809]
  });

  console.log('status:', status);
})().catch(err => console.error(err));
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

MIT
