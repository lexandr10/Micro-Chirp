import Cookie from "js-cookie"


export enum EnumToken {
  "ACCESS_TOKEN" = "accessToken",
  "REFRESH_TOKEN" = "refreshToken",
}

export const getAccessToken = () => {
    const accessToken = Cookie.get(EnumToken.ACCESS_TOKEN)
    return accessToken || null
}

export const saveAccessToken = (accessToken: string) => {
  Cookie.set(EnumToken.ACCESS_TOKEN, accessToken, {
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    expires: 1, 
  });

}
export const removeAccessToken = () => {
  Cookie.remove(EnumToken.ACCESS_TOKEN)
}