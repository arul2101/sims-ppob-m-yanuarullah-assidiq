"use client";

import React, { FC, useState } from "react";
import { HiMiniWallet } from "react-icons/hi2";
import ModalConfirm from "../ModalConfirm";
import ModalNotification from "../ModalNotification";
import LogoSuccess from "@/public/img/success.png";
import LogoFailed from "@/public/img/failed.png";
import { useTransaction } from "@/hooks/useTransaction";

const FormPaymentPDAM: FC = () => {
  const { transaction, isPending } = useTransaction();
  const [number, setNumber] = useState<number>();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showFailed, setShowFailed] = useState<boolean>(false);

  const handlePayment = () => {
    transaction("PDAM", {
      onSuccess: () => {
        setShowConfirm(false);
        setShowSuccess(true);
      },
      onError: () => {
        setShowFailed(true);
      }
    });
  }

  return (
    <>
      {showConfirm && (
        <ModalConfirm
          label="Pembayaran PDAM senilai"
          labelConfirm="Ya, lanjutkan Bayar"
          nominal={"40.000"}
          onConfirm={setShowConfirm}
          handleSubmit={handlePayment}
          isPending={isPending}
        />
      )}
      {showSuccess && (
        <ModalNotification
          label="Pembayaran PDAM sebesar"
          nominal={"40.000"}
          logo={LogoSuccess}
          status="sukses"
        />
      )}

      {showFailed && (
        <ModalNotification
          label="Pembayaran PDAM sebesar"
          nominal={"40.000"}
          logo={LogoFailed}
          status="gagal"
        />
      )}

      <form className="mt-4 flex gap-4">
        <div className="relative w-full">
          <input
            type="number"
            className="w-full h-[42px] border border-[#b3b3b1] rounded-sm pl-10 focus:outline-none bg-slate-200 cursor-not-allowed"
            placeholder="40.000"
            disabled={true}
            onChange={(e) => setNumber(Number(e.target.value))}
          />

          {number ? (
            <div className="absolute top-3 left-3 text-black">
              <HiMiniWallet />
            </div>
          ) : (
            <div className="absolute top-3 left-3 text-[#b3b3b1]">
              <HiMiniWallet />
            </div>
          )}

          <button
            className="w-full h-[42px] bg-red-500 mt-5 rounded-sm text-white focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              setShowConfirm(true);
            }}
          >
            Bayar
          </button>
        </div>
      </form>
    </>
  );
};

export default FormPaymentPDAM;
