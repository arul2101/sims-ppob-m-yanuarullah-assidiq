'use client'

import { useServices } from '@/hooks/useServices'
import React, { FC } from 'react'
import Payments from './Payments'
import LoadingSpinner from '../LoadingSpinner'

type Service = {
  service_name: string;
  service_code: string;
  service_icon: string;
  service_tariff: number;
}

const Services: FC = () => {
  const { services, isPending } = useServices()

  if (isPending) return <LoadingSpinner />
  return (
    <section className="flex gap-8 px-2 pb-10 mt-8">
      {services.data.map((item: Service) => (
        <Payments key={item.service_name} img={item.service_icon} label={item.service_name} />
      ))}
    </section>
  )
}

export default Services