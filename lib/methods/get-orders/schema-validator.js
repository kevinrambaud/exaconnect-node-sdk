const joi = require('joi');
const getOrdersSchema = require('./schema');

const validateGetOrdersParams = params => joi.validate(params, getOrdersSchema);

module.exports = validateGetOrdersParams;
