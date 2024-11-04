import React, { FC } from 'react'
import Makanan from "@/public/img/Voucher Makanan.png";
import Image from 'next/image';
import FormPaymentVoucherMakanan from '@/components/services/FormPaymentVoucherMakanan';

const page: FC = () => {
  return (
    <section className="p-4">
      <h2>PemBayaran</h2>

      <div className="flex items-center gap-4 mt-2">
        <Image src={Makanan} alt="icon image" width={32} />

        <p className="font-semibold">Voucher Makanan</p>
      </div>

      <FormPaymentVoucherMakanan />
    </section>
  )
}

export default page