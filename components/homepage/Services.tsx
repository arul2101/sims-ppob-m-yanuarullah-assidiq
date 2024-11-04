'use client'

import { useServices } from '@/hooks/useServices'
import React, { FC } from 'react'
import Payments from './Payments'

const Services: FC = () => {
  const {services, isPending} = useServices()

  if(isPending) return <p>Loading...</p>
  return (
    <section className="flex gap-8 px-2 pb-10 mt-8">
        {/* {payments.map((item) => (
          <Payments key={item.id} img={item.img} label={item.label} />
        ))} */}
        {services.data.map(item => (
          <Payments key={item.service_name} img={item.service_icon} label={item.service_name} />
        ))}
    </section>
  )
}

export default Services