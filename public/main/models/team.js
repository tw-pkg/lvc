const Member = require('../models/member');

class Team {
  constructor(team) {
    this.members = this.#from(team);
  }

  #from(team) {
    return team.map(Member.create);
  }

  hasSummoner(puuid) {
    return this.members.find(member => member.puuid === puuid);
  }

  createVoiceRoomId() {
    return this.members.map(member => member.puuid).sort().join('').toString();
  }

  async getMemberStats() {
    return await Promise.all(
      this.members.map(member => member.getStats())
    )
  }
}

module.exports = Team;