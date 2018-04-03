const exaconnect = require('..');

const ordersIdToCancel = ['50001', '50002', '50003', '50004'];

exaconnect
  .createClient()
  .then(client =>
    Promise.all([client, client.getToken({ username: 'me@company.com', password: 'secret' })]))
  .then(([client, token]) => {
    const cancellationPromises = ordersIdToCancel.map(orderId =>
      client.cancelOrder({
        token,
        order: { orderId, reason: 'File error' },
      }));

    return Promise.all(cancellationPromises);
  })
  .then(cancelledOrders => cancelledOrders.forEach(console.log))
  .catch(console.error);
