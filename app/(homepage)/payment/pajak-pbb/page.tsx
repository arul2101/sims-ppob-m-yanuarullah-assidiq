import FormPaymentPBB from '@/components/services/FormPaymentPBB'
import React, { FC } from 'react'
import PBB from "@/public/img/PBB.png";
import Image from 'next/image';

const page: FC = () => {
  return (
    <section className="p-4">
      <h2>PemBayaran</h2>

      <div className="flex items-center gap-4 mt-2">
        <Image src={PBB} alt="icon image" width={32} />

        <p className="font-semibold">PBB</p>
      </div>

      <FormPaymentPBB />
    </section>
  )
}

export default page