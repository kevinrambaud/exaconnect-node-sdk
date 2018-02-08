const assert = require('assert-plus');
const soapResponseHandler = require('./utils/soap-response-handler');

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

const getOrderStatus = client => (token, params) =>
  new Promise((resolve, reject) => {
    assert.string(token, 'token');
    assert.arrayOfNumber(params, 'params');

    const request = {
      token,
      request: {
        orders: [params],
      },
    };

    return client
      .orderStatusAsync(request)
      .then(response => soapResponseHandler(response, formatSuccessResponse))
      .then(formattedResponse => resolve(formattedResponse))
      .catch(err => reject(err));
  });

module.exports = getOrderStatus;
