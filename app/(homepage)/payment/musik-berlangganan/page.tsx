import React, { FC } from 'react'
import Musik from "@/public/img/Musik.png";
import Image from 'next/image';
import FormPaymentMusik from '@/components/services/FormPaymentMusik';

const page: FC = () => {
  return (
    <section className="p-4">
      <h2>PemBayaran</h2>

      <div className="flex items-center gap-4 mt-2">
        <Image src={Musik} alt="icon image" width={32} />

        <p className="font-semibold">Musik Berlangganan</p>
      </div>

      <FormPaymentMusik />
    </section>
  )
}

export default page