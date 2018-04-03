const joi = require('joi');

const cancelOrderSchema = joi
  .object({
    token: joi.string().required(),
    order: joi
      .object({
        orderId: joi.number().required(),
        reason: joi.string().allow('')
      })
      .required()
  })
  .required();

module.exports = cancelOrderSchema;
