import DbService from "@app/database/db";
import { Note } from "@model/Note";

export default class NoteRepository {
    constructor(private readonly db: DbService) {}

    async updateNote(note: Note) {}

    async insertNote(roomId: string, note: Note) {
        const { rows } = await this.db.query(
            `SELECT account.id, account.email, account.username, account.accounttype, account.accountstatus FROM account 
            JOIN reviewer ON account.id = reviewer.accountid`,
        );

        return rows;
    }
}
