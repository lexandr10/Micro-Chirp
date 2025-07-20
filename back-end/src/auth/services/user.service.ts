import bcrypt from "bcrypt"

import db from "../../knexfile"
import { NewUser, User } from "../../schemas/schemas"


export const createUser = async (userData: NewUser): Promise<User> => {
    const hashedPassword = await bcrypt.hash(userData.hash_password, 10);

    const [user] = await db<User>('users')
        .insert({ username: userData.username, hash_password: hashedPassword })
        .returning(['id', 'username', 'hash_password'])
    
    return user
}

export const findUserByUsername = async (username: string): Promise<User | undefined> => {
    return db<User>("users").where({username}).first()
}

export const findUserById = async (user_id: number): Promise<User | undefined> => {
    return db<User>("users").where({id: user_id}).first()
}