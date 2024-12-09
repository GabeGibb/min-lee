import express from "express";
import { roomManager } from "../websockets/managers/roomManager";

const router = express.Router();

// Define your routes
router.get("/:roomId", (req, res) => {
	const { roomId } = req.params;
	if (!roomId) {
		return res.status(400).json({
			message: "Room ID is required",
		});
	}

	if (roomManager.getRoom(roomId)) {
		return res.status(200).json({
			message: "Room exists",
		});
	} else {
		return res.status(404).json({
			message: "Room does not exist",
		});
	}
});

router.post("/", (req, res) => {
	const roomId = roomManager.createRoom();
	return res.status(201).json({
		message: "Room created",
		roomId,
	});
});

export default router;
