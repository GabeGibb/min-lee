export enum ClientToServerEvents {
	JoinRoom = "join-room",
	LeaveRoom = "leave-room",
}

export enum ServerToClientEvents {
	UserJoined = "user-joined",
	UserLeft = "user-left",
	HostAssigned = "host-assigned",
	HostLeft = "host-left",
}

export interface SocketEvents {
	// Event names mapped to their corresponding payloads
	[ClientToServerEvents.JoinRoom]: (roomId: string) => void;
	[ClientToServerEvents.LeaveRoom]: (roomId: string) => void;
	[ServerToClientEvents.UserJoined]: (data: { userId: string; isHost: boolean; users: string[] }) => void;
	[ServerToClientEvents.UserLeft]: (data: { userId: string; users: string[] }) => void;
	[ServerToClientEvents.HostAssigned]: (data: { hostId: string }) => void;
	[ServerToClientEvents.HostLeft]: (data: { hostId: string }) => void;
}
