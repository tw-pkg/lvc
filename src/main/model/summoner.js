const { request } = require('../common')

const DIVISION = {
  'I': 1,
  'II': 2,
  'III': 3,
  'IV': 4,
  'V': 5
}

class Summoner {
  static async fetch() {
    return new Promise((resolve, _) => {
      let interval = setInterval(async () => {
        const data = await request('/lol-chat/v1/me', 'GET');
        const summoner = new Summoner(data);

        if(summoner.isFetched()) {
          clearInterval(interval);
          resolve(summoner);
        }
      }, 1000);
    });
  }

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

  getProfileImage() {
    return `https://ddragon-webp.lolmath.net/latest/img/profileicon/${this.icon}.webp`;
  }

  getTier() {
    const { rankedLeagueDivision, rankedLeagueTier } = this.lol;
    if (!rankedLeagueDivision && !rankedLeagueTier) {
      return 'Unrank';
    }

    const tier = rankedLeagueTier[0];
    return tier + DIVISION[rankedLeagueDivision]
  }
}

module.exports = {
  Summoner
}