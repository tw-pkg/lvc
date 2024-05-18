const dayjs = require('dayjs');
require('dayjs/locale/ko');
dayjs.locale('ko');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const RECENT_PVP_MATCH_COUNT = 10;

class History {
  constructor(data) {
    this.matches = data.games.games;
    // this.matches = data.games.games.filter(match => match.gameType !== 'CUSTOM_GAME');
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
        winningRate: null,
        totalWin: null,
        totalFail: null,
        stats: null,
      };
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

    const stats = this.matches.slice(0, RECENT_PVP_MATCH_COUNT).map((match) => {
      const participant = match.participants[0];
      const kill = participant.stats.kills;
      const death = participant.stats.deaths;
      const assist = participant.stats.assists;

      this.#countUsedChampion(participant.championId, recentUsedChampions);

      totalKill += kill;
      totalDeath += death;
      totalAssist += assist;
      totalDamage += participant.stats.totalDamageDealtToChampions;
      totalCs += participant.stats.totalMinionsKilled + participant.stats.neutralMinionsKilled;

      participant.stats.win ? totalWin++ : totalFail++;
      totalGame++;

      return {
        icon: `https://lolcdn.darkintaqt.com/cdn/champion/${participant.championId}/tile`,
        kill,
        death,
        assist,
        isWin: participant.stats.win,
        time: this.#getGamePlayTime(match.gameCreationDate, match.gameDuration),
      };
    });

    const mostChamps = Array.from(recentUsedChampions.values())
      .reverse()
      .sort((a, b) => a.count - b.count)
      .slice(-3)
      .map((data) => ({
        icon: `https://lolcdn.darkintaqt.com/cdn/champion/${data.champId}/tile`,
      }))
      .reverse();

    return {
      kill: Math.floor(totalKill / totalGame),
      death: Math.floor(totalDeath / totalGame),
      assist: Math.floor(totalAssist / totalGame),
      damage: Math.floor(totalDamage / totalGame),
      cs: Math.floor(totalCs / totalGame),
      mostChamps,
      winningRate: Math.floor((totalWin / totalGame) * 100),
      totalWin,
      totalFail,
      stats,
    };
  }

  #getGamePlayTime(creationDate, duration) {
    const currentDate = new Date(creationDate);
    const hours = duration / 3600;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    currentDate.setHours(currentDate.getHours() + hours);
    currentDate.setMinutes(currentDate.getMinutes() + minutes);
    currentDate.setSeconds(currentDate.getSeconds() + seconds);

    return dayjs(currentDate.toISOString()).fromNow();
  }

  #countUsedChampion(champId, recentUsedChampions) {
    let data = recentUsedChampions.get(champId);
    if (!data) {
      const _data = {
        champId,
        count: 1,
      };
      recentUsedChampions.set(champId, _data);
    }

    data.count++;
    recentUsedChampions.set(champId, data);
  }
}

module.exports = {
  History,
};
