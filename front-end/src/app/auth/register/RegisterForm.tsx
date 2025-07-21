"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { authService } from "@/services/auth.service";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { IAuthForm } from "@/types/auth.types";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthForm>({ mode: "onChange" });
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IAuthForm) => authService.mainAuth("register", data),
    onSuccess() {
      toast.success("Registered successfully");
      reset();
      push(DASHBOARD_PAGES.HOME);
    },
    onError(error: AxiosError<{ message: string }>) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => mutate(data);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            {...register("username", { required: "Username is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-300"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-300"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md"
        >
          Register
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
