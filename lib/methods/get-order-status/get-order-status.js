const validateGetOrderStatusParams = require('./get-order-status-schema-validator');
const buildGetOrderStatusRequest = require('./get-order-status-request-builder');
const buildGetOrdersStatusResponse = require('./get-order-status-response-builder');
const soapResponseHandler = require('../utils/soap-response-handler');

const getOrderStatus = client => params =>
  validateGetOrderStatusParams(params)
    .then(buildGetOrderStatusRequest)
    .then(client.orderStatusAsync)
    .then(response => soapResponseHandler(response, buildGetOrdersStatusResponse));

module.exports = getOrderStatus;
