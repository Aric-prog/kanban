import DbService from "@app/database/db";
import { Note } from "@model/Note";

export default class NoteRepository {
    constructor(private readonly db: DbService) {}

    async updateNote(note: Note) {
        const { rows } = await this.db.query(
            `UPDATE note SET title=$1 noteDescription=$2, noteStatus=$3, dueDate=$4 WHERE id=$5 RETURNING *`,
            [note.title, note.notedescription, note.notestatus, note.duedate, note.id],
        );
        return rows[0] as Note;
    }

    async insertNote(roomId: string, note: Partial<Note>) {
        const { rows } = await this.db.query(
            `INSERT INTO note(title, notedescription, notestatus, duedate, roomId) 
            VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [note.title, note.notedescription, note.notestatus, note.duedate, roomId],
        );
        return rows[0] as Note;
    }

    async getAllNotesFromRoom(roomId: string) {
        const { rows } = await this.db.query(
            `SELECT * FROM note JOIN room ON room.id = note.roomid`,
        );
        return rows as Note[];
    }
}
