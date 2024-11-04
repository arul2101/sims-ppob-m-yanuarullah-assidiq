import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type PaymentsProps = {
  label: string;
  img: StaticImageData;
};

const Payments: FC<PaymentsProps> = ({ img, label }) => {
  return (
    <Link
      href={`/payment/${label.toLowerCase()}`}
      className="flex flex-col items-center text-center"
    >
      <div className="w-[60px] h-[60px]">
        <Image src={img} alt={`${label} icon`} width={100} height={100} />
      </div>
      <h2 className="text-[#545453]">{label}</h2>
    </Link>
  );
};

export default Payments;
