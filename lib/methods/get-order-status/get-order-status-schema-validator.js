const joi = require('joi');
const getOrderStatusSchema = require('./get-order-status-schema');

const validateGetOrderStatusParams = params => joi.validate(params, getOrderStatusSchema);

module.exports = validateGetOrderStatusParams;
