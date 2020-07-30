const buildGetOrderssResponse = response => {
  const getItem = item => ({
    id: Number(item.id.$value),
    status: Number(item.status.$value)
  });

  const { item } = response.return.orders;

  if (Array.isArray(item)) {
    return item.map(getItem);
  }

  return {
    orders: [getItem(item)],
    page: response.return.page,
    remainingRecords: response.return.remainingRecords
  };
};

module.exports = buildGetOrderssResponse;
