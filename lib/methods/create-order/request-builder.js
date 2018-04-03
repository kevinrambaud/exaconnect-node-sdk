const buildAddressRequest = address => ({
  line1: address.line1,
  line2: address.line2,
  line3: address.line3,
  zipCode: address.zipCode,
  city: address.city,
  country: address.country,
  digicode: address.doorCode,
  comment: address.comment,
  mobile: address.mobile,
  mail: address.mail,
  phone: address.phone,
  contactName: address.contactName
});

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
    deliveryAddress: buildAddressRequest(validParams.order.address),
    comment: validParams.order.comment,
    isExaprintReference: true
  }
});

module.exports = buildCreateOrderRequest;
module.exports.buildAddressRequest = buildAddressRequest;
