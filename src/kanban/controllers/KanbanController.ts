import NoteService from "@service/NoteService";
import { Router, Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "@app/constant/HttpConstants";
import express from "express";
import RoomService from "@service/RoomService";
import asyncHandler from "express-async-handler";
import { Note, NoteStatus } from "@model/Note";

export default class KanbanController {
    public router: Router;
    constructor(
        private readonly noteService: NoteService,
        private readonly roomService: RoomService,
    ) {
        this.router = express.Router();

        // Room logic
        this.router.post("/room", asyncHandler(this.createRoom));
        this.router.get("/room/id", asyncHandler(this.getNewRoomId));
        this.router.post("/auth", asyncHandler(this.authenticateUserForRoom));

        // Note logic
        this.router.post("/note", asyncHandler(this.createNoteForRoom));
        this.router.put("/note/update", asyncHandler(this.updateNote));
    }

    async createRoom(req: Request, res: Response): Promise<any> {
        const roomId = await this.roomService.createRoom(req.body, req.body);
        return res.status(STATUS_CODE.OK).json({ message: roomId });
    }

    async getNewRoomId(req: Request, res: Response): Promise<any> {
        const roomId = await this.roomService.createRandomRoomId();
        return res.status(STATUS_CODE.OK).json({ message: roomId });
    }

    async authenticateUserForRoom(req: Request, res: Response): Promise<any> {
        const [password, roomId] = req.body;
        const token = this.roomService.authenticateUserForRoom(roomId, password);

        return res.status(STATUS_CODE.OK).json({ message: "Authenticated", token: token });
    }

    // Authenticate here
    async createNoteForRoom(req: Request, res: Response): Promise<any> {
        const updatedNote: Partial<Note> = req.body;
        const roomId: string = req.body;

        const note: Note = await this.noteService.createNoteForRoom(roomId, updatedNote);

        return res.status(STATUS_CODE.OK).json({ message: "Note succesfully created", note: note });
    }

    // Authenticate here too
    async updateNote(req: Request, res: Response): Promise<any> {
        const updatedNote: Note = req.body;

        const note: Note = await this.noteService.updateNote(updatedNote);

        return res.status(STATUS_CODE.OK).json({ message: "Note succesfully updated", note: note });
    }
}
