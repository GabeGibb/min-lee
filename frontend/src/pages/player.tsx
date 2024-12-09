import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientToServerEvents, ServerToClientEvents } from "@min-lee/types";
import { useWebSocket } from "@/lib/websocket/WebSocketContext";

const PlayerRoom: React.FC = () => {
	const { roomId } = useParams<{ roomId: string }>();
	const webSocket = useWebSocket();

	const [users, setUsers] = useState<string[]>([]);

	useEffect(() => {
		if (users.length === 0) {
			webSocket.emit(ClientToServerEvents.JoinRoom, roomId); // Type-safe event name
			console.log(`Joined room: ${roomId}`);

			webSocket.subscribe(ServerToClientEvents.UserJoined, (data) => {
				console.log(JSON.stringify(data));
				setUsers(data.users);
			});

			webSocket.subscribe(ServerToClientEvents.UserLeft, (data) => {
				console.log(JSON.stringify(data));
				setUsers(data.users);
			});

			return () => {
				webSocket.emit(ClientToServerEvents.LeaveRoom, roomId); // Leave room when component unmounts
				// TODO: Unsub
			};
		}
	}, [roomId, webSocket]);

	return (
		<div>
			<h1>Player Room</h1>
			<p>Room ID: {roomId}</p>
			<p>Users: {users.join(", ")}</p>
		</div>
	);
};

export default PlayerRoom;
