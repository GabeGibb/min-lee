class RoomManager {
	private rooms: Map<string, Set<string>>;

	constructor() {
		this.rooms = new Map();
	}

	addUserToRoom(roomId: string, userId: string) {
		if (!this.rooms.has(roomId)) {
			this.rooms.set(roomId, new Set());
		}
		this.rooms.get(roomId)!.add(userId);
	}

	removeUserFromRoom(roomId: string, userId: string) {
		if (this.rooms.has(roomId)) {
			this.rooms.get(roomId)!.delete(userId);
			if (this.rooms.get(roomId)!.size === 0) {
				this.rooms.delete(roomId);
			}
		}
	}

	getUsersInRoom(roomId: string): string[] {
		return Array.from(this.rooms.get(roomId) || []);
	}
}

export const roomManager = new RoomManager();
