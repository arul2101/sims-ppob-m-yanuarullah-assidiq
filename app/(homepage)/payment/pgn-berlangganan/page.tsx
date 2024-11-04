import React, { FC } from 'react'
import PGN from "@/public/img/PGN.png";
import Image from 'next/image';
import FormPaymentPGN from '@/components/services/FormPaymentPGN';

const page: FC = () => {
  return (
    <section className="p-4">
      <h2>PemBayaran</h2>

      <div className="flex items-center gap-4 mt-2">
        <Image src={PGN} alt="icon image" width={32} />

        <p className="font-semibold">PGN</p>
      </div>

      <FormPaymentPGN />
    </section>
  )
}

export default page