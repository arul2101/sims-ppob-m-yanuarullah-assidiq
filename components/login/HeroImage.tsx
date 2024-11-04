import Image from "next/image";
import React, { FC } from "react";
import HeroImageLogin from "@/public/img/Illustrasi Login.png";

const HeroImage: FC = () => {
  return (
    <div className="w-full h-full">
      <Image src={HeroImageLogin} width={752} alt="Hero Image Login" />
    </div>
  );
};

export default HeroImage;
