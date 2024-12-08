import { useWebSocket } from "@/lib/websocket/WebSocketContext";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const PlayerRoom: React.FC = () => {
	const { roomId } = useParams<{ roomId: string }>();
	const webSocket = useWebSocket();

	useEffect(() => {
		if (roomId) {
			webSocket.emit("join-room", roomId);
			console.log(`Joined room: ${roomId}`);
		}
	}, [roomId, webSocket]);

	return (
		<div>
			<h1>Player Room</h1>
			<p>Room ID: {roomId}</p>
		</div>
	);
};

export default PlayerRoom;
