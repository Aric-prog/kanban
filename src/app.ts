import { ApplicationOptions } from "@config/ApplicationConfig";
import path from "path";
import * as dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import fs from "fs";
import { ErrorHandler } from "@middleware/ErrorHandler";
import DbService from "./database/db";

export default class App {
    constructor(options: ApplicationOptions) {
        this.setup(options);
    }

    async setup(options: ApplicationOptions) {
        dotenv.config({ path: path.resolve(__dirname, "../.env") });

        const server = express();

        server.use(express.json());
        server.use(morgan(options.morganConfig.format));
        server.use(
            morgan(options.morganConfig.format, {
                stream: fs.createWriteStream("./access.log", { flags: "a" }),
            }),
        );

        server.use(ErrorHandler);

        // Tests db connection
        const dbService: DbService = new DbService();
        await dbService.connect();

        console.log(`Connection succesful!`);
        server.listen(process.env.BACKEND_PORT || 8000, () => {
            console.log(
                `Server (${process.env.DOMAIN}) is running at PORT : ${
                    process.env.BACKEND_PORT || 8000
                }`,
            );
        });
    }
}
