import Image from 'next/image'
import React, { FC } from 'react'
import Pulsa from "@/public/img/Pulsa.png";
import FormPaymentPulsa from '@/components/services/FormPaymentPulsa';

const page: FC = () => {
  return (
    <>
      <section className="p-4">
        <h2>PemBayaran</h2>

        <div className="flex items-center gap-4 mt-2">
          <Image src={Pulsa} alt="icon image" width={32} />

          <p className="font-semibold">Pulsa</p>
        </div>

        <FormPaymentPulsa />
      </section>
    </>
  )
}

export default page