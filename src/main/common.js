const { createHttp1Request } = require('league-connect');
const { credentials } = require('./league');

async function request(url, method) {
  try {
    const response = await createHttp1Request(
      {
        method,
        url,
      },
      credentials
    );

    return JSON.parse(response.text());
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  request,
};
