import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
	@type("string") sessionId!: string;
	@type("string") name!: string;

	constructor(sessionId: string, name: string) {
		super();
		this.sessionId = sessionId;
		this.name = name;
	}
}

export class GameState extends Schema {
	@type({ map: Player }) players: MapSchema<Player> = new MapSchema<Player>();
}
