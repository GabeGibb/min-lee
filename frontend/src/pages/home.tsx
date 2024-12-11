import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createRoom, getRoomById } from "@/lib/services/room";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
	const [joinRoomCode, setJoinRoomCode] = useState<string>("");
	const navigate = useNavigate();

	const handleCreateRoom = async () => {
		// Logic to create a room
		console.log("Create a room");
		try {
			const response = await createRoom();
			console.log(response);
			navigate(`/room/${response.roomId}`);
		} catch (e) {
			console.error(e);
		}
	};

	const handleJoinRoom = () => {
		// Logic to join a room with the code
		console.log("Join room with code:", joinRoomCode);
		try {
			getRoomById(joinRoomCode);
			navigate(`/room/${joinRoomCode}`);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="container mx-auto p-4 h-screen flex items-center justify-center">
			<div className="flex flex-col items-center">
				<Button onClick={handleCreateRoom} className="mb-4">
					{" "}
					Create Room{" "}
				</Button>
				<Input onChange={(e) => setJoinRoomCode(e.target.value)} />
				<Button onClick={handleJoinRoom}> Join Room </Button>
			</div>
		</div>
	);
};

export default Home;
