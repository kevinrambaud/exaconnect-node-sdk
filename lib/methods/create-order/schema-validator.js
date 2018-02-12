const joi = require('joi');
const createOrderSchema = require('./schema');

const validateCreateOrderParams = params => joi.validate(params, createOrderSchema);

module.exports = validateCreateOrderParams;
