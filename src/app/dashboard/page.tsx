'use client'

import { useEffect, useState } from 'react'
import { DataTable } from '@/components/data-table'
import { ProfileIcon } from '@/components/profile-icon'
import { getFlags } from '@/lib/featureflag'

export default function Dashboard() {
  const [flags, setFlags] = useState([])

  useEffect(() => {
    getFlags(setFlags)
  }, [])

  return (
    <div className='flex flex-col items-center p-6 md:p-10'>
      <div className='w-full max-w-[75vw] flex flex-col gap-4'>
        <div className='flex justify-between w-full items-center'>
          <div className='flex gap-4 items-center'>
            <img src='/logo128.png' className='w-[35px] h-[32px]' />
            <h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
              Feature Flag Manager
            </h2>
          </div>
          <ProfileIcon />
        </div>
        <div className='w-full'>
          <DataTable data={flags} />
        </div>
      </div>
    </div>
  )
}
