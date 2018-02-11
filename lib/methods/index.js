const cancelOrder = require('./cancel-order');
const createOrder = require('./create-order');
const getOrderStatus = require('./get-order-status');
const getToken = require('./get-token');

const methods = client => ({
  cancelOrder: cancelOrder(client),
  createOrder: createOrder(client),
  getOrderStatus: getOrderStatus(client),
  getToken: getToken(client),
});

module.exports = methods;
