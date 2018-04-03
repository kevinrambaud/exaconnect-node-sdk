const { expect } = require('chai');
const soapResponseHandler = require('./soap-response-handler');

describe('soap-response-handler', () => {
  describe('soapResponseHandler()', () => {
    it('should throw an error if response contains an error property', () => {
      const response = {
        return: {
          error: {
            code: { $value: 0 },
            label: { $value: 'this is an error message' }
          }
        }
      };

      const testFunc = () => soapResponseHandler(response);

      expect(testFunc).to.throw(Error);
    });

    it('should throw an error if there is not "formatSuccessResponse" function passed', () => {
      const response = { return: {} };
      const testFunc = () => soapResponseHandler(response);

      expect(testFunc).to.throw(
        Error,
        /"formatSuccessResponse" function is required/
      );
    });

    it('should throw an error if function "formatSuccessResponse" passed is not a function', () => {
      const response = { return: {} };
      const testFunc = () =>
        soapResponseHandler(response, 'thisisdefinitelynotafunction');

      expect(testFunc).to.throw(
        Error,
        /"formatSuccessResponse" must be a function/
      );
    });

    it('should return a response based on the "formatSuccessResponse" passed as parameter', () => {
      const response = {
        return: {
          token: {
            $value: '123123'
          }
        }
      };

      const formatSuccessResponse = r => r.return.token.$value;

      expect(soapResponseHandler(response, formatSuccessResponse)).to.be.equal(
        '123123'
      );
    });
  });
});
