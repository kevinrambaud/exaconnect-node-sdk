const joi = require('joi');
const createOrderFromPartnerOrderSchema = require('./schema');

const validateCreateOrderFromPartnerOrderParams = params =>
  joi.validate(params, createOrderFromPartnerOrderSchema);

module.exports = validateCreateOrderFromPartnerOrderParams;
