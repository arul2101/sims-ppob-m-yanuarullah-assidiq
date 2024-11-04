'use client'

import { getTransactionHistory } from '@/services/apiAuth';
import { useCookies } from 'next-client-cookies';
import React, { FC, useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner';

export function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("id", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

function formatUang(subject: number) {
  return subject.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}

type TransactionHistory = {
  created_on: string;
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
}[];


const Transaction: FC = () => {
  const [limit] = useState<number>(5);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistory>([]);
  const cookies = useCookies();

  useEffect(() => {
    setLoadingMore(true);
    getTransactionHistory({ token: cookies.get('session') as string, limit, offset })
      .then((res) => {
        if (transactionHistory?.length === 0) {
          setTransactionHistory(res.data.records);
        } else if (res.data.records.length !== 0) {
          setTransactionHistory(prevData => [...prevData, ...res.data.records]);
        }

        setLoading(false)
        setLoadingMore(false);

        console.log(transactionHistory)
      });


  }, [cookies, limit, offset])

  const handleShowMore = () => {
    setOffset(prev => prev + limit);
  }



  if (loading) return <LoadingSpinner />
  return (
    <section className='p-4 mt-4'>
      <h2 className='font-semibold text-[1.2rem] mb-4'>Semua Transaksi</h2>

      {transactionHistory?.map(item => {
        if (item.transaction_type === "TOPUP") {
          return (
            <div className='border border-[#949493] rounded-md shadow-sm p-4 mb-4' key={item.invoice_number}>
              <div className='flex justify-between'>
                <h2 className='text-green-500 text-[1.5rem]'>+ Rp.{formatUang(item.total_amount)}</h2>
                <p className='text-[#929291]'>{item.description}</p>
              </div>

              <p className='text-slate-400 text-[.8rem]'>{formatDate(item.created_on).replace("pukul", "") + " WIB"}</p>
            </div>
          )
        }

        return (
          <div className='border border-[#949493] rounded-md shadow-sm p-4 mb-4' key={item.invoice_number}>
            <div className='flex justify-between'>
              <h2 className='text-red-500 text-[1.5rem]'>- Rp.{formatUang(item.total_amount)}</h2>
              <p className='text-[#929291]'>{item.description}</p>
            </div>

            <p className='text-slate-400 text-[.8rem]'>{formatDate(item.created_on).replace("pukul", "") + " WIB"}</p>
          </div>
        )
      })}

      <div className='text-center mt-4'>
        <p className='text-red-400 font-semibold cursor-pointer' onClick={handleShowMore}>{loadingMore ? "Loading..." : "Show More"}</p>
      </div>

    </section>
  )
}

export default Transaction