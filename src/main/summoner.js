const { request } = require('./common')

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

  isFetched() {
    return this.puuid === undefined;
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
    switch (rankedLeagueDivision) {
      case 'I':
        return tier + 1;
      case 'II':
        return tier + 2;
      case 'III':
        return tier + 3;
      case 'IV':
        return tier + 4;
      case 'V':
        return tier + 5;
      default:
        return tier;
    }
  }
}

module.exports = {
  Summoner
}