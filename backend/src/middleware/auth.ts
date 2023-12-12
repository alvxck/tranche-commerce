import { Request, Response, NextFunction } from "express";
import { MissingTokenError, InvalidTokenError } from "../types/errors.js";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret: Secret = process.env.JWT_SECRET || "";

export const auth = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        // Get token from header
        const token = req.headers["tc-auth-token"];
        if (!token) { throw new MissingTokenError("Missing authentication token."); }

        // Decode token
        const decodedToken = decodeURI(token as string)
        if (!decodedToken) { throw new InvalidTokenError("Invalid authentication token."); }

        // Verify token
        jwt.verify(decodedToken, jwtSecret) as JwtPayload;

    } catch (e) {
        if (e instanceof MissingTokenError || e instanceof InvalidTokenError) {
            res.status(e.statusCode).json({ error: e.message });
        } else {
            res.status(500).json({ error: "Internal Server Error." });
        }
    }

    next();
}