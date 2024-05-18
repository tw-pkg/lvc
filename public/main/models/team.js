const Member = require('../models/member');

class Team {
  constructor(team) {
    this.members = this.#from(team);
  }

  #from(team) {
    return team.map(Member.create);
  }

  findMemberBy(puuid) {
    return this.members.find(member => member.isSame(puuid));
  }

  createVoiceRoomId() {
    return this.members.map(member => member.puuid).sort().join('').toString();
  }
}

module.exports = Team;