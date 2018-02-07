# exaconnect-node-sdk

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
  .then(([client, token]) => client.getOrderStatuses(token, [502809]))
  .then(statuses => console.log('statuses: ', statuses))
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
  const statuses = await client.getOrderStatuses(token, [502809]);

  console.log(statuses);
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
