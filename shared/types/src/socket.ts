export enum ClientToServerEvents {
	JoinRoom = "join-room",
	LeaveRoom = "leave-room",
}

export enum ServerToClientEvents {
	UserJoined = "user-joined",
	UserLeft = "user-left",
}

export interface SocketEvents {
	// Event names mapped to their corresponding payloads
	[ClientToServerEvents.JoinRoom]: (roomId: string) => void;
	[ClientToServerEvents.LeaveRoom]: (roomId: string) => void;
	[ServerToClientEvents.UserJoined]: (data: { userId: string; users: string[] }) => void;
	[ServerToClientEvents.UserLeft]: (data: { userId: string; users: string[] }) => void;
}
