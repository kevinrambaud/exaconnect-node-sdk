const buildGetOrdersRequest = validParams => ({
  token: validParams.token,
  request: {
    dateFilterMin: validParams.dateFilterMin,
    dateFilterMax: validParams.dateFilterMax,
    statusFilter: validParams.statusFilter,
    page: validParams.page
  }
});

module.exports = buildGetOrdersRequest;
