const getOrderStatuses = require('./get-order-statuses');
const getToken = require('./get-token');

const methods = client => ({
  getOrderStatuses: getOrderStatuses(client),
  getToken: getToken(client),
});

module.exports = methods;
