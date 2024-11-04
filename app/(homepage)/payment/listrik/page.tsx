import Image from "next/image";
import React, { FC } from "react";
import Listrik from "@/public/img/Listrik.png";
import FormPaymentListrik from "@/components/services/FormPaymentListrik";

const page: FC = () => {
  return (
    <>
      <section className="p-4">
        <h2>PemBayaran</h2>

        <div className="flex items-center gap-4 mt-2">
          <Image src={Listrik} alt="icon image" width={32} />

          <p className="font-semibold">Listrik Prabayar</p>
        </div>

        <FormPaymentListrik />
      </section>
    </>
  );
};

export default page;
