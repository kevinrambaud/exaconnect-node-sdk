const joi = require('joi');
const setOrderStateAsFileTransferredSchema = require('./set-order-state-as-file-transferred-schema');

const validateSetOrderStateAsFileTransferredParams = params =>
  joi.validate(params, setOrderStateAsFileTransferredSchema);

module.exports = validateSetOrderStateAsFileTransferredParams;
