import jwt from "jsonwebtoken"
import "dotenv/config"

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error('JWT secrets are not properly set in .env file');
}

interface JwtPayload {
    id: number;
    username: string;
}


export const createAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "15m" });
}

export const createRefreshToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayload;
}

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, JWT_REFRESH_SECRET) as JwtPayload;
}