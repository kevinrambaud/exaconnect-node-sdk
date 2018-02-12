const validateCreateOrderParams = require('./schema-validator');
const buildCreateOrderRequest = require('./request-builder');
const buildCreateOrderResponse = require('./response-builder');
const soapResponseHandler = require('../utils/soap-response-handler');

const createOrder = client => params =>
  validateCreateOrderParams(params)
    .then(buildCreateOrderRequest)
    .then(client.createOrderAsync)
    .then(response => soapResponseHandler(response, buildCreateOrderResponse));

module.exports = createOrder;
