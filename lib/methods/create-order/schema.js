const joi = require('joi');

const addressSchema = joi
  .object({
    contactName: joi.string().required(),
    line1: joi.string().required(),
    line2: joi.string().allow(''),
    line3: joi.string().allow(''),
    doorCode: joi.string().allow(''),
    mail: joi.string().required(),
    phone: joi.string().required(),
    mobile: joi.string().allow(''),
    city: joi.string().required(),
    zipCode: joi.string().required(),
    country: joi.string().required(),
    comment: joi.string().allow('')
  })
  .required();

const createOrderSchema = joi
  .object({
    token: joi.string().required(),
    order: joi
      .object({
        reference: joi.string().required(),
        product: joi.string().required(),
        quantity: joi.number().required(),
        openedFormatLength: joi.string().allow(''),
        openedFormatWidth: joi.string().allow(''),
        closedFormatLength: joi.string().allow(''),
        closedFormatWidth: joi.string().allow(''),
        comment: joi.string().allow(''),
        address: addressSchema
      })
      .required()
  })
  .required();

module.exports = createOrderSchema;
module.exports.addressSchema = addressSchema;
