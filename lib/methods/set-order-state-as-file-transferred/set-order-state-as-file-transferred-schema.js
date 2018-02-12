const joi = require('joi');

const setOrderStateAsFileTransferredSchema = joi
  .object({
    token: joi.string().required(),
    orders: joi
      .array()
      .items(joi.number())
      .required(),
  })
  .required();

module.exports = setOrderStateAsFileTransferredSchema;
