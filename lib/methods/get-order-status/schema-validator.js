const joi = require('joi');
const getOrderStatusSchema = require('./schema');

const validateGetOrderStatusParams = params =>
  joi.validate(params, getOrderStatusSchema);

module.exports = validateGetOrderStatusParams;
