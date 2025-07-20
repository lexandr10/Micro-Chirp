import db from "../../knexfile";

interface RefreshTokenData {
    user_id: number;
    token: string;
    expires_at: Date;
}


export const createRefreshTokenInDb = async (data: RefreshTokenData) => {
    return db("refresh_tokens").insert(data).returning("*")
}

export const findRefreshToken = async (token: string) => {
    return db('refresh_tokens').where({ token }).first();

}

export const deleteRefreshToken = async (token: string) => {
    return db('refresh_tokens').where({token}).del();
}

export const deleteRefreshTokensByUserId = async (user_id: number) => {
    return db('refresh_tokens').where({user_id}).del();
}