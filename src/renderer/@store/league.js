import { atom } from 'recoil';

// 'none' | 'champ-select' | 'loading' | 'in-game'
export const leagueStatusState = atom({
  key: 'league-status',
  default: 'none',
});

export const summonerState = atom({
  key: 'summoner',
  default: null,
});
