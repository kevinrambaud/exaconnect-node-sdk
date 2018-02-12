const validateSetOrderStateAsFileTransferredParams = require('./set-order-state-as-file-transferred-schema-validator');
const buildSetOrderStateAsFileTransferredRequest = require('./set-order-state-as-file-transferred-request-builder');
const buildSetOrderStateAsFileTransferredResponse = require('./set-order-state-as-file-transferred-response-builder');
const soapResponseHandler = require('../utils/soap-response-handler');

const setOrderStateAsFileTransferred = client => params =>
  validateSetOrderStateAsFileTransferredParams(params)
    .then(buildSetOrderStateAsFileTransferredRequest)
    .then(client.orderFichierTransfereAsync)
    .then(response => soapResponseHandler(response, buildSetOrderStateAsFileTransferredResponse));

module.exports = setOrderStateAsFileTransferred;
