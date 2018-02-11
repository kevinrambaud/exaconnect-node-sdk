const joi = require('joi');
const soapResponseHandler = require('./utils/soap-response-handler');

const validateSetOrderStateAsFileTransferredParams = (params) => {
  const paramsSchema = joi
    .object({
      token: joi.string().required(),
      orders: joi
        .array()
        .items(joi.number())
        .required(),
    })
    .required();

  return joi.validate(params, paramsSchema);
};

const buildSetOrderStateAsFileTransferredRequest = validParams => ({
  token: validParams.token,
  request: {
    orders: [validParams.orders],
  },
});

const formatSuccessResponse = (response) => {
  const getItem = item => ({
    orderId: Number(item.key.$value),
    success: Boolean(item.value.success.$value),
  });

  const { item } = response.return.codes;

  if (Array.isArray(item)) {
    return item.map(getItem);
  }

  return [getItem(item)];
};

const setOrderStateAsFileTransferred = client => params =>
  validateSetOrderStateAsFileTransferredParams(params)
    .then(buildSetOrderStateAsFileTransferredRequest)
    .then(client.orderFichierTransfereAsync)
    .then(response => soapResponseHandler(response, formatSuccessResponse));

module.exports = setOrderStateAsFileTransferred;
