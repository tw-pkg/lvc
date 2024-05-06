const { request } = require('../common');
const { IpcSender } = require('../ipc/sender');

const DIVISION = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
};

async function sendSummoner() {
  const summoner = await Summoner.fetch();
  const data = {
    gameName: summoner.gameName,
    gameTag: summoner.gameTag,
    id: summoner.id,
    name: summoner.name,
    pid: summoner.pid,
    puuid: summoner.puuid,
    profileImage: summoner.getProfileImage(),
    tier: summoner.getTier(),
  };
  console.log(data);
  IpcSender.send('on-league-client', data);
}

class Summoner {
  constructor(data) {
    this.gameName = data.gameName;
    this.gameTag = data.gameTag;
    this.icon = data.icon;
    this.id = data.id;
    this.lol = data.lol;
    this.name = data.name;
    this.pid = data.pid;
    this.puuid = data.puuid;
  }

  static async fetch() {
    return new Promise((resolve, _) => {
      let interval = setInterval(async () => {
        const data = await request('/lol-chat/v1/me', 'GET');
        const summoner = new Summoner(data);

        if (summoner.didFetch()) {
          clearInterval(interval);
          resolve(summoner);
        }
      }, 1000);
    });
  }

  didFetch() {
    return this.puuid !== undefined;
  }

  getProfileImage() {
    return `https://ddragon-webp.lolmath.net/latest/img/profileicon/${this.icon}.webp`;
  }

  getTier() {
    const { rankedLeagueDivision, rankedLeagueTier } = this.lol;
    if (!rankedLeagueDivision && !rankedLeagueTier) {
      return 'Unrank';
    }
    return rankedLeagueTier[0] + DIVISION[rankedLeagueDivision];
  }
}

module.exports = {
  sendSummoner,
  Summoner,
};
