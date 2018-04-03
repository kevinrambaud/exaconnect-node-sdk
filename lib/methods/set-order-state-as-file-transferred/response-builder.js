const buildSetOrderStateAsFileTransferredResponse = response => {
  const getItem = item => ({
    orderId: Number(item.key.$value),
    success: Boolean(item.value.success.$value)
  });

  const { item } = response.return.codes;

  if (Array.isArray(item)) {
    return item.map(getItem);
  }

  return [getItem(item)];
};

module.exports = buildSetOrderStateAsFileTransferredResponse;
