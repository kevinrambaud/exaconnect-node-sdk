const { expect } = require('chai');
const getTokenFactory = require('./get-token');

describe('getTokenFactory()', () => {
  const client = {
    getTokenAsync: () => Promise.resolve(),
  };

  describe('getToken', () => {
    it('should return a token');
  });
});
