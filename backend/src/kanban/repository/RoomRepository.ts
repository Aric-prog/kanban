import DbService from "@app/database/db";
import { Room } from "@model/Room";

export default class RoomRepository {
    constructor(private readonly db: DbService) {}

    async findRoomById(roomId: string): Promise<Room> {
        const { rows } = await this.db.query(
            `SELECT room.id, room.password FROM room WHERE room.id = $1`,
            [roomId],
        );

        return rows[0] as Room;
    }

    async insertRoom(room: Room) {
        const { rows } = await this.db.query(
            `INSERT INTO room(id, password) 
            VALUES($1, $2) RETURNING *`,
            [room.id, room.password],
        );
        return rows[0] as Room;
    }

    async updateRoomPassword(room: Room) {
        const { rows } = await this.db.query(
            `UPDATE room SET room.password = $1 WHERE room.id = $2 RETURNING *`,
            [room.password, room.id],
        );
        return rows[0] as Room;
    }
}
