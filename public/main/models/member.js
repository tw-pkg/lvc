class Member {
  static create(member) {
    return new Member(member);
  }

  constructor(member) {
    this.puuid = member.puuid;
  }

  isSame(puuid) {
    return this.puuid === puuid;
  }
}

module.exports = Member;