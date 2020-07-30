const validateGetOrdersParams = require('./schema-validator');
const buildGetOrdersRequest = require('./request-builder');
const buildGetOrdersResponse = require('./response-builder');
const soapResponseHandler = require('../utils/soap-response-handler');

const getOrders = client => params =>
  validateGetOrdersParams(params)
    .then(buildGetOrdersRequest)
    .then(client.ordersAsync)
    .then(response => soapResponseHandler(response, buildGetOrdersResponse));

module.exports = getOrders;
