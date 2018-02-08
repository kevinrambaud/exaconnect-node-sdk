const { expect } = require('chai');
const formatErrorResponse = require('./format-error-response');

describe('format-error-response', () => {
  describe('formatErrorResponse()', () => {
    it('should return a formatted error', () => {
      const errorResponseProp = {
        code: { $value: '0' },
        label: { $value: 'this is an error message' },
      };

      expect(formatErrorResponse(errorResponseProp)).to.be.an('error');
    });
  });
});
