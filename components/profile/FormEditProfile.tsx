'use client'

import Image from 'next/image'
import React, { FC, useState } from 'react'
import ProfileImage from "@/public/img/Profile Photo.png";
import { MdAlternateEmail, MdPerson } from 'react-icons/md';
import { useUser } from '@/hooks/useUser';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getUser } from '@/services/apiAuth';
import { useCookies } from 'next-client-cookies';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import Notification from '../Notification';
import { MdEdit } from "react-icons/md";
import ModalUpload from '../ModalUpload';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../LoadingSpinner';
import { Toaster } from 'react-hot-toast';


const editProfileSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    first_name: z.string().min(4, "Nama depan minimal 4 karakter"),
    last_name: z.string().min(4, "Nama belakang minimal 4 karakter"),
  });

type EditProfileSchema = z.infer<typeof editProfileSchema>;


const FormEditProfile: FC = () => {
  const { user, isPending: isPendingUser, } = useUser();
  const { updateUser, isPending } = useUpdateUser();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const cookies = useCookies();
  const router = useRouter();

  const [showModalUpload, setShowModalUpload] = useState<boolean>(false);

  const { register, handleSubmit, formState } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: async () => {
      const response = await getUser(cookies.get('session') as string);
      return {
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
      }
    }
  });

  const handleEditProfile = handleSubmit(({ first_name, last_name }) => {
    updateUser({ first_name, last_name }, {
      onError: (error) => {
        setErrorMessage(error.message);
        setShowErrorMessage(true);
      },
      onSuccess: () => {
        setSuccessMessage('Update profile berhasil!');
        setShowSuccessMessage(true);
      }
    });
  });

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    cookies.remove('session');
    router.refresh();
  }




  if (isPendingUser) return <LoadingSpinner />
  return (
    <>
      <Toaster />

      {showModalUpload && <ModalUpload onClose={setShowModalUpload} />}
      <section className='max-w-[650px] mx-auto pb-64'>
        <div className='flex flex-col justify-center items-center my-8'>
          <div className='w-[180px] relative'>
            <div className='w-[180px] h-[180px]'>
              {user.data.profile_image !== "https://minio.nutech-integrasi.com/take-home-test/null" ? (
                <Image
                  src={user.data.profile_image}
                  alt='Profile Picture'
                  width={180}
                  height={180}
                  className='rounded-full w-full h-full'
                />) : (
                <Image
                  src={ProfileImage}
                  alt='Profile Picture'
                  width={180}
                  height={180}
                  className='rounded-full w-full h-full'
                />
              )}
            </div>

            <div
              className='absolute flex justify-center items-center top-[160px] right-0 w-[32px] h-[32px] border border-[#b3b3b1] rounded-full cursor-pointer'
              // onClick={() => inputFileRef.current?.click()}
              onClick={() => setShowModalUpload(true)}
            ><MdEdit /></div>
            {/* <form action="" onSubmit={handleUpload}>
              <input type='file' hidden {...registerFile('picture')} ref={inputFileRef as React.LegacyRef<HTMLInputElement>} />
            </form> */}
          </div>

          <h2 className='mt-4 text-[1.5rem] font-bold'>{user.data.first_name} {user.data.last_name}</h2>
        </div>

        <form action="" onSubmit={handleEditProfile}>
          <div className="relative w-full">
            <label htmlFor="" className='mb-2'>Email</label>
            <input
              type="text"
              className='input_auth mt-2 bg-slate-200 cursor-not-allowed'
              disabled={true}
              placeholder="email"
              {...register("email")}
            />

            <div
              className='text-[#b3b3b1] absolute top-11 left-3'
            >
              <MdAlternateEmail />
            </div>
          </div>

          <div className="relative w-full mt-8">
            <label htmlFor="" className='mb-2'>Nama Depan</label>
            <input
              type="text"
              className={`input_auth mt-2 ${isPending && 'bg-slate-200 cursor-not-allowed'} ${formState.errors?.first_name && "border-red-700"
                }`}
              disabled={isPending}
              placeholder="nama depan"
              {...register("first_name")}
            />

            <div
              className={`text-[#b3b3b1] absolute top-11 left-3 ${formState.errors?.email && "text-red-700"
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
            <label htmlFor="" className='mb-2'>Nama Belakang</label>
            <input
              type="text"
              className={`input_auth mt-2 ${isPending && 'bg-slate-200 cursor-not-allowed'} ${formState.errors?.last_name && "border-red-700"
                }`}
              disabled={isPending}
              placeholder="nama belakang"
              {...register("last_name")}
            />

            <div
              className={`text-[#b3b3b1] absolute top-11 left-3 ${formState.errors?.last_name && "text-red-700"
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

          <div className="w-full mt-8">
            <button
              type="submit"
              disabled={isPending}
              className={`${isPending && 'bg-slate-400 cursor-not-allowed'} w-full h-[42px] bg-red-500 text-white rounded-sm text-[.8rem]`}
            >
              {isPending ? 'Loading...' : 'Simpan'}
            </button>
            <button type='button' className={`bg-slate-700 w-full h-[42px] text-white rounded-sm text-[.8rem] mt-4`} onClick={logout}>Logout</button>
          </div>
        </form>

        {showSuccessMessage && successMessage && <Notification type="success" message={successMessage} onClose={setShowSuccessMessage} />}

        {showErrorMessage && errorMessage && <Notification type="failed" onClose={setShowErrorMessage} message={errorMessage} />}
      </section>
    </>
  )
}

export default FormEditProfile