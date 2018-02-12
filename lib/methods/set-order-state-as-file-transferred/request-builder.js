const buildSetOrderStateAsFileTransferredRequest = validParams => ({
  token: validParams.token,
  request: {
    orders: [validParams.orders],
  },
});

module.exports = buildSetOrderStateAsFileTransferredRequest;
