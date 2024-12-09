import { Endpoints } from "@min-lee/types";
import { postData, getData } from "./api";

export async function createRoom(): Promise<any> {
	return postData(Endpoints.Room, {});
}

export async function getRoom(roomId: string): Promise<any> {
	return getData(`${Endpoints.Room}/${roomId}`);
}
