const createOrder = require('./create-order');
const getOrderStatus = require('./get-order-status');
const getToken = require('./get-token');

const methods = client => ({
  createOrder: createOrder(client),
  getOrderStatus: getOrderStatus(client),
  getToken: getToken(client),
});

module.exports = methods;
