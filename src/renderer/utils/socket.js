import { io } from 'socket.io-client';
import { PATH } from '../constants/path';

export const createSocket = (namespace) => {
  return io(PATH.SERVER.CHAT + namespace, { transports: ['websocket'] });
};
