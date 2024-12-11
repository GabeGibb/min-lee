import { Server, Socket } from "socket.io";
import { roomManager } from "../managers/roomManager";
import { ClientToServerEvents, ServerToClientEvents, SocketEvents } from "@min-lee/types";

export const handleRoomEvents = (io: Server<SocketEvents, SocketEvents>, socket: Socket<SocketEvents, SocketEvents>) => {
	socket.on(ClientToServerEvents.JoinRoom, (roomId: string) => {
		const userId = socket.handshake.auth.sessionId;

		const isHost = roomManager.addUserToRoom(roomId, userId);
		socket.join(roomId);

		io.to(roomId).emit(ServerToClientEvents.UserJoined, {
			userId,
			isHost,
			users: roomManager.getUsersInRoom(roomId),
		});

		if (isHost) {
			io.to(roomId).emit(ServerToClientEvents.HostAssigned, {
				hostId: userId,
			});
		}
	});

	const leaveRoom = () => {
		const userId = socket.handshake.auth.sessionId;

		const roomId = roomManager.getRoomIdByUserId(userId);

		if (roomId) {
			// const wasHost = roomManager.removeUserFromRoom(userId);
			io.to(roomId).emit(ServerToClientEvents.UserLeft, {
				userId,
				users: roomManager.getUsersInRoom(roomId),
			});

			// if (wasHost) {
			// 	io.to(roomId).emit(ServerToClientEvents.HostLeft, {
			// 		hostId: userId,
			// 	});
			// }
		}
	};

	socket.on("disconnect", leaveRoom);
};
