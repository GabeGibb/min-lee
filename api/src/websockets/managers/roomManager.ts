class RoomManager {
	private rooms: Map<string, Set<string>>;
	private usersToRooms: Map<string, string>;

	constructor() {
		this.rooms = new Map();
		this.usersToRooms = new Map();
	}

	createRoom() {
		const roomId = Math.random().toString(36).substring(7);
		this.rooms.set(roomId, new Set());
		return roomId;
	}

	addUserToRoom(roomId: string, userId: string) {
		// TODO: Handle room creation
		if (!this.rooms.has(roomId)) {
			this.rooms.set(roomId, new Set());
		}
		this.rooms.get(roomId)!.add(userId);

		this.usersToRooms.set(userId, roomId);
	}

	removeUserFromRoom(userId: string) {
		const roomId = this.usersToRooms.get(userId);

		if (roomId) {
			console.log(this.rooms.get(roomId));
			this.rooms.get(roomId)!.delete(userId);
			console.log(this.rooms.get(roomId));
			// TODO: Handle room deletion
			if (this.rooms.get(roomId)!.size === 0) {
				this.rooms.delete(roomId);
			}
		}
	}

	getRoom(roomId: string): Set<string> | undefined {
		return this.rooms.get(roomId);
	}

	getRoomIdByUserId(userId: string): string | undefined {
		return this.usersToRooms.get(userId);
	}

	getUsersInRoom(roomId: string): string[] {
		return Array.from(this.rooms.get(roomId) || []);
	}
}

export const roomManager = new RoomManager();
