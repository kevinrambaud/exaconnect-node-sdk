const validateCreateOrderParams = require('./create-order-schema-validator');
const buildCreateOrderRequest = require('./create-order-request-builder');
const buildCreateOrderResponse = require('./create-order-response-builder');
const soapResponseHandler = require('../utils/soap-response-handler');

const createOrder = client => params =>
  validateCreateOrderParams(params)
    .then(buildCreateOrderRequest)
    .then(client.createOrderAsync)
    .then(response => soapResponseHandler(response, buildCreateOrderResponse));

module.exports = createOrder;
