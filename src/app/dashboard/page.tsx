'use client'

import { auth, db } from '@/lib/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/data-table'
import { ProfileIcon } from '@/components/profile-icon'

export default function Dashboard() {
  const router = useRouter()
  const [flags, setFlags] = useState([])
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const fetchItems = async () => {
    const data = await getDocs(collection(db, 'gymapp'))
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      name: doc.id,
    }))
    setFlags(filteredData)
  }

  useEffect(() => {
    if (auth?.currentUser) {
      setIsUserLoggedIn(true)
      fetchItems()
    } else {
      router.push('/')
    }
    fetchItems()
  }, [])

  if (!isUserLoggedIn) {
    return null
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-[75vw] flex flex-col gap-4'>
        <div className='flex justify-between w-full items-center'>
          <div className='flex gap-4 items-center'>
            <img src='/logo128.png' className='w-[32px] h-[32px]' />
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
