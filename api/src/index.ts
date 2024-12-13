import http from "http";
import app from "./app"; // Import the Express app
import { setupColyseus } from "./colyseus";

const port = process.env.PORT || 5000;

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Set up WebSocket server
setupColyseus(server);

// Start the server
server.listen(port, () => {
	/* eslint-disable no-console */
	console.log(`Listening: http://localhost:${port}`);
	/* eslint-enable no-console */
});
