const joi = require('joi');
const cancelOrderSchema = require('./cancel-order-schema');

const validateCancelOrderParams = params => joi.validate(params, cancelOrderSchema);

module.exports = validateCancelOrderParams;
