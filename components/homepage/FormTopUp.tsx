"use client";

import React, { FC, useState } from "react";
import { HiMiniWallet } from "react-icons/hi2";
import ModalConfirm from "../ModalConfirm";
import ModalNotification from "../ModalNotification";
import LogoSuccess from "@/public/img/success.png";
import LogoFailed from "@/public/img/failed.png";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumericFormat } from "react-number-format";
import { useTopUp } from "@/hooks/useTopUp";

const topUpSchema = z.object({
  amount: z.string()
});
// const topUpSchema = z.object({
//   amount: z.union([
//     z.string().transform(x => x.replace(/[^0-9.-]+/g, '')),
//     z.number(),
//   ]).pipe(z.coerce.number().min(0.0001).max(999999999))
// });

export function formatUang(subject: number) {
  return subject.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  // return `Rp${rupiah}`;
}

export type TopUpSchema = z.infer<typeof topUpSchema>;


const FormTopUp: FC = () => {
  // const [number, setNumber] = useState<number>();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showFailed, setShowFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { topup, isPending } = useTopUp();

  const { register, handleSubmit, setValue, getValues } = useForm<TopUpSchema>({
    resolver: zodResolver(topUpSchema)
  });




  const handleTopUp = handleSubmit(({ amount }) => {
    topup({
      top_up_amount: Number(amount.replaceAll(".", ""))
    }, {
      onSuccess: () => {
        setShowConfirm(false);
        setShowSuccess(true);
      },
      onError: () => {
        console.log("error");
      }
    })

    // console.log(Number(getValues('amount').replaceAll(".", "")))
  });

  return (
    <>
      {/* <NumericFormat type="text" value={1231231} thousandSeparator />; */}
      {showConfirm && (
        <ModalConfirm
          label="Anda yakin untuk Top Up sebesar"
          labelConfirm="Ya, lanjutkan Bayar"
          nominal={formatUang(Number(getValues('amount').replaceAll(".", "")))}
          handleSubmit={handleTopUp}
          isPending={isPending}
          onConfirm={setShowConfirm}
        />
      )}
      {showSuccess && (
        <ModalNotification
          label="Top Up sebesar"
          nominal={formatUang(Number(getValues('amount').replaceAll(".", "")))}
          logo={LogoSuccess}
          status="berhasil"
        />
      )}

      {showFailed && (
        <ModalNotification
          label="Pembayaran listrik prabayar sebesar"
          nominal={10000}
          logo={LogoFailed}
          status="gagal"
        />
      )}
      <form className="mt-4 flex gap-4">
        <div className="relative w-[60%]">
          <input
            type="number"
            className="w-full h-[42px] border border-[#b3b3b1] rounded-sm pl-10 focus:outline-none placeholder:text-[#b3b3b1]"
            placeholder="10.000"
            {...register('amount')}
          />
          {errorMessage !== "" && <p className="mt-2 text-red-700 text-[.8rem]">{errorMessage}</p>}
          {/* <Controller
            name="amount"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <NumericFormat
                thousandSeparator=","
                // decimalSeparator=","
                // prefix="$"
                // decimalScale={2}
                getInputRef={ref}
                {...rest}
                className="w-full h-[42px] border border-[#b3b3b1] rounded-sm pl-10 focus:outline-none placeholder:text-[#b3b3b1]"
              />
            )}
          />


          <Controller
            control={control}
            name="ReactDatepicker"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <input />
            )}
          /> */}
          {/* {number ? (
            <div className="absolute top-3 left-3 text-black">
              <HiMiniWallet />
            </div>
          ) : (
            <div className="absolute top-3 left-3 text-[#b3b3b1]">
              <HiMiniWallet />
            </div>
          )} */}

          <div className="absolute top-3 left-3 text-black">
            <HiMiniWallet />
          </div>

          <button
            type="submit"
            className="w-full h-[42px] bg-red-500 mt-5 rounded-sm text-white focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              if (Number(getValues('amount').replaceAll(".", "")) >= 10_000) {
                setShowConfirm(true);
                setErrorMessage("");
                return;
              }

              setErrorMessage('Minimal top up Rp.10.000!')
            }}
          >
            Top Up
          </button>
        </div>

        <div className="w-[35%] flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setValue('amount', formatUang(10_000))}
            className="w-[130px] h-[42px] border-[#b3b3b1] border rounded-md text-[#646463] hover:border-black"
          // onClick={(e) => {
          //   e.preventDefault();
          //   setShowSuccess(true);
          // }}
          >
            Rp10.000
          </button>
          <button
            type="button"
            className="w-[130px] h-[42px] border-[#b3b3b1] border rounded-md text-[#646463] hover:border-black"
            onClick={() => setValue('amount', formatUang(25_000))}
          // onClick={(e) => {
          //   e.preventDefault();
          //   setShowFailed(true);
          // }}
          >
            Rp25.000
          </button>
          <button
            type="button"
            onClick={() => setValue('amount', formatUang(50_000))}
            className="w-[130px] h-[42px] border-[#b3b3b1] border rounded-md text-[#646463] hover:border-black">
            Rp50.000
          </button>
          <button
            type="button"
            onClick={() => setValue('amount', formatUang(100_000))}
            className="w-[130px] h-[42px] border-[#b3b3b1] border rounded-md text-[#646463] hover:border-black">
            Rp100.000
          </button>
          <button
            type="button"
            onClick={() => setValue('amount', formatUang(250_000))}
            className="w-[130px] h-[42px] border-[#b3b3b1] border rounded-md text-[#646463] hover:border-black">
            Rp250.000
          </button>
          <button
            type="button"
            onClick={() => setValue('amount', formatUang(500_000))}
            className="w-[130px] h-[42px] border-[#b3b3b1] border rounded-md text-[#646463] hover:border-black">
            Rp500.000
          </button>
        </div>
      </form>
    </>
  );
};

export default FormTopUp;
