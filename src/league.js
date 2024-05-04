const { 
  authenticate, 
  createWebSocketConnection, 
  LeagueClient 
} = require('league-connect');
const { fetchSummoner } = require('./summoner')

let credentials = null

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
  constructor(credentials, ws) {
    credentials = credentials;
    this.ws = ws;
    this.webContents = webContents
    this.#registerListeners();
  }

  #registerListeners() {
    const client = new LeagueClient(this.credentials);
    client.start();

    client.on('connect', async (newCredentials) => {
      credentials = newCredentials;
      this.ws = await createWebSocketConnection();
    });

    client.on('disconnect', () => {
    });
  }

  #sendClient() {
    fetchSummoner(this.credentials).then(summoner => {
      const data = {
        ...summoner
      }
      console.log(data)
      this.webContents.send('on-client', data);
    })
  }

  subscribes() {
  }
}

module.exports = {
  credentials,
  onLeagueClientUx,
  League
}