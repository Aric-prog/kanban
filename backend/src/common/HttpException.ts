export default class HttpException extends Error {
    constructor(message: string, public statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}
