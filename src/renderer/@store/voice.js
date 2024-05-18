import { atom } from "recoil";

export const userDeviceIdState = atom({
  key: 'user-device-id',
  default: 'default',
});

export const userStreamState = atom({
  key: 'user-stream',
  default: null,
});
