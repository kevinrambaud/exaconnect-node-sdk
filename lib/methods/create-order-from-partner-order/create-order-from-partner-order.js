const validateCreateOrderFromPartnerOrderParams = require('./schema-validator');
const buildCreateOrderFromPartnerOrderRequest = require('./request-builder');
const buildCreateOrderFromPartnerOrderResponse = require('./response-builder');
const soapResponseHandler = require('../utils/soap-response-handler');

const createOrderFromPartnerOrder = client => params =>
  validateCreateOrderFromPartnerOrderParams(params)
    .then(buildCreateOrderFromPartnerOrderRequest)
    .then(client.createOrderFromPartnerOrderAsync)
    .then(response =>
      soapResponseHandler(response, buildCreateOrderFromPartnerOrderResponse)
    );

module.exports = createOrderFromPartnerOrder;
