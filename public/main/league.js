const {
  authenticate,
  createWebSocketConnection,
  LeagueClient,
} = require('league-connect');
const { Summoner } = require('./models/summoner');
const { IpcSender } = require('./ipc/sender');
const { Credentials } = require('./credentials');
const Team = require('./models/team');

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
    this.summoner = null;
    this.inProgressed = false;
    this.#registerListener(credentials);
    this.#initClient().then(() => {
      this.#handlePhase();
    })
  }

  #registerListener(credentials) {
    const client = new LeagueClient(credentials);
    client.start();

    client.on('connect', async (newCredentials) => {
      Credentials.init(newCredentials);
      this.ws = await createWebSocketConnection();
      this.inProgressed = false;
      this.#initClient().then(() => {
        this.#handlePhase();
      })
    });

    client.on('disconnect', () => {
      IpcSender.send('close-client');
    })
  }

  async #initClient() {
    let interval = setInterval(async () => {
      const data = await Credentials.request('/lol-chat/v1/me', 'GET');
      const summoner = new Summoner(data);

      if (summoner.gameName !== '') {
        this.summoner = summoner;

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
    const { phase, gameData } = await Credentials.request('/lol-gameflow/v1/session', 'GET');

    if (phase && phase === 'InProgress') {
      this.inProgressed = true;

      const { teamOne } = gameData;
      const team = new Team(teamOne);

      IpcSender.send('matched-normal-game', {
        roomId: team.createVoiceRoomId(),
        puuid: this.summoner.puuid,
        summoners: await team.getMemberStats()
      });
    }
  }

  async subscribes() {
    this.ws.subscribe('/lol-gameflow/v1/session', async (data) => {
      const { phase, gameData } = data;

      if (phase === 'InProgress' && !this.inProgressed) {
        this.inProgressed = true;

        const { teamOne } = gameData;
        const team = new Team(teamOne);

        IpcSender.send('matched-normal-game', {
          roomId: team.createVoiceRoomId(),
          puuid: this.summoner.puuid,
          summoners: await team.getMemberStats()
        });
      }

      if (phase === 'None' && this.inProgressed) {
        this.inProgressed = false;
        IpcSender.send('exit-in-game');
      }
    });
  }
}

module.exports = {
  onLeagueClient,
  League,
};
