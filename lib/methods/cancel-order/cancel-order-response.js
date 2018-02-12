const formatSuccessResponse = response => Boolean(response.return.hasBeenCancelled.$value);

module.exports = formatSuccessResponse;
