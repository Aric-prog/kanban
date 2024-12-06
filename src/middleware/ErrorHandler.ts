import BaseHttpException from "@utils/HttpException";
import { NextFunction, Request, Response } from "express";

export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): any => {
    console.log(err);
    if (err instanceof BaseHttpException) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(res.statusCode).json({ message: "Unexpected server side error" });
};
