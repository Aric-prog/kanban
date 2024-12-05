import DbService from "@app/database/db";
import { Room } from "@model/Room";

export default class RoomRepository {
    constructor(private readonly db: DbService) {}

    async findRoomById(roomId: string): Promise<Room> {
        const { rows } = await this.db.query(
            `SELECT account.id, account.email, account.username, account.accounttype, account.accountstatus FROM account 
            JOIN reviewer ON account.id = reviewer.accountid`,
        );

        return rows[0] as Room;
    }

    async createRoom(room: Room) {
        const { rows } = await this.db.query(
            `SELECT account.id, account.email, account.username, account.accounttype, account.accountstatus FROM account 
            JOIN reviewer ON account.id = reviewer.accountid`,
        );

        return rows;
    }
}
