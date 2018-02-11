const joi = require('joi');
const soapResponseHandler = require('./utils/soap-response-handler');

const validateCancelOrderParams = (params) => {
  const paramsSchema = joi
    .object({
      token: joi.string().required(),
      order: joi
        .object({
          orderId: joi.number().required(),
          reason: joi.string().allow(''),
        })
        .required(),
    })
    .required();

  return joi.validate(params, paramsSchema);
};

const buildCancelOrderRequest = validParams => ({
  token: validParams.token,
  request: {
    orderId: validParams.orderId,
    reason: validParams.reason,
  },
});

const formatSuccessResponse = response => Boolean(response.return.hasBeenCancelled.$value);

const cancelOrder = client => params =>
  validateCancelOrderParams(params)
    .then(validParams => client.cancelOrderAsync(buildCancelOrderRequest(validParams)))
    .then(response => soapResponseHandler(response, formatSuccessResponse));

module.exports = cancelOrder;
