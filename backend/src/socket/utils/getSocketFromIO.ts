import { Server } from "socket.io";

export const getSocketFromIO = (io: Server, socketID: string) => {
  const socket = io.sockets.sockets.get(socketID);
  if (!socket) throw new Error(`Socket (${socketID}) not found`);
  return socket;
};
