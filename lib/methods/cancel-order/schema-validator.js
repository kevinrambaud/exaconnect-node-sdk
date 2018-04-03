const joi = require('joi');
const cancelOrderSchema = require('./schema');

const validateCancelOrderParams = params =>
  joi.validate(params, cancelOrderSchema);

module.exports = validateCancelOrderParams;
