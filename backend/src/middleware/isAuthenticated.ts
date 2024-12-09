import { STATUS_CODE } from "@app/constant/HttpConstants";
import { TokenData } from "@app/type/TokenData";
import { SECRET } from "@config/ApplicationConfig";
import HttpException from "@utils/HttpException";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): any => {
    const bearer = req.headers.authorization ?? "";
    const tokenSplit = bearer.split("Bearer");

    if (tokenSplit.length != 2)
        return next(new HttpException("User not authenticated", STATUS_CODE.FORBIDDEN));

    const token = tokenSplit[1].trim();
    const decoded = jwt.verify(token, SECRET) as TokenData;
    res.locals = {
        roomId: decoded.roomId,
    };

    return next();
};
