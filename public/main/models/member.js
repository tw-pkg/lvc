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
    const data = await Credentials.request(`/lol-match-history/v1/products/lol/${this.puuid}/matches`, 'GET')
    const history = new History(data);

    return {
      puuid: this.puuid,
      profileIconId: this.profileIconId,
      summonerName: this.summonerName,
      stats: history.getStats()
    }
  }
}

module.exports = Member;