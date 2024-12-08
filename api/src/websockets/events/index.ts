import { Server, Socket } from "socket.io";
import { handleRoomEvents } from "./roomEvents";

export const registerSocketEvents = (io: Server, socket: Socket) => {
	handleRoomEvents(io, socket);
};
