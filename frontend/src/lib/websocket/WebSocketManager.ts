import { io, Socket } from "socket.io-client";
import { SocketEvents } from "@min-lee/types";

type Listener<T = any> = (data: T) => void;

export class WebSocketManager {
	private socket: Socket;
	private listeners: Map<keyof SocketEvents, Listener[]>;

	constructor(url: string) {
		this.socket = io(url);
		this.listeners = new Map();

		// Handle incoming messages
		this.socket.onAny((eventName: keyof SocketEvents, payload) => {
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
	subscribe<E extends keyof SocketEvents>(event: E, listener: Listener<SocketEvents[E]>) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, []);
		}
		this.listeners.get(event)?.push(listener);
	}

	/**
	 * Unsubscribe from an event
	 */
	unsubscribe<E extends keyof SocketEvents>(event: E, listener: Listener<SocketEvents[E]>) {
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
	emit<E extends keyof SocketEvents>(event: E, payload: SocketEvents[E]) {
		this.socket.emit(event, payload);
	}
}

// Singleton instance
const webSocketManagerInstance = new WebSocketManager("http://localhost:5000"); // TODO: Use environment variable
export default webSocketManagerInstance;
