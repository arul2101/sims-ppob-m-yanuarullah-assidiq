import React, { FC } from "react";
import Banner from "@/components/homepage/Banner";
import Services from "@/components/homepage/Services";

const Home: FC = () => {
  return (
    <>
      <Services />

      <h2 className="text-[#545453] font-semibold">Temukan Promo Menarik</h2>
      <section className="overflow-x-scroll">

        <div className="flex mt-4 items-center gap-8 flex-nowrap w-[1550px]">
          <Banner />
        </div>
      </section>
    </>
  );
};

export default Home;
