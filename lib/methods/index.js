const getOrderStatus = require('./get-order-status');
const getToken = require('./get-token');

const methods = client => ({
  getOrderStatus: getOrderStatus(client),
  getToken: getToken(client),
});

module.exports = methods;
