"use client";

import { useBalance } from "@/hooks/useBalance";
import React, { FC, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const SaldoBanner: FC = () => {
  const {balance, isPending} = useBalance();
  const [showSaldo, setShowSaldo] = useState<boolean>(true);

  if(isPending) return <p>Loading...</p>
  return (
    <section className='bg-[url("/img/background-saldo.png")] w-[670px] h-[161px] text-white p-6'>
      <p className="text-[.7rem]">Saldo anda</p>
      <p className="text-[1.7rem] my-[1.08rem]">Rp {showSaldo ? balance.data.balance : "***"}</p>
      <p className="text-[.7rem] relative">
        Tutup Saldo{" "}
        {showSaldo ? (
          <span
            className="absolute top-1 left-[4.6rem] cursor-pointer"
            onClick={() => setShowSaldo(false)}
          >
            <IoMdEye />
          </span>
        ) : (
          <span
            className="absolute top-1 left-[4.6rem] cursor-pointer"
            onClick={() => setShowSaldo(true)}
          >
            <IoMdEyeOff />
          </span>
        )}
      </p>
    </section>
  );
};

export default SaldoBanner;
