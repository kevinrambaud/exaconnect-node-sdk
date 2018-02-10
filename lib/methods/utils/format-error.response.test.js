const { expect } = require('chai');
const formatErrorResponse = require('./format-error-response');

const createErrorResponse = (err) => {
  const { code, label } = err;
  const errorCode = code ? { code: { $value: code } } : undefined;
  const errorLabel = label ? { label: { $value: label } } : undefined;

  return Object.assign({}, errorCode, errorLabel);
};

describe('format-error-response', () => {
  describe('formatErrorResponse()', () => {
    it('should return a formatted error', () => {
      const errorResponse = createErrorResponse({ code: '0', label: 'this is an error message' });

      expect(formatErrorResponse(errorResponse)).to.be.an('error');
    });

    it('should return a formatted error even if the error code is missing in response', () => {
      const errorResponse = createErrorResponse({ label: 'this is a detailled error message' });

      expect(formatErrorResponse(errorResponse)).to.be.an('error');
    });

    it('should return a formatted error even if the error label is missing in response', () => {
      const errorResponse = createErrorResponse({ code: '-1' });

      expect(formatErrorResponse(errorResponse)).to.be.an('error');
    });
  });
});
