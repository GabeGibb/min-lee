import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const Home: React.FC = () => {
	const [joinRoomCode, setJoinRoomCode] = useState("");

	const handleCreateRoom = () => {
		// Logic to create a room
		console.log("Create a room");
	};

	const handleJoinRoom = () => {
		// Logic to join a room with the code
		console.log("Join room with code:", joinRoomCode);
	};

	return (
		<div className="container mx-auto p-4 h-screen flex items-center justify-center">
			<div className="flex flex-col items-center">
				<Button onClick={handleCreateRoom} className="mb-4">
					{" "}
					Create Room{" "}
				</Button>
				<Input />
				<Button onClick={handleJoinRoom}> Join Room </Button>
			</div>
		</div>
	);
};

export default Home;
