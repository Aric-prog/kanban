import DbService from "@app/database/db";
import { Note, NoteStatus } from "@model/Note";
import NoteRepository from "@repository/NoteRepository";

export default class NoteService {
    constructor(private readonly noteRepository: NoteRepository) {}

    async createNoteForRoom(roomId: string, note: Partial<Note>): Promise<Note> {
        return await this.noteRepository.insertNote(roomId, note);
    }

    async updateNote(note: Note): Promise<Note> {
        return await this.noteRepository.updateNote(note);
    }

    // Authenticate with middleware here
    async getAllNotesFromRoom(roomId: string) {
        return await this.noteRepository.getAllNotesFromRoom(roomId);
    }
}
