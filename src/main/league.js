const { authenticate, createWebSocketConnection, LeagueClient } = require('league-connect');
const { Summoner } = require('./summoner');

let credentials = null;

function setCredentials(newCredentials) {
  credentials = newCredentials;
}

async function onLeagueClientUx() {
  return await Promise.all([
    authenticate({
      awaitConnection: true,
    }),
    createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
      },
    }),
  ]);
}

class League {
  constructor(credentials, ws, webContents) {
    setCredentials(credentials);
    this.ws = ws;
    this.webContents = webContents;
    this.#registerListeners();
    this.#sendClient();
  }

  #registerListeners() {
    const client = new LeagueClient(this.credentials);
    client.start();

    client.on('connect', async (newCredentials) => {
      setCredentials(newCredentials);
      this.ws = await createWebSocketConnection();
    });

    client.on('disconnect', () => {});
  }

  #sendClient() {
    Summoner.fetch().then((summoner) => {
      const data = {
        ...summoner,
      };
      this.webContents.send('on-client', data);
    });
  }

  subscribes() {}
}

module.exports = {
  credentials,
  onLeagueClientUx,
  League,
};
