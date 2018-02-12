const validateCancelOrderParams = require('./cancel-order-schema-validator');
const buildCancelOrderRequest = require('./cancel-order-request-builder');
const formatSuccessResponse = require('./cancel-order-response');
const soapResponseHandler = require('../utils/soap-response-handler');

const cancelOrder = client => params =>
  validateCancelOrderParams(params)
    .then(buildCancelOrderRequest)
    .then(client.cancelOrderAsync)
    .then(response => soapResponseHandler(response, formatSuccessResponse));

module.exports = cancelOrder;
