const joi = require('joi');
const createOrderSchema = require('./create-order-schema');

const validateCreateOrderParams = params => joi.validate(params, createOrderSchema);

module.exports = validateCreateOrderParams;
