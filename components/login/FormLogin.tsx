"use client";

import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import Logo from "@/public/img/Logo.png";
import { MdAlternateEmail } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Link from "next/link";
import {z} from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/useLogin";
import Notification from "../Notification";
import { useRouter } from "next/navigation";
import { useCookies } from 'next-client-cookies';

const loginFormSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
  });

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const FormLogin: FC = () => {
  const router = useRouter();
  const cookies = useCookies();
  const {login, isPending, data} = useLogin();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, formState } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    if(data?.data?.token) {
      cookies.set('session', data?.data?.token, {expires: 0.5});
    }    
    
  }, [data?.data?.token, cookies])

  const handleLogin = handleSubmit(({email, password}) => {
    const request = { email, password };

    login(request, {
      onError: (error) => {
        setErrorMessage(error.message);
        setShowErrorMessage(true);
      },
      onSuccess: () => {
        router.push('/')
      },
    })
  });

  return (
    <>
      <div className="flex items-center gap-2">
        <Image src={Logo} width={32} height={32} alt="Logo Brand" />
        <h2 className="text-[1.5rem]">SIMS PPOB</h2>
      </div>

      <div className="w-[40%] text-center mt-6">
        <h2 className="text-[1.7rem] font-semibold">
          Masuk atau buat akun untuk memulai
        </h2>
      </div>

      <form action="" onSubmit={handleLogin} className="w-[50%] mt-10">
        <div className="relative w-full">
          <input
            type="text"
            className={`input_auth ${isPending && 'bg-slate-200 cursor-not-allowed'} ${
              formState.errors?.email && "border-red-700"
            }`}
            disabled={isPending}
            placeholder="masukan email anda"
            {...register("email")}
          />

          <div
            className={`text-[#b3b3b1] absolute top-3.5 left-3 ${
              formState.errors?.email && "text-red-700"
            }`}
          >
            <MdAlternateEmail />
          </div>

          {formState.errors?.email && (
            <div className="flex justify-end mt-1">
              <p className="text-red-600 text-[.8rem]">
                {formState.errors.email.message}
              </p>
            </div>
          )}
        </div>

        <div className="relative w-full mt-8">
          <input
            type={showPassword ? "text" : "password"}
            disabled={isPending}
            className={`input_auth ${isPending && 'bg-slate-200 cursor-not-allowed'} ${
              formState.errors?.password && "border-red-700"
            }`}
            placeholder="masukan passsword anda"
            {...register("password")}
          />

          <div
            className={`text-[#b3b3b1] absolute top-3.5 left-3 ${
              formState.errors?.password && "text-red-700"
            }`}
          >
            <MdLock />
          </div>

          {formState.errors?.password && (
            <div className="flex justify-end mt-1">
              <p className="text-red-600 text-[.8rem]">
                {formState.errors.password.message}
              </p>
            </div>
          )}

          {showPassword ? (
            <div
              className="text-[#b3b3b1] absolute top-3.5 right-3 cursor-pointer"
              onClick={() => setShowPassword(false)}
            >
              <IoMdEye />
            </div>
          ) : (
            <div
              className="text-[#b3b3b1] absolute top-3.5 right-3 cursor-pointer"
              onClick={() => setShowPassword(true)}
            >
              <IoMdEyeOff />
            </div>
          )}
        </div>

        <div className="w-full mt-8">
          <button
            type="submit"
            disabled={isPending}
            className={`${isPending && 'bg-slate-400 cursor-not-allowed'} w-full h-[42px] bg-red-500 text-white rounded-sm text-[.8rem]`}
          >
            {isPending ? 'Loading...' : 'Masuk'}
          </button>
        </div>
      </form>

      <div className="text-center mt-8">
        <span className="text-[.8rem] text-[#8f8f8f]">
          belum punya akun? register{" "}
          <Link href="/register" className="text-red-500">
            di sini
          </Link>
        </span>
      </div>

      {showErrorMessage && errorMessage && <Notification type="failed" onClose={setShowErrorMessage} message={errorMessage} />}
    </>
  );
};

export default FormLogin;
