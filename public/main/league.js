const {
  authenticate,
  createWebSocketConnection,
  LeagueClient,
} = require('league-connect');
const { Summoner } = require('./models/summoner');
const { IpcSender } = require('./ipc/sender');
const { Credentials } = require('./credentials');
const handler = require('./handler')

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
    // this.#handlePhase();
  }

  #registerListener(credentials) {
    const client = new LeagueClient(credentials);
    client.start();

    client.on('connect', async (newCredentials) => {
      Credentials.init(newCredentials);
      this.ws = await createWebSocketConnection();
      //todo: subscribe 해제했다가 다시 연결
    });

    client.on('disconnect', () => {
      //todo
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
    const data = await Credentials.request('/lol-gameflow/v1/session', 'GET');
    const { phase, gameData } = data;

    if(phase === 'InProgress') {
      const { teamOne } = gameData;
      handler.joinTeamVoice(teamOne);
    }
  }

  subscribes() {
    // this.ws.subscribe('/lol-gameflow/v1/session', (data) => {
    //   const { phase, gameData } = data;

    //   if(phase === 'InProgress') {
    //     //팀보이스 참가
    //   }
    // })
  }
}

module.exports = {
  onLeagueClient,
  League,
};
