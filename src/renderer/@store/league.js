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

export const myTeamSummonersState = atom({
  key: 'my-team-summoners',
  default: null,
});

export const normalGameRoomIdState = atom({
  key: 'normal-game-room-id',
  default: null,
})