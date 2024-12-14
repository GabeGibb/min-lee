import { GameState } from "@min-lee/types";
import { Client, Room } from "colyseus.js";

type Listener<T = any> = (data: T) => void;

export class ColyseusManager {
	public client: Client;
	private listeners: Map<string, Listener[]> = new Map();

	constructor(url: string) {
		this.client = new Client(url);
	}

	/**
	 * Subscribe to an event
	 */
	// subscribe<E>(event: string, listener: Listener<E>) {
	// 	if (!this.listeners.has(event)) {
	// 		this.listeners.set(event, []);
	// 	}
	// 	this.listeners.get(event)?.push(listener);
	// }

	// /**
	//  * Unsubscribe from an event
	//  */
	// unsubscribe<E>(event: string, listener: Listener<E>) {
	// 	const eventListeners = this.listeners.get(event);
	// 	if (eventListeners) {
	// 		this.listeners.set(
	// 			event,
	// 			eventListeners.filter((l) => l !== listener)
	// 		);
	// 	}
	// }

	/**
	 * Emit an event manually to listeners
	 */
	// emit<E>(event: string, payload: E) {
	// 	const eventListeners = this.listeners.get(event);
	// 	if (eventListeners) {
	// 		eventListeners.forEach((listener) => listener(payload));
	// 	}
	// }

	/**
	 * Join a room by ID
	 */
	async joinRoom(roomId: string, options: any = {}): Promise<Room<GameState>> {
		try {
			const room = await this.client.joinById<GameState>(roomId, options);

			// Log initial state
			room.onStateChange.once((state) => {
				console.log("Initial state:", state.players.toJSON());
			});

			// Debug messages
			room.onMessage("debug", (message) => {
				console.log("DEBUG: ", message);
			});

			// Error listener
			room.onError((code, message) => {
				console.error(`Room error: [${code}] ${message}`);
			});

			// Leave listener
			room.onLeave((code) => {
				console.log(`Room left: ${roomId}, Code: ${code}`);
			});

			return room;
		} catch (error) {
			console.error(`Failed to join room: ${error}`);
			throw error;
		}
	}

	/**
	 * Leave a room by ID
	 */
	leaveRoom(roomId: string) {}
}

// Singleton instance
const colyseusManager = new ColyseusManager("ws://localhost:5000"); // TODO: Use environment variable
export default colyseusManager;
