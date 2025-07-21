export interface Chirp {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
}

export interface NewChirp {
  content: string;
}
