const validateGetOrderStatusParams = require('./schema-validator');
const buildGetOrderStatusRequest = require('./request-builder');
const buildGetOrdersStatusResponse = require('./response-builder');
const soapResponseHandler = require('../utils/soap-response-handler');

const getOrderStatus = client => params =>
  validateGetOrderStatusParams(params)
    .then(buildGetOrderStatusRequest)
    .then(client.orderStatusAsync)
    .then(response => soapResponseHandler(response, buildGetOrdersStatusResponse));

module.exports = getOrderStatus;
