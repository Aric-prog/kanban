import DbService from "@app/database/db";

export default class AccountRepository {
    constructor(private readonly db: DbService) {}

    async getAllUsers() {
        const { rows } = await this.db.query(
            `SELECT account.id, account.email, account.username, account.accounttype, account.accountstatus FROM account 
            JOIN reviewer ON account.id = reviewer.accountid`,
        );

        return rows as Account[];
    }
}
