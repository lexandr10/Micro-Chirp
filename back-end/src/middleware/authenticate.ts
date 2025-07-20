import {Request, Response, NextFunction} from "express"

import HttpError from "../auth/helpers/httpError";
import { verifyAccessToken } from "../auth/helpers/jwt";
import { findUserById } from "../auth/services/user.service";

export interface AuthenticatedRequest extends Request {
    user?: { id: number;  username: string}
}

const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
      return next(HttpError(401, 'Authorization header not found'));
    }

    const [bearer, token] = authorization.split(' ');
    if (bearer !== "Bearer" || !token) {
        return next(HttpError(401, 'Invalid authorization format'));
    }

    try {
        const { id } = verifyAccessToken(token)
        const user = await findUserById(id)
        if (!user) {
            return next(HttpError(401, 'User not found'));
        }

        req.user = { id: user.id, username: user.username }
        
        next();

        
    } catch (error: any) {
        return next(HttpError(401, error.message || 'Invalid token'));
    }
}

export default authenticate;