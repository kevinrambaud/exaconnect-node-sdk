const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const createOrderFromPartnerOrderFactory = require('./create-order-from-partner-order');
const { createSoapOrderResponseStub } = require('../create-order/create-order.test');

chai.use(chaiAsPromised);

const { expect } = chai;

const clientStub = {
  createOrderFromPartnerOrderAsync: sinon.stub().resolves(createSoapOrderResponseStub({
    productGrossPrice: 50,
    productVATRate: 20,
    totalGrossPrice: 50,
    totalIncludingTaxe: 60,
    orderId: 5579094,
  })),
};

describe('create-order-from-partner-order', () => {
  describe('createOrderFromPartnerOrder()', () => {
    const createOrderFromPartnerOrder = createOrderFromPartnerOrderFactory(clientStub);

    it('should create an order and return result', () => {
      const request = {
        token: '12345',
        order: {
          reference: 'My first automated order',
          partnerOrderId: 387890,
          comment: '',
          address: {
            contactName: 'Joe',
            line1: 'Season street',
            line2: '',
            line3: '',
            doorCode: '',
            mail: 'me@company.com',
            phone: '+1881370035',
            mobile: '',
            city: 'Boston',
            zipCode: '02101',
            country: 'US',
            comment: '',
          },
        },
      };

      const createOrderFromPartnerOrderPromise = createOrderFromPartnerOrder(request);

      return Promise.all([
        expect(createOrderFromPartnerOrderPromise).to.be.fulfilled,
        expect(createOrderFromPartnerOrderPromise).to.eventually.be.deep.equal({
          orderPrices: {
            productPriceExcludingTax: 50,
            productVatRate: 20,
            totalPriceExcludingTax: 50,
            totalAllTaxesIncludedPrice: 60,
          },
          orderId: 5579094,
        }),
      ]);
    });

    it('should throw an error if no params is passed', () =>
      expect(createOrderFromPartnerOrder()).to.be.rejected);
  });
});
