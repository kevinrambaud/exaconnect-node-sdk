const cancelOrder = require('./cancel-order');
const createOrder = require('./create-order');
const createOrderFromPartnerOrder = require('./create-order-from-partner-order');
const getOrderStatus = require('./get-order-status');
const getToken = require('./get-token');
const setOrderStateAsFileTransferred = require('./set-order-state-as-file-transferred');

const methods = client => ({
  cancelOrder: cancelOrder(client),
  createOrder: createOrder(client),
  createOrderFromPartnerOrder: createOrderFromPartnerOrder(client),
  getOrderStatus: getOrderStatus(client),
  getToken: getToken(client),
  setOrderStateAsFileTransferred: setOrderStateAsFileTransferred(client)
});

module.exports = methods;
