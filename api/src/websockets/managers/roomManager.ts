import { Room } from "./room";

class RoomManager {
	private rooms: Map<string, Room>;
	private usersToRooms: Map<string, string>;

	constructor() {
		this.rooms = new Map();
		this.usersToRooms = new Map();
	}

	createRoom(): string {
		const roomId = Math.random().toString(36).substring(7);
		this.rooms.set(roomId, new Room(roomId));
		return roomId;
	}

	addUserToRoom(roomId: string, userId: string): boolean {
		if (!this.rooms.has(roomId)) {
			this.rooms.set(roomId, new Room(roomId));
		}
		const room = this.rooms.get(roomId)!;
		const isHost = room.addUser(userId);

		this.usersToRooms.set(userId, roomId);
		return isHost;
	}

	removeUserFromRoom(userId: string): void {
		const roomId = this.usersToRooms.get(userId);
		if (roomId) {
			const room = this.rooms.get(roomId);
			if (room) {
				const wasHost = room.removeUser(userId);

				if (wasHost) {
					console.log(`Host ${userId} has left the room. No new host assigned.`);
				}

				if (room.isEmpty()) {
					this.rooms.delete(roomId); // Clean up empty room
				}
			}
			this.usersToRooms.delete(userId);
		}
	}

	getRoom(roomId: string): Room | undefined {
		return this.rooms.get(roomId);
	}

	getRoomIdByUserId(userId: string): string | undefined {
		return this.usersToRooms.get(userId);
	}

	getUsersInRoom(roomId: string): string[] {
		const room = this.rooms.get(roomId);
		return room ? room.getUsers() : [];
	}

	getHostInRoom(roomId: string): string | null {
		const room = this.rooms.get(roomId);
		return room ? room.hostId : null;
	}
}

export const roomManager = new RoomManager();
