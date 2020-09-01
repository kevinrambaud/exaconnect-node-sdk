const buildGetOrderssResponse = response => {
  const getItem = item => ({
    id: Number(item.id.$value),
    status: Number(item.status.$value),
    customerReference: String(item.customerReference.$value)
  });

  let orders =
    response && response.return && response.return.orders
      ? response.return.orders.item
      : null;

  if (Array.isArray(orders)) {
    orders = orders.map(getItem);
  }

  return {
    orders,
    page: response.return.page.$value,
    remainingRecords: response.return.remainingRecords.$value
  };
};

module.exports = buildGetOrderssResponse;
