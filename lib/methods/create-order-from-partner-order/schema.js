const joi = require('joi');
const { addressSchema } = require('../create-order/schema');

const createOrderFromPartnerOrderSchema = joi.object({
  token: joi.string().required(),
  order: joi.object({
    reference: joi.string().required(),
    partnerOrderId: joi.number().required(),
    comment: joi.string().allow(''),
    address: addressSchema
  })
});

module.exports = createOrderFromPartnerOrderSchema;
