import React, { FC } from 'react'
import Qurban from "@/public/img/Kurban.png";
import Image from 'next/image';
import FormPaymentKurban from '@/components/services/FormPaymentKurban';

const page: FC = () => {
  return (
    <section className="p-4">
      <h2>PemBayaran</h2>

      <div className="flex items-center gap-4 mt-2">
        <Image src={Qurban} alt="icon image" width={32} />

        <p className="font-semibold">Qurban</p>
      </div>

      <FormPaymentKurban />
    </section>
  )
}

export default page