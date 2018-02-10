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

const formatSuccessResponse = (response) => {
  const { statuses } = response.return;

  if (Array.isArray(statuses.item)) {
    const orders = statuses.item.map(order => ({
      code: order.code.$value,
      orderId: order.orderId.$value,
      shipments: [],
    }));

    return orders;
  }

  if (statuses.item && typeof statuses.item === 'object') {
    return [
      {
        code: statuses.item.code.$value,
        orderId: statuses.item.orderId.$value,
        shipments: [],
      },
    ];
  }

  return [];
};

const getOrderStatus = client => params =>
  validateGetOrderStatusParams(params)
    .then(validParams =>
      client.orderStatusAsync({
        token: validParams.token,
        request: { orders: [validParams.orders] },
      }))
    .then(response => soapResponseHandler(response, formatSuccessResponse));

module.exports = getOrderStatus;
