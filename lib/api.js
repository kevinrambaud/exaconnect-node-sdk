const soap = require('soap');
const joi = require('joi');
const sdkVersion = require('../package').version;
const methods = require('./methods');

const defaultConfiguration = {
  schema: 'https',
  hostname: 'connect.exaprint.fr',
  port: '',
  sdkVersion,
};

const wsdlUrl = configuration => `${configuration.schema}://${configuration.hostname}/?wsdl`;

const validateConfiguration = (configuration) => {
  const configurationSchema = joi
    .object({
      schema: joi
        .string()
        .allow(['http', 'https'])
        .default('https'),
      hostname: joi.string().default('connect.exaprint.fr'),
      port: joi
        .string()
        .default('')
        .allow(''),
      sdkVersion: joi.string(),
    })
    .required();

  return joi.validate(configuration, configurationSchema);
};

const createSoapClient = url =>
  soap
    .createClientAsync(url, { connection: 'keep-alive' })
    .catch(() => 'Unable to create soap client');

const api = {
  defaultConfiguration,

  configure: configuration => Object.assign({}, defaultConfiguration, configuration),

  createClient: configuration =>
    validateConfiguration(configuration)
      .then(validConfiguration => createSoapClient(wsdlUrl(validConfiguration)))
      .then(client => methods(client)),
};

module.exports = api;
