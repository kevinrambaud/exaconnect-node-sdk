const Cookie = require('soap-cookie');
const joi = require('joi');
const soapResponseHandler = require('./utils/soap-response-handler');

const validateGetTokenParams = (params) => {
  const paramsSchema = joi
    .object({
      username: joi.string().required(),
      password: joi.string().required(),
    })
    .required();

  return joi.validate(params, paramsSchema);
};

const buildGetTokenRequest = validParams => ({
  authentication: { username: validParams.username, password: validParams.password },
});

const formatSuccessResponse = response => response.return.token.$value;

const getToken = client => (params = {}) =>
  validateGetTokenParams(params)
    .then(buildGetTokenRequest)
    .then(client.getTokenAsync)
    .then((response) => {
      client.setSecurity(new Cookie(client.lastResponseHeaders));

      return soapResponseHandler(response, formatSuccessResponse);
    });

module.exports = getToken;
