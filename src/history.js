const { request } = require('./common')
const { dayjs } = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.locale('ko');
dayjs.extend(relativeTime);
const RECENT_PVP_MATCH_COUNT = 10;

class History {
  static async fetch(puuid) {
    const history = await request(`/lol-match-history/v1/products/lol/${puuid}/matches`);
    const matches = history.games.games.filter(
      match => match.gameType !== 'CUSTOM_GAME'
    )
    return new History(matches)
  }

  constructor(matches) {
    this.matches = matches;
  }

  getStats() {
    if (this.matches.length === 0) {
      return {
        kill: null,
        death: null,
        assist: null,
        damage: null,
        cs: null,
        mostChamps: null,
        odds: null,
        winCount: null,
        failCount: null,
        stats: null,
      }
    }

    const recentUsedChampions = new Map();
    let totalKill = 0;
    let totalDeath = 0;
    let totalAssist = 0;
    let totalDamage = 0;
    let totalCs = 0;
    let totalWin = 0;
    let totalFail = 0;
    let totalGame = 0;

    const stats = this.matches.slice(0, RECENT_PVP_MATCH_COUNT).map(match => {
      const participant = match.participants[0];
      const kill = participant.stats.kills;
      const death = participant.stats.deaths;
      const assist = participant.stats.assists;
      const currentDate = new Date(match.gameCreationDate);
      currentDate.setHours(currentDate.getHours() + hours);
      currentDate.setMinutes(currentDate.getMinutes() + minutes);
      currentDate.setSeconds(currentDate.getSeconds() + seconds);

      this.#countUsedChampion(participant.championId, recentUsedChampions)
      totalKill += kill;
      totalDeath += death;
      totalAssist += assist;
      totalDamage += participant.stats.totalDamageDealtToChampions;
      totalCs += participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled;

      participant.stats.win ? winCount++ : failCount++;
      totalGame++;

      return {
        icon: `https://lolcdn.darkintaqt.com/cdn/champion/${participant.championId}/tile`,
        kill,
        death,
        assist,
        isWin: participant.stats.win,
        time: dayjs(currentDate.toISOString()).fromNow()
      }
    });

    const mostChamps = Array.from(recentUsedChampions.values())
    .reverse()
    .sort((a, b) => a.count - b.count)
    .slice(-3)
    .map((data) => `https://lolcdn.darkintaqt.com/cdn/champion/${data.champId}/tile`)
    .reverse();

    return {
      kill: Math.floor(totalKill / totalGame),
      death: Math.floor(totalDeath / totalGame),
      assist: Math.floor(totalAssist / totalGame),
      damage: Math.floor(totalDamage / totalGame),
      cs: Math.floor(totalCs / totalGame),
      mostChamps,
      odds: Math.floor((totalWin / totalGame)*100),
      winCount: totalWin,
      failCount: totalFail,
      stats
    }
  }

  #countUsedChampion(champId, recentUsedChampions) {
    let data = recentUsedChampions.get(champId);
    if (!count) {
      const _data = {
        champId,
        count: 1
      }
      recentUsedChampions.set(champId, _data);
      return;
    }

    data.count++;
    recentUsedChampions.set(champId, data);
    return;
  }
}

module.exports = {
  History
}