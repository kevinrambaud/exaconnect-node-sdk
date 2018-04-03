const joi = require('joi');

const getTokenSchema = joi
  .object({
    username: joi.string().required(),
    password: joi.string().required()
  })
  .required();

module.exports = getTokenSchema;
