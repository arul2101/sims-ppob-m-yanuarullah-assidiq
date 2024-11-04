'use client'

import React, { FC } from "react";
import ProfilePhoto from "@/public/img/Profile Photo.png";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";

const WelcomePerson: FC = () => {
  const { user, isPending } = useUser(); 

  if(isPending) return <p>Loading...</p>
  return (
    <section className="p-4 w-[40%]">
      <div>
        <Image src={ProfilePhoto} alt="Profile Photo" />
      </div>

      <div className="mt-4">
        <p>Selamat datang,</p>
        <h2 className="text-[1.3rem] font-bold">{user.data.first_name} {user.data.last_name}</h2>
      </div>
    </section>
  );
};

export default WelcomePerson;
