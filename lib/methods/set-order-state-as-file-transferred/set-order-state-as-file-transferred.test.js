const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const setOrderStateAsFileTransferredFactory = require('./set-order-state-as-file-transferred');

chai.use(chaiAsPromised);

const { expect } = chai;

const defaultClientStub = {
  orderFichierTransfereAsync: sinon.stub().resolves({}),
};

const createClientStubResponse = (values) => {
  const createItems = (items) => {
    const getItem = item => ({
      key: { attributes: { 'xsi:type': 'xsd:int' }, $value: String(item.orderId) },
      value: {
        attributes: { 'xsi:type': 'SOAP-ENC:Struct' },
        code: { attributes: { 'xsi:type': 'xsd:int' }, $value: String(item.code) },
        success: { attributes: { 'xsi:type': 'xsd:boolean' }, $value: String(item.success) },
        errorList: {
          attributes: {
            'SOAP-ENC:arrayType': 'xsd:ur-type[0]',
            'xsi:type': 'SOAP-ENC:Array',
          },
        },
      },
    });

    if (items.length === 1) {
      return getItem(items[0]);
    }

    return items.map(getItem);
  };

  return {
    return: {
      attributes: { 'xsi:type': 'ns1:ExaConnect_Message_OrderFichierTransfereResult' },
      codes: {
        attributes: { 'xsi:type': 'ns2:Map' },
        item: createItems(values),
      },
    },
  };
};

describe('set-order-state-as-file-transferred', () => {
  describe('setOrderStateAsFileTransferred', () => {
    it('should return orders that have successfully been set as file transferred when passing multiple orders', () => {
      const clientStub = {
        orderFichierTransfereAsync: sinon
          .stub()
          .resolves(createClientStubResponse([
            { orderId: 5591277, code: 0, success: true },
            { orderId: 5591389, code: 0, success: true },
          ])),
      };

      const setOrderStateAsFileTransferred = setOrderStateAsFileTransferredFactory(clientStub);

      const setOrderStateAsFileTransferredPromise = setOrderStateAsFileTransferred({
        token: '12345',
        orders: [5591277, 5591389],
      });

      return Promise.all([
        expect(setOrderStateAsFileTransferredPromise).to.be.fulfilled,
        expect(setOrderStateAsFileTransferredPromise).to.eventually.be.deep.equal([
          { orderId: 5591277, success: true },
          { orderId: 5591389, success: true },
        ]),
      ]);
    });

    it('should return order that has successfully been set as file transferred when passing a single order', () => {
      const clientStub = {
        orderFichierTransfereAsync: sinon
          .stub()
          .resolves(createClientStubResponse([{ orderId: 5591277, code: 0, success: true }])),
      };

      const setOrderStateAsFileTransferred = setOrderStateAsFileTransferredFactory(clientStub);

      const setOrderStateAsFileTransferredPromise = setOrderStateAsFileTransferred({
        token: '12345',
        orders: [5591277],
      });

      return Promise.all([
        expect(setOrderStateAsFileTransferredPromise).to.be.fulfilled,
        expect(setOrderStateAsFileTransferredPromise).to.eventually.be.deep.equal([
          { orderId: 5591277, success: true },
        ]),
      ]);
    });
  });

  it('should throw an error if no params is passed', () => {
    const setOrderStateAsFileTransferred = setOrderStateAsFileTransferredFactory(defaultClientStub);

    return expect(setOrderStateAsFileTransferred()).to.be.rejected;
  });
});
