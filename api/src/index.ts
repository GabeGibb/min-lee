import http from "http";
import app from "./app"; // Import the Express app
import { setupWebSocketServer } from "./websockets";

const port = process.env.PORT || 5000;

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set up WebSocket server
setupWebSocketServer(server);

// Start the server
server.listen(port, () => {
	/* eslint-disable no-console */
	console.log(`Listening: http://localhost:${port}`);
	/* eslint-enable no-console */
});
