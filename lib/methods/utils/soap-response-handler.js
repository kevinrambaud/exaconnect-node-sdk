const formatErrorResponse = require('./format-error-response');

const soapResponseHandler = (response, formatSuccessResponse) => {
  let result = response;

  if (
    Array.isArray(response) &&
    response.length > 0 &&
    typeof response[0] === 'object'
  ) {
    [result] = response;
  }

  const err = result.return.error;

  if (err) {
    throw new Error(formatErrorResponse(err));
  }

  if (formatSuccessResponse === undefined) {
    throw new Error('"formatSuccessResponse" function is required');
  }

  if (typeof formatSuccessResponse !== 'function') {
    throw new Error('"formatSuccessResponse" must be a function');
  }

  return formatSuccessResponse(result);
};

module.exports = soapResponseHandler;
