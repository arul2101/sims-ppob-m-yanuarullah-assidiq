import React, { FC } from 'react'
import TV from "@/public/img/Televisi.png";
import Image from 'next/image';
import FormPaymentTV from '@/components/services/FormPaymentTV';

const page: FC = () => {
  return (
    <section className="p-4">
      <h2>PemBayaran</h2>

      <div className="flex items-center gap-4 mt-2">
        <Image src={TV} alt="icon image" width={32} />

        <p className="font-semibold">TV Berlangganan</p>
      </div>

      <FormPaymentTV />
    </section>
  )
}

export default page