import { axiosWithAuth, axiosClassic } from "@/lib/interceptors";
import { Chirp, NewChirp } from "@/types/chirp.types"

class ChirpService {
    private BASE_URL = "/chirps"

    async getAll() {
        const res = await axiosClassic.get<Chirp[]>(this.BASE_URL)
        return res.data
    }

    async getById(id: number) {
        const res = await axiosClassic.get<Chirp>(`${this.BASE_URL}/${id}`)
        return res.data
    }

    async create(data: NewChirp) {
        const res = await axiosWithAuth.post<Chirp>(this.BASE_URL, data)
        return res.data
    }

    async update(id: number, data: NewChirp) {
        const res = await axiosWithAuth.put<Chirp>(`${this.BASE_URL}/${id}`, data)
        return res.data
    }

    async delete(id: number) {
        const res = await axiosWithAuth.delete<{ message: string }>(`${this.BASE_URL}/${id}`)
        return res.data
    }

    async getMyChirps(limit = 20, offset = 0) {
        const res = await axiosWithAuth.get<Chirp[]>(`${this.BASE_URL}/my`, {
            params: {limit, offset}
        })
        return res.data
    }
}

export const chirpService = new ChirpService()