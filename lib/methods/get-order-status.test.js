const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const getOrderStatusFactory = require('./get-order-status');

chai.use(chaiAsPromised);

const { expect } = chai;

describe('get-order-status', () => {
  describe('getOrderStatus', () => {
    const defaultClientStub = { orderStatusAsync: sinon.stub().resolves({}) };

    it('should return order status for a passed token and an array of one order', () => {
      const clientStub = {
        orderStatusAsync: sinon.stub().resolves({
          return: {
            statuses: {
              item: {
                code: {
                  $value: 24,
                },
                orderId: {
                  $value: 598008,
                },
                shipments: {
                  $value: {
                    item: [],
                  },
                },
              },
            },
          },
        }),
      };

      const getOrderStatus = getOrderStatusFactory(clientStub);

      return getOrderStatus('12345', [598008]).then((response) => {
        expect(response).to.be.an('array');

        response.forEach((item) => {
          expect(item).to.have.property('code');
          expect(item).to.have.property('orderId');
          expect(item).to.have.property('shipments');
        });
      });
    });

    it('should return orders status for a passed token and an array of orders', () => {
      const clientStub = {
        orderStatusAsync: sinon.stub().resolves({
          return: {
            statuses: {
              item: [
                {
                  code: {
                    $value: 24,
                  },
                  orderId: {
                    $value: 598008,
                  },
                  shipments: {
                    $value: {
                      item: [],
                    },
                  },
                },
                {
                  code: {
                    $value: 25,
                  },
                  orderId: {
                    $value: 502809,
                  },
                  shipments: {
                    $value: {
                      item: [],
                    },
                  },
                },
              ],
            },
          },
        }),
      };

      const getOrderStatus = getOrderStatusFactory(clientStub);

      return getOrderStatus('12345', [598008, 502809]).then((response) => {
        expect(response).to.be.an('array');

        response.forEach((item) => {
          expect(item).to.have.property('code');
          expect(item).to.have.property('orderId');
          expect(item).to.have.property('shipments');
        });
      });
    });

    it('should return an empty array if no statuses are found', () => {
      const clientStub = {
        orderStatusAsync: sinon.stub().resolves({ return: { statuses: {} } }),
      };

      const getOrderStatus = getOrderStatusFactory(clientStub);

      return getOrderStatus('12345', [1]).then((response) => {
        expect(response).to.be.an('array');
      });
    });

    it('should throw an error if something wrong happened when formatting response', () => {
      const getOrderStatus = getOrderStatusFactory(defaultClientStub);

      return expect(getOrderStatus('12344', [1])).to.be.rejected;
    });

    it('should throw an error if token passed is not a string', () => {
      const getOrderStatus = getOrderStatusFactory(defaultClientStub);

      return expect(getOrderStatus(12345, [1])).to.be.rejected;
    });

    it('should throw an error if params passed is not an array', () => {
      const getOrderStatus = getOrderStatusFactory(defaultClientStub);

      return expect(getOrderStatus('12345', 1)).to.be.rejected;
    });
  });
});
