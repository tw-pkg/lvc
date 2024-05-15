const {
  authenticate,
  createWebSocketConnection,
  LeagueClient,
} = require('league-connect');
const { Summoner } = require('./models/summoner');
const { IpcSender } = require('./ipc/sender');
const { Credentials } = require('./credentials')

async function onLeagueClient() {
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
    Credentials.init(credentials);
    this.ws = ws;
    this.#registerListener(credentials);
    this.#sendClient();
    this.#handlePhase();
  }

  #registerListener(credentials) {
    const client = new LeagueClient(credentials);
    client.start();

    client.on('connect', async (newCredentials) => {
      Credentials.init(newCredentials);
      this.ws = await createWebSocketConnection();
    });

    client.on('disconnect', () => {
    })
  }

  async #sendClient() {
    let interval = setInterval(async () => {
      const data = await Credentials.request('/lol-chat/v1/me', 'GET');
      const summoner = new Summoner(data);

      if (summoner.gameName !== '') {
        const client = {
          gameName: summoner.gameName,
          gameTag: summoner.gameTag,
          id: summoner.id,
          name: summoner.name,
          pid: summoner.pid,
          puuid: summoner.puuid,
          profileImage: summoner.getProfileImage(),
          tier: summoner.getTier(),
        }
        IpcSender.send('on-league-client', client);
        clearInterval(interval);
      }
    }, 1000);
  }

  async #handlePhase() {

  }

  async subscribes() {
    
  }
}

module.exports = {
  onLeagueClient,
  League,
};
