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
    this.gameStarted = false;
    this.#registerListener(credentials);
    this.#initClient();
    this.#handlePhase();
  }

  #registerListener(credentials) {
    const client = new LeagueClient(credentials);
    client.start();

    client.on('connect', async (newCredentials) => {
      Credentials.init(newCredentials);
      this.ws = await createWebSocketConnection();
      this.gameStarted = false;
      this.#initClient();
      this.#handlePhase();
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
    this.ws.subscribe('/lol-gameflow/v1/session', (data) => {
      const { phase, gameData } = data;

      if(phase === 'InProgress' && !this.gameStarted) {
        this.gameStarted = true;

        const { teamOne } = gameData;
        const team = new Team(teamOne);
        console.log('puuid: ', team.findMemberBy(this.summoner.puuid).puuid);
        console.log('roomid: ', team.createVoiceRoomId());
        IpcSender.send('start-game', {
          puuid: team.findMemberBy(this.summoner.puuid).puuid,
          roomId: team.createVoiceRoomId()
        });
      }
    });
  }

  async subscribes() {
    this.ws.subscribe('/lol-gameflow/v1/session', (data) => {
      const { phase, gameData } = data;

      if(phase === 'InProgress' && !this.gameStarted) {
        this.gameStarted = true;

        const { teamOne } = gameData;
        const team = new Team(teamOne);
        IpcSender.send('start-game', {
          puuid: team.findMemberBy(this.summoner.puuid).puuid,
          roomId: team.createVoiceRoomId()
        });
      }
    });
  }
}

module.exports = {
  onLeagueClient,
  League,
};
