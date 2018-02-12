const joi = require('joi');
const getTokenSchema = require('./get-token-schema');

const validateGetTokenParams = params => joi.validate(params, getTokenSchema);

module.exports = validateGetTokenParams;
