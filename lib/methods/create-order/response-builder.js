const buildCreateOrderResponse = response => {
  const { orderPrices } = response.return;

  const productPriceExcludingTax = Number(orderPrices.productGrossPrice.$value);
  const productVatRate = Number(orderPrices.productVATRate.$value);
  const totalPriceExcludingTax = Number(orderPrices.totalGrossPrice.$value);
  const totalAllTaxesIncludedPrice = Number(
    orderPrices.totalIncludingTaxe.$value
  );
  const orderId = Number(response.return.orderId.$value);

  return {
    orderPrices: {
      productPriceExcludingTax,
      productVatRate,
      totalPriceExcludingTax,
      totalAllTaxesIncludedPrice
    },
    orderId
  };
};

module.exports = buildCreateOrderResponse;
