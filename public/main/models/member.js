const { Credentials } = require('../credentials');
const { History } = require('./history');

class Member {
  static create(data) {
    return new Member(data);
  }

  constructor({ profileIconId, puuid, summonerName }) {
    this.puuid = puuid;
    this.profileIconId = profileIconId;
    this.summonerName = summonerName;
  }

  async getStats() {
    const data = await Credentials.request(`/lol-match-history/v1/products/lol/${this.puuid}/matches?begIndex=0&endIndex=50`, 'GET')
    const history = new History(data);

    return {
      puuid: this.puuid,
      profileImage: `https://ddragon-webp.lolmath.net/latest/img/profileicon/${this.profileIconId}.webp`,
      name: this.summonerName,
      stats: history.getStats()
    }
  }
}

module.exports = Member;