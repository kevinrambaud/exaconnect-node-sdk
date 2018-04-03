const buildCancelOrderRequest = validParams => ({
  token: validParams.token,
  request: {
    orderId: validParams.orderId,
    reason: validParams.reason
  }
});

module.exports = buildCancelOrderRequest;
