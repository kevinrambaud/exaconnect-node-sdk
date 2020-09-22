const joi = require('joi');

const getOrdersSchema = joi
  .object({
    token: joi.string().required(),
    dateFilterMin: joi.string(),
    dateFilterMax: joi.string(),
    statusFilter: joi.number(),
    page: joi.number()
  })
  .required();

module.exports = getOrdersSchema;
