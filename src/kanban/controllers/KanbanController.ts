import NoteService from "@service/NoteService";
import { Router, Request, Response, NextFunction } from "express";
import express from "express";
import RoomService from "@service/RoomService";
import asyncHandler from "express-async-handler";

export default class KanbanController {
    public router: Router;
    constructor(
        private readonly noteService: NoteService,
        private readonly roomService: RoomService,
    ) {
        this.router = express.Router();
        this.router.get("/", asyncHandler(this.createRoom));
        this.router.post("/password", this.createRoomWithPassword);
    }

    async createRoom(req: Request, res: Response, next: NextFunction): Promise<any> {
        const roomId = await this.roomService.createRoom(req.body);

        return res.status(200).json({ message: roomId });
    }

    async createRoomWithPassword(req: Request, res: Response): Promise<any> {
        return res.status(200).json({});
    }

    async authenticateUserForRoom(req: Request, res: Response): Promise<any> {
        return false;
    }

    async doesRoomExist(req: Request, res: Response): Promise<any> {
        return false;
    }

    async createNoteForRoom(req: Request, res: Response): Promise<any> {
        return false;
    }

    async updateNoteStatus(req: Request, res: Response): Promise<any> {
        return false;
    }
}
