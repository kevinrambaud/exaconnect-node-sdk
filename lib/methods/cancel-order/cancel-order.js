const validateCancelOrderParams = require('./schema-validator');
const buildCancelOrderRequest = require('./request-builder');
const buildCancelOrderResponse = require('./response-builder');
const soapResponseHandler = require('../utils/soap-response-handler');

const cancelOrder = client => params =>
  validateCancelOrderParams(params)
    .then(buildCancelOrderRequest)
    .then(client.cancelOrderAsync)
    .then(response => soapResponseHandler(response, buildCancelOrderResponse));

module.exports = cancelOrder;
