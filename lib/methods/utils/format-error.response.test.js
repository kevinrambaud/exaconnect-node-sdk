const { expect } = require('chai');
const formatErrorResponse = require('./format-error-response');

describe('format-error-response', () => {
  describe('formatErrorResponse()', () => {
    it('should return a formatted error', () => {
      const errorResponse = {
        code: { $value: '0' },
        label: { $value: 'this is an error message' },
      };

      expect(formatErrorResponse(errorResponse)).to.be.an('error');
    });

    it('should return a formatted error even if the error code is missing in response', () => {
      const errorResponse = {
        label: { $value: 'this is a detailled error message' },
      };

      expect(formatErrorResponse(errorResponse)).to.be.an('error');
    });

    it('should return a formatted error even if the error label is missing in response', () => {
      const errorResponse = {
        code: { $value: '-1' },
      };

      expect(formatErrorResponse(errorResponse)).to.be.an('error');
    });
  });
});
