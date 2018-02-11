const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const cancelOrderFactory = require('./cancel-order');

chai.use(chaiAsPromised);

const { expect } = chai;

const clientStub = {
  cancelOrderAsync: sinon.stub().resolves({
    return: { hasBeenCancelled: { $value: 'true' } },
  }),
};

describe('cancel-order', () => {
  describe('cancelOrder()', () => {
    const cancelOrder = cancelOrderFactory(clientStub);

    it('sould cancel a given order', () => {
      const cancelOrderPromise = cancelOrder({
        token: '12345',
        order: { orderId: 5478387, reason: 'File error' },
      });

      return Promise.all([
        expect(cancelOrderPromise).to.be.fulfilled,
        expect(cancelOrderPromise).to.eventually.be.equal(true),
      ]);
    });

    it('should throw an error if no params is passed', () => expect(cancelOrder()).to.be.rejected);
  });
});
