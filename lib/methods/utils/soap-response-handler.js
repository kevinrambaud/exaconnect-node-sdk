const formatErrorResponse = require('./format-error-response');

const soapResponseHandler = (response, formatSuccessResponse) => {
  const err = response.return.error;

  if (err) {
    throw new Error(formatErrorResponse(err));
  }

  if (formatSuccessResponse === undefined) {
    throw new Error('"formatSuccessResponse" function is required');
  }

  if (typeof formatSuccessResponse !== 'function') {
    throw new Error('"formatSuccessResponse" must be a function');
  }

  return formatSuccessResponse(response);
};

module.exports = soapResponseHandler;
