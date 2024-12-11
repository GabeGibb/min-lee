import { Server, Socket } from "socket.io";
import { registerSocketEvents } from "./events/index";
import { randomUUID } from "crypto";

interface Session {
	id: string;
	expiresAt: number; // Expiration timestamp
}

const sessions: { [key: string]: Session } = {};

const SESSION_TTL = 60 * 60 * 1000; // 1 hour

export const setupWebSocketServer = (httpServer: any): Server => {
	const io = new Server(httpServer, {
		cors: {
			origin: "*", // TODO: Fix
		},
		cookie: true,
	});

	io.on("connection", (socket) => {
		registerSocketEvents(io, socket);

		let sessionId = socket.handshake.auth.sessionId;

		if (!sessionId || !sessions[sessionId] || sessions[sessionId].expiresAt < Date.now()) {
			// Generate new session ID
			sessionId = randomUUID();
			sessions[sessionId] = {
				id: sessionId,
				expiresAt: Date.now() + SESSION_TTL,
			};
			console.log(`New session created: ${sessionId}`);
		} else {
			console.log(`Session reused: ${sessionId}`);
		}

		// Send sessionId back to client
		socket.emit("session", { sessionId });

		// Cleanup on disconnect (optional)
		socket.on("disconnect", () => {
			console.log(`Socket disconnected for session: ${sessionId}`);
		});
	});

	// Periodic cleanup of expired sessions
	setInterval(() => {
		const now = Date.now();
		for (const sessionId in sessions) {
			if (sessions[sessionId].expiresAt < now) {
				delete sessions[sessionId];
				console.log(`Session invalidated: ${sessionId}`);
			}
		}
	}, 10 * 60 * 1000); // Run cleanup every 10 minutes

	return io;
};
