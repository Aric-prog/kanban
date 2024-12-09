import { ApplicationOptions } from "@config/ApplicationConfig";
import path from "path";
import * as dotenv from "dotenv";
import morgan from "morgan";
import express, { Express } from "express";
import fs from "fs";
import { ErrorHandler } from "@middleware/ErrorHandler";
import RoomRepository from "@repository/RoomRepository";
import NoteRepository from "@repository/NoteRepository";
import DbService from "@app/database/db";
import cors from "cors";
import RoomService from "@service/RoomService";
import NoteService from "@service/NoteService";
import KanbanController from "@app/kanban/controllers/KanbanController";

export default class App {
    readonly server: Express;

    constructor(options: ApplicationOptions) {
        this.server = express();
        this.setup(options);
        this.bindServices();
    }

    setup(options: ApplicationOptions) {
        dotenv.config({ path: path.resolve(__dirname, "../.env") });
        this.server.use(cors());
        this.server.use(morgan(options.morganConfig.format));
        this.server.use(
            morgan(options.morganConfig.format, {
                stream: fs.createWriteStream("./access.log", { flags: "a" }),
            }),
        );
        this.server.use(express.json());
    }

    async bindServices(): Promise<void> {
        // Tests db connection
        const dbService: DbService = new DbService();
        await dbService.connect();

        console.log(`Connection succesful!`);

        const roomRepository = new RoomRepository(dbService);
        const noteRepository = new NoteRepository(dbService);

        const roomService = new RoomService(roomRepository);
        const noteService = new NoteService(noteRepository);

        const kanbanController = new KanbanController(noteService, roomService);

        this.server.use("/api", kanbanController.router);
        this.server.use(ErrorHandler);

        this.server.listen(process.env.BACKEND_PORT || 8000, () => {
            console.log(
                `Server (${process.env.DOMAIN}) is running at PORT : ${
                    process.env.BACKEND_PORT || 8000
                }`,
            );
        });
    }
}
