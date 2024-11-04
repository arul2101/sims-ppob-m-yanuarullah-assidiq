import React, { FC } from 'react'
import PDAM from "@/public/img/PDAM.png";
import Image from 'next/image';
import FormPaymentPDAM from '@/components/services/FormPaymentPDAM';

const page: FC = () => {
  return (
    <section className="p-4">
      <h2>PemBayaran</h2>

      <div className="flex items-center gap-4 mt-2">
        <Image src={PDAM} alt="icon image" width={32} />

        <p className="font-semibold">PDAM</p>
      </div>

      <FormPaymentPDAM />
    </section>
  )
}

export default page