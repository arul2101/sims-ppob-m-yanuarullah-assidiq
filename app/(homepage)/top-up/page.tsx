import FormTopUp from "@/components/homepage/FormTopUp";
import React, { FC } from "react";

const page: FC = () => {
  return (
    <section className="p-4">
      <h2>Silahkan masukan</h2>

      <p className="font-semibold mb-5 text-[1.5rem]">Nominal Top Up</p>

      <FormTopUp />
    </section>
  );
};

export default page;
