const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const getOrdersFactory = require('./get-orders');

chai.use(chaiAsPromised);

const { expect } = chai;

const validateOrdersResponse = response => {
  expect(response).to.be.an('object');
  expect(response.page).to.be.an('number');
  expect(response.remainingRecords).to.be.an('boolean');
  expect(response.orders).to.be.an('array');

  response.orders.forEach(item => {
    expect(item)
      .to.have.property('id')
      .to.be.a('number');

    expect(item)
      .to.have.property('status')
      .to.be.a('number');

    expect(item)
      .to.have.property('customerReference')
      .to.be.a('string');
  });
};

describe('get-orders', () => {
  describe('getOrders', () => {
    const defaultClientStub = { getOrdersAsync: sinon.stub().resolves({}) };

    it('should return orders for a passed token', () => {
      const clientStub = {
        getOrdersAsync: sinon.stub().resolves([
          {
            return: {
              orders: {
                item: [
                  {
                    id: {
                      $value: 598008
                    },
                    status: {
                      $value: 24
                    },
                    customerReference: {
                      $value: 'ORD01'
                    }
                  }
                ]
              },
              page: {
                $value: 1
              },
              remainingRecords: {
                $value: false
              }
            }
          }
        ])
      };

      const getOrders = getOrdersFactory(clientStub);

      return getOrders({ token: '12345' }).then(response => {
        validateOrdersResponse(response);
      });
    });

    it('should throw an error if something wrong happened when formatting response', () => {
      const getOrders = getOrdersFactory(defaultClientStub);

      return expect(getOrders({ token: '12345' })).to.be.rejected;
    });

    it('should throw an error if token passed is not a string', () => {
      const getOrders = getOrdersFactory(defaultClientStub);

      return expect(getOrders({ token: 12345 })).to.be.rejected;
    });
  });
});
