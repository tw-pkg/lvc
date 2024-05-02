const { request } = require('./common')

async function fetchSummoner(credentials) {
  const data = await request('/lol-chat/v1/me', 'GET', credentials)
  const summoner = new Summoner(data);

  return {
    gameName: summoner.gameName,
    gameTag: summoner.gameTag,
    id: summoner.id,
    name: summoner.name,
    pid: summoner.pid,
    puuid: summoner.puuid,
    summonerId: summoner.summonerId,
    profileImage: summoner.profileImage(),
    tier: summoner.tier(),
  }
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
    this.summonerid = data.summonerid;
  }

  profileImage() {
    return `https://ddragon-webp.lolmath.net/latest/img/profileicon/${this.icon}.webp`;
  }

  tier() {
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
  fetchSummoner
}