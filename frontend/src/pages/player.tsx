import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useColyseus } from "@/lib/websocket/ColyseusContext";

const PlayerRoom: React.FC = () => {
	const { roomId } = useParams<{ roomId: string }>();
	const colyseusManager = useColyseus();

	const [users, setUsers] = useState<string[]>([]);

	useEffect(() => {
		async function joinRoom() {
			if (users.length === 0 && roomId) {
				const room = await colyseusManager.joinRoom(roomId);
			}
		}

		joinRoom();
	}, [roomId, colyseusManager]);

	return (
		<div>
			<h1>Player Room</h1>
			<p>Room ID: {roomId}</p>
			<p>Users: {users.join(", ")}</p>
		</div>
	);
};

export default PlayerRoom;
