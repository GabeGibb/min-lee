import { Server, Socket } from "socket.io";
import { registerSocketEvents } from "./events/index";

export const setupWebSocketServer = (httpServer: any): Server => {
	const io = new Server(httpServer, {
		cors: {
			origin: "*",
		},
	});

	io.on("connection", (socket: Socket) => {
		console.log(`WebSocket connected: ${socket.id}`);
		registerSocketEvents(io, socket);

		socket.on("disconnect", () => {
			console.log(`WebSocket disconnected: ${socket.id}`);
		});
	});

	return io;
};
