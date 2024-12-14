import { Client, Room } from "colyseus";
import { GameState, Player } from "@min-lee/types";
export class GameRoom extends Room<GameState> {
	// When room is initialized
	onCreate(options: any) {
		this.setState(new GameState());
		this.autoDispose = false; // Set to false to prevent automatic disposal
	}

	// When client successfully joins the room
	onJoin(client: Client, options: any, auth: any) {
		const newPlayer = new Player(client.sessionId, options.name || "Anonymous");
		this.state.players.set(client.sessionId, newPlayer);
		this.broadcast("debug", this.state.players.toJSON());
		console.log(this.state.players.get(client.sessionId));
	}

	// When a client leaves the room
	onLeave(client: Client, consented: boolean) {
		this.state.players.delete(client.sessionId);
	}

	// Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
	onDispose() {}
}
