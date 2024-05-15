function joinTeamVoice(team) {
  console.log(team[0]);
  const { profileIconId, puuid, summonerId, summonerName } = team[0];
  console.log(profileIconId, puuid, summonerId, summonerName);
}

module.exports = {
  joinTeamVoice
}