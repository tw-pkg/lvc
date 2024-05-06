const { createHttp1Request } = require('league-connect');
const { League } = require('./league');

async function request(url, method) {
  try {
    const response = await createHttp1Request(
      {
        method,
        url,
      },
      League.credentials
    );

    return JSON.parse(response.text());
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  request,
};
