import { Server, Socket } from "socket.io";
import { roomManager } from "../managers/roomManager";
import { ClientToServerEvents, ServerToClientEvents, SocketEvents } from "@min-lee/types";

export const handleRoomEvents = (io: Server<SocketEvents, SocketEvents>, socket: Socket<SocketEvents, SocketEvents>) => {
	socket.on(ClientToServerEvents.JoinRoom, (roomId: string) => {
		roomManager.addUserToRoom(roomId, socket.id);
		socket.join(roomId);

		io.to(roomId).emit(ServerToClientEvents.UserJoined, {
			userId: socket.id,
			users: roomManager.getUsersInRoom(roomId),
		});
	});

	// TODO: This can be a manual call? Might not need this.
	const leaveRoom = () => {
		const userId = socket.id;

		// Find the room(s) the user is part of
		const roomId = roomManager.getRoomIdByUserId(userId);

		if (roomId) {
			// Remove the user from the room in RoomManager
			roomManager.removeUserFromRoom(userId);

			// Leave the socket.io room
			socket.leave(roomId);

			// Notify other users in the room
			io.to(roomId).emit(ServerToClientEvents.UserLeft, {
				userId,
				users: roomManager.getUsersInRoom(roomId),
			});
		}
	};

	socket.on(ClientToServerEvents.LeaveRoom, leaveRoom);
	socket.on("disconnect", leaveRoom);
};
