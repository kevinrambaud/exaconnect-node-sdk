const formatErrorResponse = (err) => {
  const { code, label } = err;
  const errorCode = code ? code.$value : 'unknown';
  const errorLabel = label ? label.$value : 'unknown';

  return new Error(`SoapError returned with code "${errorCode}" for reason "${errorLabel}"`);
};

module.exports = formatErrorResponse;
