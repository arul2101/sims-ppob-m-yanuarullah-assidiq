import Navbar from '@/components/Navbar'
import FormEditProfile from '@/components/profile/FormEditProfile'
import React, { FC } from 'react'

const page: FC = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-[1230px] mx-auto">
        <FormEditProfile />
      </main>
    </>
  )
}

export default page