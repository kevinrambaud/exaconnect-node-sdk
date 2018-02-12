const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const getTokenFactory = require('./get-token');

chai.use(chaiAsPromised);

const { expect } = chai;

const clientStub = {
  getTokenAsync: sinon
    .stub()
    .resolves({ return: { token: { $value: '831228ba-0c41-11e8-ba89-0ed5f89f718b' } } }),
  setSecurity: sinon.stub(),
};

describe('get-token', () => {
  describe('getToken()', () => {
    const getToken = getTokenFactory(clientStub);

    it('should return a token', () =>
      getToken({ username: 'me', password: 'secret' }).then((token) => {
        expect(token).to.be.a('string');
      }));

    it('should throw an error if no params is passed', () => expect(getToken()).to.be.rejected);

    it('should throw an error if params is different than object', () =>
      expect(getToken('sometext')).to.be.rejected);

    it('should throw an error if username is missing', () =>
      expect(getToken({ password: 'secret' })).to.be.rejected);

    it('should throw an error if password is missing', () =>
      expect(getToken({ username: 'me' })).to.be.rejected);
  });
});
