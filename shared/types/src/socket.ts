export type RoomEvents = {
	"join-room": string; // roomId
	"leave-room": string; // roomId
	"user-joined": { userId: string; users: string[] };
	"user-left": { userId: string; users: string[] };
};

export type ChatEvents = {
	"send-message": { roomId: string; message: string };
	"receive-message": { userId: string; message: string };
};
