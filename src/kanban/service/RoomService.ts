import DbService from "@app/database/db";
import { Room } from "@model/Room";
import { ROOM_ID_LENGTH, AVAILABLE_LETTERS } from "@app/constant/RoomConstants";
import RoomRepository from "@repository/RoomRepository";
import { randomIntFromInterval } from "@utils/utils";
import { createHash } from "crypto";
import HttpException from "@utils/HttpException";
import { STATUS_CODE } from "@app/constant/HttpConstants";
import jwt from "jsonwebtoken";
import { SECRET } from "@config/ApplicationConfig";
import { TokenData } from "@app/type/TokenData";

export default class RoomService {
    constructor(private readonly roomRepository: RoomRepository) {}

    async createRandomRoomId() {
        let roomId = "";
        let roomAlreadyExist = true;

        while (roomAlreadyExist) {
            roomId = "";
            for (let i = 0; i < ROOM_ID_LENGTH; i++) {
                roomId += AVAILABLE_LETTERS[randomIntFromInterval(0, AVAILABLE_LETTERS.length - 1)];
            }
            roomAlreadyExist = await this.doesRoomExist(roomId);
        }

        return roomId;
    }

    async createRoom(roomId: string, password: string) {
        if (await this.doesRoomExist(roomId))
            throw new HttpException("Room already exists", STATUS_CODE.FORBIDDEN);

        const room: Room = {
            id: roomId,
            password: this.createHashedPassword(roomId, password),
        };
        return await this.roomRepository.insertRoom(room);
    }

    createHashedPassword(roomId: string, password: string): string {
        const hash = createHash("sha256")
            .update(password + roomId)
            .digest("hex");
        return hash;
    }

    async doesRoomExist(roomId: string): Promise<boolean> {
        return (await this.roomRepository.findRoomById(roomId)) != undefined;
    }

    async authenticateUserForRoom(roomId: string, password: string) {
        const room: Room | null = await this.roomRepository.findRoomById(roomId);

        if (!room === null) throw new HttpException("Room does not exist", STATUS_CODE.NOT_FOUND);
        if (!room.password)
            throw new HttpException("Room uninitialized", STATUS_CODE.VALIDATION_FAILURE);

        const isPasswordCorrect = this.createHashedPassword(roomId, password) === room.password;
        if (!isPasswordCorrect)
            throw new HttpException("Incorrect password", STATUS_CODE.FORBIDDEN);

        const tokenData: TokenData = {
            roomId: roomId,
        };
        const authToken = jwt.sign(tokenData, SECRET, { expiresIn: "3d" });

        return authToken;
    }
}
