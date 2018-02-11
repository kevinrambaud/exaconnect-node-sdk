const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const createOrderFactory = require('./create-order');

chai.use(chaiAsPromised);

const { expect } = chai;

const clientStub = {
  createOrderAsync: sinon.stub().resolves({
    return: {
      attributes: { 'xsi:type': 'ns1:ExaConnect_Message_OrderCreationResult' },
      orderPrices: {
        attributes: { 'xsi:type': 'ns1:ExaConnect_Message_OrderCreation_Prices' },
        productGrossPrice: { attributes: { 'xsi:type': 'xsd:float' }, $value: '87.36' },
        productVATRate: { attributes: { 'xsi:type': 'xsd:float' }, $value: '20' },
        totalGrossPrice: { attributes: { 'xsi:type': 'xsd:float' }, $value: '87.36' },
        totalIncludingTaxe: { attributes: { 'xsi:type': 'xsd:float' }, $value: '104.832' },
        fees: {
          attributes: {
            'SOAP-ENC:arrayType': 'ns1:ExaConnect_Message_OrderCreation_Fee[0]',
            'xsi:type': 'ns1:ArrayOfExaConnect_Message_OrderCreation_Fee',
          },
        },
      },
      orderId: { attributes: { 'xsi:type': 'xsd:int' }, $value: 5591275 },
    },
  }),
};

describe('create-order', () => {
  describe('createOrder()', () => {
    const createOrder = createOrderFactory(clientStub);

    it('should create an order and return result', () => {
      const createOrderRequest = {
        token: '12345',
        order: {
          reference: 'My first automated order',
          product: 'SKU78201',
          quantity: 50,
          openedFormatLength: '',
          openedFormatWidth: '',
          closedFormatLength: '',
          closedFormatWidth: '',
          comment: '',
          address: {
            contactName: 'Kevin',
            line1: 'Place de la comédie',
            line2: '',
            line3: '',
            doorCode: '#3412',
            mail: 'me@company.com',
            phone: '+33432000000',
            mobile: '',
            city: 'Montpellier',
            zipCode: '34000',
            country: 'FR',
            comment: '',
          },
        },
      };

      return expect(createOrder(createOrderRequest)).to.be.fulfilled.and.eventually.be.deep.equal({
        orderPrices: {
          productPriceExcludingTax: '87.36',
          productVatRate: '20',
          totalPriceExcludingTax: '87.36',
          totalAllTaxesIncludedPrice: '104.832',
        },
        orderId: 5591275,
      });
    });

    it('should throw an error if no params is passed', () => expect(createOrder()).to.be.rejected);
  });
});
