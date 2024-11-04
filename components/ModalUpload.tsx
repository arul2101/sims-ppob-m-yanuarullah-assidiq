'use client';

import React, { FC, useRef } from 'react'
import Overlay from './Overlay'
import { MdClose } from "react-icons/md";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type ModalUploadProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const editImageSchema = z.object({
  picture:  z
    .custom<FileList>()
    // .transform((file) => file.length > 0 && file.item(0))
    .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
      message: "The profile picture must be a maximum of 10MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Only images are allowed to be sent.",
    }),
  })

type EditImageSchema = z.infer<typeof editImageSchema>;

const ModalUpload: FC<ModalUploadProps> = ({onClose}) => {
  const inputFileRef = useRef<HTMLInputElement>();
  const {register: registerFile, handleSubmit: handleSubmitUpload, watch} = useForm<EditImageSchema>({
    resolver: zodResolver(editImageSchema)
  });

  const handleUpload = handleSubmitUpload(async ({picture}) => {

      console.log(picture);
  
      // setResult("Sending....");
      const formData = new FormData();
  
      formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
  
      for (const key in picture) {
        if (key === "file") {
          formData.append(key, picture[key][0]);
        } else {
          formData.append(key, picture[key]);
        }
      }
  
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      }).then((res) => res.json());
  
      if (res.success) {
        console.log("Success", res);
        // setResult(res.message);
      } else {
        console.log("Error", res);
        // setResult(res.message);
      }
  });


  return (
    <Overlay>
      <div className="w-[250px] h-[250px] bg-white rounded-md flex flex-col justify-center items-center relative">
        <div className='absolute right-4 top-4 cursor-pointer text-[1.5rem]' onClick={() => onClose(false)}><MdClose /></div>
        <h2 className='font-semibold text-[1.2rem]'>Update Profile Picture</h2>

        {/* {watch('picture') && <p>{watch('picture')[0].name}</p>} */}

        <button className='border border-[#b3b3b1] px-4 py-2 rounded-md mt-8' onClick={() => inputFileRef.current?.click()}>Upload Foto</button>

        <form action="" onSubmit={handleUpload}>
          <input type='file' hidden {...registerFile('picture')} ref={inputFileRef as React.LegacyRef<HTMLInputElement>} />
          <button type='submit' className='bg-red-500 w-[180px] h-[30px] text-white rounded-sm mt-8'>Save</button>
          
        </form>
      </div>
    </Overlay>
  )
}

export default ModalUpload