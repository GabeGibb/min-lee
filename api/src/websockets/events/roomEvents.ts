import { Server, Socket } from "socket.io";
import { roomManager } from "../managers/roomManager";

export const handleRoomEvents = (io: Server, socket: Socket) => {
	socket.on("join-room", (roomId: string) => {
		roomManager.addUserToRoom(roomId, socket.id);
		socket.join(roomId);

		io.to(roomId).emit("user-joined", {
			userId: socket.id,
			users: roomManager.getUsersInRoom(roomId),
		});
	});

	socket.on("leave-room", (roomId: string) => {
		roomManager.removeUserFromRoom(roomId, socket.id);
		socket.leave(roomId);

		io.to(roomId).emit("user-left", {
			userId: socket.id,
			users: roomManager.getUsersInRoom(roomId),
		});
	});
};
