const { authenticate, LeagueClient } = require('league-connect');

let credentials;

function setCredentials(newCredentials) {
  credentials = newCredentials;
}

async function onLeagueClientUx() {
  const credentials = await authenticate({
    awaitConnection: true,
  });
  setCredentials(credentials);
  registerClientLister(credentials);
}

function registerClientLister(credentials) {
  const client = new LeagueClient(credentials);
  client.start();

  client.on('connect', async (newCredentials) => {
    setCredentials(newCredentials);
    this.ws = await createWebSocketConnection();
  });

  client.on('disconnect', () => {});
}

module.exports = {
  credentials,
  setCredentials,
  onLeagueClientUx,
};
