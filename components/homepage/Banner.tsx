'use client';

import { useBanner } from '@/hooks/useBanner';
import Image from 'next/image';
import React, { FC } from 'react'

const Banner: FC = () => {
  const {banner, isPending} = useBanner();

  console.log(banner);

  if(isPending) return <p>Loading....</p>
  return (
    <div className="flex mt-4 items-center gap-8 flex-nowrap w-[1550px]">
      {banner.data.map(item => (
        <Image
          key={item.banner_name}
          src={item.banner_image}
          alt={item.banner_name}
          width={270}
          height={121}
        />
      ))}
    </div>
  )
}

export default Banner