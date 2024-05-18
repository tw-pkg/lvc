import { io } from 'socket.io-client';
import { PATH } from '../constants/path';

export const connectChatSocket = (namespace) => {
  return io(PATH.SERVER.CHAT + namespace, { transports: ['websocket'] });
};

export const connectMediaSocket = (namespace) => {
  return io(PATH.SERVER.MEDIA + namespace, { transports: ['websocket'] });
};
