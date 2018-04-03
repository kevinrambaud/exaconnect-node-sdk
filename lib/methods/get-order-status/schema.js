const joi = require('joi');

const getOrderStatusSchema = joi
  .object({
    token: joi.string().required(),
    orders: joi.array().items(joi.number())
  })
  .required();

module.exports = getOrderStatusSchema;
