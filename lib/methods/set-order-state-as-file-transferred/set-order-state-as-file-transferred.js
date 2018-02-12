const validateSetOrderStateAsFileTransferredParams = require('./schema-validator');
const buildSetOrderStateAsFileTransferredRequest = require('./request-builder');
const buildSetOrderStateAsFileTransferredResponse = require('./response-builder');
const soapResponseHandler = require('../utils/soap-response-handler');

const setOrderStateAsFileTransferred = client => params =>
  validateSetOrderStateAsFileTransferredParams(params)
    .then(buildSetOrderStateAsFileTransferredRequest)
    .then(client.orderFichierTransfereAsync)
    .then(response => soapResponseHandler(response, buildSetOrderStateAsFileTransferredResponse));

module.exports = setOrderStateAsFileTransferred;
