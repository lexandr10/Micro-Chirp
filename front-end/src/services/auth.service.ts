import { axiosClassic, axiosWithAuth } from "@/lib/interceptors"; 
import { IAuthForm, IAuthResponseLogin, IAuthResponseRegister } from "@/types/auth.types";
import { removeAccessToken, saveAccessToken } from "./auth-token.service";


export const authService = {
    async mainAuth(type: "login" | "register", data: IAuthForm) {
        const response = await axiosClassic.post<IAuthResponseRegister>(`/auth/${type}`, data)
        if (response.data.accessToken) saveAccessToken(response.data.accessToken)
        return response
    },

    async getNewToken() {
        const response = await axiosClassic.post<IAuthResponseLogin>("auth/login/access-token")
        if (response.data.accessToken) saveAccessToken(response.data.accessToken)
        return response
    },

    async logout() {
        const response = await axiosWithAuth.post<{message: string}>("/auth/logout");

        if (response) removeAccessToken();
        return response.data.message;
    },

    async getCurrentUser() {
        const response = await axiosWithAuth.get<IAuthResponseLogin>("/auth/current");
        
        return response.data;
    }
}