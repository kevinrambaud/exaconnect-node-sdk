const { buildAddressRequest } = require('../create-order/request-builder');

const buildCreateOrderFromPartnerOrderRequest = validParams => ({
  token: validParams.token,
  orderParameters: {
    reference: validParams.order.reference,
    partnerOrder: String(validParams.order.partnerOrderId),
    comment: validParams.order.comment,
    deliveryAddress: buildAddressRequest(validParams.order.address)
  }
});

module.exports = buildCreateOrderFromPartnerOrderRequest;
