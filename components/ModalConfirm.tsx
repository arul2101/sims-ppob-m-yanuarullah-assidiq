import React, { FC } from "react";
import Overlay from "./Overlay";
import Image from "next/image";
import Logo from "@/public/img/Logo.png";

type ModalConfirmProps = {
  label: string;
  labelConfirm: string;
  nominal: string;
  onConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  isPending: boolean;
};

const ModalConfirm: FC<ModalConfirmProps> = ({
  label,
  labelConfirm,
  nominal,
  onConfirm,
  handleSubmit,
  isPending
}) => {
  return (
    <Overlay>
      <div className="w-[250px] h-[250px] bg-white rounded-md flex flex-col justify-center items-center">
        <Image src={Logo} alt="icon" width={50} />

        <p className="mt-4">{label}</p>
        <h2 className="text-[1.4rem] font-semibold">Rp{nominal} ?</h2>

        {isPending ? <p>loading...</p> : (
          <>
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className="text-red-500 my-4 font-semibold cursor-pointer"
              // onClick={() => onConfirm(false)}
              // onClick={e => e.preventDefault()}
              >
                {labelConfirm}
              </button>
            </form>
            <p
              className="text-[#7c7c7b] font-semibold cursor-pointer"
              onClick={() => onConfirm(false)}
            >
              Batalkan
            </p>
          </>
        )}


      </div>
    </Overlay>
  );
};

export default ModalConfirm;
