const { authenticate, createWebSocketConnection, LeagueClient } = require('league-connect');

class League {
  static credentials;
  static ws;

  static async onClientUx() {
    const [credentials, ws] = await Promise.all([
      authenticate({
        awaitConnection: true,
      }),
      createWebSocketConnection({
        authenticationOptions: {
          awaitConnection: true,
        },
      }),
    ]);

    this.credentials = credentials;
    this.ws = ws;

    this.#registerClientListener();
  }

  static #registerClientListener() {
    const client = new LeagueClient(this.credentials);
    client.start();

    client.on('connect', async (newCredentials) => {
      this.credentials = newCredentials;
      this.ws = await createWebSocketConnection();
    });

    client.on('disconnect', () => {});
  }
}

module.exports = {
  League,
};
