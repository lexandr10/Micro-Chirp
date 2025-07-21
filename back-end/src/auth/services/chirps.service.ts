import db from "../../database/db";
import {Chirp } from "../../schemas/schemas";


export const createChirp = async (user_id: number, content: string): Promise<Chirp> => {
    const [chirp] = await db<Chirp>("chirps")
        .insert({ user_id, content })
        .returning(["id", "user_id", "content", "created_at"])
    return chirp
}

export const getAllChirps = async (limit: number, offset: number ): Promise<Chirp[]> => {
    return db<Chirp>("chirps").orderBy("created_at", "desc").limit(limit).offset(offset)
}

export const getChirpById = async (id: number): Promise<Chirp | undefined> => {
    return db<Chirp>("chirps").where({ id }).first();
}

export const getPrivateChirps = async (user_id: number): Promise<Chirp[]> => {
    return db<Chirp>("chirps").where({user_id}).orderBy("created_at", "desc")
}

export const deleteChirp = async (id: number, user_id: number): Promise<number> => {
    return db<Chirp>("chirps").where({id, user_id}).del()
}

export const updateChirp = async (id: number, content: string): Promise<Chirp> => {
    const [updatedChirp] = await db<Chirp>('chirps')
      .where({ id })
      .update({ content })
      .returning(['id', 'user_id', 'content', 'created_at']);
     return updatedChirp;
}