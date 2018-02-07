const { expect } = require('chai');

const createExaconnect = require('./exaconnect');

describe('exaconnect', () => {
  describe('configure()', () => {
    it('should set configuration based on passed options', () => {
      const exaconnect = createExaconnect();
      const options = { host: 'stage.connect.exapass.fr' };

      expect(exaconnect.configuration.host).to.be.equal('connect.exaprint.fr');

      exaconnect.configure(options);

      expect(exaconnect.configuration)
        .to.have.property('host')
        .to.be.equal('stage.connect.exapass.fr');
    });
  });

  describe('createClient()', () => {
    it('should create a new soap client based on configuration', () => {
      const exaconnect = createExaconnect();

      return exaconnect.createClient().then((client) => {
        expect(client).to.be.an('object');
      });
    });
  });
});
