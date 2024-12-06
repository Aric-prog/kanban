import NoteService from "@service/NoteService";
import { Router, Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "@app/constant/HttpConstants";
import express from "express";
import RoomService from "@service/RoomService";
import asyncHandler from "express-async-handler";
import { Note, NoteStatus } from "@model/Note";
import { isAuthenticated } from "@middleware/isAuthenticated";

export default class KanbanController {
    public router: Router;
    constructor(
        private readonly noteService: NoteService,
        private readonly roomService: RoomService,
    ) {
        this.router = express.Router();

        // Room logic
        this.router.post("/room", asyncHandler(this.createRoom.bind(this)));
        this.router.get("/room", asyncHandler(this.getNewRoomId.bind(this)));
        this.router.post("/auth", asyncHandler(this.authenticateUserForRoom.bind(this)));

        // Note logic
        this.router.get("/note", isAuthenticated, asyncHandler(this.getAllNotes.bind(this)));
        this.router.post("/note", isAuthenticated, asyncHandler(this.createNoteForRoom.bind(this)));
        this.router.put("/note/update", isAuthenticated, asyncHandler(this.updateNote.bind(this)));
    }

    // Room endpoints
    async createRoom(req: Request, res: Response): Promise<any> {
        const roomId = req.body.roomId;
        const password = req.body.password;

        const token = await this.roomService.createRoom(roomId, password);
        return res
            .status(STATUS_CODE.OK)
            .json({ message: "Room succesfully created", roomId: roomId, token: token });
    }

    async getNewRoomId(req: Request, res: Response): Promise<any> {
        const roomId = await this.roomService.createRandomRoomId();
        return res.status(STATUS_CODE.OK).json({ message: roomId });
    }

    async authenticateUserForRoom(req: Request, res: Response): Promise<any> {
        const roomId = req.body.roomId;
        const password = req.body.password;

        const token = await this.roomService.authenticateUserForRoom(roomId, password);
        return res.status(STATUS_CODE.OK).json({ message: "Authenticated", token: token });
    }

    // Note endpoints
    async getAllNotes(req: Request, res: Response): Promise<any> {
        const roomId = res.locals.roomId;
        const notes: Note[] = await this.noteService.getAllNotesFromRoom(roomId);
        return res.status(STATUS_CODE.OK).json({ notes: notes });
    }

    async createNoteForRoom(req: Request, res: Response): Promise<any> {
        const roomId: string = res.locals.roomId;
        const updatedNote: Partial<Note> = req.body.note as Note;
        const note: Note = await this.noteService.createNoteForRoom(roomId, updatedNote);
        return res.status(STATUS_CODE.OK).json({ message: "Note succesfully created", note: note });
    }

    async updateNote(req: Request, res: Response): Promise<any> {
        const updatedNote: Note = req.body.note;
        const note: Note = await this.noteService.updateNote(updatedNote);
        return res.status(STATUS_CODE.OK).json({ message: "Note succesfully updated", note: note });
    }
}
