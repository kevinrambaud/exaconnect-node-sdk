const { expect } = require('chai');

const api = require('./api');

describe('api', () => {
  describe('configure()', () => {
    const { defaultConfiguration } = api;

    it('should update configuration successfully', () => {
      const configuration = { hostname: 'connect.exapass.fr' };
      const config = api.configure(configuration);

      expect(config)
        .to.have.property('hostname')
        .to.be.equal('connect.exapass.fr');
    });

    it('should not update configuration if no option is passed', () => {
      const config = api.configure();

      expect(config).to.deep.equal(defaultConfiguration);
    });

    it('should not update configuration if option of type different than object is passed', () => {
      const config = api.configure('');

      expect(config).to.deep.equal(defaultConfiguration);
    });

    it('should create a soap client based on api configuration', () =>
      api.createClient(api.defaultConfiguration));

    it('should throw an error if configuration parameter is missing', () =>
      api.createClient().catch(err => expect(err).to.be.an('error')));

    it('should throw an error if something wrong happens when creating a soap client', () => {
      const configuration = Object.assign({}, api.defaultConfiguration, {
        hostname: 'doesnotexist.fail'
      });

      return api
        .createClient(configuration)
        .catch(err => expect(err).to.be.an('error'));
    });
  });
});
