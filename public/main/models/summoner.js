const DIVISION = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
};

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
  Summoner,
};
