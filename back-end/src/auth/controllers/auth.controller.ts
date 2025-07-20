import { Request, Response, NextFunction } from "express"

import { createUser, findUserById, findUserByUsername } from "../services/user.service"
import HttpError from "../helpers/httpError"
import { NewUser } from "../../schemas/schemas"
import compareHash from "../helpers/comparePass"
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../helpers/jwt"
import { createRefreshTokenInDb, deleteRefreshToken, findRefreshToken } from "../services/token.service"
import { AuthenticatedRequest } from "../../middleware/authenticate"
import ctrlWrapper from "../decorators/ctrlWrapper"


export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw HttpError(400, 'Username and password are required');
    }
    const existUser = await findUserByUsername(username);
    if (existUser) {
      throw HttpError(409, 'Username already use');
    }
    const userData: NewUser = {
        username,
        hash_password: password
    };

    const user = await createUser(userData);

    const payload = { id: user.id, username: user.username }
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    await createRefreshTokenInDb({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    

    res
      .cookie('refresh_tokens', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
        .json({
        accessToken,
        id: user.id,
        username: user.username,
      });
    
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    const checkUsername = await findUserByUsername(username)
    if (!checkUsername) {
        throw HttpError(409, "Username or password invalid")
    }
    const comparePass = await compareHash(password, checkUsername.hash_password)
    if (!comparePass) {
        throw HttpError(409, "Username or password invalid")
    }

    const payload = { id: checkUsername.id, username: checkUsername.username };
    const accessToken = createAccessToken(payload)
    const refreshToken = createRefreshToken(payload)

    await createRefreshTokenInDb({
        user_id: checkUsername.id,
        token: refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.cookie('refresh_tokens', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({accessToken});

}

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    
    if (!user) {
        throw HttpError(401, 'Not authenticated');
    }
    res.json({id: user.id, username: user.username})
};

export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh_tokens;
    if (refreshToken) {
        await deleteRefreshToken(refreshToken);
    }

    res
      .clearCookie('refresh_tokens', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      })
      .status(200)
      .json({ message: 'Logged out successfully' });
}

export const refresh = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refresh_tokens;

    if (!refreshToken) {
        throw HttpError(401, 'Refresh token not provided');
    }

    const tokenInDB = await findRefreshToken(refreshToken)
    if (!tokenInDB) {
        throw HttpError(403, 'Refresh token invalid or revoked');
    }
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken)
  } catch (error) {
    throw HttpError(403, 'Invalid refresh token');
    
  }

  const user = await findUserById(payload.id)
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const accessToken = createAccessToken({ id: user.id, username: user.username })
  
  res.status(200).json({accessToken})

}

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logout: ctrlWrapper(logout),
  refresh: ctrlWrapper(refresh)
}