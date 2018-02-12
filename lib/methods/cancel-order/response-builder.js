const buildCancelOrderResponse = response => Boolean(response.return.hasBeenCancelled.$value);

module.exports = buildCancelOrderResponse;
