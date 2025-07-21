import { AxiosError } from "axios";

export const errorCatch = (error: unknown): string => {
  if (
    error &&
    typeof error === "object" &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError
  ) {
    const axiosError = error as AxiosError<{ message: string | string[] }>;
    const message = axiosError.response?.data?.message;

    if (message) {
      return Array.isArray(message) ? message[0] : message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};