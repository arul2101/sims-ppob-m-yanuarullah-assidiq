import React, { FC } from 'react'
import PaketData from "@/public/img/Paket Data.png";
import Image from 'next/image';
import FormPaymentPaketData from '@/components/services/FormPaymentPaketData';

const page: FC = () => {
  return (
    <section className="p-4">
      <h2>PemBayaran</h2>

      <div className="flex items-center gap-4 mt-2">
        <Image src={PaketData} alt="icon image" width={32} />

        <p className="font-semibold">Paket Data</p>
      </div>

      <FormPaymentPaketData />
    </section>
  )
}

export default page