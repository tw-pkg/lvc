const { 
  authenticate, 
  createWebSocketConnection, 
  LeagueClient 
} = require('league-connect');
const { Summoner } = require('./model/summoner');
const { Sender } = require('./ipc/sender')

async function onLeagueClientUx() {
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

  return { credentials, ws };
}

class League {
  static credentials;

  constructor(credentials, ws) {
    this.credentials = credentials;
    this.ws = ws;
    this.#registerListeners();
    this.#sendClient();
  }

  #registerListeners() {
    const client = new LeagueClient(this.credentials);
    client.start();

    client.on('connect', async (newCredentials) => {
      this.credentials = newCredentials;
      this.ws = await createWebSocketConnection();
    });

    client.on('disconnect', () => {
    });
  }

  #sendClient() {
    Summoner.fetch().then(summoner => {
      Sender.send('on-client', summoner);
    })
  }

  subscribes() {
  }
}

module.exports = {
  onLeagueClientUx,
  League
}