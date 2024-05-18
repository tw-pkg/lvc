const Credentials = require('./credentials');
const Team = require('./models/team');
const IpcSender = require('./ipc/sender');

let inProgressed = false;

async function handle(ws, summoner) {
  await initPhase(summoner);

  ws.subscribe('/lol-gameflow/v1/session', async (data) => {
    const { phase, gameData } = data;

    if (phase === 'InProgress' && !inProgressed) {
      inProgressed = true;

      const { teamOne } = gameData;
      const team = new Team(teamOne);

      IpcSender.send('matched-normal-game', {
        roomId: team.createVoiceRoomId(),
        puuid: summoner.puuid,
        summoners: await team.getMemberStats()
      });
    }

    if (phase === 'None' && inProgressed) {
      inProgressed = false;
      IpcSender.send('exit-in-game');
    }
  });
}

async function initPhase(summoner) {
  inProgressed = false;

  const { phase, gameData } = await Credentials.request('/lol-gameflow/v1/session', 'GET');

  if(phase && phase === 'InProgress') {
    inProgressed = true;

    const { teamOne } = gameData;
    const team = new Team(teamOne);

    IpcSender.send('matched-normal-game', {
      roomId: team.createVoiceRoomId(),
      puuid: summoner.puuid,
      summoners: await team.getMemberStats()
    })
  }
}

module.exports = {
  handle
}