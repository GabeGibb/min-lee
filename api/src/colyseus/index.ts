import { Server } from "colyseus";
import { GameRoom } from "./room";

export const setupColyseus = (httpServer: any) => {
	const gameServer = new Server({
		server: httpServer,
	});

	gameServer.define("game_room", GameRoom);
};
