const {
  authenticate,
  createWebSocketConnection,
  LeagueClient,
} = require('league-connect');
const Summoner = require('./models/summoner');
const IpcSender = require('./ipc/sender');
const Credentials = require('./credentials');
const { handle } = require('./handler');

async function onLeagueClient() {
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

  Credentials.init(credentials);

  const client = new LeagueClient(credentials);
  client.start();

  client.on('connect', async (newCredentials) => {
    Credentials.init(newCredentials);
    const ws = await createWebSocketConnection();
    const summoner = await initClient();
    handle(ws, summoner);
  });

  client.on('disconnect', () => {
    IpcSender.send('close-client');
  });

  const summoner = await initClient();
  return { ws, summoner };
}

async function initClient() {
  return new Promise((resolve) => {
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
        resolve(summoner);
      }
    }, 1000);
  })
}

module.exports = {
  onLeagueClient
}