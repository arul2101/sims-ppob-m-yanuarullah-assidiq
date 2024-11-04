"use client";

import Image from "next/image";
import React, { FC, useState } from "react";
import Logo from "@/public/img/Logo.png";
import { MdAlternateEmail } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { MdPerson } from "react-icons/md";
import Link from "next/link";
import { useSignUp } from "@/hooks/useSignup";
// import type { Request } from "@/services/apiAuth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Notification from "../Notification";

const registerFormSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    first_name: z.string().min(4, "Nama depan minimal 4 karakter"),
    last_name: z.string().min(4, "Nama belakang minimal 4 karakter"),
    confirmPassword: z
      .string()
      .min(8, "Konfirmasi password minimal 8 karakter"),
    password: z.string().min(8, "Password minimal 8 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password tidak sama",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const FormRegister: FC = () => {
  const { register, handleSubmit, formState, reset } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });
  const { signup, isPending } = useSignUp();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleRegister = handleSubmit(({email, first_name, last_name, password}) => {
    const request = { email, first_name, last_name, password };

    signup(request, {
      onError: (error) => {
        setErrorMessage(error.message);
        setShowErrorMessage(true);
      },
      onSuccess: () => {
        setSuccessMessage("Registrasi berhasil silahkan login");
        setShowSuccessMessage(true);

        reset({
          email: "",
          first_name: "",
          last_name: "",
          password: "",
          confirmPassword: "",
        })
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
          Lengkapi data untuk membuat akun
        </h2>
      </div>

      <form action="" className="w-[50%] mt-10" onSubmit={handleRegister}>
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
            type="text"
            disabled={isPending}
            className={`input_auth ${isPending && 'bg-slate-200 cursor-not-allowed'} ${
              formState.errors?.first_name && "border-red-700"
            }`}
            placeholder="nama depan"
            {...register("first_name")}
          />

          <div
            className={`text-[#b3b3b1] absolute top-3.5 left-3 ${
              formState.errors?.first_name && "text-red-700"
            }`}
          >
            <MdPerson />
          </div>

          {formState.errors?.first_name && (
            <div className="flex justify-end mt-1">
              <p className="text-red-600 text-[.8rem]">
                {formState.errors.first_name.message}
              </p>
            </div>
          )}
        </div>

        <div className="relative w-full mt-8">
          <input
            type="text"
            disabled={isPending}
            className={`input_auth ${isPending && 'bg-slate-200 cursor-not-allowed'} ${
              formState.errors?.last_name && "border-red-700"
            }`}
            placeholder="nama belakang"
            {...register("last_name")}
          />

          <div
            className={`text-[#b3b3b1] absolute top-3.5 left-3 ${
              formState.errors?.last_name && "text-red-700"
            }`}
          >
            <MdPerson />
          </div>

          {formState.errors?.last_name && (
            <div className="flex justify-end mt-1">
              <p className="text-red-600 text-[.8rem]">
                {formState.errors.last_name.message}
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
            placeholder="buat passsword"
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

        <div className="relative w-full mt-8">
          <input
            type={showConfirmPassword ? "text" : "password"}
            disabled={isPending}
            className={`input_auth ${isPending && 'bg-slate-200 cursor-not-allowed'} ${
              formState.errors?.confirmPassword && "border-red-700"
            }`}
            placeholder="konfirmasi password"
            {...register("confirmPassword")}
          />

          <div
            className={`text-[#b3b3b1] absolute top-3.5 left-3 ${
              formState.errors?.confirmPassword && "text-red-700"
            }`}
          >
            <MdLock />
          </div>

          {formState.errors?.confirmPassword && (
            <div className="flex justify-end mt-1">
              <p className="text-red-600 text-[.8rem]">
                {formState.errors.confirmPassword.message}
              </p>
            </div>
          )}

          {showConfirmPassword ? (
            <div
              className="text-[#b3b3b1] absolute top-3.5 right-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(false)}
            >
              <IoMdEye />
            </div>
          ) : (
            <div
              className="text-[#b3b3b1] absolute top-3.5 right-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(true)}
            >
              <IoMdEyeOff />
            </div>
          )}
        </div>

        <div className="w-full mt-8">
          <button
            type="submit"
            className={`${isPending && 'bg-slate-400 cursor-not-allowed'} w-full h-[42px] bg-red-500 text-white rounded-sm text-[.8rem]`}
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Registrasi"}
          </button>
        </div>
      </form>

      <div className="text-center mt-8">
        <span className="text-[.8rem] text-[#8f8f8f]">
          sudah punya akun? login{" "}
          <Link href="/login" className="text-red-500">
            di sini
          </Link>
        </span>
      </div>

      
      {showSuccessMessage && successMessage && <Notification type="success" message="Berhasil registrasi, silahkan login dengan akun anda!" onClose={setShowSuccessMessage} />}

      {showErrorMessage && errorMessage && <Notification type="failed" onClose={setShowErrorMessage} message={errorMessage} />}
    </>
  );
};

export default FormRegister;
