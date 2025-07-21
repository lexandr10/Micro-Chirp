"use client"

import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from "sonner"
import { AxiosError } from 'axios'

import { authService } from '@/services/auth.service'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { IAuthForm } from '@/types/auth.types'


export default function LoginForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IAuthForm>({ mode: "onChange" })
    const { push } = useRouter()
    
    const { mutate, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: (data: IAuthForm) => authService.mainAuth("login", data),
        onSuccess() {
            toast.success("Logged in successfully")
            reset()
            push(DASHBOARD_PAGES.HOME)
        },
        onError(error: AxiosError<{message: string}>) {
            toast.error(
              error?.response?.data?.message || "Something went wrong"
            );
        }
    })

    const onSubmit: SubmitHandler<IAuthForm> = data => mutate(data)



    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <form
          className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-600 text-sm">
            Don’t have an account?
            <Link
              className="text-blue-500 hover:underline"
              href="/auth/register"
            >
              Register
            </Link>{" "}
          </p>
        </form>
      </div>
    );
}
