import DbService from "@app/database/db";
import { Note, NoteStatus } from "@model/Note";
import NoteRepository from "@repository/NoteRepository";

export default class NoteService {
    constructor(private readonly noteRepository: NoteRepository) {}

    async createNoteForRoom(roomId: string, note: string) {}

    async updateNoteStatus(noteId: number, note: Note) {}

    // Authenticate with middleware here
    async getAllNotes(roomId: number) {}
}
