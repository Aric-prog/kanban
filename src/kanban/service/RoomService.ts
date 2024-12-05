import DbService from "@app/database/db";
import { Room } from "@model/Room";
import RoomRepository from "@repository/RoomRepository";

export default class RoomService {
    constructor(private readonly roomRepository: RoomRepository) {}

    async createRoom(password: string) {
        const generatedId = "random";
        const room: Room = {
            id: "",
            hashedpassword: this.createHashedPassword(generatedId, password),
        };
        return this.roomRepository.createRoom(room);
    }

    createHashedPassword(roomId: string, password: string): string {
        return "hashed";
    }

    async doesRoomExist(roomId: string) {}

    async authenticateUserForRoom(roomId: string, password: string) {
        const roomHasPassword = false;
        let authToken = "";

        if (!roomHasPassword) return "";

        authToken = "makeshitup";
        return authToken;
    }
}
