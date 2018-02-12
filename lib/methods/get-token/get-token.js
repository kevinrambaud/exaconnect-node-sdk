const Cookie = require('soap-cookie');
const validateGetTokenParams = require('./get-token-schema-validator');
const buildGetTokenRequest = require('./get-token-request-builder');
const formatSuccessResponse = require('./get-token-response');
const soapResponseHandler = require('../utils/soap-response-handler');

const getToken = client => (params = {}) =>
  validateGetTokenParams(params)
    .then(buildGetTokenRequest)
    .then(client.getTokenAsync)
    .then((response) => {
      client.setSecurity(new Cookie(client.lastResponseHeaders));

      return soapResponseHandler(response, formatSuccessResponse);
    });

module.exports = getToken;
