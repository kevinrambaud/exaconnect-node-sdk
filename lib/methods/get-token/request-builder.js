const buildGetTokenRequest = validParams => ({
  authentication: { username: validParams.username, password: validParams.password },
});

module.exports = buildGetTokenRequest;
