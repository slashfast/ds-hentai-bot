const fetch = require('node-fetch');
module.exports = {
  async GET(API) {
    return fetch(API.link.rand)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  },
};
