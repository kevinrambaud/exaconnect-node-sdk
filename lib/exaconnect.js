const api = require('./api')();

const createExaconnect = () => {
  const { defaultConfiguration } = api;

  return {
    configuration: defaultConfiguration,

    configure(options) {
      this.configuration = api.configure(options);
    },

    createClient() {
      return api.createClient(this.configuration);
    },
  };
};

module.exports = createExaconnect;
