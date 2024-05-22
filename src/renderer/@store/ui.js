import { atom } from "recoil";

export const LNBState = atom({
  key: 'LNB',
  default: {
    isShow: true,
    summoner: null,
  },
});
