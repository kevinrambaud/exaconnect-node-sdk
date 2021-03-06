# exaconnect-node-sdk

[![actions](https://img.shields.io/github/workflow/status/kevinrambaud/exaconnect-node-sdk/Node%20CI?logo=github)](https://github.com/kevinrambaud/exaconnect-node-sdk/actions?query=workflow%3A%22Node+CI%22)
[![codecov](https://codecov.io/gh/kevinrambaud/exaconnect-node-sdk/branch/master/graph/badge.svg)](https://codecov.io/gh/kevinrambaud/exaconnect-node-sdk)
[![npm](https://img.shields.io/npm/v/exaconnect-node-sdk.svg)](https://www.npmjs.com/package/exaconnect-node-sdk)
[![npm](https://img.shields.io/npm/dt/exaconnect-node-sdk.svg)](https://www.npmjs.com/package/exaconnect-node-sdk)

Node.js SDK for exaconnect webservice (https://www.exaprint.fr/).

* [Installation](#installation)
* [Usage](#usage)
  * [Methods](#methods)
    * [getToken](#gettoken)
    * [createOrder](#createorder)
    * [createOrderFromPartnerOrder](#createorderfrompartnerorder)
    * [setOrderStateAsFileTransferred](#setorderstateasfiletransferred)
    * [getOrders](#getorders)
    * [getOrderStatus](#getorderstatus)
    * [cancelOrder](#cancelorder)
* [More examples](#more-examples)
* [Contributing](#contributing)
* [License](#license)

## Installation

```bash
npm i exaconnect-node-sdk
```

## Usage

By default, a production configuration is setup and and exempts you to use the `configure` method, but if you feel the need to use a custom configuration, you can still use the method as the example below.

```javascript
const exaconnect = require('exaconnect-node-sdk');

exaconnect.configure({
  schema: 'http',
  hostname: 'stg-connect.exaprint.fr'
});

exaconnect
  .createClient()
  .then(console.log)
  .catch(console.error);
```

### Methods

#### getToken

Promise example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

exaconnect
  .createClient()
  .then(client =>
    client.getToken({
      username: 'me@company.com',
      password: 'secret'
    })
  )
  .then(console.log)
  .catch(console.error);
```

async/await example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

(async () => {
  const client = await exaconnect.createClient();

  const token = await client.getToken({
    username: 'me@company.com',
    password: 'secret'
  });

  console.log(token);
})().catch(console.error);
```

#### createOrder

Promise example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

exaconnect
  .createClient()
  .then(client =>
    Promise.all([
      client,
      client.getToken({
        username: 'me@company.com',
        password: 'secret'
      })
    ])
  )
  .then(([client, token]) =>
    client.createOrder({
      token: token,
      order: {
        reference: 'My first automated order',
        product: '25086',
        quantity: 100,
        openedFormatLength: '8.6',
        openedFormatWidth: '5.4',
        closedFormatLength: '0',
        closedFormatWidth: '0',
        comment: '',
        address: {
          contactName: 'M. Dupond',
          line1: '1 Place Georges Frêche',
          line2: '',
          line3: '',
          doorCode: '#3412',
          mail: 'me@company.com',
          phone: '0432000000',
          mobile: '0660000000',
          city: 'Montpellier',
          zipCode: '34000',
          country: 'FR',
          comment: ''
        }
      }
    })
  )
  .then(console.log)
  .catch(console.error);
```

async/await example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

(async () => {
  const client = await exaconnect.createClient();

  const token = await client.getToken({
    username: 'me@company.com',
    password: 'secret'
  });

  const order = await client.createOrder({
    token: token,
    order: {
      reference: 'My first automated order',
      product: '25086',
      quantity: 100,
      openedFormatLength: '8.6',
      openedFormatWidth: '5.4',
      closedFormatLength: '0',
      closedFormatWidth: '0',
      comment: '',
      address: {
        contactName: 'M. Dupond',
        line1: '1 Place Georges Frêche',
        line2: '',
        line3: '',
        doorCode: '#3412',
        mail: 'me@company.com',
        phone: '0432000000',
        mobile: '0660000000',
        city: 'Montpellier',
        zipCode: '34000',
        country: 'FR',
        comment: ''
      }
    }
  });

  console.log(order);
})().catch(console.error);
```

#### createOrderFromPartnerOrder

Promise example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

exaconnect
  .createClient()
  .then(client =>
    Promise.all([
      client,
      client.getToken({
        username: 'me@company.com',
        password: 'secret'
      })
    ])
  )
  .then(([client, token]) =>
    client.createOrderFromPartnerOrder({
      token: token,
      order: {
        reference: 'My first automated order from partner order',
        partnerOrderId: 327999,
        comment: '',
        address: {
          contactName: 'M. Dupond',
          line1: '1 Place Georges Frêche',
          line2: '',
          line3: '',
          doorCode: '#3412',
          mail: 'me@company.com',
          phone: '0432000000',
          mobile: '0660000000',
          city: 'Montpellier',
          zipCode: '34000',
          country: 'FR',
          comment: ''
        }
      }
    })
  )
  .then(console.log)
  .catch(console.error);
```

async/await exemple :

```javascript
const exaconnect = require('exaconnect-node-sdk');

(async () => {
  const client = await exaconnect.createClient();

  const token = await client.getToken({
    username: 'me@company.com',
    password: 'secret'
  });

  const orderFromPartnerOrder = await client.createOrderFromPartnerOrder({
    token: token,
    order: {
      reference: 'My first automated order from partner order',
      partnerOrderId: 327999,
      comment: '',
      address: {
        contactName: 'M. Dupond',
        line1: '1 Place Georges Frêche',
        line2: '',
        line3: '',
        doorCode: '#3412',
        mail: 'me@company.com',
        phone: '0432000000',
        mobile: '0660000000',
        city: 'Montpellier',
        zipCode: '34000',
        country: 'FR',
        comment: ''
      }
    }
  });

  console.log(orderFromPartnerOrder);
})().catch(console.error);
```

#### setOrderStateAsFileTransferred

Promise example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

exaconnect
  .createClient()
  .then(client =>
    Promise.all([
      client,
      client.getToken({
        username: 'me@company.com',
        password: 'secret'
      })
    ])
  )
  .then(([client, token]) =>
    client.setOrderStateAsFileTransferred({
      token: token,
      orders: [5591277, 5591389]
    })
  )
  .then(console.log)
  .catch(console.error);
```

async/await example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

(async () => {
  const client = await exaconnect.createClient();

  const token = await client.getToken({
    username: 'me@company.com',
    password: 'secret'
  });

  const updatedOrders = await client.setOrderStateAsFileTransferred({
    token: token,
    orders: [5591277, 5591389]
  });

  console.log(updatedOrders);
})().catch(console.error);
```

#### getOrders

Promise example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

exaconnect
  .createClient()
  .then(client =>
    Promise.all([
      client,
      client.getToken({
        username: 'me@company.com',
        password: 'secret'
      })
    ])
  )
  .then(([client, token]) =>
    client.getOrders({
      token: token,
      dateFilterMin: '20200101',
      dateFilterMax: '20200701',
      statusFilter: 24,
      page: 1
    })
  )
  .then(console.log)
  .catch(console.error);
```

async/await example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

(async () => {
  const client = await exaconnect.createClient();

  const token = await client.getToken({
    username: 'me@company.com',
    password: 'secret'
  });

  const orders = await client.getOrders({
    token: token,
    dateFilterMin: '20200101',
    dateFilterMax: '20200701',
    statusFilter: 24,
    page: 1
  });

  console.log(orders);
})().catch(console.error);
```

#### getOrderStatus

Promise example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

exaconnect
  .createClient()
  .then(client =>
    Promise.all([
      client,
      client.getToken({
        username: 'me@company.com',
        password: 'secret'
      })
    ])
  )
  .then(([client, token]) =>
    client.getOrderStatus({
      token: token,
      orders: [5591277, 5591389]
    })
  )
  .then(console.log)
  .catch(console.error);
```

async/await example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

(async () => {
  const client = await exaconnect.createClient();

  const token = await client.getToken({
    username: 'me@company.com',
    password: 'secret'
  });

  const ordersStatus = await client.getOrderStatus({
    token: token,
    orders: [5591277, 5591389]
  });

  console.log(ordersStatus);
})().catch(console.error);
```

#### cancelOrder

Promise example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

exaconnect
  .createClient()
  .then(client =>
    Promise.all([
      client,
      client.getToken({
        username: 'me@company.com',
        password: 'secret'
      })
    ])
  )
  .then(([client, token]) =>
    client.cancelOrder({
      token,
      order: { orderId: 5591277, reason: 'File error' }
    })
  )
  .then(console.log)
  .catch(console.error);
```

async/await example :

```javascript
const exaconnect = require('exaconnect-node-sdk');

(async () => {
  const client = await exaconnect.createClient();

  const token = await client.getToken({
    username: 'me@company.com',
    password: 'secret'
  });

  const cancelledOrder = await client.cancelOrder({
    token,
    order: { orderId: 5591277, reason: 'File error' }
  });

  console.log(cancelledOrder);
})().catch(console.error);
```

## More examples

You can find more examples in the `example` directory of this repository.

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request

## License

MIT
