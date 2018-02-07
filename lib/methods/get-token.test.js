const { expect } = require('chai');
const sinon = require('sinon');
const getTokenFactory = require('./get-token');

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

    it('should throw an error if no params is passed', () =>
      getToken().catch(err => expect(err).to.be.an('error')));

    it('should throw an error if params is different than object', () =>
      getToken('sometext').catch(err => expect(err).to.be.an('error')));

    it('should throw an error if username is missing', () =>
      getToken({ password: 'secret' }).catch(err => expect(err).to.be.an('error')));

    it('should throw an error if password is missing', () =>
      getToken({ username: 'me' }).catch(err => expect(err).to.be.an('error')));
  });
});
