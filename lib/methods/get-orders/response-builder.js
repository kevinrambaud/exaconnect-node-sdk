const buildOrderItemResponse = item => ({
  id: Number(item.id.$value),
  status: Number(item.status.$value),
  customerReference: String(item.customerReference.$value)
});

const buildGetOrdersResponse = response => {
  const responseItem =
    response.return.orders && Array.isArray(response.return.orders.item)
      ? response.return.orders.item.map(buildOrderItemResponse)
      : [];

  return {
    orders: responseItem,
    page: response.return.page.$value,
    remainingRecords: response.return.remainingRecords.$value
  };
};

module.exports = buildGetOrdersResponse;
