import React, { FC } from 'react'
import Game from "@/public/img/Game.png";
import Image from 'next/image';
import FormPaymentVoucherGame from '@/components/services/FormPaymentVoucherGame';

const page: FC = () => {
  return (
    <section className="p-4">
      <h2>PemBayaran</h2>

      <div className="flex items-center gap-4 mt-2">
        <Image src={Game} alt="icon image" width={32} />

        <p className="font-semibold">Voucher Game</p>
      </div>

      <FormPaymentVoucherGame />
    </section>
  )
}

export default page