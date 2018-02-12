const joi = require('joi');
const getTokenSchema = require('./schema');

const validateGetTokenParams = params => joi.validate(params, getTokenSchema);

module.exports = validateGetTokenParams;
