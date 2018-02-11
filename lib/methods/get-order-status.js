const joi = require('joi');
const soapResponseHandler = require('./utils/soap-response-handler');

const validateGetOrderStatusParams = (params) => {
  const paramsSchema = joi
    .object({
      token: joi.string().required(),
      orders: joi.array().items(joi.number()),
    })
    .required();

  return joi.validate(params, paramsSchema);
};

const buildGetOrderStatusRequest = validParams => ({
  token: validParams.token,
  request: { orders: [validParams.orders] },
});
const formatSuccessResponse = (response) => {
  const getItem = item => ({
    orderId: Number(item.orderId.$value),
    code: Number(item.code.$value),
  });

  const { item } = response.return.statuses;

  if (Array.isArray(item)) {
    return item.map(getItem);
  }

  return [getItem(item)];
};

const getOrderStatus = client => params =>
  validateGetOrderStatusParams(params)
    .then(buildGetOrderStatusRequest)
    .then(client.orderStatusAsync)
    .then(response => soapResponseHandler(response, formatSuccessResponse));

module.exports = getOrderStatus;
