


export interface User {
    id: number;
    username: string;
    hash_password: string;
    created_at?: Date;
    updated_at?: Date;

}

export interface NewUser {
    username: string;
    hash_password: string;
}

export interface Chirp {

    id: number;
    user_id: number;
    content: string;
    created_at: Date;
}

export interface NewChirp {
    content: string;
}