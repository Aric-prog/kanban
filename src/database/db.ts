/* eslint-disable @typescript-eslint/no-explicit-any */

import { DB_RETRY_AMOUNT, DB_RETRY_INTERVAL_IN_SECOND } from "@app/constant/DbConstants";
import { sleep } from "@utils/utils";
import pg, { DatabaseError } from "pg";

export default class DbService {
    readonly pool: pg.Pool;
    constructor() {
        this.pool = new pg.Pool({
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
        });
    }

    async query(query: string, values?: any[]): Promise<pg.QueryResult<any>> {
        try {
            return await this.pool.query(query, values);
        } catch (err) {
            const dbError = err as pg.DatabaseError;

            // Unexpected errors
            throw err;
        }
    }

    async connect() {
        let retries = 0;
        while (retries <= DB_RETRY_AMOUNT) {
            try {
                console.log(`Attempting DB connection`);
                await this.pool.connect();
                return;
            } catch (err: unknown) {
                retries += 1;
                console.log(
                    `Connection with ${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT} failed, retry ${retries}`,
                );
                await sleep(DB_RETRY_INTERVAL_IN_SECOND * 1000);
            }
        }
        console.log("Could not connect to database, exiting program");
        process.exit(1);
    }
}
