import React, { FC } from 'react'
import Zakat from "@/public/img/Zakat.png";
import Image from 'next/image';
import FormPaymentZakat from '@/components/services/FormPaymentZakat';

const page: FC = () => {
  return (
    <section className="p-4">
      <h2>PemBayaran</h2>

      <div className="flex items-center gap-4 mt-2">
        <Image src={Zakat} alt="icon image" width={32} />

        <p className="font-semibold">Pembayaran Zakat</p>
      </div>

      <FormPaymentZakat />
    </section>
  )
}

export default page