const joi = require('joi');
const setOrderStateAsFileTransferredSchema = require('./schema');

const validateSetOrderStateAsFileTransferredParams = params =>
  joi.validate(params, setOrderStateAsFileTransferredSchema);

module.exports = validateSetOrderStateAsFileTransferredParams;
