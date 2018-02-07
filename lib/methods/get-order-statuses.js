const assert = require('assert-plus');

const getOrderStatuses = client => (token = '', params = []) =>
  new Promise((resolve, reject) => {
    try {
      assert.string(token, 'token');
      assert.arrayOfString(params, 'params');
    } catch (err) {
      return reject(err);
    }

    const request = {
      token,
      request: {
        orders: [params],
      },
    };

    return client.orderStatusAsync(request).then((response) => {
      const statuses = response.return.statuses.$value;

      return statuses;
    });
  });

module.exports = getOrderStatuses;
