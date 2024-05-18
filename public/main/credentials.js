const { createHttp1Request } = require('league-connect');

class Credentials {
  static credentials;

  static init(credentials) {
    this.credentials = credentials;
  }

  static async request(url, method) {
    try {
      const response = await createHttp1Request(
        {
          method,
          url,
        },
        this.credentials
      );
      return JSON.parse(response.text());
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Credentials;