import React, { FC } from "react";
import Overlay from "./Overlay";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

type ModalNotificationProps = {
  label: string;
  status: string;
  nominal: string;
  logo: StaticImageData;
  // onConfirm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalNotification: FC<ModalNotificationProps> = ({
  label,
  status,
  nominal,
  logo,
}) => {
  const router = useRouter();
  return (
    <Overlay>
      <div className="w-[300px] h-[250px] bg-white rounded-md flex flex-col justify-center items-center">
        <Image src={logo} alt="icon" width={50} />

        <p className="mt-4 text-center">{label}</p>
        <h2 className="text-[1.4rem] font-semibold">Rp{nominal}</h2>
        <p>{status} !</p>

        <p
          className="text-red-500 my-4 font-semibold cursor-pointer"
          onClick={() => {
            // onConfirm(false);
            router.refresh();
            router.push("/");
          }}
        >
          Kembali ke beranda
        </p>
      </div>
    </Overlay>
  );
};

export default ModalNotification;
