const dayjs = require('dayjs');
require('dayjs/locale/ko');
dayjs.locale('ko');
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const RECENT_PVP_MATCH_COUNT = 10;

class History {
  constructor(data) {
    this.matches = data.games.games.filter(match => match.gameType !== 'CUSTOM_GAME');
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
      const { participants, gameCreationDate, gameDuration } = match;
      const { stats, championId } = participants[0];
      const {
        kills,
        deaths,
        assists,
        totalDamageDealtToChampions,
        totalMinionsKilled,
        neutralMinionsKilled,
        win
      } = stats;

      this.#countUsedChampion(championId, recentUsedChampions);

      totalKill += kills;
      totalDeath += deaths;
      totalAssist += assists;
      totalDamage += totalDamageDealtToChampions;
      totalCs += totalMinionsKilled + neutralMinionsKilled;
      win ? totalWin++ : totalFail++;
      totalGame += 1;

      return {
        icon: `https://lolcdn.darkintaqt.com/cdn/champion/${championId}/tile`,
        kill: kills,
        death: deaths,
        assist: assists,
        isWin: win,
        time: this.#getGamePlayTime(gameCreationDate, gameDuration),
      };
    });

    return {
      kill: Math.floor(totalKill / totalGame),
      death: Math.floor(totalDeath / totalGame),
      assist: Math.floor(totalAssist / totalGame),
      damage: Math.floor(totalDamage / totalGame),
      cs: Math.floor(totalCs / totalGame),
      mostChamps: this.#getMostChamps(recentUsedChampions),
      winningRate: Math.floor((totalWin / totalGame) * 100),
      totalWin,
      totalFail,
      stats,
    };
  }

  #getGamePlayTime(creationDate, duration) {
    const currentDate = new Date(creationDate);
    currentDate.setHours(currentDate.getHours() + duration / 3600);
    currentDate.setMinutes(currentDate.getMinutes() + Math.floor(duration / 60));
    currentDate.setSeconds(currentDate.getSeconds() + duration % 60);

    return dayjs(currentDate.toISOString()).fromNow();
  }

  #countUsedChampion(champId, recentUsedChampions) {
    let champ = recentUsedChampions.get(champId);

    if(champ) {
      champ.count++;
      recentUsedChampions.set(champId, champ);
      return;
    }

    recentUsedChampions.set(champId, {
      champId,
      count: 1
    });
  }

  #getMostChamps(recentUsedChampions) {
    return Array.from(recentUsedChampions.values())
      .reverse()
      .sort((a, b) => a.count - b.count)
      .slice(-3)
      .map((champ) => ({
        icon: `https://lolcdn.darkintaqt.com/cdn/champion/${champ.champId}/tile`,
      }))
      .reverse();
  }
}

module.exports = History;
