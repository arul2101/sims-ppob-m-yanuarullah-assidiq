'use client';

import React, { FC, useRef } from 'react'
import Overlay from './Overlay'
import { MdClose } from "react-icons/md";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useCookies } from 'next-client-cookies';
import toast from 'react-hot-toast';
import { useUploadProfile } from '@/hooks/useUploadProfile';
import path from 'path';

type ModalUploadProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const editImageSchema = z.object({
  picture: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Format Image yang boleh di upload hanya jpeg dan png"
    )
})

type EditImageSchema = z.infer<typeof editImageSchema>;

const ModalUpload: FC<ModalUploadProps> = ({ onClose }) => {
  const inputFileRef = useRef<HTMLInputElement>();
  const { handleSubmit: handleSubmitUpload, control, formState, watch } = useForm<EditImageSchema>({
    resolver: zodResolver(editImageSchema)
  });

  const { uploadImage, isPending } = useUploadProfile();


  const handleUpload = handleSubmitUpload(({ picture }) => {
    const fd = new FormData();
    fd.append('file', picture);

    uploadImage(fd, {
      onSuccess: () => {
        toast.success("Update Profile Image berhasil!");
        onClose(false);
      },
      onError: () => {
        toast.error("Gagal Update Profile Image!")
      }
    })
  });


  return (
    <Overlay>
      <div className="w-[300px] h-[250px] bg-white rounded-md flex flex-col justify-center items-center relative">
        <div className='absolute right-4 top-4 cursor-pointer text-[1.5rem]' onClick={() => onClose(false)}><MdClose /></div>
        <h2 className='font-semibold text-[1.2rem] mb-6'>Update Profile Picture</h2>

        {watch('picture') && <p className=''>{`${watch('picture').name.substr(0, 12)}...${path.parse(watch('picture').name).ext}`}</p>}

        <button className='border border-[#b3b3b1] px-4 py-2 rounded-md' onClick={() => inputFileRef.current?.click()}>Upload Foto</button>

        <form onSubmit={handleUpload}>
          <Controller
            control={control}
            name={"picture"}
            rules={{ required: "Picture is required" }}
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <input
                  {...field}
                  value={value?.fileName}
                  onChange={(event) => {
                    onChange(event.target.files[0]);
                  }}
                  type="file"
                  id="picture"
                  hidden
                  ref={inputFileRef as React.LegacyRef<HTMLInputElement>}
                />
              );
            }}
          />
          {formState.errors?.picture && (
            <div className='text-center mt-2 w-[80%] mx-auto'>
              <p className='text-red-700 text-[.8rem]'>{formState.errors?.picture?.message?.toString()}</p>
            </div>
          )}

          <div className='flex justify-center'>

            <button
              type='submit'
              className={`${isPending && 'bg-slate-400 cursor-not-allowed'} bg-red-500 w-[180px] h-[30px] text-white rounded-sm mt-8`}
              disabled={isPending}
            >
              {isPending ? 'Loading...' : 'Save'}
            </button>
          </div>

        </form>
      </div>
    </Overlay>
  )
}

export default ModalUpload