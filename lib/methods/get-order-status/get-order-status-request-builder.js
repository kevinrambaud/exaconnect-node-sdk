const buildGetOrderStatusRequest = validParams => ({
  token: validParams.token,
  request: { orders: [validParams.orders] },
});

module.exports = buildGetOrderStatusRequest;
