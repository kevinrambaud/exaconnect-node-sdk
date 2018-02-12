const buildGetOrdersStatusResponse = (response) => {
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

module.exports = buildGetOrdersStatusResponse;
