'use client';

import { useBanner } from '@/hooks/useBanner';
import Image from 'next/image';
import React, { FC } from 'react'
import LoadingSpinner from '../LoadingSpinner';

type Banner = {
  banner_name: string;
  banner_image: string;
  description: string;
}

const Banner: FC = () => {
  const { banner, isPending } = useBanner();

  if (isPending) return <LoadingSpinner />
  return (
    <section className="overflow-x-scroll">
      <div className="flex mt-4 items-center gap-8 flex-nowrap w-[1550px]">
        <div className="flex mt-4 items-center gap-8 flex-nowrap w-[1550px]">
          {banner.data.map((item: Banner) => (
            <Image
              key={item.banner_name}
              src={item.banner_image}
              alt={item.banner_name}
              width={270}
              height={121}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Banner