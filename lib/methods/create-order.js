const joi = require('joi');
const soapResponseHandler = require('./utils/soap-response-handler');

const validateCreateOrderParams = (params) => {
  const paramsSchema = joi
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
          address: joi
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
              comment: joi.string().allow(''),
            })
            .required(),
        })
        .required(),
    })
    .required();

  return joi.validate(params, paramsSchema);
};

const buildCreateOrderRequest = validParams => ({
  token: validParams.token,
  orderParameters: {
    reference: validParams.order.reference,
    productReference: validParams.order.product,
    quantity: validParams.order.quantity,
    openedFormatLength: validParams.order.openedFormatLength,
    openedFormatWidth: validParams.order.openedFormatWidth,
    closedFormatLength: validParams.order.closedFormatLength,
    closedFormatWidth: validParams.order.closedFormatWidth,
    deliveryAddress: {
      line1: validParams.order.address.line1,
      line2: validParams.order.address.line2,
      line3: validParams.order.address.line3,
      zipCode: validParams.order.address.zipCode,
      city: validParams.order.address.city,
      country: validParams.order.address.country,
      digicode: validParams.order.address.doorCode,
      comment: validParams.order.address.comment,
      mobile: validParams.order.address.mobile,
      mail: validParams.order.address.mail,
      phone: validParams.order.address.phone,
      contactName: validParams.order.address.contactName,
    },
    comment: validParams.order.comment,
    isExaprintReference: true,
  },
});

const formatSuccessResponse = (response) => {
  const { orderPrices } = response.return;

  const productPriceExcludingTax = orderPrices.productGrossPrice.$value;
  const productVatRate = orderPrices.productVATRate.$value;
  const totalPriceExcludingTax = orderPrices.totalGrossPrice.$value;
  const totalAllTaxesIncludedPrice = orderPrices.totalIncludingTaxe.$value;
  const orderId = response.return.orderId.$value;

  return {
    orderPrices: {
      productPriceExcludingTax,
      productVatRate,
      totalPriceExcludingTax,
      totalAllTaxesIncludedPrice,
    },
    orderId,
  };
};

const createOrder = client => params =>
  validateCreateOrderParams(params)
    .then(buildCreateOrderRequest)
    .then(client.createOrderAsync)
    .then(response => soapResponseHandler(response, formatSuccessResponse));

module.exports = createOrder;
