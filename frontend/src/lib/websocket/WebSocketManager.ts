import { io, Socket } from "socket.io-client";

type Listener<T = any> = (data: T) => void;

export class WebSocketManager {
	private socket: Socket;
	private listeners: Map<string, Listener[]>;

	constructor(url: string) {
		this.socket = io(url); // Use Socket.IO client
		this.listeners = new Map();

		// Handle incoming messages
		this.socket.onAny((eventName, payload) => {
			const eventListeners = this.listeners.get(eventName);
			if (eventListeners) {
				eventListeners.forEach((listener) => listener(payload));
			}
		});

		this.socket.on("connect", () => console.log("Socket.IO connected"));
		this.socket.on("disconnect", () => console.log("Socket.IO disconnected"));
		this.socket.on("connect_error", (error) => console.error("Socket.IO error:", error));
	}

	/**
	 * Subscribe to an event
	 */
	subscribe<T>(event: string, listener: Listener<T>) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, []);
		}
		this.listeners.get(event)?.push(listener);
	}

	/**
	 * Unsubscribe from an event
	 */
	unsubscribe<T>(event: string, listener: Listener<T>) {
		const eventListeners = this.listeners.get(event);
		if (eventListeners) {
			this.listeners.set(
				event,
				eventListeners.filter((l) => l !== listener)
			);
		}
	}

	/**
	 * Emit an event
	 */
	emit<T>(event: string, payload: T) {
		this.socket.emit(event, payload);
	}
}

// Singleton instance
const webSocketManagerInstance = new WebSocketManager("http://localhost:5000"); // TODO: Use environment variable
export default webSocketManagerInstance;
